import Profile from '../_components/Profile';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import React, { ReactNode, use } from 'react';

interface Props {
  params: Promise<{ uid: string; type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  children: ReactNode;
}

const UserLayout = ({ params, children }: Props) => {
  const { uid } = use(params);
  const data = use(fetchUser(uid));

  return (
    <div className="m-[0_auto] flex w-full max-w-[1024px] flex-col">
      <h2 className="mb-6 mt-6 text-left text-3xl font-bold">유저 프로필</h2>
      <Profile {...data} />
      {children}
    </div>
  );
};

export default UserLayout;

const fetchUser = async (uid: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', uid)
    .single();

  if (error) {
    // 해당되는 데이터를 못찾았다면, 404로 리다이렉트
    if (error.code === '22P02') return notFound();
    // 이외의 에러라면 throw Error
    throw new Error(error.message);
  }

  return data;
};
