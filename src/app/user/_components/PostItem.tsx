import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  boardType: string;
  id: number;
  title: string;
  text: string;
  fileUrl: string;
  userName: string;
  createTime: string;
  views: number;
  commentNum: number;
  recommendNum: number;
}
const PostItem = (props: Props) => {
  const {
    boardType,
    id,
    title,
    text,
    fileUrl,
    userName,
    createTime,
    views,
    commentNum,
    recommendNum,
  } = props;

  return (
    <div className="flex w-full flex-col gap-6 bg-gray-100 p-5 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
      {/* 게시판 정보 */}
      <div className="flex h-16 justify-between">
        <div className="flex flex-col justify-between">
          <Link href={`/board/${boardType}`}>
            <span className="text-xs font-normal text-gray-500">
              {boardType}
            </span>
          </Link>
          <Link href={`/board/${boardType}/${id}`}>
            <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          </Link>
          <p className="truncate text-sm font-normal">{text || '...'}</p>
        </div>
        {fileUrl && (
          <Image
            src={fileUrl}
            alt=""
            width={64}
            height={64}
            className="ml-2 h-16 w-16 rounded-md bg-black"
          />
        )}
      </div>

      {/* 사용자 정보 */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center">
          <span>{userName}</span>
          <span className="ml-1 text-gray-400">· {createTime}</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Image
              src={'/images/henein/visibility.svg'}
              width={24}
              height={24}
              alt=""
            />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Image
              src={'/images/henein/comment.svg'}
              width={24}
              height={24}
              alt=""
            />
            <span>{commentNum}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Image
              src={'/images/henein/favoriteOutline.svg'}
              width={24}
              height={24}
              alt=""
            />
            <span>{recommendNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
