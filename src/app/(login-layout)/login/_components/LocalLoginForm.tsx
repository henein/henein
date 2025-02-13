'use client';

import { TextField } from './TextField';
import { Button } from '@/components';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface LoginState {
  email: string;
  password: string;
}
const LocalLoginForm = () => {
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
      <h3 className="text-black-800 p-2 text-[20px] font-bold">로그인</h3>

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
    </form>
  );
};

export default LocalLoginForm;
