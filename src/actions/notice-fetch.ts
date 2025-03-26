import { prisma } from '@/utils/prisma';
import { unstable_cache } from 'next/cache';

export const fetchNotices = unstable_cache(
  async () => {
    console.log('데이터 revalidate??');
    const data = await prisma.notices.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return data;
  },
  ['notice-data'],
  {
    tags: ['cache-notice-data'],
    revalidate: 3600,
  },
);
