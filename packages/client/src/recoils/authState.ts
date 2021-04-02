import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: { isLoading: true, isLogin: false },
});
