import { Button } from '@/components';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold">해당 사용자를 찾을 수 없습니다.</h2>
      <Link href={'/'}>
        <Button sort={'primary'}>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
