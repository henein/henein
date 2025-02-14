import CharacterBox from './CharacterBox';
import CharacterSortSelector from './CharacterSortSelector';
import TokenForm from './TokenForm';
import { PrismaClient } from '@prisma/client';
import React, { use } from 'react';

interface Props {
  uid: string;
}
const CharacterContents = ({ uid }: Props) => {
  const characters = use(fetchCharacter(uid));

  if (!characters) return;

  if (characters.length === 0) {
    return (
      <div className="my-6 flex h-full w-full flex-col justify-between">
        <h3 className="text-black-900 dark:text-white-900 flex h-full w-full items-center justify-center text-center text-xl font-bold">
          인증된 캐릭터가 없습니다.
          <br />
          하단의 캐릭터 동기화 버튼을 이용하여 캐릭터를 불러와주세요.
        </h3>
        <TokenForm uid={uid} />
      </div>
    );
  }

  return (
    <>
      <div className="my-6 flex w-full flex-col gap-5">
        {/* 제목 */}
        <h3 className="text-black-900 dark:text-white-900 text-xl font-bold">
          인증 캐릭터
        </h3>

        {/* 캐릭터 정렬 버튼 */}
        <CharacterSortSelector />

        {/* 캐릭터 */}
        <div className="gap-x-13 mx-auto flex w-[928px] flex-wrap justify-start gap-y-6">
          {characters.map((character) => (
            <CharacterBox key={character.id} {...character} />
          ))}
        </div>
      </div>
      <TokenForm uid={uid} />
    </>
  );
};

export default CharacterContents;

const fetchCharacter = async (uid: string) => {
  try {
    const prisma = new PrismaClient();
    const data = await prisma.characters.findMany({ where: { user_id: uid } });
    return data;
  } catch (error) {
    if (error instanceof Error)
      throw new Error('데이터를 불러오는 중 오류가 발생하였습니다.');
  }
};
