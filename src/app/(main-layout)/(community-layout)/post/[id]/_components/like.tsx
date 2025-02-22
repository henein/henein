'use client';

import { patchLike } from '@/actions/like-action';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  postId: number;
  recommended: boolean;
}
const Like = (props: Props) => {
  const router = useRouter();
  const handleClick = async () => {
    const { error } = await patchLike(props.postId);

    if (error) {
      alert(error.message);
    }

    router.refresh();
  };

  return (
    <button
      className={`border-grey-500 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ${clsx(props.recommended ? 'bg-brand text-white' : 'text-brand bg-white')}`}
      onClick={handleClick}
    >
      {props.recommended ? (
        <div>
          <Image
            src={'/images/favorite.svg'}
            alt="favorite"
            width={24}
            height={24}
          />
        </div>
      ) : (
        <div>
          <Image
            src={'/images/non-favorite.svg'}
            alt="favorite"
            width={24}
            height={24}
          />
        </div>
      )}
    </button>
  );
};

export default Like;
