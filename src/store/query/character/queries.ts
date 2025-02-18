import { queryOptions } from '@tanstack/react-query';

export const setCharactersSignatureList = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nexon/character/list`,
    {
      method: 'POST',
      body: JSON.stringify({ token }),
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.description);
  return data;
};

export const fetchCharactersFromUid = async (uid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nexon/character/list/${uid}`,
  );

  return res.json();
};

export const setCharactersDetail = async (ocid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nexon/character/${ocid}`,
    {
      method: 'POST',
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.description);
  return data;
};

export const fetchSingleCharacter = async (ocid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nexon/character/${ocid}`,
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
};
