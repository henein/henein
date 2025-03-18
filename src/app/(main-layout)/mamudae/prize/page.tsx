'use client';

import { fetchPrizes } from '@/actions/prize-action';
import { Button, StreamerImage } from '@/components';
import ClientPortal from '@/components/ClientPortal';
import { Streamers } from '@/constants';
import { createClient } from '@/utils/supabase/client';
import NumberFlow from '@number-flow/react';
import { $Enums, daily_missions } from '@prisma/client';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type StreamerPrizeData = {
  nickname: string;
  team: $Enums.mamudae_team | null;
  order: number;
  prizes: {
    id: bigint;
    title: string;
    createdAt: Date;
    amount: number;
  }[];
};

const PrizePage = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [prizes, setPrizes] = useState<StreamerPrizeData[]>([]);
  const [dailyMissions, setDailyMissions] = useState<daily_missions[]>();
  const [modalData, setModalData] = useState<StreamerPrizeData>();

  useEffect(() => {
    fetchPrizes().then((data) => {
      setPrizes(data.streamers);
      setDailyMissions(data.dailyMissions);
    });
  }, []);

  const mayaPrizes = prizes.filter((prize) => prize.team === 'MAYA');
  const stanPrizes = prizes.filter((prize) => prize.team === 'STAN');

  const openTeamModal = (team: $Enums.mamudae_team) => {
    const data = prizes
      .filter((prize) => prize.team === team)
      .reduce(
        (acc, cur) => {
          cur.prizes.forEach((prize) => {
            const index = acc.prizes.findIndex((p) => p.id === prize.id);

            if (index === -1) {
              acc.prizes.push({ ...prize });
              return;
            }

            acc.prizes[index].amount += prize.amount;
          });

          return acc;
        },
        {
          team: team,
          nickname: '',
          order: 0,
          prizes: [] as {
            id: bigint;
            title: string;
            createdAt: Date;
            amount: number;
          }[],
        },
      );

    setModalData(data);
    setShowModal(true);
  };

  const openStreamerModal = (nickname: string) => {
    const data = prizes
      .filter((prize) => prize.nickname === nickname)
      .reduce(
        (acc, cur) => {
          cur.prizes.forEach((prize) => {
            acc.prizes.push({ ...prize });
          });
          return acc;
        },
        {
          team: 'STAN',
          nickname: nickname,
          order: 0,
          prizes: [] as {
            id: bigint;
            title: string;
            createdAt: Date;
            amount: number;
          }[],
        },
      );

    setModalData(data);
    setShowModal(true);
  };

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
        fetchPrizes().then((data) => {
          setPrizes(data.streamers);
          setDailyMissions(data.dailyMissions);
        });
      })
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [router]);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">상금</h2>
      <div className="flex">
        {/* 절절승절절배 */}
        <div className="flex flex-1 flex-col items-center gap-5">
          <strong className="text-2xl font-bold">절절승절절배</strong>
          <div
            className="bg-maya/100 hover:bg-maya/90 active:bg-maya/80 text-white-900 dark:bg-maya/50 dark:hover:bg-maya/60 dark:active:bg-maya/70 w-full cursor-pointer select-none rounded-2xl py-7 text-center text-5xl font-black"
            onClick={() => openTeamModal('MAYA')}
          >
            <div className="text-secondary flex items-center justify-center gap-0.5">
              <span className="icon icon-24-fill">trophy</span>
              <NumberFlow
                className="text-xl font-semibold"
                value={
                  dailyMissions?.reduce(
                    (acc, mission) =>
                      mission.win_team === 'MAYA' ? acc + 1 : acc,
                    0,
                  ) ?? 0
                }
              />
            </div>
            <NumberFlow
              className="font-price [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]"
              value={mayaPrizes.reduce(
                (acc, cur) =>
                  acc +
                  cur.prizes.reduce((sum, prize) => sum + prize.amount, 0),
                0,
              )}
              prefix="₩"
            />
          </div>
          <div>
            {mayaPrizes
              .sort(
                (a, b) =>
                  b.prizes.reduce((sum, prize) => sum + prize.amount, 0) -
                  a.prizes.reduce((sum, prize) => sum + prize.amount, 0),
              )
              .map((prize) => (
                <UserColumn
                  key={prize.nickname}
                  data={prize}
                  onClick={openStreamerModal}
                />
              ))}
          </div>
        </div>

        <div className="border-default mx-6 w-0 border-l" />

        {/* 누렁즈 */}
        <div className="flex flex-1 flex-col items-center gap-5">
          <strong className="text-2xl font-bold">누렁단</strong>
          <div
            className="bg-stan/100 hover:bg-stan/90 active:bg-stan/80 text-white-900 dark:bg-stan/50 dark:hover:bg-stan/60 dark:active:bg-stan/70 w-full cursor-pointer select-none rounded-2xl py-7 text-center text-5xl font-black"
            onClick={() => openTeamModal('STAN')}
          >
            <div className="text-secondary flex items-center justify-center gap-0.5">
              <span className="icon icon-24-fill">trophy</span>
              <NumberFlow
                className="text-xl font-semibold"
                value={
                  dailyMissions?.reduce(
                    (acc, mission) =>
                      mission.win_team === 'STAN' ? acc + 1 : acc,
                    0,
                  ) ?? 0
                }
              />
            </div>
            <NumberFlow
              className="font-price [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]"
              value={stanPrizes.reduce(
                (acc, cur) =>
                  acc +
                  cur.prizes.reduce((sum, prize) => sum + prize.amount, 0),
                0,
              )}
              prefix="₩"
            />
          </div>
          <div>
            {stanPrizes
              .sort(
                (a, b) =>
                  b.prizes.reduce((sum, prize) => sum + prize.amount, 0) -
                  a.prizes.reduce((sum, prize) => sum + prize.amount, 0),
              )
              .map((prize) => (
                <UserColumn
                  key={prize.nickname}
                  data={prize}
                  onClick={openStreamerModal}
                />
              ))}
          </div>
        </div>
      </div>
      <ClientPortal show={showModal} onClose={() => setShowModal(false)}>
        <PrizeModal data={modalData} onClose={() => setShowModal(false)} />
      </ClientPortal>
    </div>
  );
};

