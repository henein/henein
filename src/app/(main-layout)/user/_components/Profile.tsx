'use client';

import ModifyBtn from './ModifyBtn';
import { useProfile } from '@/store/query/user';
import { formatToHyphenDate } from '@/utils/date/formattedDate';
import { profiles as ProfileType } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const Profile = ({
  uid,
  isMyProfile,
}: {
  uid: string;
  isMyProfile: boolean;
}) => {
  const { query } = useProfile(uid);
  const { profile_img, created_at, nickname } = query.data
    .profile as ProfileType;

  return (
    <div className="flex h-[148px] w-full items-center justify-between gap-8 p-5">
      <div className="flex items-center gap-8">
        <Image
          src={profile_img || '/images/dark-defaultImg.svg'}
          width={100}
          height={100}
          alt="profile"
          className="border-grey-700 h-[100px] w-[100px] rounded-full border"
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-gray-500">
            {`가입일 ${formatToHyphenDate(new Date(created_at).toISOString())}`}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{nickname}</h1>
        </div>
      </div>
      {isMyProfile && (
        <ModifyBtn image={profile_img} nickname={nickname} uid={uid} />
      )}
    </div>
  );
};

export default Profile;
