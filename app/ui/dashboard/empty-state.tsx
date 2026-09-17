import { PlusIcon, WalletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-gray-200">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-50 text-lime-600">
        <WalletIcon className="h-8 w-8" />
      </span>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          No expenses recorded yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
          This is where your spending overview will live. Add your first expense
          to start tracking your budget.
        </p>
      </div>
      <Link
        href="/dashboard/expenses/create"
        className="mt-1 flex items-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700"
      >
        <PlusIcon className="h-4 w-4" />
        Add your first expense
      </Link>
    </div>
  );
}