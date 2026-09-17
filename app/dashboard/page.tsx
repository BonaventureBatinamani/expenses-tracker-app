import { auth } from "../auth";
import { fetchExpenses, fetchExpensesSummary, fetchRecentExpenses } from "../lib/data";
import CardWrapper from "../ui/dashboard/card-wrapper";
import CategoryChart from "../ui/dashboard/category-chart";
import EmptyState from "../ui/dashboard/empty-state";
import RecentExpenses from "../ui/dashboard/recent-expenses";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Must be logged in to access dashboard");
  }

  const header = (
    <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-gray-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          A summary of your spending at a glance.
        </p>
      </div>
    </header>
  );

  const userExpenses = await fetchExpenses();

  if (userExpenses.length === 0) {
    return (
      <main className="flex flex-col gap-6">
        {header}
        <EmptyState />
      </main>
    );
  }

  const [summary, recentExpenses] = await Promise.all([
    fetchExpensesSummary(session.user.id),
    fetchRecentExpenses(),
  ]);

  return (
    <main className="flex flex-col gap-6">
      {header}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardWrapper expenses={userExpenses} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryChart data={summary.byCategory} />
        <RecentExpenses expenses={recentExpenses} />
      </div>
    </main>
  );
}