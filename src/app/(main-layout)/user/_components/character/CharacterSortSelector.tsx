'use client';

import useCharacterSort from '@/store/zustand/useCharacterSort';
import clsx from 'clsx';

type SortType = 'highLevel' | 'lowLevel' | 'name';
type Button = {
  label: string;
  value: SortType;
};
const buttons: Button[] = [
  { label: '높은 레벨', value: 'highLevel' },
  { label: '낮은 레벨', value: 'lowLevel' },
  { label: '이름', value: 'name' },
];

const CharacterSortSelector = () => {
  const { sortType, sortChange } = useCharacterSort();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {buttons.map((item) => (
            <button
              key={item.value}
              className={`hover:bg-grey-800a rounded-2xl border p-[8px_16px] text-xs hover:cursor-pointer ${clsx(sortType === item.value ? 'bg-grey-600' : 'bg-grey-900')}`}
              onClick={() => sortChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSortSelector;
