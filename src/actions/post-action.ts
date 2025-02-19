'use server';

import { createClient } from '@/utils/supabase/server';
import { editorExtensions } from '@/utils/tiptap';
import { PrismaClient } from '@prisma/client';
import { generateText } from '@tiptap/react';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FetchPostOption = z.object({
  id: z.bigint(),
});

export async function fetchPost(option: z.infer<typeof FetchPostOption>) {
  const validOption = FetchPostOption.parse(option);

  const prisma = new PrismaClient();

  const post = await prisma.posts.findUnique({
    where: { id: Number(validOption.id) },
    include: {
      categories: true,
    },
  });

  if (!post) {
    return;
  }

  const authorProfile = await prisma.profiles.findUnique({
    where: { id: post.author_id },
  });

  return {
    ...post,
    authorNickname: authorProfile?.nickname ?? '',
  };
}

const WritePostOption = z.object({
  title: z
    .string()
    .trim()
    .min(2, '제목이 너무 짧아요!')
    .max(100, '제목이 너무 길어요!'),
  content: z.string().refine((val) => {
    const plainText = generateText(JSON.parse(val), editorExtensions);
    return plainText.length > 0;
  }, '내용이 없어요!'),
  category_id: z.string(),
});

export async function writePost(option: z.infer<typeof WritePostOption>) {
  try {
    const validOption = WritePostOption.parse(option);

    const supabase = await createClient();
    const prisma = new PrismaClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    const category = await prisma.categories.findUnique({
      where: { id: validOption.category_id },
    });

    if (!category) {
      throw new Error('카테고리를 찾을 수 없습니다.');
    }

    const todayPostCount = await prisma.posts.count({
      where: {
        author_id: user.id,
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    if (todayPostCount >= 10) {
      throw new Error('하루에 작성할 수 있는 게시글은 10개까지입니다.');
    }

    const post = await prisma.posts.create({
      data: {
        title: validOption.title,
        author_id: user.id,
        category_id: validOption.category_id,
        content: JSON.parse(validOption.content),
      },
    });

    if (!post) {
      throw new Error('게시글 작성에 실패했습니다.');
    }

    redirect(`/post/${post.id}`);
  } catch (error: any) {
    return error.message as string;
  }
}

const ModifyPostOption = z.object({
  id: z.bigint(),
  title: z
    .string()
    .trim()
    .min(2, '제목이 너무 짧아요!')
    .max(100, '제목이 너무 길어요!'),
  content: z.string().refine((val) => {
    const plainText = generateText(JSON.parse(val), editorExtensions);
    return plainText.length > 0;
  }, '내용이 없어요!'),
  category_id: z.string(),
});

export async function modifyPost(option: z.infer<typeof ModifyPostOption>) {
  try {
    const validOption = ModifyPostOption.parse(option);

    const supabase = await createClient();
    const prisma = new PrismaClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    const category = await prisma.categories.findUnique({
      where: { id: validOption.category_id },
    });

    if (!category) {
      throw new Error('카테고리를 찾을 수 없습니다.');
    }

    const post = await prisma.posts.update({
      where: { id: validOption.id, author_id: user.id },
      data: {
        title: validOption.title,
        author_id: user.id,
        category_id: validOption.category_id,
        content: JSON.parse(validOption.content),
        updated_at: new Date(),
      },
    });

    if (!post) {
      throw new Error('게시글 수정에 실패했습니다.');
    }

    redirect(`/post/${post.id}`);
  } catch (error: any) {
    return error.message as string;
  }
}

const DeletePostOption = z.object({
  id: z.bigint(),
});

export async function deletePost(option: z.infer<typeof DeletePostOption>) {
  const validOption = DeletePostOption.parse(option);

  const supabase = await createClient();
  const prisma = new PrismaClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const post = await prisma.posts.update({
    where: { id: validOption.id, author_id: user.id },
    data: {
      deleted_at: new Date(),
    },
  });

  if (!post) {
    throw new Error('게시글 삭제에 실패했습니다.');
  }

  redirect('/community');
}
