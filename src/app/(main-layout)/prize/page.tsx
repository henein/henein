import Image from 'next/image';
import React from 'react';

const PrizePage = () => {
  return (
    <div className="mx-auto my-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">상금</h2>
      <div className="flex">
        {/* 누렁즈 */}
        <div className="flex flex-col items-center gap-5">
          <strong className="text-2xl font-bold">누렁즈</strong>
          <div className="w-[479px] rounded-2xl bg-[#0075CA80] py-10 text-center text-5xl font-black drop-shadow-md [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
            ₩4,500,000
          </div>
          <UserColumn price={1000000} />
          <UserColumn price={1000000} />
          <UserColumn price={1000000} />
          <UserColumn price={1000000} />
          <UserColumn price={1000000} />
        </div>

        <div className="bg-grey-800a mx-6 w-[2px]" />

        {/* 절절승절절배 */}
        <div className="flex flex-col items-center gap-5">
          <strong className="text-2xl font-bold">절절승절절배</strong>
          <div className="w-[479px] rounded-2xl bg-[#DE930080] py-10 text-center text-5xl font-black [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
            ₩4,500,000
          </div>
          <UserColumn price={500000} />
          <UserColumn price={1000000} />
          <UserColumn price={1000000} />
          <UserColumn price={1000000} />
          <UserColumn price={1000000} />
        </div>
      </div>
    </div>
  );
};

export default PrizePage;

const UserColumn = ({ ...props }) => {
  return (
    <div className="flex w-[270px] flex-col gap-8">
      <div className="flex items-center justify-between">
        <Image
          src={props.userImg ?? '/images/dark-defaultImg.svg'}
          alt="streamer-img"
          width={48}
          height={48}
          className="aspect-square rounded-full"
        />
        <span className="text-[32px] font-bold">{`₩${props.price.toLocaleString('ko-KR')}`}</span>
      </div>
    </div>
  );
};
