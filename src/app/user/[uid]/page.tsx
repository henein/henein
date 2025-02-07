import Contents from '../_components/Contents';
import ContentsNavigator from '../_components/ContentsNavigator';
import Pagenate from '../_components/Pagenate';
import Profile from '../_components/Profile';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import React, { use } from 'react';

interface Props {
  params: Promise<{ uid: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Userpage = ({ params, searchParams }: Props) => {
  const { uid } = use(params);
  const { type } = use(searchParams);
  const data = use(fetchUser(uid));
  console.log(data);

  return (
    <div className="m-[0_auto] flex w-full max-w-[1024px] flex-col">
      <h2 className="mb-6 mt-6 text-left text-3xl font-bold">유저 페이지</h2>
      <Profile />
      <ContentsNavigator type={type || 'post'} />
      <Contents type={type || 'post'} />
      <Pagenate />
    </div>
  );
};

export default Userpage;

const fetchUser = async (uid: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', uid);

  if (error) {
    // 해당되는 데이터를 못찾았다면, 404로 리다이렉트
    if (error.code === '22P02') return notFound();
    // 이외의 에러라면 throw Error
    throw new Error(error.message);
  }

  return data;
};
