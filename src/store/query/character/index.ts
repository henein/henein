import {
  characterQueries,
  setCharactersDetail,
  setCharactersSignatureList,
} from './queries';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useCharacterDetail = (uid: string, ocid: string) => {
  const queryClient = useQueryClient();
  const queryOptions = characterQueries.userList(uid);

  // 데이터 mutate
  const mutation = useMutation({
    mutationFn: () => setCharactersDetail(ocid),
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries(queryOptions);
    },
    onError: (error) => {
      alert(`${error.message}`);
    },
  });

  return { mutation };
};

export const useCharacterSignatureList = (uid: string) => {
  const queryClient = useQueryClient();
  const queryOptions = characterQueries.userList(uid);

  // 데이터 조회
  const query = useQuery(queryOptions);

  // 데이터 mutate
  const mutation = useMutation({
    mutationFn: (token: string) => setCharactersSignatureList(token),
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries(queryOptions);
    },
    onError: (error) => {
      alert(`${error.message}`);
    },
  });

  return { query, mutation };
};

export const prefetchUserCharacterList = async (uid: string) => {
  const queryClient = new QueryClient();
  const queryOptions = characterQueries.userList(uid);

  await queryClient.prefetchQuery(queryOptions);

  return { queryClient };
};
