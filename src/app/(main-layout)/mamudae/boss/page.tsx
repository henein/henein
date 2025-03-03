import { checkAdmin } from '@/actions/boss-action';
import { BossRecord } from './_components/boss-record';
import { BossDifficultyLabel, BossIcon, BossImage } from '@/components';
import { BossDifficulty, BossId } from '@/constants';
import { prisma } from '@/utils/prisma';
import { $Enums } from '@prisma/client';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BossList: { bossId: BossId; difficulty: BossDifficulty }[][] = [
  [{ bossId: BossId.ZAKUM, difficulty: 'easy' }],
  [
    { bossId: BossId.ZAKUM, difficulty: 'normal' },
    { bossId: BossId.PAPULATUS, difficulty: 'easy' },
    { bossId: BossId.MAGNUS, difficulty: 'easy' },
  ],
  [
    { bossId: BossId.HILLA, difficulty: 'normal' },
    { bossId: BossId.HORNTAIL, difficulty: 'easy' },
  ],
  [
    { bossId: BossId.PIERRE, difficulty: 'normal' },
    { bossId: BossId.VONBON, difficulty: 'normal' },
    { bossId: BossId.BLOODY_QUEEN, difficulty: 'normal' },
    { bossId: BossId.VELLUM, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.HORNTAIL, difficulty: 'normal' },
    { bossId: BossId.VON_LEON, difficulty: 'easy' },
    { bossId: BossId.ARKARIUM, difficulty: 'easy' },
  ],
  [
    { bossId: BossId.KAUNG, difficulty: 'normal' },
    { bossId: BossId.HORNTAIL, difficulty: 'chaos' },
    { bossId: BossId.PINKBEAN, difficulty: 'normal' },
    { bossId: BossId.VON_LEON, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.VON_LEON, difficulty: 'hard' },
    { bossId: BossId.ARKARIUM, difficulty: 'normal' },
    { bossId: BossId.MAGNUS, difficulty: 'normal' },
    { bossId: BossId.PAPULATUS, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.CYGNUS, difficulty: 'easy' },
    { bossId: BossId.HILLA, difficulty: 'hard' },
    { bossId: BossId.PINKBEAN, difficulty: 'chaos' },
  ],
  [
    { bossId: BossId.CYGNUS, difficulty: 'normal' },
    { bossId: BossId.ZAKUM, difficulty: 'chaos' },
  ],
  [
    { bossId: BossId.PIERRE, difficulty: 'chaos' },
    { bossId: BossId.VONBON, difficulty: 'chaos' },
    { bossId: BossId.BLOODY_QUEEN, difficulty: 'chaos' },
  ],
  [
    { bossId: BossId.VELLUM, difficulty: 'chaos' },
    { bossId: BossId.MAGNUS, difficulty: 'hard' },
  ],
  [
    { bossId: BossId.PAPULATUS, difficulty: 'chaos' },
    { bossId: BossId.SWOO, difficulty: 'normal' },
    { bossId: BossId.DAMIEN, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.LUCID, difficulty: 'easy' },
    { bossId: BossId.WILL, difficulty: 'easy' },
    { bossId: BossId.GUARDIAN_ANGEL_SLIME, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.LUCID, difficulty: 'normal' },
    { bossId: BossId.WILL, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.DUSK, difficulty: 'normal' },
    { bossId: BossId.DARKNELL, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.DAMIEN, difficulty: 'hard' },
    { bossId: BossId.SWOO, difficulty: 'hard' },
  ],
  [
    { bossId: BossId.LUCID, difficulty: 'hard' },
    { bossId: BossId.WILL, difficulty: 'hard' },
  ],
  [
    { bossId: BossId.GUARDIAN_ANGEL_SLIME, difficulty: 'chaos' },
    { bossId: BossId.VERUS_HILLA, difficulty: 'normal' },
  ],
  [
    { bossId: BossId.DUSK, difficulty: 'chaos' },
    { bossId: BossId.DARKNELL, difficulty: 'hard' },
  ],
  [
    { bossId: BossId.VERUS_HILLA, difficulty: 'hard' },
    { bossId: BossId.CHOSEN_SEREN, difficulty: 'normal' },
  ],
  [{ bossId: BossId.BLACK_MAGE, difficulty: 'hard' }],
];

export const metadata: Metadata = {
  title: '보스',
};

const MamudaeBossPage = async () => {
  const rawBosses = await prisma.bosses.findMany({
    include: { streamer: true },
  });

  const streamers = await prisma.streamer.findMany();

  const bossData = ([] as { bossId: BossId; difficulty: BossDifficulty }[])
    .concat(...BossList)
    .map((boss) => {
      const record = rawBosses
        .filter(
          (data) =>
            data.boss_id === boss.bossId && data.difficulty === boss.difficulty,
        )
        .map((boss) => {
          return {
            ...boss,
            streamer: boss.streamer.nickname,
          };
        });

      const maya = record.find((data) => data.team === 'MAYA');

      const stan = record.find((data) => data.team === 'STAN');

      let winner: $Enums.mamudae_team = 'MAYA';

      if (!maya) {
        winner = 'STAN';
      } else if (!stan) {
        winner = 'MAYA';
      } else {
        winner = maya.created_at < stan.created_at ? 'MAYA' : 'STAN';
      }

      return {
        bossId: boss.bossId,
        difficulty: boss.difficulty,
        maya: maya && {
          streamer: maya.streamer,
          streamerId: maya.streamer_id,
          created_at: maya.created_at,
          party: maya.party,
        },
        stan: stan && {
          streamer: stan.streamer,
          streamerId: stan.streamer_id,
          created_at: stan.created_at,
          party: stan.party,
        },
        winner: winner,
      };
    });

  const isAdmin = await checkAdmin();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">보스 현황</h2>
      <div className="border-dark-border bg-black-900 md:w-5xl flex flex-col gap-4 rounded-2xl border px-6 py-5">
        {BossList.map((bosses, index) => (
          <div
            key={index}
            className="flex min-h-40 items-center justify-between"
          >
            <div className="mx-auto my-auto flex gap-3 max-md:hidden">
              {bosses.map((boss) => (
                <BossImage key={boss.bossId + boss.difficulty} {...boss} />
              ))}
            </div>
            <div className="border-dark-border bg-grey-900 h-fit rounded-2xl border max-md:w-full md:w-[400px]">
              {bosses.map((boss) => {
                const data = bossData.find(
                  (data) =>
                    data.bossId === boss.bossId &&
                    data.difficulty === boss.difficulty,
                )!;

                return (
                  <div
                    key={boss.bossId + boss.difficulty}
                    className="flex items-stretch gap-6 px-6 py-5"
                  >
                    <div className="relative mr-4">
                      <BossIcon bossId={boss.bossId} />
                      <BossDifficultyLabel
                        className="absolute -bottom-2 -left-1"
                        difficulty={boss.difficulty}
                        isMini
                      />
                    </div>
                    <BossRecord
                      data={data.maya}
                      boss_id={boss.bossId}
                      team={'MAYA'}
                      difficulty={boss.difficulty}
                      isWinner={data.winner === 'MAYA'}
                      isAdmin={isAdmin}
                      streamers={streamers}
                    />
                    <BossRecord
                      data={data.stan}
                      boss_id={boss.bossId}
                      team={'STAN'}
                      difficulty={boss.difficulty}
                      isWinner={data.winner === 'STAN'}
                      isAdmin={isAdmin}
                      streamers={streamers}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MamudaeBossPage;
