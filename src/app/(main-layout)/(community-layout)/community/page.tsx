import { Button } from '@/components';
import { PaginationLink } from '@/components/pagination/pagination-link';
import PostItem from '@/components/post-item';
import { getTimeDifference } from '@/utils/time';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

const MAX_POST_COUNT = 20;

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

const getHref = (category: string, page: number) => {
  return `/community?category=${category}&page=${page}`;
};

const CommunityCategoryPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;

  const category = (searchParams.category as string) ?? 'general';
  const page = Number(searchParams.page ?? 1);

  const prisma = new PrismaClient();

  const posts = await prisma.posts.findMany({
    include: {
      categories: true,
      users: { include: { profiles: true } },
    },
    where: {
      category_id: category,
    },
    orderBy: {
      created_at: 'desc',
    },
    take: MAX_POST_COUNT,
    skip: (page - 1) * MAX_POST_COUNT,
  });

  const postCount = await prisma.posts.count({
    where: {
      category_id: category,
    },
  });

  const pageCount = Math.ceil(postCount / MAX_POST_COUNT);

  return (
    <div className="flex min-h-full flex-col items-end gap-4">
      <div className="flex gap-2">
        <Link href="/write">
          <Button sort="primary">작성하기</Button>
        </Link>
      </div>
      <div className="divide-default flex w-full flex-auto flex-col divide-y">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            category={post.categories.name}
            categoryId={post.categories.id}
            id={post.id}
            title={post.title}
            text={''}
            userName={post.users.profiles?.nickname ?? ''}
            createTime={getTimeDifference(post.created_at.toISOString())}
            views={0}
            commentNum={0}
            recommendNum={0}
          />
        ))}
      </div>
      <div className="flex w-full justify-center gap-0.5">
        <PaginationLink href={getHref(category, 1)}>
          <span className="icon icon-20">keyboard_arrow_left</span>
        </PaginationLink>
        {getShowPages(page, pageCount).map((showPage) => (
          <PaginationLink
            key={showPage}
            href={getHref(category, showPage)}
            isSelected={showPage === page}
          >
            {showPage}
          </PaginationLink>
        ))}
        <PaginationLink href={getHref(category, 11)}>
          <span className="icon icon-20">keyboard_arrow_right</span>
        </PaginationLink>
      </div>
    </div>
  );
};

export default CommunityCategoryPage;
