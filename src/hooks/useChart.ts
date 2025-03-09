import { GroupedRecordType } from "@/app/api/mamudae/record/route";
import { STREAMER_COLOR } from "@/constants";
import { GetType, TimeRange } from "@/store/zustand/useRecordSelect";
import { profiles as Profile, streamer as Streamer } from "@prisma/client";
import { useMemo } from "react";

interface Props {
  state: (Streamer & { profiles: Profile })[];
  type: GetType;
  logs: GroupedRecordType;
}

export const useChart = (
  { state, type, logs, range }: Props & { range: TimeRange },
) => {
  const chartData = useMemo(
    () => {
      return transformLogsToChartData({ state, type, logs }).filter((item) => {
        if (!range.from || !range.to) return false;
        const date = new Date(item.date);
        return date >= range.from && date <= range.to;
      });
    },
    [state, type, logs, range],
  );

  const chartConfig = useMemo(
    () =>
      state.reduce(
        (acc, { nickname }) => ({
          ...acc,
          [nickname]: {
            label: nickname,
            color: STREAMER_COLOR[nickname] || "#FFF",
          },
        }),
        {} as Record<string, { label: string; color: string }>,
      ),
    [state],
  );

  const grades = useMemo(
    () => genTickGrade({ data: chartData }).grades,
    [chartData],
  );

  return { chartData, chartConfig, grades };
};

const transformLogsToChartData = (
  { state, type, logs }: Props,
) => {
  const chartDataMap: Record<string, Record<string, string | number>> = {};

  Object.entries(logs).forEach(([createdAt, records]) => {
    const date = new Date(createdAt).toISOString();
    chartDataMap[date] = chartDataMap[date] || { date };

    records.forEach((record) => {
      const character = state.find(({ character_id }) =>
        character_id === record.character_id
      );
      if (!character) return;

      const nickname = character.nickname;
      chartDataMap[date][nickname] = type === "level"
        ? record.character_level
        : record.character_combat;
    });
  });

  return Object.values(chartDataMap);
};
interface ParamsTick {
  data: any[];
}

export function genTickGrade({ data }: ParamsTick) {
  const min = Math.floor(
    Math.min(
      ...data.map((item) =>
        Math.min(
          ...(Object.values(item).filter(
            (value) => typeof value === "number",
          ) as number[]),
        )
      ),
    ),
  );

  const max = Math.floor(
    Math.max(
      ...data.map((item) =>
        Math.max(
          ...(Object.values(item).filter(
            (value) => typeof value === "number",
          ) as number[]),
        )
      ),
    ),
  );

  if (min === max) return { grades: [min] };

  const step = Math.round((max - min) / 3);
  const grades = [min, min + step, min + step * 2, max];
  return { grades };
}
