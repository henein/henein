import { BossDifficultyLabel, BossIcon, BossImage } from '@/components';
import { BossDifficulty, BossId } from '@/constants';
import { getTimeDifference, getTimeString } from '@/utils/time';
import { PrismaClient } from '@prisma/client';
import classNames from 'classnames';
import type { Metadata } from 'next';

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
  const prisma = new PrismaClient();

  const bossData = await prisma.bosses.findMany({
    include: { streamer: true },
  });

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">보스 현황</h2>
      <div className="border-dark-border bg-black-900 flex flex-col gap-4 rounded-2xl border px-6 py-5">
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
                const b = bossData.filter(
                  (data) =>
                    data.boss_id === boss.bossId &&
                    data.difficulty === boss.difficulty,
                );

                const left = b.find((data) => data.team === 'MAYA');
                const right = b.find((data) => data.team === 'STAN');

                let winner = null;

                if (!left) {
                  winner = right;
                } else if (!right) {
                  winner = left;
                } else {
                  winner = left.created_at < right.created_at ? left : right;
                }

                return (
                  <div
                    key={boss.bossId + boss.difficulty}
                    className="flex items-center gap-6 px-6 py-5"
                  >
                    <div className="relative">
                      <BossIcon bossId={boss.bossId} />
                      <BossDifficultyLabel
                        className="absolute -bottom-2 -left-1"
                        difficulty={boss.difficulty}
                        isMini
                      />
                    </div>
                    <p className="text-secondary flex flex-1 flex-col items-center text-center">
                      {left ? (
                        <>
                          <span
                            className={classNames(
                              'flex items-center text-sm',
                              winner === left
                                ? 'text-brand mr-1 font-bold'
                                : 'text-primary font-semibold',
                            )}
                          >
                            {winner === left && (
                              <span className="icon icon-16-fill mr-0.5">
                                crown
                              </span>
                            )}
                            {left.streamer.nickname}
                          </span>
                          <span className="flex text-xs">
                            {getTimeString(left.created_at.toISOString())}
                          </span>
                        </>
                      ) : (
                        '-'
                      )}
                    </p>
                    <p className="text-secondary flex flex-1 flex-col items-center text-center">
                      {right ? (
                        <>
                          <span
                            className={classNames(
                              'flex items-center text-sm',
                              winner === right
                                ? 'text-brand mr-1 font-bold'
                                : 'text-primary font-semibold',
                            )}
                          >
                            {winner === right && (
                              <span className="icon icon-16-fill mr-0.5">
                                crown
                              </span>
                            )}
                            {right.streamer.nickname}
                          </span>
                          <span className="flex text-xs">
                            {getTimeString(right.created_at.toISOString())}
                          </span>
                        </>
                      ) : (
                        '-'
                      )}
                    </p>
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
