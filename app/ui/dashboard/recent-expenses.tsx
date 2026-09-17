import { ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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

function formatTZS(value: string | number) {
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

export default function RecentExpenses({ expenses }: { expenses: ExpenseRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
            <ClockIcon className="w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              Recent Expenses
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Your 5 most recent transactions
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/expenses"
          className="text-xs font-semibold text-lime-600 transition hover:text-lime-700"
        >
          View all
        </Link>
      </div>

      {expenses.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <p className="text-sm font-medium text-gray-900">No expenses yet</p>
          <p className="mt-1 text-xs text-gray-500">
            Record your first expense to see it here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {expenses.map((expense) => {
            const dot =
              CATEGORY_COLORS[expense.category_name.toLowerCase()] ?? "bg-gray-400";
            return (
              <li
                key={expense.id}
                className="flex items-center justify-between gap-4 px-6 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {expense.description ?? "—"}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {formatDate(expense.date)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
                    <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    {expense.category_name}
                  </span>
                  <span className="text-sm font-bold tabular-nums text-gray-900">
                    {formatTZS(expense.amount)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}