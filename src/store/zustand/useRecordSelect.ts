import { profiles as Profile, streamer as Streamer } from '@prisma/client';
import { DateTime } from 'luxon';
import { create } from 'zustand';

export type GetType = 'level' | 'combat';
export type TimeRange = {
  from?: Date;
  to?: Date;
};

interface Store {
  state: (Streamer & { profiles: Profile })[];
  type: GetType;
  timeRange: TimeRange;
  select: (data: Streamer & { profiles: Profile }) => void;
  unselect: (select_id: string) => void;
  selectType: (type: GetType) => void;
  selectRange: (range: TimeRange) => void;
}

const useRecordSelect = create<Store>()((set) => {
  const to = DateTime.now().toJSDate();
  const from = DateTime.now().minus({ days: 1 }).toJSDate();

  return {
    state: [],
    type: 'level',
    timeRange: { from, to },
    select: (data) => set((prev) => ({ state: [...prev.state, data] })),
    unselect: (select_id) =>
      set((prev) => ({
        state: prev.state.filter((item) => item.id !== select_id),
      })),
    selectType: (type) => set(() => ({ type })),
    selectRange: (range: TimeRange | undefined) =>
      set(() => ({ timeRange: range ?? {} })),
  };
});

export default useRecordSelect;
