import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

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

const nicknameSchema = z
  .string()
  .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  .max(20, { message: '닉네임은 최대 20자 이하이어야 합니다.' })
  .regex(/^[가-힣a-zA-Z0-9]+$/, {
    message: '닉네임은 완전한 한글, 영문, 숫자만 사용 가능합니다.',
  });

export const updateUserProfile = async (
  uid: string,
  userForm: { nickname: string | null; image: File | null },
) => {
  try {
    if (userForm.nickname) {
      nicknameSchema.parse(userForm.nickname);
    }

    // FormData 생성
    const formData = new FormData();
    formData.append('nickname', userForm.nickname || '');
    formData.append('image', userForm.image || '');

    // API 요청
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${uid}`,
      {
        method: 'PUT',
        body: formData,
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || '프로필 업데이트에 실패했습니다.');
    }

    return res.json();
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0]?.message || '잘못된 닉네임입니다.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const profileQueries = {
  all: () => ['user'],
  user: (uid: string) =>
    queryOptions({
      queryKey: [...profileQueries.all(), uid],
      queryFn: () => fetchProfile(uid),
    }),
};
