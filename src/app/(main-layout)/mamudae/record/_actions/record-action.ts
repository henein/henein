'use server';

import { prisma } from "@/utils/prisma";

export const fetchStreamers = async () => {
  const streamers = await prisma.streamer.findMany();

  return streamers;
};
