import postgres from "postgres";
import { sql } from "./db";

export async function fetchRecentExpenses(){
    try{
        const data = await sql`
            SELECT expenses.id, expenses.amount, expenses.description, expenses.date,
                    categories.name AS category_name
            FROM expenses
            JOIN categories ON expenses.category_id = categories.id
            ORDER BY expenses.date DESC
            LIMIT 3
        `;

        return data;
    } catch (error){
        console.error("Database Error:", error);
        throw new Error ("Failed to fetch latest expenses");
    }
} 


export async function fetchExpensesSummary(){
    try{
        const totalPromise = await sql`SELECT SUM(amount) AS total FROM expenses`;
        const countPromise = await sql`SELECT COUNT(*) AS count FROM expenses`;
        const byCategoryName = await sql`
                SELECT category.name SUM(amount) AS total
                FROM expenses
                JOIN categories ON category.id = expenses.category_id
                GROUP BY category.name
                ORDER BY total DESC
        `;

        const [total, count, totalByCategory] = await Promise.all([
            totalPromise,
            countPromise,
            byCategoryName
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

const ITEMS_PER_PAGE = 10

export async function fetchFilteredExpenses(query: string, currentPage: number){
    const offset = (currentPage - 1)*ITEMS_PER_PAGE
    try{
        const expenses = await sql`
            SELECT expenses.id, expenses.amount, expenses.description, expenses.date,
                    categories.name AS category_name
            FROM expenses
            JOIN categories ON expenses.category_id = categories.id
            WHERE categories.name ILIKE ${`%${query}%`} OR 
                  expenses.description ILIKE ${`%${query}%`}
            ORDEY BY expenses.date DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

          return expenses;
    }catch (error){
        console.error("Database Error:", error)
        throw new Error("Failed to filter expenses")
    }
}


export async function fetchExpensesPage(query: string){
        try{
        const data = await sql`
            SELECT COUNT(*)
            FROM expenses
            JOIN categories ON expenses.category_id = categories.id
            WHERE categories.name ILIKE ${`%${query}%`} OR 
                  expenses.description ILIKE ${`%${query}%`}
            ORDEY BY expenses.date DESC

        `;

        const totalPages = Math.ceil(Number(data[0].count)/ITEMS_PER_PAGE)
        return totalPages
    }catch (error){
        console.error("Database Error:", error)
        throw new Error("Failed to fetch total number of expenses")
    }

}
    
