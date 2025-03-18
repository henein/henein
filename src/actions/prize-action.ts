'use server';

import { checkAdmin } from './role-action';
import { prisma } from '@/utils/prisma';
import { broadcastMessage } from '@/utils/supabase/realtime';
import { $Enums } from '@prisma/client';

export const fetchPrizes = async () => {
  const streamers = await prisma.streamer.findMany({
    include: { daily_mission_prizes: { include: { daily_missions: true } } },
  });

  const dailyMissions = await prisma.daily_missions.findMany();

  return {
    streamers: streamers.map((streamer) => ({
      nickname: streamer.nickname,
      team: streamer.team,
      order: streamer.order,
      prizes: streamer.daily_mission_prizes.map((prize) => ({
        id: prize.daily_missions.id,
        title: prize.daily_missions.title,
        createdAt: prize.daily_missions.created_at,
        amount: prize.amount,
        winTeam: prize.daily_missions.win_team,
      })),
    })),
    dailyMissions,
  };
};

export const upsertDailyMission = async (data: {
  dailyMissionId: bigint;
  title: string;
  date: Date;
  winTeam: $Enums.mamudae_team | null;
  prizes: { streamerId: string; amount: number }[];
}) => {
  if (!(await checkAdmin())) {
    return;
  }

  const { dailyMissionId, title, date, winTeam, prizes } = data;

  await prisma.daily_missions.update({
    where: { id: dailyMissionId },
    data: { title, created_at: date, win_team: winTeam },
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
        update: { amount: cur.amount },
        create: {
          mission_id: dailyMissionId,
          streamer_id: cur.streamerId,
          amount: cur.amount,
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
  winTeam: $Enums.mamudae_team | null;
}) => {
  if (!(await checkAdmin())) {
    return;
  }

  const { title, date, winTeam } = data;

  const dailyMission = await prisma.daily_missions.create({
    data: {
      title,
      created_at: date,
      win_team: winTeam,
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
