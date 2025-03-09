'use client';

import useRecordSelect from '@/store/zustand/useRecordSelect';
import { profiles as Profile, streamer as Streamer } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const StreamerBtn = (
  props: Streamer & { profiles: Profile; borderColor: string },
) => {
  const { state, select, unselect } = useRecordSelect();
  const isSelect = state.find((item) => item.nickname === props.nickname);

  const handleClick = () => {
    if (isSelect) return unselect(props.id);
    return select(props);
  };

  return (
    <button
      className={`hover:ring-white-25 active:ring-white-50 h-14 w-14 rounded-full border-4 transition-all hover:cursor-pointer hover:border-4 hover:ring-8 active:border-4 active:ring-6`}
      onClick={handleClick}
      style={isSelect && { borderColor: props.borderColor }}
    >
      <Image
        src={props.profiles.profile_img || '/images/dark-defaultImg.svg'}
        alt="streamer"
        width={48}
        height={48}
        className={`aspect-square rounded-full ${clsx(!isSelect && 'brightness-50')}`}
      />
    </button>
  );
};

export default StreamerBtn;
