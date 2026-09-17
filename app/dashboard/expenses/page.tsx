import {
  fetchCategories,
  fetchFilteredExpenses,
  fetchExpensesPages,
} from "@/app/lib/data";
import ExpensesTable from "@/app/ui/expenses/expenses-table";
import Pagination from "@/app/ui/expenses/pagination";
import Search from "@/app/ui/expenses/search";
import CategoryFilter from "@/app/ui/expenses/category-filter";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { auth } from "@/app/auth";

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Must be logged in to access dashboard")
  }

  const { query = "", category = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page) || 1;

  const [expenses, totalPages, categories] = await Promise.all([
    fetchFilteredExpenses(query, category, currentPage),
    fetchExpensesPages(query, category),
    fetchCategories(),
  ]);

  if (totalPages > 0 && currentPage > totalPages) {
    redirect(`/dashboard/expenses?page=${totalPages}`);
  }

  const hasFilters = Boolean(query || category);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Expenses</h1>
          <p className="mt-1 text-sm text-gray-500">
            A record of everything you have spent.
          </p>
        </div>
        <Link
          href="/dashboard/expenses/create"
          className="flex items-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700"
        >
          <PlusIcon className="h-4 w-4" />
          Add Expense
        </Link>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Search placeholder="Search expenses by description..." />
        <CategoryFilter categories={categories} />
      </div>

      <ExpensesTable expenses={expenses} hasFilters={hasFilters} />

      <div className="mt-2 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}