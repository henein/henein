import { profiles as Profile, streamer as Streamer } from "@prisma/client";
import { create } from "zustand";

type GetType = "level" | "combat";

interface Store {
  state: (Streamer & { profiles: Profile })[];
  type: GetType;
  select: (data: Streamer & { profiles: Profile }) => void;
  unselect: (select_id: string) => void;
  selectType: (type: GetType) => void;
}

const useRecordSelect = create<Store>()((set) => ({
  state: [],
  type: "level",
  select: (data) => set((prev) => ({ state: [...prev.state, data] })),
  unselect: (select_id) =>
    set((prev) => ({
      state: prev.state.filter((item) => item.id !== select_id),
    })),
  selectType: (type) => set(() => ({ type })),
}));

export default useRecordSelect;
