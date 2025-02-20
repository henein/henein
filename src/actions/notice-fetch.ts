import { PrismaClient } from '@prisma/client';

export const fetchNotices = async () => {
  const prisma = new PrismaClient();
  const data = await prisma.notices.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  return data;
};
