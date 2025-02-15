import { create } from 'zustand';

type SortType = 'highLevel' | 'lowLevel' | 'name';

interface Store {
  sortType: SortType;
  sortChange: (type: SortType) => void;
}

const useCharacterSort = create<Store>()((set) => ({
  sortType: 'highLevel',
  sortChange: (type) => set(() => ({ sortType: type })),
}));

export default useCharacterSort;
