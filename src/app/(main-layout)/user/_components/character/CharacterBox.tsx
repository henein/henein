'use client';

import { useCharacterBgColor } from '@/hooks/useCharacterBgColor';
import { characters } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const CharacterBox = (props: characters) => {
  const {
    id,
    created_at,
    updated_at,
    name,
    world,
    level,
    exp,
    exp_rate,
    stat,
    user_id,
    image,
    class: characterClass,
  } = props;

  const { imageRandomColor } = useCharacterBgColor(image ?? '');

  return (
    <div
      className={`flex h-44 w-36 flex-col rounded-xl ${imageRandomColor.light} dark:${imageRandomColor.dark}`}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-lg border p-5`}
      >
        <div className="flex gap-1">
          <span className="text-sm text-gray-700">{name}</span>
        </div>
        <div className="text-xs text-gray-500">
          {`${characterClass} / Lv.${level}`}
        </div>
      </div>
      <div className="h-30 relative flex w-full items-center justify-center rounded-xl border">
        <Image
          src={image ?? ''}
          className="absolute left-[-15px] top-[-47px]"
          width={180}
          height={180}
          alt="character-image"
        />
      </div>
    </div>
  );
};

export default CharacterBox;
