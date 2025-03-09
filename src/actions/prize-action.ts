'use server';

import { checkAdmin } from './role-action';
import { prisma } from '@/utils/prisma';
import { broadcastMessage } from '@/utils/supabase/realtime';

export const fetchPrizes = async () => {
  const streamers = await prisma.streamer.findMany({
    include: { daily_mission_prizes: { include: { daily_missions: true } } },
  });

  return streamers.map((streamer) => ({
    nickname: streamer.nickname,
    team: streamer.team,
    order: streamer.order,
    prizes: streamer.daily_mission_prizes.map((prize) => ({
      id: prize.daily_missions.id,
      title: prize.daily_missions.title,
      createdAt: prize.daily_missions.created_at,
      amount: prize.amount,
      isWin: prize.is_win,
    })),
  }));
};

export const upsertDailyMission = async (data: {
  dailyMissionId: bigint;
  title: string;
  date: Date;
  prizes: { streamerId: string; amount: number; isWin: boolean }[];
}) => {
  if (!(await checkAdmin())) {
    return;
  }

  const { dailyMissionId, title, date, prizes } = data;

  await prisma.daily_missions.update({
    where: { id: dailyMissionId },
    data: { title, created_at: date },
  });

  const result = await prisma.$transaction(
    prizes.map((cur) =>
      prisma.daily_mission_prizes.upsert({
        where: {
          streamer_id_mission_id: {
            mission_id: dailyMissionId,
            streamer_id: cur.streamerId,
          },
        },
        update: { amount: cur.amount, is_win: cur.isWin },
        create: {
          mission_id: dailyMissionId,
          streamer_id: cur.streamerId,
          amount: cur.amount,
          is_win: cur.isWin,
        },
      }),
    ),
  );

  await broadcastMessage('prize');

  return result;
};

export const createDailyMission = async (data: {
  title: string;
  date: Date;
}) => {
  if (!(await checkAdmin())) {
    return;
  }

  const { title, date } = data;

  const dailyMission = await prisma.daily_missions.create({
    data: {
      title,
      created_at: date,
    },
  });

  return dailyMission;
};

export const deleteDailyMission = async (dailyMissionId: bigint) => {
  if (!(await checkAdmin())) {
    return;
  }

  await prisma.daily_missions.delete({ where: { id: dailyMissionId } });

  await broadcastMessage('prize');

  return true;
};
