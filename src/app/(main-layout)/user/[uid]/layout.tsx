import Profile from '../_components/Profile';
import { PrismaClient } from '@prisma/client';
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

  if (!data) {
    notFound();
  }

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
  const prisma = new PrismaClient();

  try {
    const user = await prisma.profiles.findFirst({
      where: {
        id: uid,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ', error.stack);
    }
    notFound();
  }
};
