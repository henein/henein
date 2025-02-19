'use server';

import { PrismaClient } from '@prisma/client';

export async function fetchProfile(option: { id: string }) {
  const { id } = option;

  if (!id) {
    return null;
  }

  const prisma = new PrismaClient();

  const profile = await prisma.profiles.findUnique({
    where: { id },
  });

  if (!profile) {
    return null;
  }

  return profile;
}
