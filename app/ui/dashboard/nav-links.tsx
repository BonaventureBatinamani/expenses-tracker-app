'use client';

import { HomeIcon, WalletIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Expenses', href: '/dashboard/expenses', icon: WalletIcon },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathName === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={
              'flex h-12 grow items-center justify-center gap-2 rounded-xl p-3 text-sm font-medium transition md:flex-none md:justify-start md:px-3' +
              (isActive
                ? ' bg-lime-50 text-lime-700'
                : ' bg-gray-50 text-gray-600 hover:bg-lime-50 hover:text-lime-700')
            }
          >
            <LinkIcon className="w-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}