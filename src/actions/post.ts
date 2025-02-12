'use server';

import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

export type WritePostOption = {
  title: string;
  content: object;
  category_id: string;
};

export async function writePost(option: WritePostOption) {
  const supabase = await createClient();
  const prisma = new PrismaClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const category = await prisma.categories.findUnique({
    where: { id: option.category_id },
  });

  if (!category) {
    throw new Error('카테고리를 찾을 수 없습니다.');
  }
  
  const post = await prisma.posts.create({
    data: {
      title: option.title,
      author_id: user.id,
      category_id: option.category_id,
      content: option.content,
    },
  });

  if (!post) {
    throw new Error('게시글 작성에 실패했습니다.');
  }

  return post;
}
