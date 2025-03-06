'use client';

import { fetchPrizes } from '@/actions/prize-action';
import { Button, StreamerImage } from '@/components';
import ClientPortal from '@/components/ClientPortal';
import { StreamerId, Streamers } from '@/constants';
import NumberFlow from '@number-flow/react';
import { $Enums } from '@prisma/client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type PrizeData = {
  nickname: string;
  team: $Enums.mamudae_team;
  prizes: {
    id: bigint;
    title: string;
    createdAt: Date;
    amount: number;
  }[];
};

const PrizePage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [prizes, setPrizes] = useState<PrizeData[]>([]);
  const [modalData, setModalData] = useState<PrizeData>();

  useEffect(() => {
    fetchPrizes().then((data) => setPrizes(data));
  }, []);

  const stanPrizes = prizes.filter((prize) => prize.team === 'STAN');
  const mayaPrizes = prizes.filter((prize) => prize.team === 'MAYA');

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

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">상금</h2>
      <div className="flex">
        {/* 절절승절절배 */}
        <div className="flex flex-auto flex-col items-center gap-5">
          <strong className="text-2xl font-bold">절절승절절배</strong>
          <div
            className="bg-maya/100 hover:bg-maya/90 active:bg-maya/80 text-white-900 dark:bg-maya/50 dark:hover:bg-maya/60 dark:active:bg-maya/70 w-full cursor-pointer select-none rounded-2xl py-10 text-center text-5xl font-black [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]"
            onClick={() => openTeamModal('MAYA')}
          >
            <NumberFlow
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
            <UserColumn
              data={mayaPrizes}
              streamerId={StreamerId.NAENGIKIM}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={mayaPrizes}
              streamerId={StreamerId.ISEUTEO}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={mayaPrizes}
              streamerId={StreamerId.UDEONG}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={mayaPrizes}
              streamerId={StreamerId.NUSEUNYANG}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={mayaPrizes}
              streamerId={StreamerId.KONGJU}
              onClick={openStreamerModal}
            />
          </div>
        </div>

        <div className="border-default mx-6 w-0 border-l" />

        {/* 누렁즈 */}
        <div className="flex flex-auto flex-col items-center gap-5">
          <strong className="text-2xl font-bold">누렁단</strong>
          <div
            className="text-white-900 bg-stan hover:bg-stan/90 active:bg-stan/80 dark:bg-stan/50 w-full cursor-pointer select-none rounded-2xl py-10 text-center text-5xl font-black [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)] dark:hover:bg-[#DE9300]/60 dark:active:bg-[#DE9300]/70"
            onClick={() => openTeamModal('STAN')}
          >
            <NumberFlow
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
            <UserColumn
              data={stanPrizes}
              streamerId={StreamerId.JIMYEONG}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={stanPrizes}
              streamerId={StreamerId.JJANGJJUNG}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={stanPrizes}
              streamerId={StreamerId.NAMJIO}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={stanPrizes}
              streamerId={StreamerId.YUHIHI}
              onClick={openStreamerModal}
            />
            <UserColumn
              data={stanPrizes}
              streamerId={StreamerId.BAEKDOA}
              onClick={openStreamerModal}
            />
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
  streamerId: StreamerId;
  data: PrizeData[];
  onClick?: (nickname: string) => void;
}) => {
  const streamer =
    Streamers.find((streamer) => streamer.id === props.streamerId) ??
    Streamers[0];

  const total =
    props.data
      .find((prize) => prize.nickname === streamer.nickname)
      ?.prizes.reduce((sum, prize) => sum + prize.amount, 0) || 0;

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
        <span className="text-[32px] font-bold">
          <NumberFlow value={total} prefix="₩" />
        </span>
      </div>
    </div>
  );
};

const PrizeModal = (props: { data?: PrizeData; onClose: () => void }) => {
  return (
    <div className="flex w-[420px] flex-col overflow-hidden rounded-2xl shadow-lg">
      <div className="bg-white-900 dark:bg-grey-800 flex flex-col gap-6 px-6 py-5">
        <h1 className="text-grey-900 dark:text-grey-200 text-xl font-bold">
          상금 내역
        </h1>
        {props.data && props.data.prizes.length > 0 ? (
          <table>
            <tbody>
              {props.data.prizes
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                .map((prize) => (
                  <tr key={prize.id} className="h-8">
                    <td className="text-secondary text-sm">
                      {prize.createdAt.toISOString().split('T')[0]}
                    </td>
                    <td className="text-sm">{prize.title}</td>
                    <td className="text-right text-sm font-bold">
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

      <div className="bg-white-800 dark:bg-grey-700a flex justify-end gap-2 rounded-b-lg px-6 py-4 backdrop-blur-sm">
        <Button sort="secondary" onClick={props.onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};
