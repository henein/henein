'use client';

import { writeComment } from '@/actions/comment-action';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type CommentFormData = {
  postId: bigint;
  content: string;
};

export interface CommentFormProps {
  postId: bigint;
  className?: string;
}

export const CommentForm = (props: CommentFormProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, register, watch, setValue } =
    useForm<CommentFormData>();

  const onSubmit = async (data: CommentFormData) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const { data: commentData, error } = await writeComment({
      postId: props.postId,
      content: data.content,
    });

    if (error) {
      alert(error.message);
    } else {
      setValue('content', '');
      router.refresh();
    }

    setIsSubmitting(false);
  };

  return (
    <form
      className={classNames(
        'inset-ring inset-ring-default dark:bg-grey-900 flex flex-col rounded-lg px-4 pb-2 pt-3',
        props.className,
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="placeholder-black-500 dark:placeholder-white-600 text-sm font-normal outline-none"
        placeholder="댓글 쓰기"
        {...register('content')}
      />
      <div
        className={classNames(
          'flex items-end justify-end transition-all',
          watch('content')
            ? 'h-[1.875rem] opacity-100'
            : 'pointer-events-none h-1 opacity-0',
        )}
      >
        <button
          type="button"
          className="text-secondary hover:text-secondary-hover active:text-secondary-active h-fit cursor-pointer px-2 py-1 text-xs font-medium transition-colors"
          onClick={() => setValue('content', '')}
        >
          취소
        </button>
        <button className="text-link h-fit cursor-pointer px-2 py-1 text-xs font-medium">
          작성하기
        </button>
      </div>
    </form>
  );
};
