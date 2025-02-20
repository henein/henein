import { CommentForm } from './comment-form';
import { Card } from '@/components/card';
import { CardHeader } from '@/components/card-header';
import { getTimeDifference } from '@/utils/time';
import { PrismaClient } from '@prisma/client';

export interface CommentBoxProps {
  postId: bigint;
}

export const CommentBox = async (props: CommentBoxProps) => {
  const prisma = new PrismaClient();

  const comments = await prisma.comments.findMany({
    where: {
      post_id: props.postId,
      parent_id: null,
      deleted_at: null,
    },
    include: {
      users: { include: { profiles: true } },
      replies: true,
    },
    orderBy: { created_at: 'asc' },
  });

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 rounded-2xl px-6 py-5">
        <div className="font-bold">댓글 {comments.length}개</div>
      </CardHeader>
      <div className="divide-default flex flex-col divide-y px-6 pb-5 pt-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-1 py-3">
              <div className="flex h-5 items-center">
                <p className="text-secondary mr-1 text-xs">
                  {comment.users.profiles?.nickname ?? 'Unknown'}
                </p>
                <p
                  className="text-secondary text-xs"
                  suppressHydrationWarning
                >{` · ${getTimeDifference(comment.created_at.toISOString())}`}</p>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-secondary py-3">댓글이 없습니다.</p>
        )}
        <CommentForm className="mt-3" postId={props.postId} />
      </div>
    </Card>
  );
};
