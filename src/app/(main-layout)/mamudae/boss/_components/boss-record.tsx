'use client';

import { deleteBoss, postBoss, updateBoss } from '@/actions/boss-action';
import { DateTimePicker } from '@/components/date-time-picker';
import { Button } from '@/components/shadcnUI/button';
import { Combobox } from '@/components/shadcnUI/combobox';
import { Input } from '@/components/shadcnUI/input';
import { Label } from '@/components/shadcnUI/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcnUI/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcnUI/tooltip';
import { getTimeString } from '@/utils/time';
import type { $Enums, streamer } from '@prisma/client';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const BossRecord = ({
  data,
  isWinner,
  isAdmin,
  ...props
}: {
  data?: {
    streamer: string;
    streamerId: string;
    created_at: Date;
    party: string | null;
  };
  team: $Enums.mamudae_team;
  boss_id: string;
  difficulty: string;
  isWinner: boolean;
  isAdmin: boolean;
  streamers: streamer[];
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!data) {
    if (!isAdmin) {
      return (
        <div className="text-secondary flex flex-1 items-center justify-center rounded-[8px]">
          -
        </div>
      );
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={classNames(
            'text-secondary flex flex-1 items-center justify-center rounded-[8px]',
            isAdmin && 'hover:bg-white-25',
          )}
        >
          -
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <UpsetForm
            streamers={props.streamers}
            createdAt={new Date()}
            onSubmit={async (data) => {
              if (
                await postBoss({
                  boss_id: props.boss_id,
                  difficulty: props.difficulty,
                  team: props.team,
                  date: data.date,
                  party: data.party ?? null,
                  streamer_id: data.streamerId,
                })
              ) {
                setOpen(false);
                router.refresh();
              }
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-secondary flex flex-1 items-center justify-center rounded-[8px]">
        {data.party && data.party.length > 0 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex flex-col items-center justify-center">
                <span
                  className={classNames(
                    'flex items-center text-sm',
                    isWinner
                      ? 'text-brand mr-1 font-bold'
                      : 'text-primary font-semibold',
                  )}
                >
                  {isWinner && (
                    <span className="icon icon-16-fill mr-0.5">crown</span>
                  )}
                  {data.streamer}+
                </span>
                <span className="flex text-xs">
                  {getTimeString(data.created_at.toISOString())}
                </span>
              </TooltipTrigger>
              <TooltipContent>{data.party}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span
              className={classNames(
                'flex items-center text-sm',
                isWinner
                  ? 'text-brand mr-1 font-bold'
                  : 'text-primary font-semibold',
              )}
            >
              {isWinner && (
                <span className="icon icon-16-fill mr-0.5">crown</span>
              )}
              {data.streamer}
            </span>
            <span className="flex text-xs">
              {getTimeString(data.created_at.toISOString())}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={classNames(
          'text-secondary flex flex-1 cursor-pointer items-center justify-center rounded-[8px]',
          isAdmin && 'hover:bg-white-25',
        )}
      >
        {data.party && data.party.length > 0 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex cursor-pointer flex-col items-center justify-center">
                <span
                  className={classNames(
                    'flex items-center text-sm',
                    isWinner
                      ? 'text-brand mr-1 font-bold'
                      : 'text-primary font-semibold',
                  )}
                >
                  {isWinner && (
                    <span className="icon icon-16-fill mr-0.5">crown</span>
                  )}
                  {data.streamer}+
                </span>
                <span className="flex text-xs">
                  {getTimeString(data.created_at.toISOString())}
                </span>
              </TooltipTrigger>
              <TooltipContent>{data.party}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex cursor-pointer flex-col items-center justify-center">
            <span
              className={classNames(
                'flex items-center text-sm',
                isWinner
                  ? 'text-brand mr-1 font-bold'
                  : 'text-primary font-semibold',
              )}
            >
              {isWinner && (
                <span className="icon icon-16-fill mr-0.5">crown</span>
              )}
              {data.streamer}
            </span>
            <span className="flex text-xs">
              {getTimeString(data.created_at.toISOString())}
            </span>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <UpsetForm
          streamers={props.streamers}
          createdAt={data.created_at}
          defaultStreamerId={data.streamerId}
          defaultParty={data.party ?? undefined}
          onSubmit={async (data) => {
            if (
              await updateBoss({
                boss_id: props.boss_id,
                difficulty: props.difficulty,
                team: props.team,
                date: data.date,
                party: data.party ?? null,
                streamer_id: data.streamerId,
              })
            ) {
              setOpen(false);
              router.refresh();
            }
          }}
          onDelete={async () => {
            if (confirm('정말 삭제하시겠습니까?')) {
              if (
                await deleteBoss({
                  boss_id: props.boss_id,
                  difficulty: props.difficulty,
                  team: props.team,
                })
              ) {
                setOpen(false);
                router.refresh();
              }
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

const UpsetForm = (props: {
  streamers: streamer[];
  createdAt: Date;
  defaultStreamerId?: string;
  defaultParty?: string;
  onSubmit: (data: { date: Date; streamerId: string; party?: string }) => void;
  onDelete?: () => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(props.createdAt);
  const [streamerId, setStreamerId] = useState<string | undefined>(
    props.defaultStreamerId,
  );
  const [party, setParty] = useState<string | undefined>(props.defaultParty);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (date && streamerId) {
      props.onSubmit({
        date: DateTime.fromJSDate(date, { zone: 'asia/seoul' })
          .setZone('utc')
          .toJSDate(),
        streamerId,
        party: party ?? undefined,
      });
    } else {
      alert('데이터를 확인해주세요.');
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h4 className="font-medium leading-none">기록 등록</h4>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label>시간</Label>
          <DateTimePicker
            className="col-span-2 h-8"
            date={date}
            onChange={setDate}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label>대표</Label>
          <Combobox
            className="col-span-2 h-8"
            data={props.streamers.map((streamer) => ({
              label: streamer.nickname,
              value: streamer.id,
            }))}
            value={streamerId ?? ''}
            onChange={setStreamerId}
          />
        </div>
        <div className="mb-1 grid grid-cols-3 items-center gap-4">
          <Label>추가 정보</Label>
          <Input
            defaultValue={party}
            className="col-span-2 h-8"
            onChange={(event) => {
              setParty(event.target.value);
            }}
          />
        </div>
        <Button>저장</Button>
        {props.onDelete && (
          <Button type="button" variant="destructive" onClick={props.onDelete}>
            삭제
          </Button>
        )}
      </div>
    </form>
  );
};
