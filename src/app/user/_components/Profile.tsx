import ModifyBtn from './ModifyBtn';
import { formatToHyphenDate } from '@/utils/date/formattedDate';
import { Database } from '@/utils/supabase/database.types';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import React from 'react';

type User = Database['public']['Tables']['users']['Row'];

const Profile = async (props: User) => {
  const { id, created_at, nickname, profile_img } = props;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex h-[148px] w-full items-center justify-between gap-8 p-5">
      <div className="flex items-center gap-8">
        <Image
          src={profile_img || '/images/mamudae/profile/namjio.png'}
          width={100}
          height={100}
          alt="profile"
          className="rounded-full"
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-gray-500">
            {`가입일 ${formatToHyphenDate(created_at)}`}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{nickname}</h1>
        </div>
      </div>
      {id === user?.id && <ModifyBtn />}
    </div>
  );
};

export default Profile;
