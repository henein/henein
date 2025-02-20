import CharacterContents from './character';
import PostItem from '@/components/post-item';
import { getTimeDifference } from '@/utils/time';
import { PrismaClient } from '@prisma/client';
import React from 'react';

interface Props {
  uid: string;
  type: string;
  page: string | string[] | undefined;
  isMyProfile: boolean;
}

const MAX_POST_COUNT = 20;

const Contents = async ({ uid, type, isMyProfile }: Props) => {
  const prisma = new PrismaClient();

  const posts = await prisma.posts.findMany({
    include: {
      categories: true,
      users: { include: { profiles: true } },
    },
    where: {
      author_id: uid,
      deleted_at: null,
    },
    orderBy: {
      created_at: 'desc',
    },
    // take: MAX_POST_COUNT,
    // skip: (page - 1) * MAX_POST_COUNT,
  });

  if (type === 'post')
    return (
      <>
        <div className="flex h-full w-full flex-col justify-between">
          <div className="divide-default flex w-full flex-auto flex-col divide-y">
            {posts.map((post) => (
              <PostItem
                key={post.id}
                category={post.categories.name}
                categoryId={post.categories.id}
                id={post.id}
                title={post.title}
                text={''}
                author={post.users.profiles?.nickname ?? ''}
                createTime={getTimeDifference(post.created_at.toISOString())}
                views={0}
                commentNum={0}
                recommendNum={0}
              />
            ))}
          </div>
          {/* <div className="flex w-full justify-center gap-0.5">
            <PaginationLink href={getHref(category, 1)}>
              <span className="icon icon-20">keyboard_arrow_left</span>
            </PaginationLink>
            {getShowPages(page, pageCount).map((showPage) => (
              <PaginationLink
                key={showPage}
                href={getHref(category, showPage)}
                isSelected={showPage === page}
              >
                {showPage}
              </PaginationLink>
            ))}
            <PaginationLink href={getHref(category, 11)}>
              <span className="icon icon-20">keyboard_arrow_right</span>
            </PaginationLink>
          </div> */}
        </div>
      </>
    );

  if (type === 'character' && isMyProfile)
    return <CharacterContents uid={uid} />;

  return (
    <div className="flex h-full min-h-[300px] w-full items-center justify-center">
      <h2 className="text-xl font-bold">해당하는 데이터가 없습니다.</h2>
    </div>
  );
};

export default Contents;
