"use server";

import { signIn, signOut } from "../auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import z from "zod";
import { sql } from "./db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import type { AddUserState, AddExpenseState } from "./utils";
import type { ExpenseRow } from "./utils";
import { auth } from "../auth";

export async function authenticate(prevState : string|undefined, formData : FormData){
    try{
        await signIn("credentials", formData)

    } catch(error){
        if (error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return "Invalid Credentials"
                default:
                    return "Something went wrong"
            }
        }
        throw error
    }
}

export async function logout() {
    try{
        await signOut({ redirect: false });
    }catch(error){
        console.error();
        
    }
    
    redirect("/");
}

const entrySchema = z.object({
        id: z.string(),
        category_id: z.string(), 
        description: z.string().optional(), 
        amount: z.coerce.number().gt(0, {message: 'Please enter an amount greater than $0'}),
        date: z.string()
    })

    const createExpense = entrySchema.omit({id : true})
    const EditExpense = entrySchema.omit({id: true})

export async function addExpense(prevState: AddExpenseState | undefined, formData: FormData){
    const session = await auth()
    if(!session?.user?.id){
        throw new Error ("You must be logged in to view your expenses."); 
    }
   const date = formData.get("date") || new Date().toISOString().split('T')[0];

   const validatedFields = createExpense.safeParse({
        category_id: formData.get('category'),
        description: formData.get('description'),
        amount: formData.get('amount'),
        date

   })

   if(!validatedFields.success){
    return {
        errors : validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Sign In."

    }
   }

   const {category_id, description, amount, date: expenseDate} = validatedFields.data

   await sql`
        INSERT INTO expenses (user_id, category_id, amount, date, description)
        VALUES (${session.user.id}, ${category_id}, ${amount}, ${expenseDate}, ${description ?? null} )
    `
   revalidatePath("/dashboard/expenses");
   redirect("/dashboard/expenses");
}


export async function editExpense(id: string, formData: FormData){
    const session = await auth()
    if(!session?.user?.id){
        throw new Error ("Unauthorized"); 
    }

    const {category_id, description, amount, date} = EditExpense.parse({
        category_id: formData.get('category'),
        description: formData.get('description'),
        amount: formData.get('amount'),
        date: formData.get("date") || new Date().toISOString().split('T')[0]
    })

     

    await sql`
        UPDATE expenses
        SET category_id = ${category_id}, amount = ${amount}, description = ${description ?? null}, date = ${date}
        WHERE id = ${id} AND user_id = ${session.user.id}
    `

    revalidatePath("/dashboard/expenses");
    redirect("/dashboard/expenses");


}

export async function deleteExpense(id:string){
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized.");
    await sql`
        DELETE FROM expenses WHERE id = ${id} AND user_id = ${session.user.id}
    `
    revalidatePath("/dashboard/expenses");
}


export async function addUser(prevState: AddUserState | undefined, formData: FormData){
    const parsedData = z.object({userName: z.string(), email: z.string().email(), password: z.string().min(8) }).safeParse({
        userName: formData.get('userName'),
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!parsedData.success){
    return {
        errors : parsedData.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Sign In."

    }
  }
    const {userName, email, password} = parsedData.data
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await sql`
            INSERT INTO users(id, name, email, password)
            VALUES (gen_random_uuid(), ${userName}, ${email}, ${hashedPassword})
        `
    } catch (error){
        console.error("Database Error:", error)
        return {
            message: "Failed to add user"
        }
    }
    revalidatePath('/dashboard');
    redirect('/dashboard')

}