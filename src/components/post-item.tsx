import { PostIcons } from './post-icons';
import { fetchCounts } from '@/actions/post-action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  category: string;
  categoryId: string;
  id: bigint;
  title: string;
  text: string;
  author: string;
  authorImageUrl?: string;
  createTime: string;
}

const PostItem = async (props: Props) => {
  const { category, id, title, text, author, createTime } = props;
  const counts = await fetchCounts(id.toString());

  return (
    <Link
      className="flex w-full flex-col gap-6 bg-gray-100 px-6 py-5 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
      href={`/post/${id}`}
    >
      {/* 게시판 정보 */}
      <div className="flex h-16 justify-between">
        <div className="flex w-full flex-col justify-between">
          <span className="text-xs font-normal text-gray-500">{category}</span>
          <h2 className="truncate text-ellipsis font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="truncate text-ellipsis text-sm font-normal">
            {text || '...'}
          </p>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex h-5 items-center">
          {props.authorImageUrl && (
            <Image
              className="border-default relative -left-1 mr-0.5 aspect-square rounded-full border"
              src={props.authorImageUrl}
              alt="프로필"
              width={24}
              height={24}
            />
          )}
          <span>{author}</span>
          <span className="ml-1 text-gray-400">· {createTime}</span>
        </div>
        <PostIcons counts={counts} />
      </div>
    </Link>
  );
};

export default PostItem;
