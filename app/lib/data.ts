import { sql } from "./db";
import { auth } from "../auth";
import type { ExpenseRow } from "./utils";
import type { CategoryField } from "./utils";



export async function fetchRecentExpenses(): Promise<ExpenseRow[]>{
    const session = await auth()
    if(!session?.user?.id){
        throw new Error ("You must be logged in to view your expenses.");
    }
    try{
        return (await sql`
            SELECT expenses.id, expenses.category_id, expenses.amount, expenses.description, expenses.date,
                    categories.name AS category_name
            FROM expenses
            JOIN categories ON expenses.category_id = categories.id
            WHERE expenses.user_id = ${session.user.id}
            ORDER BY expenses.date DESC
            LIMIT 5
        `) as ExpenseRow[]
    } catch (error){
        console.error("Database Error:", error);
        throw new Error ("Failed to fetch latest expenses");
    }
} 


export async function fetchExpensesSummary(id: string){
    try{
        const totalPromise = await sql`SELECT SUM(amount) AS total FROM expenses WHERE expenses.user_id = ${id}`;
        const countPromise = await sql`SELECT COUNT(*) AS count FROM expenses WHERE expenses.user_id = ${id}`;
        const byCategoryName = await sql`
                SELECT categories.name, SUM(amount) AS total
                FROM expenses
                JOIN categories ON categories.id = expenses.category_id
                WHERE expenses.user_id = ${id}
                GROUP BY categories.name
                ORDER BY total DESC
        `;
        const totalByCategory = byCategoryName as unknown as { name: string; total: string }[];

        const [total, count] = await Promise.all([
            totalPromise,
            countPromise
        ])

        return {
            totalSpend: total[0].total ?? 0,
            expensesCount: count[0].count ,
            byCategory: totalByCategory,
        }
    } catch (error){
        console.error("Database Error:", error);
        throw new Error ("Failed to fetch expenses summary")
    }
}

const ITEMS_PER_PAGE = 10;

function expenseFilters(query: string, categoryId: string) {
    const search = query.trim()
        ? sql`AND expenses.description ILIKE ${`%${query.trim()}%`}`
        : sql``;
    const category = categoryId
        ? sql`AND expenses.category_id = ${categoryId}`
        : sql``;
    return { search, category };
}

export async function fetchFilteredExpenses(query: string, categoryId: string, currentPage: number): Promise<ExpenseRow[]>{
    const session = await auth()
    if(!session?.user?.id){
        throw new Error ("You must be logged in to view your expenses.");
    }
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const { search, category } = expenseFilters(query, categoryId);
    try{
        return (await sql`
            SELECT expenses.id, expenses.category_id, expenses.amount, expenses.description, expenses.date,
                    categories.name AS category_name
            FROM expenses
            JOIN categories ON expenses.category_id = categories.id
            WHERE expenses.user_id = ${session.user.id}
            ${search}
            ${category}
            ORDER BY expenses.date DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `) as ExpenseRow[]
    }catch(error){
        console.error('Database Error:', error)
        throw new Error ("Failed to fetch expenses ")
    }
}

export async function fetchExpensesPages(query: string, categoryId: string): Promise<number>{
    const session = await auth()
    if(!session?.user?.id){
        throw new Error ("You must be logged in to view your expenses.");
    }
    const { search, category } = expenseFilters(query, categoryId);
    try{
        const data = await sql`
            SELECT COUNT(*) AS count
            FROM expenses
            WHERE expenses.user_id = ${session.user.id}
            ${search}
            ${category}
        `;
        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
        return totalPages
    }catch (error){
        console.error("Database Error:", error)
        throw new Error("Failed to fetch total number of expenses")
    }
}

export async function fetchExpenses(): Promise<ExpenseRow[]>{
    const session = await auth()
    if(!session?.user?.id){
        throw new Error ("You must be logged in to view your expenses.");
    }
    try{
        return (await sql`
            SELECT expenses.id, expenses.category_id, expenses.amount, expenses.description, expenses.date,
                    categories.name AS category_name
            FROM expenses
            JOIN categories ON expenses.category_id = categories.id
            WHERE expenses.user_id = ${session.user.id}
            ORDER BY expenses.date DESC
        `) as ExpenseRow[]
    }catch(error){
        console.error('Database Error:', error)
        throw new Error ("Failed to fetch expenses ")
    }


}

export async function fetchCategories(): Promise<CategoryField[]> {
    const data = await sql`
        SELECT * FROM categories
        ORDER BY name ASC
    `as CategoryField[]
    return data
}

export async function fetchExpenseById(id : string): Promise<ExpenseRow[]>{
   return (await sql`
        SELECT expenses.id, expenses.category_id, expenses.amount, expenses.description, expenses.date,
                        categories.name AS category_name
        FROM expenses
        JOIN categories ON expenses.category_id = categories.id
        WHERE expenses.id = ${id}
    `)as ExpenseRow[]
    
}


    
