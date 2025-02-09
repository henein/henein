'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Pagenate = () => {
  return (
    <nav aria-label="Page navigation" className="m-[0_auto] mt-[24px]">
      <ul className="flex h-8 items-center">
        <li className="p-1 hover:cursor-pointer disabled:cursor-not-allowed">
          <Link href={'#'}>
            <Image
              src={'/images/henein/prev.svg'}
              width={24}
              height={24}
              alt="next"
            />
          </Link>
        </li>

        {/* 넘버링 */}
        <span>(페이지네이션 부분)</span>
        {/* {arr.map((item) =>
          item.map((num) => (
            <li
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full hover:cursor-pointer"
              key={num}
            >
              <Link href={`/mypage?num=${num}`}>{num}</Link>
            </li>
          )),
        )} */}

        <li className="p-1 hover:cursor-pointer disabled:cursor-not-allowed">
          <Link href="#">
            <Image
              src={'/images/henein/next.svg'}
              width={24}
              height={24}
              alt="next"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagenate;
