import { WorldId } from '@/constants/world';
import { create } from 'zustand';

type SortType = 'highLevel' | 'lowLevel' | 'name';

interface Store {
  state: { sortType: SortType; world: WorldId };
  sortChange: (type: SortType) => void;
  worldChange: (world: WorldId) => void;
}

const useCharacterSort = create<Store>()((set) => ({
  state: { sortType: 'highLevel', world: WorldId.All },
  sortChange: (type) =>
    set((store) => ({ state: { ...store.state, sortType: type } })),
  worldChange: (world) =>
    set((store) => ({ state: { ...store.state, world } })),
}));

export default useCharacterSort;
