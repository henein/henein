import { characters as Character, profiles as Profile } from '@prisma/client';
import { create } from 'zustand';

type GetType = 'level' | 'combat';
export type StateType = {
  streamerId: string;
  profile: Profile;
  character: Character | null;
};

interface Store {
  state: StateType[];
  type: GetType;
  select: (data: StateType) => void;
  unselect: (id: string) => void;
  selectType: (type: GetType) => void;
}

const useRecordSelect = create<Store>()((set) => ({
  state: [],
  type: 'level',
  select: (data) => set((prev) => ({ state: [...prev.state, data] })),
  unselect: (selectId) =>
    set((prev) => ({
      state: prev.state.filter((item) => item.streamerId !== selectId),
    })),
  selectType: (type) => set(() => ({ type })),
}));

export default useRecordSelect;
