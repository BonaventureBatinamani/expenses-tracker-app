'use client';

import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { editExpense } from "@/app/lib/action";
import type { ExpenseRow, CategoryField } from "@/app/lib/utils";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/30";

export function Form({
  expense,
  categories,
}: {
  expense: ExpenseRow[];
  categories: CategoryField[];
}) {
  const updateExpenseWithId = editExpense.bind(null, expense[0].id)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Edit Expense</h2>
      <p className="mt-0.5 text-xs text-gray-500">
        Update the details of this expense
      </p>

      <form
        action={updateExpenseWithId}
        className="mt-6 flex flex-col gap-5"
      >
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              defaultValue={expense[0].category_id}
              className={`${inputClass} w-full appearance-none pr-10`}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            defaultValue={expense[0].description ?? ""}
            placeholder="e.g. Groceries"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            step="0.01"
            min="0.01"
            defaultValue={expense[0].amount}
            placeholder="e.g. 25000"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            defaultValue={new Date(expense[0].date).toISOString().split("T")[0]}
            className={inputClass}
          />
        </div>

        <div className="mt-1 flex items-center justify-end gap-3">
          <Link
            href="/dashboard/expenses"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}