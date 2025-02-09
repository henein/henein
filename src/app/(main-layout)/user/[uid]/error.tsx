'use client';

import { Button } from '@/components';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold">
        에러가 발생했습니다. 아래 Try again 버튼을 눌러 재시도 해보세요.
      </h2>
      <Button sort={'primary'} onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
