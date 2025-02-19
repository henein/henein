import { useEffect, useRef, useState } from 'react';

export const useProfileHandler = (prevName: string) => {
  const userFormRef = useRef<{ image: File | null; nickname: string | null }>({
    image: null,
    nickname: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  // 닉네임이 변경될 때, userFormRef 업데이트
  const nicknameRefCallback = (value: string) => {
    userFormRef.current.nickname = value;
    setNickname(value);
  };

  useEffect(() => {
    setIsDisabled(!(previewUrl || nickname) || nickname === prevName);
  }, [previewUrl, nickname, prevName]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      userFormRef.current.image = selectedImage;
      setPreviewUrl(URL.createObjectURL(selectedImage));
    }
  };

  return {
    userForm: userFormRef.current,
    previewUrl,
    isDisabled,
    setNickname: nicknameRefCallback,
    handleImageUpload,
  };
};
