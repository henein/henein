import { profileQueries } from './queries';
import { QueryClient, useQuery } from '@tanstack/react-query';

export const useProfile = (uid: string) => {
  const queryOptions = profileQueries.user(uid);

  // 데이터 조회
  const query = useQuery(queryOptions);

  return { query };
};

export const prefetchUserProfile = async (uid: string) => {
  const queryClient = new QueryClient();
  const queryOptions = profileQueries.user(uid);

  await queryClient.prefetchQuery(queryOptions);

  return { queryClient };
};
