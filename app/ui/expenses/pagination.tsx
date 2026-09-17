'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

type Page = number | string;
type Position = 'first' | 'last' | 'single' | 'middle' | undefined;

function positionFor(index: number, pages: Page[], page: Page): Position {
  if (pages.length === 1) return 'single';
  if (index === 0) return 'first';
  if (index === pages.length - 1) return 'last';
  if (page === '...') return 'middle';
  return undefined;
}

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => (
          <PaginationNumber
            key={`${index}-${page}`}
            href={createPageURL(page)}
            page={page}
            position={positionFor(index, allPages, page)}
            isActive={currentPage === page}
          />
        ))}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const base =
    'flex h-10 w-10 items-center justify-center text-sm border border-gray-200';
  let corner = '';
  if (position === 'first' || position === 'single') corner += ' rounded-l-md';
  if (position === 'last' || position === 'single') corner += ' rounded-r-md';
  const active = isActive
    ? ' z-10 bg-lime-600 border-lime-600 text-white'
    : position === 'middle'
      ? ' text-gray-300 border-transparent'
      : ' hover:bg-lime-50 hover:text-lime-700';

  return isActive || position === 'middle' ? (
    <div className={`${base}${corner}${active}`}>{page}</div>
  ) : (
    <Link href={href} className={`${base}${corner}${active}`}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const base =
    'flex h-10 w-10 items-center justify-center text-sm border border-gray-200';
  const side =
    direction === 'left' ? ' mr-2 rounded-l-md' : ' ml-2 rounded-r-md';
  const state = isDisabled
    ? ' pointer-events-none text-gray-300 bg-gray-50'
    : ' hover:bg-lime-50 hover:text-lime-700';

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={`${base}${side}${state}`}>{icon}</div>
  ) : (
    <Link className={`${base}${side}${state}`} href={href}>
      {icon}
    </Link>
  );
}