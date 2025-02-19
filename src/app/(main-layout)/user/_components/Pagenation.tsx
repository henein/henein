import { PaginationLink } from '@/components/pagination/pagination-link';
import React from 'react';

const MAX_POST_COUNT = 20;

interface Props {
  uid: string;
  page: number;
  totalElement: number;
}

const Pagenation = ({ uid, page, totalElement }: Props) => {
  const pageCount = Math.ceil(totalElement / MAX_POST_COUNT);

  const prevPage = Math.floor(page / MAX_POST_COUNT) - 1;
  const nextPage = Math.floor(page / MAX_POST_COUNT) + 11;

  return (
    <>
      {totalElement && (
        <div className="flex w-full justify-center gap-0.5">
          <PaginationLink
            href={prevPage > 1 ? getHref(1, uid, 'post') : undefined}
          >
            <span className="icon icon-20">keyboard_arrow_left</span>
          </PaginationLink>
          {getShowPages(page, pageCount).map((showPage) => (
            <PaginationLink
              key={showPage}
              href={getHref(1, uid, 'post')}
              isSelected={showPage === page}
            >
              {showPage}
            </PaginationLink>
          ))}
          <PaginationLink
            href={nextPage <= pageCount ? getHref(1, uid, 'post') : undefined}
          >
            <span className="icon icon-20">keyboard_arrow_right</span>
          </PaginationLink>
        </div>
      )}
    </>
  );
};

export default Pagenation;

const getShowPages = (currentPage: number, pageCount: number) => {
  if (pageCount <= 1) {
    return [1];
  }

  const pages = [];

  for (let i = 1; i <= MAX_POST_COUNT; i++) {
    const page = Math.floor(currentPage / MAX_POST_COUNT) + i;
    if (page > pageCount) break;
    pages.push(page);
  }

  return pages;
};

const getHref = (page: number, uid: string, type: 'post' | 'comment') => {
  return `/user/${uid}/${type}?page=${page}`;
};
