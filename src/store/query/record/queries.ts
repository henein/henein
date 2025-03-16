import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const fetchLogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mamudae/record`,
    );

    if (res.status === 404) {
      return { logs: [] };
    }

    return res.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return { logs: [] };
  }
};

export const recordQueries = {
  all: () => ["record"],
  character: () =>
    queryOptions({
      queryKey: [...recordQueries.all()],
      queryFn: () => fetchLogs(),
      staleTime: 1000 * 30, // 30초 동안 캐싱
      placeholderData: keepPreviousData,
    }),
};
