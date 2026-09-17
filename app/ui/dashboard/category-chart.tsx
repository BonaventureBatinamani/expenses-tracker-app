"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChartBarIcon } from "@heroicons/react/24/outline";

type CategoryTotal = { name: string; total: string };

const formatTZS = (value: number) =>
  "TZS " + value.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function CategoryChart({ data }: { data: CategoryTotal[] }) {
  const chartData = data.map((d) => ({
    name: d.name,
    total: Number(d.total),
  }));

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
            <ChartBarIcon className="w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              Spending by Category
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Total spend per category across all your expenses
            </p>
          </div>
        </div>
      </div>
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <ChartBarIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">No spending yet</p>
              <p className="mt-1 text-xs text-gray-500">
                Category breakdown will appear here once you record expenses.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-72 w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(v) => v.toLocaleString("en-US")}
                />
                <Tooltip
                  cursor={{ fill: "rgba(101, 163, 13, 0.06)" }}
                  formatter={(value) => {
                    const num = Number(value) || 0;
                    return [formatTZS(num), "Total"];
                  }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar dataKey="total" fill="#84cc16" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}