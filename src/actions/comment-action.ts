'use server';

import { prisma } from '@/utils/prisma';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const WriteCommentOption = z.object({
  postId: z.bigint(),
  content: z
    .string()
    .trim()
    .min(1, '내용이 없어요!')
    .max(100, '내용이 너무 길어요! (최대 100자)'),
});

export async function writeComment(option: z.infer<typeof WriteCommentOption>) {
  try {
    const validOption = WriteCommentOption.parse(option);

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        error: {
          message: '로그인이 필요합니다.',
        },
      };
    }

    const post = await prisma.posts.findUnique({
      where: { id: validOption.postId },
    });

    if (!post) {
      return {
        error: {
          message: '게시글을 찾을 수 없습니다.',
        },
      };
    }

    const todayPostCount = await prisma.comments.count({
      where: {
        author_id: user.id,
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        deleted_at: null,
      },
    });

    if (todayPostCount >= 50) {
      return {
        error: {
          message: '하루에 작성할 수 있는 댓글은 50개까지입니다.',
        },
      };
    }

    const comment = await prisma.comments.create({
      data: {
        post_id: validOption.postId,
        author_id: user.id,
        content: validOption.content,
      },
    });

    if (!comment) {
      return {
        error: {
          message: '댓글 작성에 실패했습니다.',
        },
      };
    }

    return {
      data: {},
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: error.issues[0].message,
        },
      };
    }

    return {
      error: {
        message: error.message,
      },
    };
  }
}
