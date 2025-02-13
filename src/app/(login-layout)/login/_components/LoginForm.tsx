'use client';

import KakaoLoginButton from './KakaoBtn';
import { TextField } from './TextField';
import { Button } from '@/components';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface LoginState {
  email: string;
  password: string;
}
const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginState>();
  const submit = async (data: LoginState) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (!error) {
      redirect('/');
    }
  };

  return (
    <div className="bg-white-900 flex w-[380px] flex-col gap-4 rounded-2xl p-[20px_24px]">
      <h3 className="text-black-800 p-2 text-[20px] font-bold">로그인</h3>

      {/* 로컬 로그인 */}
      <form onSubmit={handleSubmit(submit)}>
        <TextField
          register={register('email')}
          type="email"
          placeholder="이메일"
        />
        <TextField
          register={register('password')}
          type="password"
          placeholder="비밀번호"
        />
        <Button type="submit" sort="primary" width="100%" fontWeight="700">
          이메일로 로그인하기
        </Button>
      </form>

      <div className="flex w-full items-center justify-between">
        <hr className="border-grey-300 w-[calc((100%-30px)/2)] border-t" />
        <div className="text-grey-500 w-[30px] text-center text-xs">또는</div>
        <hr className="border-grey-300 w-[calc((100%-30px)/2)] border-t" />
      </div>

      {/* OAuth 로그인 */}
      <KakaoLoginButton />
    </div>
  );
};

export default LoginForm;
