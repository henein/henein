'use server';

import { PrismaClient } from '@prisma/client';

export const getCategories = async () => {
  const prisma = new PrismaClient();

  const categories = await prisma.categories.findMany();

  return categories;
};
