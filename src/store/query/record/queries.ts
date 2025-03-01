import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const fetchLogs = async (chracterIds: (string | null)[]) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mamudae/record?characterIds=${
      chracterIds.join(",")
    }`,
  );

  return res.json();
};

export const recordQueries = {
  all: () => ["record"],
  character: (characterIds: (string | null)[]) =>
    queryOptions({
      queryKey: [...recordQueries.all(), ...characterIds],
      queryFn: () => fetchLogs(characterIds),
      staleTime: 1000 * 30, // 30초 동안 캐싱
      placeholderData: keepPreviousData,
    }),
};
