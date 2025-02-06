import { Button } from '@/components';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="m-[0_auto] flex w-full max-w-[1024px] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h2 className="m-3 text-3xl font-bold">유저를 찾을 수 없습니다.</h2>
        <Link href={'/login'}>
          <Button sort="primary">로그인 페이지로 이동</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
