import Contents from '../../_components/Contents';
import ContentsNavigator from '../../_components/ContentsNavigator';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

interface Props {
  params: Promise<{ uid: string; type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Userpage = async ({ params, searchParams }: Props) => {
  const { uid, type } = await params;
  const { page } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <ContentsNavigator uid={uid} type={type} isMyProfile={user?.id === uid} />
      <Contents
        uid={uid}
        type={type}
        page={page}
        isMyProfile={user?.id === uid}
      />
    </>
  );
};

export default Userpage;
