import KakaoLoginButton from './KakaoBtn';
import React from 'react';

const LoginForm = () => {
  return (
    <form className="bg-white-900 flex w-[380px] flex-col gap-4 rounded-2xl p-[20px_24px]">
      <h3 className="text-black-800 p-2 text-[20px] font-bold">로그인</h3>
      <KakaoLoginButton />
    </form>
  );
};

export default LoginForm;
