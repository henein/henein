'use client';

import { useState } from 'react';

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
  const [sortType, setSortType] = useState<SortType>('highLevel');

  // const newCharList = (type: SortType) => {
  //   if (charList) {
  //     const sortedList = [...charList];
  //     const moveNullToEnd = (array: CharInfo[]) => {
  //       const withoutNull = array.filter((item) => item.world !== null);
  //       const nulls = array.filter((item) => item.world === null);
  //       return [...withoutNull, ...nulls];
  //     };

  //     switch (type) {
  //       case 'highLevel':
  //         sortedList.sort((a, b) => (b.level ?? 0) - (a.level ?? 0));
  //         break;
  //       case 'lowLevel':
  //         sortedList.sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
  //         break;
  //       case 'name':
  //         sortedList.sort((a, b) => a.charName.localeCompare(b.charName));
  //         break;
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {buttons.map((item) => (
            <button
              key={item.value}
              className={`rounded-2xl border bg-gray-200 p-[8px_16px] text-xs`}
              onClick={() => setSortType(item.value)}
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
