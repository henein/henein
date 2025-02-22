import Like from './like';
import { PostHeader } from './post-header';
import { Card } from '@/components/card';
import { createClient } from '@/utils/supabase/server';
import { proseStyles } from '@/utils/tiptap';
import { PrismaClient } from '@prisma/client';
import classNames from 'classnames';
import React from 'react';

export interface PostBoxProps {
  id: number;
  title: string;
  category: string;
  author: string;
  authorImageUrl?: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export const PostBox = async (props: PostBoxProps) => {
  const prisma = new PrismaClient();

  const likeCount = await prisma.likes.count({
    where: { post_id: Number(props.id), is_liked: true },
  });

  const recommended = await getRecommended(props.id);

  return (
    <Card className="flex flex-col">
      <div className="flex flex-col">
        <PostHeader
          title={props.title}
          category={props.category}
          author={props.author}
          authorImageUrl={props.authorImageUrl}
          commentCount={props.commentCount}
          createdAt={props.createdAt}
          updatedAt={props.updatedAt}
        />
        <div
          className={classNames('min-h-96 break-all px-6 py-5', proseStyles)}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
        <div className="mx-auto my-5 flex w-full flex-col items-center gap-2">
          <Like postId={props.id} recommended={recommended} />
          <span className="text-white">{likeCount}</span>
        </div>
      </div>
    </Card>
  );
};

const getRecommended = async (postId: number) => {
  const prisma = new PrismaClient();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const recommended = await prisma.likes.findUnique({
    where: {
      user_id_post_id: {
        user_id: user.id,
        post_id: postId,
      },
    },
  });

  if (!recommended) return false;

  return recommended.is_liked;
};
