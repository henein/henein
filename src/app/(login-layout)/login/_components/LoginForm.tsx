'use client';

import KakaoLoginButton from './KakaoBtn';
import LocalLoginForm from './LocalLoginForm';
import { Card } from '@/components/card';
import React from 'react';

const LoginForm = () => {
  return (
    <Card className="flex w-[380px] flex-col gap-4 rounded-2xl p-[20px_24px]">
      {/* 로컬 로그인 */}
      <LocalLoginForm />

      <div className="flex w-full items-center justify-between">
        <hr className="border-default w-[calc((100%-30px)/2)] border-t" />
        <div className="text-secondary w-[30px] text-center text-xs">또는</div>
        <hr className="border-default w-[calc((100%-30px)/2)] border-t" />
      </div>

      {/* OAuth 로그인 */}
      <KakaoLoginButton />
    </Card>
  );
};

export default LoginForm;
