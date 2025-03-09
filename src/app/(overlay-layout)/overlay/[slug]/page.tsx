'use client';

import { fetchData } from './_actions/overlay-action';
import { cn } from '@/utils/shadcn';
import { createClient } from '@/utils/supabase/client';
import NumberFlow from '@number-flow/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OverlayPage = () => {
  const { slug } = useParams();

  const router = useRouter();

  const [data, setData] = useState({
    nickname: '',
    myTeam: '',
    winCount: 0,
    loseCount: 0,
    myPrizeAmount: 0,
    teamPrizeAmount: 0,
  });

  const { winCount, loseCount, myPrizeAmount, teamPrizeAmount } = data;

  useEffect(() => {
    fetchData(slug as string).then((data) => {
      setData(data);
    });
  }, [slug]);

  useEffect(() => {
    const supabase = createClient();

    const changes = supabase
      .channel('overlay', { config: { private: true } })
      .on('broadcast', { event: 'refresh' }, () => {
        router.refresh();
      })
      .on('broadcast', { event: 'reload' }, () => {
        window.location.reload();
      })
      .on('broadcast', { event: 'prize' }, () => {
        fetchData(slug as string).then((data) => {
          setData(data);
        });
      })
      .on('broadcast', { event: 'notice' }, (payload) => {
        const { message, backgroundColor } = payload;
      })
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [router, slug]);

  return (
    <div className="p-4">
      {/* <Refresher /> */}
      <div className="bg-grey-800 relative w-full overflow-hidden rounded-2xl opacity-95 shadow-md">
        <div
          className={cn(
            'flex h-10 items-center justify-between px-5 py-6',
            data.myTeam === 'MAYA' && 'bg-maya/50',
            data.myTeam === 'STAN' && 'bg-stan/50',
          )}
        >
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
            <p className="text-secondary text-2xl font-bold">{data.nickname}</p>
          </div>
          <p className="text-secondary flex gap-1 text-2xl font-bold">
            <NumberFlow value={winCount} suffix="승" />
            <NumberFlow value={loseCount} suffix="패" />
          </p>
        </div>
        <h1 className="py-6 text-center text-5xl font-black">
          <NumberFlow value={myPrizeAmount ?? 0} prefix="₩" />
        </h1>

        {/* <div className="absolute top-19 z-10 bg-stan w-full overflow-hidden rounded-2xl text-2xl opacity-95 shadow-md">
          절절승절절배 이스터님이 하드 세렌을 격파하였습니다.
        </div> */}
      </div>
    </div>
  );
};

export default OverlayPage;
