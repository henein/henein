import Profile from '../_components/Profile';
import { prefetchUserProfile } from '@/store/query/user';
import { fetchProfile } from '@/store/query/user/queries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React, { ReactNode, use } from 'react';

interface Props {
  params: Promise<{ uid: string; type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  children: ReactNode;
}

const UserLayout = ({ params, children }: Props) => {
  const { uid } = use(params);
  const { profile } = use(fetchProfile(uid));
  const { queryClient } = use(prefetchUserProfile(uid));

  if (!profile) {
    notFound();
  }

  return (
    <div className="m-[0_auto] flex w-full max-w-[1024px] flex-col">
      <h2 className="mb-6 mt-6 text-left text-3xl font-bold">유저 프로필</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Profile uid={uid} />
        {children}
      </HydrationBoundary>
    </div>
  );
};

export default UserLayout;
