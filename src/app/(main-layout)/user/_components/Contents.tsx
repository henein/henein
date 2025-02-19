import Pagenation from './Pagenation';
import PostList from './PostList';
import CharacterContents from './character';
import { fetchPostsFromType } from '@/actions/user-posts-fetch';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  uid: string;
  type: string;
  page: number;
  isMyProfile: boolean;
}

const Contents = async ({ uid, type, isMyProfile, page }: Props) => {
  const posts = await fetchPostsFromType(uid, type);

  if (type === 'character' && isMyProfile) {
    return <CharacterContents uid={uid} />;
  }

  if (type === 'post' || type === 'comment')
    return (
      <div className="flex h-full w-full flex-col justify-between">
        <PostList posts={posts} type={type} />
        <Pagenation uid={uid} page={page} totalElement={posts.length} />
      </div>
    );

  return notFound();
};

export default Contents;
