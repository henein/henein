'use client';

import { Card } from './card';
import { NavigationItem } from './navigation-item';
import { fetchProfile } from '@/actions/profile-action';
import { createClient } from '@/utils/supabase/client';
import { profiles } from '@prisma/client';
import { User } from '@supabase/supabase-js';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const applyMode = (mode?: 'light' | 'dark' | 'system') => {
  if (mode) {
    localStorage.theme = mode;
  }

  if (!('theme' in localStorage)) {
    document.documentElement.classList.toggle('dark', true);
    return;
  }

  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (localStorage.theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  );
};

export const AccountButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<profiles | null>(null);

  useEffect(() => {
    // applyMode();

    (async () => {
      const supabase = createClient();

      const { data } = await supabase.auth.getUser();

      setUser(data.user);

      if (data.user) {
        setProfile(await fetchProfile({ id: data.user.id }));
      }
    })();
  }, []);

  const logout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut({ scope: 'local' });

    setUser(null);
  };

  return (
    <div className="flex gap-4">
      {user ? (
        <div className="relative h-10 w-10">
          <button
            className="ring-default m-1 cursor-pointer overflow-hidden rounded-full ring"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              className="aspect-square"
              src={profile?.profile_img ?? '/images/dark-defaultImg.svg'}
              alt={''}
              width={32}
              height={32}
            />
          </button>
          <Card
            className={classNames(
              'divide-default absolute right-0 z-10 mt-2 w-56 cursor-pointer divide-y overflow-hidden transition-opacity',
              isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <div>
              <Link
                href={`/user/${user.id}`}
                className="text-grey-700 hover:bg-grey-100 dark:text-grey-200 dark:hover:bg-grey-600 block px-4 py-3 text-sm transition-colors dark:hover:text-white"
              >
                프로필
              </Link>
            </div>
            {/* <ul
              className="text-grey-700 dark:text-grey-200 text-sm"
              aria-labelledby="avatarButton"
            >
              <li>
                <a
                  href="#"
                  className="hover:bg-grey-100 dark:hover:bg-grey-600 block px-4 py-3 transition-colors dark:hover:text-white"
                  onClick={() => applyMode('light')}
                >
                  라이트모드
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:bg-grey-100 dark:hover:bg-grey-600 block px-4 py-3 transition-colors dark:hover:text-white"
                  onClick={() => applyMode('dark')}
                >
                  다크모드
                </a>
              </li>
            </ul> */}
            <div>
              <a
                href="#"
                className="text-grey-700 hover:bg-grey-100 dark:text-grey-200 dark:hover:bg-grey-600 block px-4 py-3 text-sm transition-colors dark:hover:text-white"
                onClick={logout}
              >
                로그아웃
              </a>
            </div>
          </Card>
        </div>
      ) : (
        <Link href="/login">
          <NavigationItem isIcon>
            <span className="icon">account_circle</span>
          </NavigationItem>
        </Link>
      )}
    </div>
  );
};
