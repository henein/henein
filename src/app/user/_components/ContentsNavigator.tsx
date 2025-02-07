import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface Props {
  type: string | string[] | undefined;
}

const ContentsNavigator = ({ type }: Props) => {
  const buttons = [
    { label: '게시글', value: 'post', count: 1 },
    { label: '댓글', value: 'comment', count: 2 },
    { label: '캐릭터', value: 'character', count: 0 },
  ];

  return (
    <div className="border-b-grey-50 flex w-full border-b-[0.5px] p-[0px_8px]">
      {buttons.map((item) => (
        <Link key={item.value} href={`/mypage?type=${item.value}`}>
          <button
            className={clsx(
              'hover:bg-black-100 px-6 py-5 text-base transition-colors hover:cursor-pointer',
              type === item.value
                ? 'border-b-2 border-blue-500 font-bold text-gray-900'
                : 'font-normal text-gray-500',
            )}
          >
            <span>{`${item.label} ${item.count}`}</span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ContentsNavigator;
