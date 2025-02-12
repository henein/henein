import { NEXON_API_ERRORS } from '@/constants/error';
import { NextResponse } from 'next/server';

type NexonErrorCode = keyof typeof NEXON_API_ERRORS;
type NexonErrorRes = {
  error: {
    name: NexonErrorCode;
    message: string;
  };
};

export const handleNexonApiError = (data: NexonErrorRes) => {
  const errorCode = data?.error?.name;
  const errorInfo = NEXON_API_ERRORS[errorCode];

  if (errorInfo) {
    return NextResponse.json(
      { message: errorInfo.description },
      { status: errorInfo.status },
    );
  }

  return NextResponse.json(
    { message: '알 수 없는 오류가 발생했습니다.' },
    { status: 500 },
  );
};
