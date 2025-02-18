import { NEXON_API_ERRORS } from '@/constants/error';

type NexonErrorCode = keyof typeof NEXON_API_ERRORS;
export type NexonErrorRes = {
  error: {
    name: NexonErrorCode;
    message: string;
  };
};

export const handleNexonApiError = (data: NexonErrorRes) => {
  const errorCode = data?.error?.name;
  const { status, message, description } = NEXON_API_ERRORS[errorCode];

  if (status) {
    return { message, description, status };
  }

  return {
    message: 'server error',
    description: '알 수 없는 오류가 발생했습니다.',
    status: 500,
  };
};
