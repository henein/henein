'use client';

import useRecordSelect from '@/store/zustand/useRecordSelect';
import { characters as Characters, profiles as Profiles } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface Props {
  id: string;
  profiles: Profiles;
  character: Characters | null;
}

const StreamerBtn = (props: Props) => {
  const { state, select } = useRecordSelect();
  const isSelect = state.id === props.id;

  const handleSelect = () =>
    select({ id: props.id, character_id: props.character?.id || null });

  return (
    <button
      className={`hover:border-brand-hover h-14 w-14 rounded-full border-4 hover:cursor-pointer active:scale-90 ${clsx(isSelect ? 'border-brand-active' : 'border-transparent')}`}
      onClick={handleSelect}
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
