"use client";
import { useActionState } from "react";
import Link from "next/link";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { addUser } from "../lib/action";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-lime-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500/30";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(addUser, undefined);

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-lime-700 via-lime-600 to-lime-500 px-8 py-9">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
              <UserPlusIcon className="h-6 w-6 text-white" />
            </span>
            <div>
              <p className="text-base font-semibold text-white">Expense Tracker</p>
              <p className="text-sm font-medium text-lime-100">Create your account</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Join Expense Tracker
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">
            Sign up to start recording your spending.
          </p>

          <form action={formAction} className="mt-7 flex flex-col gap-5">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="userName"
                type="text"
                name="userName"
                required
                placeholder="Jane Doe"
                aria-describedby="userName-error"
                className={inputClass}
              />
              {state?.errors?.userName?.[0] && (
                <p id="userName-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {state.errors.userName[0]}
                </p>
              )}
            </div>

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
                aria-describedby="email-error"
                className={inputClass}
              />
              {state?.errors?.email?.[0] && (
                <p id="email-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {state.errors.email[0]}
                </p>
              )}
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
                minLength={8}
                placeholder="••••••••"
                aria-describedby="password-error"
                className={inputClass}
              />
              {state?.errors?.password?.[0] ? (
                <p id="password-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {state.errors.password[0]}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-400">
                  At least 8 characters.
                </p>
              )}
            </div>

            <button
              type="submit"
              aria-disabled={isPending}
              disabled={isPending}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 active:bg-lime-700 disabled:opacity-60"
            >
              {isPending ? "Creating account..." : "Create account"}
            </button>

            {state?.message && (
              <p className="text-xs font-medium text-red-600">{state.message}</p>
            )}
          </form>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              or
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-lime-600 transition hover:text-lime-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}