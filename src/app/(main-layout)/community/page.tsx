'use server';

import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

export const CommunityPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const prisma = new PrismaClient();

  const posts = await prisma.posts.findMany();

  return (
    <div className='flex flex-col gap-4'>
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
};

export default CommunityPage;
