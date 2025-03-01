'use server';

import { prisma } from "@/utils/prisma";


export async function fetchProfile(option: { id: string }) {
  const { id } = option;

  if (!id) {
    return null;
  }

  const profile = await prisma.profiles.findUnique({
    where: { id },
  });

  if (!profile) {
    return null;
  }

  return profile;
}
