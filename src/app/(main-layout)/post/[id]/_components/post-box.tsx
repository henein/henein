import { PostHeader } from './post-header';
import { editorStyles } from '@/utils/tiptap';
import classNames from 'classnames';
import React from 'react';

export interface PostBoxProps {
  title: string;
  author: string;
  views: number;
  createdAt: string;
  content: string;
}

export const PostBox = (props: PostBoxProps) => {
  return (
    <div className="flex flex-col rounded-2xl">
      <div className="min-h-[calc(100% + 21px)] flex flex-col">
        <PostHeader
          title={props.title}
          author={props.author}
          views={props.views}
          createdAt={props.createdAt}
        />
        <div
          className={classNames('mt-5 px-6', editorStyles)}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
        <div className="mx-auto my-5 flex w-full flex-col items-center">
          {/* <LikeIcon boardId={boardId} recommended={recommended} /> */}
          {/* <RecommendNum>{recommend}</RecommendNum> */}
        </div>
      </div>
    </div>
  );
};

// const RecommendNum = styled.span`
//   color: #757575;
// `;
