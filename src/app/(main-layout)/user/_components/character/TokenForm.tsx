'use client';

import { Button } from '@/components';
import { useCharacterSignatureList } from '@/store/query/character';
import React, { useState } from 'react';

interface Props {
  uid: string;
}
const TokenForm = ({ uid }: Props) => {
  const [apiKey, setApiKey] = useState('');

  const { query, mutation } = useCharacterSignatureList(uid);

  return (
    <div className="mt-6 flex items-center justify-end gap-2">
      <button className="hover:bg-grey-600 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-gray-700 hover:cursor-pointer">
        ?
      </button>
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="토큰"
          className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
          onChange={(e) => setApiKey(e.target.value)}
          name="token"
        />
        <Button
          sort="primary"
          type={'button'}
          onClick={(e: Event) => {
            e.preventDefault();
            if (!apiKey) return alert('API KEY를 입력해주세요.');
            mutation.mutate(apiKey);
          }}
        >
          <span>전체 캐릭터 동기화</span>
        </Button>
      </form>
    </div>
  );
};

export default TokenForm;
