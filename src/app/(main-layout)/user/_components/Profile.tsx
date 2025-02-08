import { Button } from '@/components';
import Image from 'next/image';
import React from 'react';

const Profile = () => {
  const dummy = {
    userName: '동균',
    userEmail: 'email@gmail.com',
    imageUrl: '',
    signUpDate: '2025-02-05',
    uid: 'abcd',
  };
  const { userName, imageUrl, signUpDate } = dummy;

  return (
    <div className="flex h-[148px] w-full items-center justify-between gap-8 p-5">
      <div className="flex items-center gap-8">
        <Image
          src={imageUrl || '/images/mamudae/profile/namjio.png'}
          width={100}
          height={100}
          alt="profile"
          className="rounded-full"
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-gray-500">
            {`가입일 ${signUpDate}`}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
        </div>
      </div>
      <Button sort="secondary">수정하기</Button>
    </div>
  );
};

export default Profile;
