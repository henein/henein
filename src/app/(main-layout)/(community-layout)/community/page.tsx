import { Button } from '@/components';
import { PaginationLink } from '@/components/pagination/pagination-link';
import PostItem from '@/components/post-item';
import { getTimeDifference } from '@/utils/time';
import { editorExtensions } from '@/utils/tiptap';
import { PrismaClient } from '@prisma/client';
import { generateText } from '@tiptap/react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import React from 'react';

const MAX_POST_COUNT = 20;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const categoryId = (await searchParams).category as string | undefined;

  if (categoryId === undefined) {
    return {
      title: '전체',
    };
  }

  const prisma = new PrismaClient();

  const category = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
  });

  return {
    title: category?.name ?? '전체',
  };
}

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

const getHref = (page: number, category?: string) => {
  return `/community?page=${page}${category !== undefined ? `?category=${category}` : ''}`;
};

const CommunityCategoryPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;

  const category = searchParams.category as string | undefined;
  const page = Number(searchParams.page ?? 1);

  const prisma = new PrismaClient();

  const posts = await prisma.posts.findMany({
    include: {
      categories: true,
      users: { include: { profiles: true } },
      _count: { select: { comments: true } },
    },
    where: {
      category_id: category,
      deleted_at: null,
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

  const prevPage = Math.floor(page / MAX_POST_COUNT) - 1;
  const nextPage = Math.floor(page / MAX_POST_COUNT) + 11;

  return (
    <div className="flex min-h-full flex-col items-end gap-4">
      <div className="divide-default flex w-full flex-auto flex-col divide-y">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            category={post.categories.name}
            categoryId={post.categories.id}
            id={post.id}
            title={post.title}
            text={generateText(
              JSON.parse(JSON.stringify(post.content)),
              editorExtensions,
            ).slice(0, 100)}
            author={post.users.profiles?.nickname ?? ''}
            authorImageUrl={post.users.profiles?.profile_img ?? undefined}
            createTime={getTimeDifference(post.created_at.toISOString())}
            views={0}
            commentNum={post._count.comments}
            recommendNum={0}
          />
        ))}
      </div>
      <div className="flex w-full justify-center gap-0.5">
        <PaginationLink
          href={prevPage > 1 ? getHref(prevPage, category) : undefined}
        >
          <span className="icon icon-20">keyboard_arrow_left</span>
        </PaginationLink>
        {getShowPages(page, pageCount).map((showPage) => (
          <PaginationLink
            key={showPage}
            href={getHref(showPage, category)}
            isSelected={showPage === page}
          >
            {showPage}
          </PaginationLink>
        ))}
        <PaginationLink
          href={nextPage <= pageCount ? getHref(nextPage, category) : undefined}
        >
          <span className="icon icon-20">keyboard_arrow_right</span>
        </PaginationLink>
      </div>
    </div>
  );
};

export default CommunityCategoryPage;
