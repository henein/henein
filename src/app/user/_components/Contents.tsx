import Pagenate from './Pagenate';
import PostItem from './PostItem';
import React from 'react';

interface Props {
  type: string | string[];
  page: string | string[] | undefined;
}

const Contents = ({ type }: Props) => {
  const dummy = {
    boardType: '자유',
    id: 1,
    title: '제목',
    text: '본문',
    fileUrl: '/images/mamudae/logo.png',
    userName: '동균',
    createTime: Date.now().toString(),
    views: 123,
    commentNum: 10,
    recommendNum: 33,
  };

  if (type === 'post' || type === 'comment')
    return (
      <>
        <div className="flex h-full w-full flex-col justify-between">
          <PostItem {...dummy} />
          <hr className="text-grey-600" />
          <PostItem {...dummy} />
          <hr className="text-grey-600" />
          <PostItem {...dummy} />
          <hr className="text-grey-600" />
          <PostItem {...dummy} />
          <hr className="text-grey-600" />
          <PostItem {...dummy} />
        </div>
        <Pagenate />
      </>
    );

  if (type === 'character')
    return (
      <div className="flex h-full w-full flex-col justify-between">
        캐릭터 조회 UI
      </div>
    );

  return (
    <div className="flex h-full min-h-[300px] w-full items-center justify-center">
      <h2 className="text-xl font-bold">해당하는 데이터가 없습니다.</h2>
    </div>
  );
};

export default Contents;
