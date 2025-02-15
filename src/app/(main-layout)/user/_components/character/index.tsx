import CharacterBox from './CharacterBox';
import CharacterList from './CharacterList';
import CharacterSortSelector from './CharacterSortSelector';
import TokenForm from './TokenForm';
import { prefetchUserCharacterList } from '@/store/query/character';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { use } from 'react';

interface Props {
  uid: string;
}
const CharacterContents = ({ uid }: Props) => {
  const { queryClient } = use(prefetchUserCharacterList(uid));

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
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CharacterList uid={uid} />
        </HydrationBoundary>
      </div>
      <TokenForm uid={uid} />
    </>
  );
};

export default CharacterContents;
