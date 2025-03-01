import useRecordSelect from '@/store/zustand/useRecordSelect';
import clsx from 'clsx';
import React from 'react';

const ChartNav = () => {
  return (
    <div className="border-b-grey-700 flex w-full border-b">
      <Item title="레벨" value="level" />
      <Item title="전투력" value="combat" />
    </div>
  );
};

export default ChartNav;

const Item = ({
  title,
  value,
}: {
  title: string;
  value: 'level' | 'combat';
}) => {
  const { type, selectType } = useRecordSelect();

  const onClick = () => {
    if (type === value) return;
    if (title === '레벨') return selectType('level');
    if (title === '전투력') return selectType('combat');
  };

  const isSelect = type === value;

  return (
    <button
      className={`hover:bg-black-100 w-1/2 cursor-pointer py-6 text-center text-lg font-bold ${clsx(isSelect && 'bg-black-300')}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
