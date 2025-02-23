import { create } from 'zustand';

type stateType = { id: string | null; character_id: string | null };

interface Store {
  state: stateType;
  select: (data: stateType) => void;
}

const useRecordSelect = create<Store>()((set) => ({
  state: { id: null, character_id: null },
  select: (data) =>
    set(() => ({ state: { id: data.id, character_id: data.character_id } })),
}));

export default useRecordSelect;
