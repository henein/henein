import { PostIcons } from './post-icons';
import Link from 'next/link';
import React from 'react';

interface Props {
  category: string;
  categoryId: string;
  id: bigint;
  title: string;
  text: string;
  userName: string;
  createTime: string;
  views: number;
  commentNum: number;
  recommendNum: number;
}

const PostItem = (props: Props) => {
  const {
    category,
    categoryId,
    id,
    title,
    text,
    userName,
    createTime,
    views,
    commentNum,
    recommendNum,
  } = props;

  return (
    <Link
      className="flex w-full flex-col gap-6 bg-gray-100 px-6 py-5 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
      href={`/post/${id}`}
    >
      {/* 게시판 정보 */}
      <div className="flex h-16 justify-between">
        <div className="flex flex-col justify-between">
          <span className="text-xs font-normal text-gray-500">{category}</span>
          <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="truncate text-sm font-normal">{text || '...'}</p>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center">
          <span>{userName}</span>
          <span className="ml-1 text-gray-400">· {createTime}</span>
        </div>
        <PostIcons views={views} />
      </div>
    </Link>
  );
};

export default PostItem;
