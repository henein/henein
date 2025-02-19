'use server';

import { PrismaClient } from '@prisma/client';

export const fetchCategories = async () => {
  const prisma = new PrismaClient();

  const categories = await prisma.categories.findMany();

  return categories;
};
