import ModifyBtn from './ModifyBtn';
import { formatToHyphenDate } from '@/utils/date/formattedDate';
import { createClient } from '@/utils/supabase/server';
import { profiles as Profiles } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const Profile = async (props: Profiles) => {
  const { id, created_at, nickname, profile_img } = props;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex h-[148px] w-full items-center justify-between gap-8 p-5">
      <div className="flex items-center gap-8">
        <Image
          src={profile_img || '/images/dark-defaultImg.svg'}
          width={100}
          height={100}
          alt="profile"
          className="border-grey-700 rounded-full border"
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-gray-500">
            {`가입일 ${formatToHyphenDate(new Date(created_at).toISOString())}`}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{nickname}</h1>
        </div>
      </div>
      {id === user?.id && <ModifyBtn />}
    </div>
  );
};

export default Profile;
