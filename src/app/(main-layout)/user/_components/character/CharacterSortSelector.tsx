'use client';

import { WorldId, worlds } from '@/constants/world';
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
  const { state, sortChange, worldChange } = useCharacterSort();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        {/* 캐릭터 정렬 선택 */}
        <div className="flex gap-2">
          {buttons.map((item) => (
            <button
              key={item.value}
              className={`hover:bg-grey-800a rounded-2xl border p-[8px_16px] text-xs hover:cursor-pointer ${clsx(state.sortType === item.value ? 'bg-grey-600' : 'bg-grey-900')}`}
              onClick={() => sortChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 캐릭터 월드 선택 */}
        <div className="w-[120px] max-w-sm">
          <div className="border-grey-300 relative rounded-2xl border">
            <select
              className="placeholder:text-grey-400 border-l-10 border-r-10 w-full cursor-pointer rounded border border-transparent py-2 text-sm focus:outline-none"
              defaultValue={WorldId.All}
              onChange={(e) => worldChange(e.target.value as WorldId)}
            >
              {worlds.map((item) => (
                <option key={item.id} value={item.id} title="">
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSortSelector;
