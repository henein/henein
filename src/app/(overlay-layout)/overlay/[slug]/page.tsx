import { Refresher } from './_components/refresher';
import { fetchPrizes } from '@/actions/prize-action';
import { Streamers } from '@/constants';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

export const revalidate = 5;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const OverlayPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;

  const prisma = new PrismaClient();

  const nickname = (
    Streamers.find((streamer) => streamer.id === slug) ?? Streamers[0]
  ).nickname;

  const streamer = await prisma.streamer.findUnique({
    where: { nickname },
  });

  if (!streamer) {
    return notFound();
  }

  const prizes = await fetchPrizes();

  const myPrize = prizes.find((prize) => prize.nickname === streamer?.nickname);
  const myPrizeAmount = myPrize?.prizes.reduce(
    (acc, cur) => acc + cur.amount,
    0,
  );

  const teamPrizeAmount = prizes
    .filter((prize) => prize.team === streamer?.team)
    .reduce(
      (acc, cur) => acc + cur.prizes.reduce((acc, cur) => acc + cur.amount, 0),
      0,
    );

  const winCount = myPrize?.prizes.length ?? 0;
  const loseCount = (await prisma.daily_missions.count()) - winCount;

  return (
    <div className="p-4">
      <Refresher />
      <div className="bg-grey-800 w-full rounded-2xl px-5 py-4 opacity-95 shadow-md">
        <div className="flex h-8 items-center justify-between">
          <div className="flex items-center gap-0.5">
            <svg
              className="fill-brand dark:fill-white-600"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <path d="M32.6801 16.9635C31.9769 16.3245 31.2433 15.4481 30.4277 14.495L26.4261 18.2039L34.6917 25.8645L24.427 19.6961L14.1624 25.8645L22.428 18.2039L14.1624 10.5434L24.427 16.7118L29.6352 13.5812C27.2703 10.9004 24.1914 8 19.3849 8C12.2526 8 10.159 14.1827 7.33003 16.7582C6.25912 17.7345 3 19.7121 3 23.7673C3 26.1376 4.11017 28.3758 6.02888 29.4609C7.33003 30.1963 8.21174 30.5854 10.2465 30.7228C12.4739 30.8728 15.4689 31.1066 19.3849 31.1066C23.3008 31.1066 26.2958 30.8728 28.5232 30.7228C30.558 30.5854 32.1536 30.1963 33.4548 29.4609C35.3735 28.3758 36.4836 26.1376 36.4836 23.7673C36.4836 19.7121 33.751 17.9398 32.6784 16.9653L32.6801 16.9635Z" />
            </svg>
            <p className="text-secondary text-2xl font-bold">
              {winCount}승 {loseCount}패
            </p>
          </div>
          <p className="text-secondary text-2xl font-bold">
            ₩{teamPrizeAmount?.toLocaleString('ko-KR') ?? 0}
          </p>
        </div>
        <h1 className="py-6 text-center text-5xl font-black">
          ₩{myPrizeAmount?.toLocaleString('ko-KR') ?? 0}
        </h1>
      </div>
    </div>
  );
};

export default OverlayPage;
