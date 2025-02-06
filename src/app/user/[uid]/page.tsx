import Contents from '../_components/Contents';
import ContentsNavigator from '../_components/ContentsNavigator';
import Pagenate from '../_components/Pagenate';
import Profile from '../_components/Profile';
import React, { use } from 'react';

interface Props {
  params: Promise<{ uid: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Userpage = ({ params, searchParams }: Props) => {
  const { uid } = use(params);
  const { type } = use(searchParams);

  console.log(uid);
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
