import { queryOptions } from '@tanstack/react-query';

export const fetchProfile = async (uid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${uid}`,
  );

  return res.json();
};

export const profileQueries = {
  all: () => ['user'],
  user: (uid: string) =>
    queryOptions({
      queryKey: [...profileQueries.all(), uid],
      queryFn: () => fetchProfile(uid),
    }),
};
