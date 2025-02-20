import PostItem from '@/components/post-item';
import { getTimeDifference } from '@/utils/time';
import React from 'react';

const PostList = ({ posts, type }: { posts: any[]; type: string }) => {
  return (
    <div className="divide-default flex w-full flex-auto flex-col divide-y">
      {posts.length ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            category={post.categories.name}
            categoryId={post.categories.id}
            id={post.id}
            title={post.title}
            text={''}
            author={post.users.profiles?.nickname ?? ''}
            authorImageUrl={post.users.profiles?.image_url ?? undefined}
            createTime={getTimeDifference(post.created_at.toISOString())}
            views={0}
            commentNum={0}
            recommendNum={0}
          />
        ))
      ) : (
        <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-7">
          <h2 className="text-xl font-bold">
            작성된 {type === 'post' ? '게시글' : '댓글'}이 없습니다.
          </h2>
        </div>
      )}
    </div>
  );
};

export default PostList;
