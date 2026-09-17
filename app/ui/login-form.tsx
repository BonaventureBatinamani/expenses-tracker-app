"use client";
import { useActionState } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";
import { authenticate } from "../lib/action";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/30";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-600">
            <WalletIcon className="h-5 w-5 text-white" />
          </span>
          <span className="text-sm font-semibold text-gray-900">Expense Tracker</span>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">Sign in</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your credentials to continue.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            aria-disabled={isPending}
            disabled={isPending}
            className="mt-1 w-full rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700 disabled:opacity-60"
          >
            {isPending ? "Signing in..." : "Login"}
          </button>

          {errorMessage && (
            <p className="text-xs font-medium text-red-600">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}