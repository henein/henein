import LoginForm from './_components/LoginForm';
import { Logo } from '@/components/Logo';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
