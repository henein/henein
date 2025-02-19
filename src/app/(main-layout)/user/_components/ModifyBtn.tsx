'use client';

import { Button } from '@/components';
import ClientPortal from '@/components/ClientPortal';
import { useProfileHandler } from '@/hooks/useProfileHandler';
import { useProfile } from '@/store/query/user';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  image: string | null;
  nickname: string;
  uid: string;
}

const ModifyBtn = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Button sort={'primary'} onClick={() => setShowModal(true)}>
        수정하기
      </Button>

      <ClientPortal show={showModal} onClose={() => setShowModal(false)}>
        <ProfileModifyModal {...props} onClose={() => setShowModal(false)} />
      </ClientPortal>
    </>
  );
};

export default ModifyBtn;

const ProfileModifyModal = (props: Props & { onClose: () => void }) => {
  const { image, nickname, onClose, uid } = props;
  const { userForm, previewUrl, isDisabled, setNickname, handleImageUpload } =
    useProfileHandler();

  const { updateProfileMutation } = useProfile(uid);

  return (
    <div className="dark:bg-grey-800 bg-white-900 flex w-[380px] flex-col rounded-lg shadow-lg">
      <div className="flex flex-col gap-6 px-6 py-5">
        <h1 className="text-grey-900 dark:text-grey-200 text-xl font-bold">
          프로필 수정
        </h1>
        <div className="relative flex justify-center">
          <Image
            className="border-grey-300 bg-grey-200 dark:border-grey-700 h-32 w-32 rounded-full border"
            src={previewUrl || image || '/images/dark-defaultImg.svg'}
            width={128}
            height={128}
            alt="Profile"
          />
          <input
            id="input-file"
            type="file"
            className="hidden"
            onInput={handleImageUpload}
          />
          <label
            htmlFor="input-file"
            className="absolute h-32 w-32 cursor-pointer rounded-full"
          />
        </div>
        <input
          className="border-grey-300 bg-grey-800 text-grey-900 placeholder-grey-500 dark:border-grey-600 dark:bg-grey-900 dark:text-grey-200 w-full rounded-md border px-4 py-3 outline-0"
          placeholder={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div className="bg-grey-700a flex justify-end gap-2 rounded-b-lg px-4 py-6">
        <Button sort="secondary" onClick={onClose}>
          취소
        </Button>
        <Button
          sort="primary"
          onClick={() => {
            updateProfileMutation.mutate(userForm);
            onClose();
          }}
          disabled={isDisabled}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};
