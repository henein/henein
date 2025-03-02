import { GroupedRecordType } from "@/app/api/mamudae/record/route";
import { STREAMER_COLOR } from "@/constants";
import { profiles as Profile, streamer as Streamer } from "@prisma/client";
import { useMemo } from "react";

interface Props {
  state: (Streamer & { profiles: Profile })[];
  type: "level" | "combat";
  logs: GroupedRecordType;
}

export const useChart = ({ state, type, logs }: Props) => {
  const chartData = useMemo(
    () => transformLogsToChartData({ state, type, logs }),
    [
      state,
      type,
      logs,
    ],
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

  return { chartData, chartConfig };
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
