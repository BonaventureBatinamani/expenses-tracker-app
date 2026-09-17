import Link from "next/link"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { deleteExpense } from "@/app/lib/action"

export function EditExpense({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/expenses/${id}/edit`}
            className="rounded-lg bg-lime-50 p-2 text-lime-600 shadow-sm transition hover:bg-lime-100 hover:text-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500/30"
        >
            <PencilIcon className="h-4 w-4" />
        </Link>
    )
}

export function DeleteExpense({ id }: { id: string }) {
    const deleteExpenseWithId = deleteExpense.bind(null, id)
    return (
        <form action={deleteExpenseWithId}>
            <button
                type="submit"
                className="rounded-lg bg-rose-50 p-2 text-rose-600 shadow-sm transition hover:bg-rose-100 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            >
                <span className="sr-only">Delete</span>
                <TrashIcon className="h-4 w-4" />
            </button>
        </form>
    )
}