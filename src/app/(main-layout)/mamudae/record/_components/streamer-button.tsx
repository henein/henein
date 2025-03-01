'use client';

import useRecordSelect from '@/store/zustand/useRecordSelect';
import { profiles as Profile, streamer as Streamer } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const StreamerBtn = (props: Streamer & { profiles: Profile }) => {
  const { state, select, unselect } = useRecordSelect();
  const isSelect = state.find((item) => item.nickname === props.nickname);

  const handleClick = () => {
    if (isSelect) return unselect(props.id);
    return select(props);
  };

  return (
    <button
      className={`hover:border-brand-hover h-14 w-14 rounded-full border-4 hover:cursor-pointer active:scale-90 ${clsx(isSelect ? 'border-brand-active' : 'border-transparent')}`}
      onClick={handleClick}
    >
      <Image
        src={props.profiles.profile_img || '/images/dark-defaultImg.svg'}
        alt="streamer"
        width={48}
        height={48}
        className={`rounded-full ${clsx(!isSelect && 'brightness-50')}`}
      />
    </button>
  );
};

export default StreamerBtn;
