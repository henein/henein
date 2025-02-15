import LoginForm from './_components/LoginForm';
import { Logo } from '@/components/Logo';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Logo />
      <LoginForm />
      <p className="text-secondary text-xs">
        일반 사용자는 소셜 로그인만 가능합니다.
      </p>
    </div>
  );
};

export default LoginPage;
