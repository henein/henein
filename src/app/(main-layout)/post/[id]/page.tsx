import { editorExtensions, editorStyles } from '@/utils/tiptap';
import { PrismaClient } from '@prisma/client';
import { generateHTML } from '@tiptap/html';
import React from 'react';

export const PostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  if (!id) {
    return null;
  }

  const prisma = new PrismaClient();

  const post = await prisma.posts.findUnique({
    where: { id: Number(id) },
  });

  const output = generateHTML(post?.content as object, editorExtensions);

  return (
    <div
      className={editorStyles}
      dangerouslySetInnerHTML={{ __html: output }}
    ></div>
  );
};

export default PostPage;
