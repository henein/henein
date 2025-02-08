import Contents from '../../_components/Contents';
import ContentsNavigator from '../../_components/ContentsNavigator';
import React, { use } from 'react';

interface Props {
  params: Promise<{ uid: string; type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Userpage = ({ params, searchParams }: Props) => {
  const { uid, type } = use(params);
  const { page } = use(searchParams);

  console.log(uid, type, page);

  return (
    <>
      <ContentsNavigator uid={uid} type={type} />
      <Contents type={type} page={page} />
    </>
  );
};

export default Userpage;
