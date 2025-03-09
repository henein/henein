import { recordQueries } from "./queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useRecordQuery = () => {
  const queryOptions = recordQueries.character();

  // 데이터 조회
  const query = useSuspenseQuery(queryOptions);

  return { query };
};
