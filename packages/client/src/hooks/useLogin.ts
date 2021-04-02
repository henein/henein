import { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { tokenState } from '../recoils';

export const useLogin = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [state, setState] = useState<{ isLoading: boolean; error?: any }>({
    isLoading: false,
  });

  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setState({ isLoading: true });

      const response = await axios.post<{ accessToken: string }>(
        '/api/auth/login',
        { email, password }
      );
      setToken(response.data.accessToken);

      router.push('/');
    } catch (error) {
      setToken('');
      setState({ isLoading: false, error });
    }
  };

  return { ...state, login };
};
