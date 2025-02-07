import Image from 'next/image';
import React from 'react';

const KakaoBtn = () => {
  return (
    <button className="hover:bg=[#F9D547] text-black-900 border-border relative flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#FEE500] p-[12px_25px] text-[14px] font-medium active:scale-[98%]">
      <Image
        src={'/images/kakao.svg'}
        alt="kakao"
        width={18}
        height={18}
        className="absolute left-[16px]"
      />
      <span>Kakao로 로그인하기</span>
    </button>
  );
};

export default KakaoBtn;
