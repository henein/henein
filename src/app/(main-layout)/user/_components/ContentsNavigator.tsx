import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface Props {
  uid: string;
  type: string | string[] | undefined;
  isMyProfile: boolean;
}

const ContentsNavigator = ({ uid, type, isMyProfile }: Props) => {
  const buttons = [
    { label: '게시글', value: 'post', count: 1 },
    { label: '댓글', value: 'comment', count: 2 },
    { label: '캐릭터', value: 'character', count: 0 },
  ];

  return (
    <div className="border-b-grey-600 flex w-full border-b-[0.5px]">
      {buttons.map((item) => {
        if (item.value === 'character' && !isMyProfile) return;
        return (
          <Link key={item.value} href={`/user/${uid}/${item.value}`}>
            <button
              className={clsx(
                'hover:bg-black-100 border-b-black-25 border-b-2 px-6 py-5 text-base transition-colors hover:cursor-pointer',
                type === item.value
                  ? 'border-b-brand font-bold text-gray-900'
                  : 'font-normal text-gray-500',
              )}
            >
              <span>{item.label}</span>
              <span
                className={clsx(
                  'ml-1.5',
                  type === item.value
                    ? 'text-brand font-bold text-gray-900'
                    : 'font-normal',
                )}
              >
                {item.count}
              </span>
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default ContentsNavigator;
