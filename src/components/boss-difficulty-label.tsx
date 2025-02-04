import classNames from 'classnames';

export interface BossDifficultyLabelProps {
  className?: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'chaos';
  isMini?: boolean;
}

export const BossDifficultyLabel = (props: BossDifficultyLabelProps) => {
  return (
    <div
      className={classNames(
        'h-fit rounded-full bg-linear-to-b text-center select-none',
        props.isMini
          ? 'w-[54px] py-[2px] text-[0.625rem] font-semibold'
          : 'w-[72px] py-[5px] text-[0.625rem] font-bold',
        props.className,
        props.difficulty === 'chaos' ? 'text-[#FFE4C4]' : 'text-white-900',
        {
          'from-[#9CA5AD] to-[#8A969F]': props.difficulty === 'easy',
          'from-[#52B3CD] to-[#319DBC]': props.difficulty === 'normal',
          'from-[#E26C96] to-[#C74F79]': props.difficulty === 'hard',
          'bg-[#494949] inset-ring inset-ring-[#DCBE97]': props.difficulty === 'chaos',
        },
      )}
    >
      {props.difficulty.toUpperCase()}
    </div>
  );
};
