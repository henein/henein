import Head from 'next/head';
import React from 'react';
import { Card } from '../components/atoms/Card';
import { CardTitle } from '../components/atoms/CardTitle';
import { RegisterForm } from '../components/oraganisms/RegisterForm';
import { useRegister } from '../hooks/useRegister';

export default function Register() {
  const { isLoading, error, register } = useRegister();

  return (
    <>
      <Head>
        <title>회원가입</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex justify-center items-center h-screen">
        <Card className="lg:w-2/5">
          <CardTitle>회원가입</CardTitle>
          <RegisterForm
            isLoading={isLoading}
            error={error?.response?.data}
            onSubmit={register}
          />
        </Card>
      </div>
    </>
  );
}
