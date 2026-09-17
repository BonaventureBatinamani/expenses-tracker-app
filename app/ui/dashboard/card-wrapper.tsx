'use client';
import { ExpenseRow } from "@/app/lib/utils";
import { useMemo } from "react";
import {
  BanknotesIcon,
  CalendarDaysIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

function formatTZS(value: number) {
  return "TZS " + value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function CardWrapper({ expenses }: { expenses: ExpenseRow[] }) {
  const totals = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    // Start of this week (Monday). Change the initialiser to `0` if you want Sunday.
    const startOfWeek = new Date(now);
    const day = now.getDay(); // 0 = Sun … 6 = Sat
    const diffToMonday = (day === 0 ? 0 : 1) - day;
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    let monthTotal = 0;
    let weekTotal = 0;
    let total = 0;

    expenses.forEach((expense) => {
      const d = new Date(expense.date);
      const amount = Number(expense.amount);

      total += amount;
      if (d.getMonth() === month && d.getFullYear() === year) {
        monthTotal += amount;
      }
      if (d >= startOfWeek && d < endOfWeek) {
        weekTotal += amount;
      }
    });

    return { totalExpenditure: total, monthTotal, weekTotal };
  }, [expenses]);

  return (
    <>
      <Card
        title="Total Expenditure"
        value={totals.totalExpenditure}
        icon={BanknotesIcon}
      />
      <Card
        title="This Month's Expenditure"
        value={totals.monthTotal}
        icon={CalendarDaysIcon}
      />
      <Card
        title="This Week's Expenditure"
        value={totals.weekTotal}
        icon={CalendarIcon}
      />
    </>
  );
}

export function Card({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number | undefined;
  icon: React.ElementType;
}) {
  const formatted = value === undefined ? "—" : formatTZS(value);
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
          <Icon className="w-5" />
        </span>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <p className="px-5 pb-5 pt-4 text-2xl font-bold tracking-tight tabular-nums text-gray-900">
        {formatted}
      </p>
    </div>
  );
}