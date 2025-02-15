import { queryOptions } from '@tanstack/react-query';

export const setCharactersSignatureList = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nexon/character/list`,
    {
      method: 'POST',
      body: JSON.stringify({ token }),
    },
  );

  return res.json();
};

export const fetchCharactersFromUid = async (uid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nexon/character/list/${uid}`,
  );

  return res.json();
};

export const characterQueries = {
  all: () => ['character'],
  userLists: (uid: string) => [...characterQueries.all(), 'list', uid],
  userList: (uid: string) =>
    queryOptions({
      queryKey: [...characterQueries.userLists(uid)],
      queryFn: () => fetchCharactersFromUid(uid),
    }),
  // details: (token:string) => [...characterQueries.userLists(token), 'detail'],
  // detail: (token: string, ocid: string) =>
  //   queryOptions({
  //     queryKey: [...characterQueries.details(token), token, ocid],
  //     queryFn: () => getCharacterDetail(token, ocid),
  //   }),
};
