import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import validator from 'validator';
import { Button } from '../atoms/Button';
import { Form } from '../atoms/Form';
import { Input } from '../atoms/Input';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormProps {
  isLoading?: boolean;
  error?: string;
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'all' });

  const handler: SubmitHandler<FormValues> = (data) => {
    props.onSubmit(data.name, data.email, data.password);
  };

  return (
    <Form onSubmit={handleSubmit(handler)}>
      {props.error ? (
        <p className="text-danger-600">{props.error}</p>
      ) : undefined}
      <Input
        type="text"
        name="name"
        label="이름"
        error={errors?.name?.message}
        inputRef={register({
          required: { value: true, message: '필수 항목입니다!' },
          minLength: { value: 2, message: '너무 짧습니다!' },
          maxLength: { value: 12, message: '너무 깁니다!' },
        })}
      />
      <Input
        type="email"
        name="email"
        label="이메일"
        error={errors?.email?.message}
        inputRef={register({
          required: { value: true, message: '필수 항목입니다!' },
          validate: (data) =>
            validator.isEmail(data) || '올바른 이메일을 입력해주세요!',
        })}
      />
      <Input
        type="password"
        name="password"
        label="비밀번호"
        description="대문자, 소문자, 특수문자 포함 8글자 이상"
        error={errors?.password?.message}
        inputRef={register({
          required: { value: true, message: '필수 항목입니다!' },
          validate: (data) =>
            validator.isStrongPassword(data) || '비밀번호 조건을 확인해주세요!',
        })}
      />
      <Input
        type="password"
        name="confirmPassword"
        label="비밀번호 확인"
        error={errors?.confirmPassword?.message}
        inputRef={register({
          required: { value: true, message: '필수 항목입니다!' },
          validate: (data) =>
            validator.equals(data, getValues('password')) ||
            '비밀번호가 일치하지 않습니다!',
        })}
      />
      <Button className="w-full" title="회원가입" isLoading={props.isLoading} />
    </Form>
  );
};
