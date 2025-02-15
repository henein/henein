'use client';

import { useCharacterBgColor } from '@/hooks/useCharacterBgColor';
import { characters as Character } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const CharacterBox = (props: Character) => {
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

  const { imageRandomColor } = useCharacterBgColor(image);

  return (
    <div className={`relative flex h-[168px] w-[144px] flex-col rounded-xl`}>
      {/* 캐릭터 이미지 */}
      <div
        className={`h-30 relative flex w-full items-center justify-center rounded-2xl border border-b-0 ${imageRandomColor.light} dark:${imageRandomColor.dark}`}
      >
        <Image
          src={image || '/images/default-character-img.png'}
          className="relative top-1 h-[130px] opacity-60"
          width={142}
          height={130}
          alt="character-image"
        />
      </div>
      {/* 캐릭터 정보 */}
      <button
        className="bg-white-900 dark:bg-grey-900 relative -top-[27px] flex flex-col items-center justify-center gap-1 rounded-2xl border py-5"
        disabled
      >
        <span className="text-sm text-gray-700">{name}</span>
        <span className="text-[10px] text-gray-500">
          {`${characterClass} / Lv.${level}`}
        </span>
      </button>
    </div>
  );
};

export default CharacterBox;
