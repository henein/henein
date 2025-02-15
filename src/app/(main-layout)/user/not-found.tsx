import { MamudaeLayout, Typography } from '@/components';

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-2">
      <h1 className="text-black-800 dark:text-white-900 text-5xl font-black">
        404
      </h1>
      <Typography type="secondary">페이지를 찾을 수 없습니다.</Typography>
    </div>
  );
}
