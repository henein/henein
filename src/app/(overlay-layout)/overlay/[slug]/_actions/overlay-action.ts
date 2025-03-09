'use server';

import { fetchPrizes } from '@/actions/prize-action';
import { Streamers } from '@/constants';
import { prisma } from '@/utils/prisma';
import { notFound } from 'next/navigation';

export const fetchData = async (slug: string) => {
  const nickname = (
    Streamers.find((streamer) => streamer.id === slug) ?? Streamers[0]
  ).nickname;

  const streamer = await prisma.streamer.findUnique({
    where: { nickname },
  });

  if (!streamer) {
    return notFound();
  }

  const myTeam = streamer.team;

  const prizes = await fetchPrizes();

  const myPrize = prizes.find((prize) => prize.nickname === streamer?.nickname);
  const myPrizeAmount =
    myPrize?.prizes.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;

  const teamPrizeAmount = prizes
    .filter((prize) => prize.team === streamer?.team)
    .reduce(
      (acc, cur) => acc + cur.prizes.reduce((acc, cur) => acc + cur.amount, 0),
      0,
    );

  let winCount = 0;
  let loseCount = 0;

  myPrize?.prizes.forEach((prize) => {
    if (prize.isWin) {
      winCount++;
    } else {
      loseCount++;
    }
  });

  return {
    nickname,
    myTeam,
    winCount,
    loseCount,
    myPrizeAmount,
    teamPrizeAmount,
  };
};
