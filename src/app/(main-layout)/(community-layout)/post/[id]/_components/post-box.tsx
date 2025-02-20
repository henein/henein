import { PostHeader } from './post-header';
import { Card } from '@/components/card';
import { proseStyles } from '@/utils/tiptap';
import classNames from 'classnames';
import React from 'react';

export interface PostBoxProps {
  title: string;
  category: string;
  author: string;
  authorImageUrl?: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export const PostBox = (props: PostBoxProps) => {
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
        <div className="mx-auto my-5 flex w-full flex-col items-center">
          {/* <LikeIcon boardId={boardId} recommended={recommended} /> */}
          {/* <RecommendNum>{recommend}</RecommendNum> */}
        </div>
      </div>
    </Card>
  );
};

// const RecommendNum = styled.span`
//   color: #757575;
// `;
