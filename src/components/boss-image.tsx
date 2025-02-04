import { BossId } from '@/constants';
import { BossDifficultyLabel } from './boss-difficulty-label';
import Image from 'next/image';

export interface BossImageProps {
  bossId: BossId;
  difficulty: 'easy' | 'normal' | 'hard' | 'chaos';
}

export const BossImage = (props: BossImageProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border dark:border-dark-border">
      <Image
        src={`/images/mamudae/boss/${props.bossId}.png`}
        alt=""
        width={88}
        height={100}
      />
      <BossDifficultyLabel
        className="absolute bottom-2 left-2 z-10"
        difficulty={props.difficulty}
      />
    </div>
  );
};
