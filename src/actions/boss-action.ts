'use server';

import { prisma } from '@/utils/prisma';
import { $Enums } from '@prisma/client';
import { checkAdmin } from './role-action';

export const postBoss = async (data: {
  boss_id: string;
  difficulty: string;
  team: $Enums.mamudae_team;
  date: Date;
  party: string | null;
  streamer_id: string;
}) => {
  if (!(await checkAdmin())) {
    return;
  }

  await prisma.bosses.create({
    data: {
      boss_id: data.boss_id,
      difficulty: data.difficulty,
      team: data.team,
      created_at: data.date,
      party: data.party,
      streamer_id: data.streamer_id,
    },
  });

  return true;
};

export const updateBoss = async (data: {
  boss_id: string;
  difficulty: string;
  team: $Enums.mamudae_team;
  date: Date;
  party: string | null;
  streamer_id: string;
}) => {
  if (!(await checkAdmin())) {
    return;
  }

  await prisma.bosses.update({
    where: {
      team_boss_id_difficulty: {
        team: data.team,
        boss_id: data.boss_id,
        difficulty: data.difficulty,
      },
    },
    data: {
      created_at: data.date,
      party: data.party,
      streamer_id: data.streamer_id,
    },
  });

  return true;
};

export const deleteBoss = async (data: {
  boss_id: string;
  difficulty: string;
  team: $Enums.mamudae_team;
}) => {
  if (!(await checkAdmin())) {
    return;
  }

  await prisma.bosses.delete({
    where: {
      team_boss_id_difficulty: {
        team: data.team,
        boss_id: data.boss_id,
        difficulty: data.difficulty,
      },
    },
  });

  return true;
};
