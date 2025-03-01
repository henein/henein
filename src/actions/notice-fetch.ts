import { prisma } from "@/utils/prisma";

export const fetchNotices = async () => {
  const data = await prisma.notices.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  return data;
};
