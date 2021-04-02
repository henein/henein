import { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState } from '../recoils';

export const useLogout = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [state, setState] = useState<{ isLoading: boolean; error?: any }>({
    isLoading: false,
  });

  const logout = async (email: string, password: string) => {
    try {
      setState({ isLoading: true });
      await axios.post('/api/auth/logout');
      setToken('');
      setState({ isLoading: false });
    } catch (error) {
      setState({ isLoading: false, error });
    }
  };

  return { ...state, logout };
};
