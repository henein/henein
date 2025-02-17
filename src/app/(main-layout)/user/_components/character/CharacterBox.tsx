'use client';

import { useCharacterBgColor } from '@/hooks/useCharacterBgColor';
import { useCharacterDetail } from '@/store/query/character';
import { useProfile } from '@/store/query/user';
import { characters as Character } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const CharacterBox = (props: Character & { uid: string }) => {
  const {
    id: char_id,
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
    uid,
    class: characterClass,
  } = props;

  const { imageRandomColor } = useCharacterBgColor(image);
  const { mutation } = useCharacterDetail(uid, ocid);
  const { query, representMutation } = useProfile(uid);

  const isRepresent = query.data.profile.master_character === char_id;

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
          representMutation.mutate(char_id);
        }}
        disabled={!image && !stat}
      >
        {/* 캐릭터 이미지 */}
        <div
          className={`h-30 group-disabled:hover:* group-disabled:active:* group-hover:border-brand-hover group-active:border-brand-active group-disabled:border-grey-800a relative flex w-full items-center justify-center rounded-2xl border border-b-0 py-7 group-disabled:pointer-events-none ${clsx(isRepresent ? 'border-brand' : 'border-grey-800a')}`}
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
          className={`${clsx(isRepresent ? 'border-brand' : 'border-grey-800a')} bg-white-900 group-hover:border-brand-hover group-active:border-brand-active dark:bg-grey-900 group-disabled:border-grey-800a relative -top-[27px] flex w-full flex-col items-center justify-center gap-1 rounded-2xl border py-5`}
        >
          <div className="text-grey-100 flex h-4 items-center gap-1 text-sm">
            {isRepresent && (
              <div className="bg-brand rounded-xl px-1.5 py-0.5 text-[10px] font-semibold">
                대표
              </div>
            )}
            <span>{name}</span>
          </div>
          <span className="text-grey-500 text-[10px]">{`${characterClass} / Lv.${level}`}</span>
        </div>
      </button>
    </div>
  );
};

export default CharacterBox;
