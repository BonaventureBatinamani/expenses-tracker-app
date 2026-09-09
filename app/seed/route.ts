import { users, categories, expenses } from "../lib/placeholder";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { error } from "console";
import { sql } from "../lib/db";




async function seedUsers() {
    await sql `CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
    await sql`
        CREATE TABLE IF NOT EXISTS users(
            id UUID PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    `

    return Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id},${user.name},${user.email},${hashedPassword})
                ON CONFLICT (id) DO NOTHING
            `
        })
    )
}

async function seedCategories(){
    await sql`CREATE TABLE IF NOT EXISTS categories(
              id TEXT PRIMARY KEY,
              name VARCHAR(225) NOT NULL
    );`

    return Promise.all(
        categories.map(async (category) =>{
            return sql`
                INSERT INTO categories(id, name)
                VALUES (${category.id}, ${category.name})
                ON CONFLICT (id) DO NOTHING;
            `
        })
    )
}

async function seedExpenses(){
    await sql`
            CREATE TABLE IF NOT EXISTS expenses(
              id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
              user_id UUID NOT NULL REFERENCES users(id),
              category_id TEXT NOT NULL REFERENCES categories(id),
              amount NUMERIC(10,2) NOT NULL,
              description TEXT,
              date DATE NOT NULL
            );`

    return Promise.all(
        expenses.map(async (expense) => {
            return sql`
                INSERT INTO expenses(user_id, category_id, amount, description, date)
                VALUES (${expense.user_id},${expense.category_id},${expense.amount},${expense.description},${expense.date})
            `
        })
    )
}


export async function GET(){
    try{
        await sql.begin( async () => {
            await seedUsers();
            await seedCategories();
            await seedExpenses();

        })
        return Response.json({message: "Database seeded successfully"});
    } catch (error){
        return Response.json({error}, {status: 500});
    }
}