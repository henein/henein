'use server';

import { prisma } from "@/utils/prisma";

export const fetchPrizes = async () => {
  const streamers = await prisma.streamer.findMany({
    include: { daily_mission_prizes: { include: { daily_missions: true } } },
  });

  return streamers.map((streamer) => ({
    nickname: streamer.nickname,
    team: streamer.team,
    prizes: streamer.daily_mission_prizes.map((prize) => ({
      id: prize.daily_missions.id,
      title: prize.daily_missions.title,
      createdAt: prize.daily_missions.created_at,
      amount: prize.amount,
      isWin: prize.is_win,
    })),
  }));
};
