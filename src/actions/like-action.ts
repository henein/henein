'use server';

import { prisma } from '@/utils/prisma';
import { createClient } from '@/utils/supabase/server';

export async function patchLike(postId: number) {
  try {
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
      where: { id: postId },
    });

    if (!post) {
      return {
        error: {
          message: '게시글을 찾을 수 없습니다.',
        },
      };
    }

    const existingLike = await prisma.likes.findUnique({
      where: {
        user_id_post_id: {
          user_id: user.id,
          post_id: postId,
        },
      },
    });

    const like = await prisma.likes.upsert({
      where: {
        user_id_post_id: {
          user_id: user.id,
          post_id: postId,
        },
      },
      update: {
        is_liked: !existingLike?.is_liked,
        updated_at: new Date(),
      },
      create: {
        user_id: user.id,
        post_id: postId,
        is_liked: true,
      },
    });

    // revalidatePath(`/post/${postId}`);

    if (!like) {
      return {
        error: {
          message: '실패하였습니다.',
        },
      };
    }

    return {
      data: {},
    };
  } catch (error: any) {
    return {
      error: {
        message: error.message,
      },
    };
  }
}
