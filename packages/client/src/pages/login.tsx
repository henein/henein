import Head from 'next/head';
import { Card } from '../components/atoms/Card';
import { LoginForm } from '../components/oraganisms/LoginForm';
import { useLogin } from '../hooks/useLogin';
import { CardTitle } from '../components/atoms/CardTitle';

export default function Login() {
  const { isLoading, error, login } = useLogin();

  return (
    <>
      <Head>
        <title>로그인</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex justify-center items-center h-screen">
        <Card className="lg:w-2/5">
          <CardTitle>로그인</CardTitle>
          <LoginForm
            isLoading={isLoading}
            error={error?.response?.data}
            onSubmit={login}
          />
        </Card>
      </div>
    </>
  );
}
