'use client';

import { Card } from '@/components/card';
import KakaoLoginButton from './KakaoBtn';
import LocalLoginForm from './LocalLoginForm';
import React from 'react';

const LoginForm = () => {
  return (
    <Card className="flex w-[380px] flex-col gap-4 rounded-2xl p-[20px_24px]">
      {/* 로컬 로그인 */}
      <LocalLoginForm />

      {/* OAuth 로그인 */}
      <KakaoLoginButton />
    </Card>
  );
};

export default LoginForm;
