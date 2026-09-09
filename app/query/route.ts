import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { sql } from "../lib/db";


async function listOfExpenses() {
	const data = await sql`
            SELECT expenses.id, expenses.amount, expenses.description, expenses.date,
                    categories.name AS category_name
            FROM expenses
            JOIN categories ON expenses.category_id = categories.id
            ORDER BY expenses.date DESC
            LIMIT 3
        `;

	return data;
}

export async function GET() {
  const data = await listOfExpenses();
  return NextResponse.json(data);
}
