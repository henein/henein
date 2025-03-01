'use server';

import { prisma } from "@/utils/prisma";

export const fetchCategories = async () => {
  const categories = await prisma.categories.findMany();

  return categories;
};
