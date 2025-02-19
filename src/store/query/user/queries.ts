import { queryOptions } from '@tanstack/react-query';

export const fetchProfile = async (uid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${uid}`,
  );

  return res.json();
};

export const patchRepresentCharacter = async (uid: string, char_id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/represent`,
    {
      method: 'PATCH',
      body: JSON.stringify({ uid, char_id }),
    },
  );

  return res.json();
};

export const updateUserProfile = async (
  uid: string,
  userForm: { nickname: string | null; image: File | null },
) => {
  const formData = new FormData();
  formData.append('nickname', userForm.nickname || '');
  formData.append('image', userForm.image || '');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${uid}`,
    {
      method: 'PUT',
      body: formData,
    },
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
