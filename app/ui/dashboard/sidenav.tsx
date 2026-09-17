import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { WalletIcon, PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/lib/action';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col gap-2 border-b border-gray-200 bg-white p-3 md:border-b-0 md:border-r">
      <Link
        className="flex h-20 items-end justify-start rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 p-4 shadow-sm md:h-32"
        href="/"
      >
        <div className="flex items-center gap-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
            <WalletIcon className="h-5 w-5 text-white" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Expense</p>
            <p className="text-sm font-semibold tracking-tight">Tracker</p>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between gap-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-xl bg-gray-50 md:block" />
        <form action={logout} className="w-full">
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium text-gray-600 transition hover:bg-lime-50 hover:text-lime-700 md:justify-start md:px-3">
            <PowerIcon className="w-5" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}