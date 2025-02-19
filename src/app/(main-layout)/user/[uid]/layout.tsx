import Profile from '../_components/Profile';
import { prefetchUserProfile } from '@/store/query/user';
import { fetchProfile } from '@/store/query/user/queries';
import { createClient } from '@/utils/supabase/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React, { ReactNode, use } from 'react';

// https://github.com/vercel/next.js/discussions/58275#discussioncomment-7603648

interface Props {
  children?: ReactNode;
}

interface PropsExtended {
  children?: ReactNode;
  params: Promise<{ uid: string; type: string }>;
}

const UserLayout = (props: Props | PropsExtended) => {
  const { children, params } = props as PropsExtended;

  const { uid } = use(params);
  const { profile } = use(fetchProfile(uid));
  const { queryClient } = use(prefetchUserProfile(uid));
  const supabase = use(createClient());
  const { data } = use(supabase.auth.getUser());

  if (!profile) {
    notFound();
  }

  return (
    <div className="m-[0_auto] flex w-full max-w-[1024px] flex-col">
      <h2 className="mb-6 mt-6 text-left text-3xl font-bold">유저 프로필</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Profile uid={uid} isMyProfile={data.user?.id === uid} />
        {children}
      </HydrationBoundary>
    </div>
  );
};

export default UserLayout;
