'use client';

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
const LocalLoginForm = () => {
  const { register, handleSubmit } = useForm();

  const submit = async (data: FieldValues) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error(error);
      return;
    }

    redirect('/');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
      <h3 className="p-2 text-[20px] font-bold">로그인</h3>

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
  );
};

export default LocalLoginForm;
