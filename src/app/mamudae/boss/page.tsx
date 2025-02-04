import { BossDifficultyLabel, BossIcon, BossImage } from "@/components";
import { BossDifficulty, BossId } from "@/constants";

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
    { bossId: BossId.VERUS_HILLA, difficulty: 'hard' },
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
  [{ bossId: BossId.VERUS_HILLA, difficulty: 'hard' }],
  [{ bossId: BossId.BLACK_MAGE, difficulty: 'hard' }],
];

const MamudaeBossPage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="mt-6 mb-6 text-3xl font-bold">보스 현황</h2>
      <div className="flex flex-col gap-4 rounded-2xl border border-dark-border bg-black-900 px-6 py-5">
        {BossList.map((bosses, index) => (
          <div
            key={index}
            className="flex min-h-40 items-center justify-between"
          >
            <div className="mx-auto my-auto flex gap-3">
              {bosses.map((boss) => (
                <BossImage key={boss.bossId + boss.difficulty} {...boss} />
              ))}
            </div>
            <div className="h-fit w-[463px] rounded-2xl border border-dark-border bg-grey-900">
              {bosses.map((boss) => (
                <div
                  key={boss.bossId + boss.difficulty}
                  className="flex items-center gap-6 px-6 py-5"
                >
                  <BossIcon bossId={boss.bossId} />
                  <BossDifficultyLabel difficulty={boss.difficulty} isMini />
                  <p className="flex-1 text-center">-</p>
                  <p className="flex-1 text-center">-</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MamudaeBossPage;
