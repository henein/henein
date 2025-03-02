import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const fetchLogs = async (characterIds: (string | null)[]) => {
  // id가 없을 경우 기본 빈 데이터 반환
  const validCharacterIds = characterIds.filter((id): id is string =>
    id !== null
  );

  if (validCharacterIds.length === 0) {
    return { logs: [] };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mamudae/record?characterIds=${
        validCharacterIds.join(",")
      }`,
      // { cache: "no-store" },
    );

    if (!res.ok) {
      console.error(`API 요청 실패: ${res.status} ${res.statusText}`);
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
  character: (characterIds: (string | null)[]) =>
    queryOptions({
      queryKey: [...recordQueries.all(), ...characterIds],
      queryFn: () => fetchLogs(characterIds),
      staleTime: 1000 * 30, // 30초 동안 캐싱
      placeholderData: keepPreviousData,
    }),
};
