import { WalletIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { EditExpense, DeleteExpense } from "./buttons";
import type { ExpenseRow } from "@/app/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "housing/rent": "bg-sky-500",
  food: "bg-lime-500",
  transport: "bg-amber-500",
  health: "bg-emerald-500",
  lifestyle: "bg-pink-500",
  "savings & investments": "bg-teal-500",
  utilities: "bg-blue-500",
  entertainment: "bg-purple-500",
  "personal care": "bg-rose-500",
  debts: "bg-red-500",
  others: "bg-gray-500",
};

function formatCurrency(value: string | number) {
  const num = Number(value) || 0;
  return "TZS " + num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatDate(value: Date) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ExpensesTable({
  expenses,
  hasFilters = false,
}: {
  expenses: ExpenseRow[];
  hasFilters?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
            <WalletIcon className="w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">Your Expenses</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              All recorded transactions, newest first
            </p>
          </div>
        </div>
        <span className="rounded-full bg-lime-50 px-2.5 py-1 text-xs font-semibold text-lime-700">
          {expenses.length} {expenses.length === 1 ? "transaction" : "transactions"}
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <WalletIcon className="h-5 w-5" />
          </span>
          <div>
            {hasFilters ? (
              <>
                <p className="text-sm font-medium text-gray-900">No expenses found</p>
                <p className="mt-1 text-xs text-gray-500">
                  Try adjusting your search or filtering by another category.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-900">No expenses recorded yet</p>
                <p className="mt-1 text-xs text-gray-500">
                  Your recorded expenses will appear here.
                </p>
              </>
            )}
          </div>
          {!hasFilters && (
            <Link
              href="/dashboard/expenses/create"
              className="mt-2 flex items-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700"
            >
              <PlusIcon className="h-4 w-4" />
              Add your first expense
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 text-right font-semibold">Amount</th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((expense) => {
                const dot =
                  CATEGORY_COLORS[expense.category_name.toLowerCase()] ?? "bg-gray-400";
                return (
                  <tr key={expense.id} className="transition-colors hover:bg-gray-50/80">
                    <td className="whitespace-nowrap px-6 py-3.5 text-sm text-gray-500">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900">
                      {expense.description ?? "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
                        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                        {expense.category_name}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3.5 text-right text-sm font-bold tabular-nums text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <EditExpense id={expense.id} />
                        <DeleteExpense id={expense.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}