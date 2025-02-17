'use client';

import { useCharacterBgColor } from '@/hooks/useCharacterBgColor';
import { useCharacterDetail } from '@/store/query/character';
import { characters as Character } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const CharacterBox = (props: Character & { uid: string }) => {
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
    ocid,
    class: characterClass,
  } = props;

  const { imageRandomColor } = useCharacterBgColor(image);
  const { mutation } = useCharacterDetail(props.uid, ocid);

  return (
    <div className="relative">
      {/* 단일 캐릭터 새로고침 버튼 */}
      <button
        className="hover:bg-grey-700a absolute right-2 top-2 z-50 cursor-pointer rounded-2xl"
        onClick={() => {
          mutation.mutate();
        }}
      >
        <Image
          src={'/images/refresh.svg'}
          alt="refresh-button"
          width={20}
          height={20}
        />
      </button>

      {/* 캐릭터 박스 */}
      <button
        className={`hover:shadow-char group relative flex h-[168px] w-[144px] flex-col rounded-2xl hover:cursor-pointer disabled:cursor-not-allowed`}
        onClick={() => {
          console.log('대표 캐릭터 설정');
        }}
        disabled={!image && !stat}
      >
        {/* 캐릭터 이미지 */}
        <div
          className={`h-30 border-grey-800a relative flex w-full items-center justify-center rounded-2xl border border-b-0 py-7 group-disabled:pointer-events-none group-disabled:hover:shadow-none group-disabled:active:shadow-none`}
          style={{ backgroundColor: imageRandomColor.light }}
        >
          {image ? (
            <Image
              src={image}
              className={`relative -top-1`}
              width={90}
              height={90}
              alt="character-image"
            />
          ) : (
            <Image
              src={'/images/default-character-img.png'}
              className={`relative top-1 opacity-60`}
              width={144}
              height={100}
              alt="character-image"
            />
          )}
        </div>

        {/* 캐릭터 정보 */}
        <div
          className={`border-grey-800a bg-white-900 dark:bg-grey-900 hover:border-brand active:border-brand-active group-disabled:hover:border-grey-800a group-disabled:active:border-grey-800a relative -top-[27px] flex w-full flex-col items-center justify-center gap-1 rounded-2xl border py-5`}
        >
          <span className="text-grey-100 text-sm">{name}</span>
          <span className="text-grey-500 text-[10px]">{`${characterClass} / Lv.${level}`}</span>
        </div>
      </button>
    </div>
  );
};

export default CharacterBox;
