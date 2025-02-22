'use client';

import { ReactNode, useEffect } from 'react';

interface Props {
  slug: string;
  children: ReactNode;
}

export const ReportView = ({ slug, children }: Props) => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    });
  }, [slug]);

  return <>{children}</>;
};
