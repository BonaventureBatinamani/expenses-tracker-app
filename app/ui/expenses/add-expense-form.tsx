'use client';

import { useActionState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { CategoryField } from "@/app/lib/utils";
import { addExpense } from "@/app/lib/action";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/30";

export default function AddExpensesForm({ categories }: { categories: CategoryField[] }) {
  const [state, formAction, isPending] = useActionState(addExpense, undefined);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Add Expense</h2>
      <p className="mt-0.5 text-xs text-gray-500">Record a new expense</p>

      <form action={formAction} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              defaultValue=""
              aria-describedby="category-error"
              className={`${inputClass} w-full appearance-none pr-10`}
            >
              <option value="" disabled>
                Select a category
              </option>
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
          {state?.errors?.category_id?.[0] && (
            <p id="category-error" className="mt-1.5 text-xs font-medium text-red-600">
              {state.errors.category_id[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="e.g. Groceries"
            aria-describedby="description-error"
            className={inputClass}
          />
          {state?.errors?.description?.[0] && (
            <p id="description-error" className="mt-1.5 text-xs font-medium text-red-600">
              {state.errors.description[0]}
            </p>
          )}
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
            placeholder="e.g. 25000"
            aria-describedby="amount-error"
            className={inputClass}
          />
          {state?.errors?.amount?.[0] && (
            <p id="amount-error" className="mt-1.5 text-xs font-medium text-red-600">
              {state.errors.amount[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          aria-disabled={isPending}
          disabled={isPending}
          className="mt-1 w-full rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700 disabled:opacity-60"
        >
          {isPending ? "Adding..." : "Add Expense"}
        </button>

        {state?.message && (
          <p className="text-xs font-medium text-red-600">{state.message}</p>
        )}
      </form>
    </div>
  );
}