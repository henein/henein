import { patchRepresentCharacter, profileQueries } from './queries';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useProfile = (uid: string) => {
  const queryClient = useQueryClient();
  const queryOptions = profileQueries.user(uid);

  // 데이터 조회
  const query = useQuery(queryOptions);

  const representMutation = useMutation({
    mutationFn: (char_id: string) => patchRepresentCharacter(uid, char_id),
    onSuccess: () => {
      console.log('hello');
      queryClient.invalidateQueries(queryOptions);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { query, representMutation };
};

export const prefetchUserProfile = async (uid: string) => {
  const queryClient = new QueryClient();
  const queryOptions = profileQueries.user(uid);

  await queryClient.prefetchQuery(queryOptions);

  return { queryClient };
};
