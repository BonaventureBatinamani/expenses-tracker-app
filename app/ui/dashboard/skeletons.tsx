const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200`}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="h-10 w-10 rounded-xl bg-gray-200" />
        <div className="h-4 w-28 rounded-md bg-gray-200" />
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="h-7 w-32 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function CategoryChartSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200`}
    >
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
        <div className="h-10 w-10 rounded-xl bg-gray-200" />
        <div>
          <div className="h-4 w-44 rounded-md bg-gray-200" />
          <div className="mt-2 h-3 w-64 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="flex h-72 items-end gap-3 px-6 pb-6 pt-4">
        {[40, 70, 50, 90, 60, 80, 45].map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gray-200"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function PageHeaderSkeleton({ actionSlot = false }: { actionSlot?: boolean }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <div className="h-7 w-36 rounded-md bg-gray-200" />
        <div className="mt-2 h-4 w-56 rounded-md bg-gray-200" />
      </div>
      {actionSlot && <div className="h-10 w-32 rounded-lg bg-gray-200" />}
    </header>
  );
}

export function HeaderCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-gray-200`}
    >
      <div className="h-7 w-32 rounded-md bg-gray-200" />
      <div className="mt-2 h-4 w-52 rounded-md bg-gray-200" />
    </div>
  );
}

export function RecentExpensesSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gray-200" />
          <div>
            <div className="h-4 w-36 rounded-md bg-gray-200" />
            <div className="mt-2 h-3 w-44 rounded-md bg-gray-200" />
          </div>
        </div>
        <div className="h-4 w-12 rounded-md bg-gray-200" />
      </div>
      <div className="divide-y divide-gray-100">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between gap-4 px-6 py-3.5">
            <div>
              <div className="h-4 w-40 rounded-md bg-gray-200" />
              <div className="mt-2 h-3 w-24 rounded-md bg-gray-200" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-24 rounded-full bg-gray-200" />
              <div className="h-4 w-16 rounded-md bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <main className="flex flex-col gap-6">
      <HeaderCardSkeleton />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardsSkeleton />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryChartSkeleton />
        <RecentExpensesSkeleton />
      </div>
    </main>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none">
      <td className="relative overflow-hidden whitespace-nowrap py-3.5 pl-6 pr-3">
        <div className="h-4 w-24 rounded-md bg-gray-200" />
      </td>
      <td className="overflow-hidden px-3 py-3.5">
        <div className="h-4 w-40 rounded-md bg-gray-200" />
      </td>
      <td className="overflow-hidden px-3 py-3.5">
        <div className="h-6 w-28 rounded-full bg-gray-200" />
      </td>
      <td className="relative overflow-hidden whitespace-nowrap py-3.5 pl-3 pr-3 text-right">
        <div className="ml-auto h-4 w-20 rounded-md bg-gray-200" />
      </td>
      <td className="overflow-hidden whitespace-nowrap py-3.5 pl-3 pr-6">
        <div className="ml-auto flex w-16 gap-1.5">
          <div className="h-8 w-8 rounded-lg bg-gray-200" />
          <div className="h-8 w-8 rounded-lg bg-gray-200" />
        </div>
      </td>
    </tr>
  );
}

export function ExpensesTableSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gray-200" />
          <div>
            <div className="h-4 w-32 rounded-md bg-gray-200" />
            <div className="mt-2 h-3 w-52 rounded-md bg-gray-200" />
          </div>
        </div>
        <div className="h-6 w-24 rounded-full bg-gray-200" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <th key={i} className="px-6 py-3 text-right last:text-right">
                  <div className="h-3 w-10 rounded-md bg-gray-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="mt-2 flex w-full justify-center">
      <div className="flex h-10 items-center gap-2">
        <div className="h-10 w-10 rounded-l-md border border-gray-200 bg-gray-200" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 w-10 border border-gray-200 bg-gray-200" />
        ))}
        <div className="h-10 w-10 rounded-r-md border border-gray-200 bg-gray-200" />
      </div>
    </div>
  );
}

export function ExpensesPageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSkeleton actionSlot />
      <ExpensesTableSkeleton />
      <PaginationSkeleton />
    </div>
  );
}

export function ExpenseFormSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200`}
    >
      <div className="h-5 w-32 rounded-md bg-gray-200" />
      <div className="mt-2 h-3 w-44 rounded-md bg-gray-200" />
      <div className="mt-6 flex flex-col gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className="h-3.5 w-20 rounded-md bg-gray-200" />
            <div className="mt-1.5 h-10 w-full rounded-lg bg-gray-200" />
          </div>
        ))}
        <div className="mt-1 h-11 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}