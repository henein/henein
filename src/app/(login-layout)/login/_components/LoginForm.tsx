'use client';

import KakaoLoginButton from './KakaoBtn';
import { TextField } from './TextField';
import { Button } from '@/components';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface LoginState {
  email: string;
  password: string;
}
const LoginForm = () => {
  const [localLoginForm, setLocalLoginForm] = useState<LoginState>({
    email: '',
    password: '',
  });
  const { register, handleSubmit } = useForm();
  const submit = async (data: FieldValues) => {
    setLocalLoginForm({
      email: data.email,
      password: data.password,
    });
    open();
  };

  return (
    <form
      className="bg-white-900 flex w-[380px] flex-col gap-4 rounded-2xl p-[20px_24px]"
      onSubmit={handleSubmit(submit)}
    >
      <h3 className="text-black-800 p-2 text-[20px] font-bold">로그인</h3>

      {/* 로컬 로그인 */}
      <TextField
        register={register('email')}
        type="email"
        placeholder="이메일"
        disabled={true}
      />
      <TextField
        register={register('password')}
        type="password"
        placeholder="비밀번호"
        disabled={true}
      />
      <Button
        type="submit"
        sort="primary"
        width="100%"
        fontWeight="700"
        disabled={true}
      >
        이메일로 로그인하기
      </Button>

      <div className="flex w-full items-center justify-between">
        <hr className="border-grey-300 w-[calc((100%-30px)/2)] border-t" />
        <div className="text-grey-500 w-[30px] text-center text-xs">또는</div>
        <hr className="border-grey-300 w-[calc((100%-30px)/2)] border-t" />
      </div>

      {/* OAuth 로그인 */}
      <KakaoLoginButton />
    </form>
  );
};

export default LoginForm;
