import { recordQueries } from "./queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useRecordQuery = (characterIds: (string | null)[]) => {
  const queryOptions = recordQueries.character(characterIds);

  // 데이터 조회
  const query = useSuspenseQuery(queryOptions);

  return { query };
};
