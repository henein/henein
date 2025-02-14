import Profile from '../_components/Profile';
import { notFound } from 'next/navigation';
import React, { ReactNode, use } from 'react';

interface Props {
  params: Promise<{ uid: string; type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  children: ReactNode;
}

const UserLayout = ({ params, children }: Props) => {
  const { uid } = use(params);
  const { profile } = use(fetchUser(uid));

  if (!profile) {
    notFound();
  }

  return (
    <div className="m-[0_auto] flex w-full max-w-[1024px] flex-col">
      <h2 className="mb-6 mt-6 text-left text-3xl font-bold">유저 프로필</h2>
      <Profile {...profile} />
      {children}
    </div>
  );
};

export default UserLayout;

const fetchUser = async (uid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${uid}`,
    { cache: 'no-store' },
  );

  return res.json();
};
