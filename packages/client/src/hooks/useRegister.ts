import { useState } from 'react';
import axios from 'axios';

export const useRegister = () => {
  const [state, setState] = useState<{ isLoading: boolean; error?: any }>({
    isLoading: false,
  });

  const register = async (name: string, email: string, password: string) => {
    try {
      setState({ isLoading: true });
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      // 이메일 인증 절차 진행
      setState({ isLoading: false });
    } catch (error) {
      setState({ isLoading: false, error });
    }
  };

  return { ...state, register };
};
