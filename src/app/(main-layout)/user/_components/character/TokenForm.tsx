'use client';

import NexonApiProcessModal from '../nexon-api-process';
import { Button } from '@/components';
import ClientPortal from '@/components/ClientPortal';
import { useCharacterSignatureList } from '@/store/query/character';
import { useProfile } from '@/store/query/user';
import React, { useState } from 'react';

interface Props {
  uid: string;
}
const TokenForm = ({ uid }: Props) => {
  const { query } = useProfile(uid);
  const { mutation } = useCharacterSignatureList(uid);
  const [apiKey, setApiKey] = useState(query.data.profile.nexon_key || '');
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="hover:bg-grey-600 text-grey-700 bg-grey-200 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        ?
      </button>

      <ClientPortal show={showModal} onClose={() => setShowModal(false)}>
        <NexonApiProcessModal onClose={() => setShowModal(false)} />
      </ClientPortal>

      <form className="flex gap-2">
        <input
          type="text"
          placeholder="토큰"
          className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
          name="token"
          defaultValue={query.data.profile.nexon_key || ''}
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
