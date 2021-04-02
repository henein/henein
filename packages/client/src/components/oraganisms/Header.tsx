import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../atoms/Button';
import { useLogout } from '../../hooks/useLogout';

export const Header: React.VFC = () => {
  const router = useRouter();
  const { error, logout } = useLogout();

  useEffect(() => {
    if (!error) {
      return;
    }
    alert(error.response?.data);
  }, [error]);

  const onLogin = () => {
    router.push('/login');
  };

  const onLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow">
      <div className="container flex items-center flex-wrap h-16">
        <div className="flex flex-auto items-start flex-no-shrink mr-6">
          <Link href="/">
            <a className="font-bold text-black text-opacity-90 text-2xl">
              헤네인
            </a>
          </Link>
        </div>
        <div>
          <Button title="로그인" onClick={onLogin} />
        </div>
      </div>
    </header>
  );
};
