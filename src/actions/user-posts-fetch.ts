import { PrismaClient } from '@prisma/client';

export const fetchPostsFromType = async (uid: string, type: string) => {
  const prisma = new PrismaClient();

  // type에 따라 조건 분기
  if (type === 'post') {
    // 내가 작성한 게시글
    return await prisma.posts.findMany({
      include: {
        categories: true,
        users: { include: { profiles: true } },
      },
      where: {
        author_id: uid,
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  if (type === 'comment') {
    // 내가 댓글 단 게시글
    const distinctCommentedPostIds = await prisma.comments.groupBy({
      by: ['post_id'],
      where: {
        author: uid,
      },
    });

    const postIds = distinctCommentedPostIds
      .map((item) => item.post_id)
      .filter((postId): postId is bigint => postId !== null);

    return await prisma.posts.findMany({
      where: {
        id: {
          in: postIds,
        },
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        categories: true,
        users: { include: { profiles: true } },
      },
    });
  }

  return [];
};
