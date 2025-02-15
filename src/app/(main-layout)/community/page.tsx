'use server';

import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

const CommunityPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const prisma = new PrismaClient();

  const page = Number((await searchParams).page ?? 1);

  const posts = await prisma.posts.findMany({
    take: 20,
    skip: (page - 1) * 20,
  });

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
};

export default CommunityPage;
