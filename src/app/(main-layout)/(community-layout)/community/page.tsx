import PostItem from '@/components/post-item';
import { getTimeDifference } from '@/utils/time';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

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
    take: 20,
    skip: (page - 1) * 20,
  });

  return (
    <div className="divide-default flex flex-col divide-y">
      {posts.map((post) => (
        <Link
          className="hover:bg-white-25 rounded-2xl transition-colors"
          key={post.id}
          href={`/post/${post.id}`}
        >
          <PostItem
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
        </Link>
      ))}
    </div>
  );
};

export default CommunityCategoryPage;
