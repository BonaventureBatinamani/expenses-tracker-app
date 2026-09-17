import { fetchCategories } from "@/app/lib/data";
import AddExpensesForm from "@/app/ui/expenses/add-expense-form";




export default async function AddExpensePage(){
    const categories = await fetchCategories();

    return(
        <AddExpensesForm categories = {categories}/>
    )

}
 