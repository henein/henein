import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import validator from 'validator';
import { Button } from '../atoms/Button';
import { Form } from '../atoms/Form';
import { Input } from '../atoms/Input';

interface FormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  isLoading?: boolean;
  error?: string;
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'all' });

  const router = useRouter();

  const handler: SubmitHandler<FormValues> = (data) => {
    props.onSubmit(data.email, data.password);
  };

  return (
    <Form onSubmit={handleSubmit(handler)}>
      {props.error ? (
        <p className="text-danger-600">{props.error}</p>
      ) : undefined}
      <Input
        type="email"
        name="email"
        label="이메일"
        error={errors?.email?.message}
        inputRef={register({
          required: true,
          validate: (data) =>
            validator.isEmail(data) || '올바른 이메일을 입력해주세요!',
        })}
      />
      <Input
        type="password"
        name="password"
        label="비밀번호"
        error={errors?.password?.message}
        inputRef={register({
          required: true,
        })}
      />
      <Button
        className="w-full"
        title="로그인"
        isLoading={props.isLoading}
        disabled={!isValid}
        onClick={handleSubmit(handler)}
      />
      <Button
        color="secondary"
        className="w-full"
        title="회원가입"
        onClick={() => {
          router.push('/register');
        }}
      />
    </Form>
  );
};
