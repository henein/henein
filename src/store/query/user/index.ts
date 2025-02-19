import {
  patchRepresentCharacter,
  profileQueries,
  updateUserProfile,
} from './queries';
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
      queryClient.invalidateQueries(queryOptions);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (userForm: { nickname: string | null; image: File | null }) =>
      updateUserProfile(uid, userForm),
    onSuccess: () => {
      queryClient.invalidateQueries(queryOptions);
      alert('유저 정보가 업데이트 되었습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { query, representMutation, updateProfileMutation };
};

export const prefetchUserProfile = async (uid: string) => {
  const queryClient = new QueryClient();
  const queryOptions = profileQueries.user(uid);

  await queryClient.prefetchQuery(queryOptions);

  return { queryClient };
};
