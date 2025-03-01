import { BossId } from '@/constants';
import Image from 'next/image';

export interface BossIconProps {
  bossId: BossId;
  size?: number;
  className?: string;
  // difficulty: 'easy' | 'normal' | 'hard' | 'chaos';
}

export const BossIcon = (props: BossIconProps) => {
  return (
    <Image
        src={`/images/mamudae/boss-icon/${props.bossId}.png`}
        alt=""
        width={props.size ?? 40}
        height={props.size ?? 40}
        className={props.className}
      />
  );
};
