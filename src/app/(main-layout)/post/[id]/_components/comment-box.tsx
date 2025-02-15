'use client';

import { CardHeader } from '@/components/card-header';
import classNames from 'classnames';
import { useState } from 'react';

export interface CommentBoxProps {}

export const CommentBox = (props: CommentBoxProps) => {
  const [showAction, setShowAction] = useState(false);

  return (
    <CardHeader className="flex flex-col gap-4 rounded-2xl px-6 py-5">
      <div className="font-bold">댓글 10개</div>
      <form className="inset-ring inset-ring-default dark:bg-grey-900 flex flex-col rounded-lg px-4 pb-2 pt-3">
        <input
          className="placeholder-black-500 dark:placeholder-white-600 text-sm font-normal outline-none"
          placeholder="댓글 쓰기"
          onChange={(event) => setShowAction(event.target.value.length > 0)}
        />
        <div
          className={classNames(
            'flex items-end justify-end transition-all',
            showAction
              ? 'h-[1.875rem] opacity-100'
              : 'pointer-events-none h-1 opacity-0',
          )}
        >
          <button
            type="button"
            className="text-secondary hover:text-secondary-hover active:text-secondary-active h-fit cursor-pointer px-2 py-1 text-xs font-medium transition-colors"
          >
            취소
          </button>
          <button className="text-link h-fit cursor-pointer px-2 py-1 text-xs font-medium">
            작성하기
          </button>
        </div>
      </form>
    </CardHeader>
  );
};
