'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSearch = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      params.set('page', '1');
      replace(`${pathname}?${params.toString()}`);
    }, 300);
  };

  return (
    <div className="relative flex-1">
      <label htmlFor="expense-search" className="sr-only">
        Search
      </label>
      <input
        id="expense-search"
        defaultValue={searchParams.get('query')?.toString() ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="peer w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/30"
      />
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-600" />
    </div>
  );
}