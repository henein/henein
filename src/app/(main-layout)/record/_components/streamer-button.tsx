import { profiles as Profiles } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface Props {
  id: string;
  profiles: Profiles;
}

const StreamerBtn = (props: Props) => {
  return (
    <div
      className={`bg-white-900 hover:border-brand-hover h-12 w-12 rounded-full hover:cursor-pointer hover:border-4 ${clsx()}`}
    >
      <Image
        src={props.profiles.profile_img || ''}
        alt="streamer"
        width={48}
        height={48}
        className="rounded-full"
      />
    </div>
  );
};

export default StreamerBtn;
