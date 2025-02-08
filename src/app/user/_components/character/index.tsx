import CharacterSortSelector from './CharacterSortSelector';
import TokenForm from './TokenForm';
import { createClient } from '@/utils/supabase/server';
import React, { use } from 'react';

interface Props {
  uid: string;
}
const CharacterContents = ({ uid }: Props) => {
  const data = use(fetchCharacter(uid));

  if (data.length) {
    return (
      <div className="mt-6 flex w-full flex-col gap-3">
        <div>
          <h3 className="text-black-900 dark:text-white-900 text-xl font-bold">
            인증 캐릭터
          </h3>
          <CharacterSortSelector />
        </div>
        <TokenForm />
      </div>
    );
  }

  return (
    <div className="mt-6 flex h-full w-full flex-col justify-between">
      <h3 className="text-black-900 dark:text-white-900 flex h-full w-full items-center justify-center text-center text-xl font-bold">
        인증된 캐릭터가 없습니다.
        <br />
        하단의 캐릭터 동기화 버튼을 이용하여 캐릭터를 불러와주세요.
      </h3>
      <TokenForm />
    </div>
  );
};

export default CharacterContents;

const fetchCharacter = async (uid: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', uid);

  if (error) throw new Error(error.message);

  return data;
};
