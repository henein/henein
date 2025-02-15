'use client';

import CharacterBox from './CharacterBox';
import { useCharacterSignatureList } from '@/store/query/character';
import { characters as Characters } from '@prisma/client';
import React from 'react';

const CharacterList = ({ uid }: { uid: string }) => {
  const { query } = useCharacterSignatureList(uid);

  console.log(query.data);

  if (query.data.characters.length === 0) {
    return (
      <div className="my-6 flex h-full w-full flex-col justify-between">
        <h3 className="text-black-900 dark:text-white-900 flex h-full w-full items-center justify-center text-center text-xl font-bold">
          인증된 캐릭터가 없습니다.
          <br />
          하단의 캐릭터 동기화 버튼을 이용하여 캐릭터를 불러와주세요.
        </h3>
      </div>
    );
  }

  return (
    <div className="gap-x-13 mx-auto flex w-[928px] flex-wrap justify-start gap-y-6">
      {query.data.characters.map((character: Characters) => (
        <CharacterBox key={character.id} {...character} />
      ))}
    </div>
  );
};

export default CharacterList;
