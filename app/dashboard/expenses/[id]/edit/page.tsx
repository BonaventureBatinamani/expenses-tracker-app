
 import { fetchCategories, fetchExpenseById } from "@/app/lib/data"
 import { notFound } from "next/navigation"
 import { Form } from "@/app/ui/expenses/edit-expense-form"

export default async function Page( props: {params: Promise<{id : string}>} ) {
    const params = await props.params
    const  id = params.id
    const [expense, categories] = await Promise.all([
        fetchExpenseById(id),
        fetchCategories()
    ])

    if(!expense){
        notFound()
    }
  return (
    <main>
      <Form expense = {expense} categories = {categories} />
    </main>
  );
}