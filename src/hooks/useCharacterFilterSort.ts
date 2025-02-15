import { worlds } from '@/constants/world';
import useCharacterSort from '@/store/zustand/useCharacterSort';
import { characters as Characters } from '@prisma/client';
import { useMemo } from 'react';

const useCharacterFilterSort = () => {
  const { state } = useCharacterSort();

  // 정렬 함수
  const sortCallbackFn = useMemo(() => {
    return (a: Characters, b: Characters) => {
      if (state.sortType === 'lowLevel') return a.level - b.level;
      if (state.sortType === 'name') return a.name.localeCompare(b.name);
      return b.level - a.level; // 기본적으로 높은 레벨 우선 정렬
    };
  }, [state.sortType]);

  // 선택된 월드의 이름 찾기
  const stateWorldName = useMemo(() => {
    return worlds.find((v) => v.id === state.world)?.name;
  }, [state.world]);

  // 필터링 함수
  const filterCallbackFn = useMemo(() => {
    return (character: Characters) => {
      if (state.world === 'all') return true;
      return character.world === stateWorldName;
    };
  }, [state.world, stateWorldName]);

  return { sortCallbackFn, filterCallbackFn, stateWorldName };
};

export default useCharacterFilterSort;
