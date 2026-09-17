import Link from "next/link";
import { CheckIcon, WalletIcon } from "@heroicons/react/24/outline";

const features = [
  "Track every expense in one place",
  "Understand your monthly spending habits",
  "See your spending by category at a glance",
];

export default function Home() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 font-sans sm:px-6">
      <div className="grid w-full max-w-5xl items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-600">
              <WalletIcon className="h-5 w-5 text-white" />
            </span>
            <span className="text-sm font-semibold text-gray-900">Expense Tracker</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Take control of your <span className="text-lime-600">spending.</span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-gray-500">
            Sign in and let&apos;s get smart. Record expenses, review your monthly
            spending, and see exactly where your money goes.
          </p>

          <ul className="flex flex-col gap-2.5 text-sm text-gray-600">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm lg:justify-self-end">
          <h2 className="text-xl font-semibold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-500">Sign in to continue to your dashboard.</p>

          <Link
            href="/login"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}