export default PrizePage;

const UserColumn = (props: {
  className?: string;
  data: StreamerPrizeData;
  onClick?: (nickname: string) => void;
}) => {
  const streamer =
    Streamers.find((streamer) => streamer.nickname === props.data.nickname) ??
    Streamers[0];

  const total =
    props.data.prizes.reduce((sum, prize) => sum + prize.amount, 0) || 0;

  return (
    <div
      className={classNames(
        'hover:bg-black-25 active:bg-black-50 dark:hover:bg-white-50 dark:active:bg-white-100 flex w-[290px] cursor-pointer select-none flex-col gap-8 rounded-2xl p-2.5',
        props.className,
      )}
      onClick={() => props.onClick?.(streamer.nickname)}
    >
      <div className="flex items-center justify-between">
        <StreamerImage
          className="border-default border"
          streamer={streamer}
          size={48}
        />
        <span className="font-price text-[32px] font-bold">
          <NumberFlow value={total} prefix="₩" />
        </span>
      </div>
    </div>
  );
};

const PrizeModal = (props: {
  data?: StreamerPrizeData;
  onClose: () => void;
}) => {
  return (
    <div className="flex max-h-[80vh] w-[420px] flex-col overflow-hidden rounded-2xl shadow-lg">
      <div className="bg-white-900 dark:bg-grey-800 flex h-full flex-col gap-6 overflow-auto px-6 py-5">
        <h1 className="text-grey-900 dark:text-grey-200 text-xl font-bold">
          상금 내역
        </h1>
        <div className="[&::-webkit-scrollbar-thumb]:bg-grey-300 dark:[&::-webkit-scrollbar-thumb]:bg-white-100 [&::-webkit-scrollbar-track]:bg-white-900/0 flex-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar]:w-1">
          {props.data && props.data.prizes.length > 0 ? (
            <table className="w-full">
              <tbody>
                {props.data.prizes
                  .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                  .map((prize) => (
                    <tr key={prize.id} className="h-8">
                      <td className="text-secondary text-sm">
                        {prize.createdAt.toISOString().split('T')[0]}
                      </td>
                      <td className="text-sm">{prize.title}</td>
                      <td className="font-price text-right text-sm font-bold">
                        ₩{prize.amount.toLocaleString('ko-KR')}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">상금 내역이 없습니다.</div>
          )}
        </div>
      </div>

      <div className="bg-white-800 dark:bg-grey-700a flex justify-end gap-2 rounded-b-lg px-6 py-4 backdrop-blur-sm">
        <Button sort="secondary" onClick={props.onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};
