'use client';

import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import React from 'react';

const KakaoLoginButton = () => {
  const supabase = createClient();

  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) console.error('OAuth 로그인 실패:', error.message);
  };

  return (
    <button
      type="button"
      className="text-black-800 border-border relative flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#FEE500] p-[12px_25px] text-[14px] font-medium hover:cursor-pointer hover:bg-[#F9D547] active:scale-[98%]"
      onClick={signInWithKakao}
    >
      <Image
        src={'/images/kakao.svg'}
        alt="kakao"
        width={18}
        height={18}
        className="fill-black-800 absolute left-4"
      />
      <span>Kakao로 로그인하기</span>
    </button>
  );
};

export default KakaoLoginButton;
