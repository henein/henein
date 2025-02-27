'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Refresher = () => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);

    return () => clearInterval(interval);
  }, [router]);

  return <></>;
};
