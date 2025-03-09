'use client';

import { DailyMissionTable } from './daily-mission-table';
import { createDailyMission, upsertDailyMission } from '@/actions/prize-action';
import { DateTimePicker } from '@/components/date-time-picker';
import { Button } from '@/components/shadcnUI/button';
import { Input } from '@/components/shadcnUI/input';
import { Label } from '@/components/shadcnUI/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcnUI/popover';
import { Switch } from '@/components/shadcnUI/switch';
import { convertSeoulToUtc } from '@/utils/time';
import type { Prisma, streamer } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const PrizeManagementForm = (props: {
  dailyMissions: Prisma.PrismaPromise<
    Prisma.daily_missionsGetPayload<{
      include: { daily_mission_prizes: { include: { streamer: true } } };
    }>[]
  >;
  streamers: Prisma.PrismaPromise<streamer[]>;
}) => {
  const dailyMissions = use(props.dailyMissions);
  const streamers = use(props.streamers);

  const router = useRouter();

  const [selectedMission, setSelectedMission] = useState<
    | Prisma.daily_missionsGetPayload<{
        include: { daily_mission_prizes: { include: { streamer: true } } };
      }>
    | undefined
  >();

  const [prizes, setPrizes] = useState<Record<string, { amount: number }>>({});

  const [isMayaWin, setIsMayaWin] = useState(false);
  const [isStanWin, setIsStanWin] = useState(false);
  const [mayaAmount, setMayaAmount] = useState(0);
  const [stanAmount, setStanAmount] = useState(0);

  const { control, register, handleSubmit, setValue } = useForm<{
    title: string;
    date: Date;
  }>();

  useEffect(() => {
    setValue('title', selectedMission?.title ?? '');
    setValue('date', selectedMission?.created_at ?? new Date());

    setPrizes(
      selectedMission?.daily_mission_prizes.reduce(
        (acc, prize) => {
          acc[prize.streamer.id] = {
            amount: prize.amount,
          };
          return acc;
        },
        {} as Record<string, { amount: number }>,
      ) ?? {},
    );
  }, [selectedMission, setValue]);

  useEffect(() => {
    setIsMayaWin(selectedMission?.win_team === 'MAYA');
    setIsStanWin(selectedMission?.win_team === 'STAN');
    setMayaAmount(
      streamers
        .filter((streamer) => streamer.team === 'MAYA')
        .reduce((acc, streamer) => acc + prizes[streamer.id]?.amount, 0),
    );
    setStanAmount(
      streamers
        .filter((streamer) => streamer.team === 'STAN')
        .reduce((acc, streamer) => acc + prizes[streamer.id]?.amount, 0),
    );
  }, [streamers, prizes]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="h-fit">
            <Button className="w-full">미션 추가</Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <CreateMissionForm
              onSubmit={async (data) => {
                const winTeam = isMayaWin ? 'MAYA' : isStanWin ? 'STAN' : null;

                if (
                  await createDailyMission({
                    title: data.title,
                    date: data.date,
                    winTeam,
                  })
                ) {
                  setOpen(false);
                  router.refresh();
                }
              }}
            />
          </PopoverContent>
        </Popover>
        <div className="col-span-3">
          <DailyMissionTable
            dailyMissions={dailyMissions}
            selectId={selectedMission?.id}
            onSelect={(id) => {
              setSelectedMission(
                dailyMissions.find((mission) => mission.id === id),
              );
            }}
          />
        </div>
      </div>
      {selectedMission && (
        <form
          className="mt-4 flex flex-col"
          onSubmit={handleSubmit(async (values) => {
            const result = await upsertDailyMission({
              dailyMissionId: selectedMission.id,
              title: values.title,
              date: convertSeoulToUtc(values.date),
              winTeam: isMayaWin ? 'MAYA' : isStanWin ? 'STAN' : null,
              prizes: Object.entries(prizes).map(([streamerId, prize]) => ({
                streamerId,
                amount: prize.amount,
              })),
            });

            if (!result) {
              alert('저장에 실패했습니다.');
              return;
            }

            setSelectedMission(undefined);
            router.refresh();
          })}
        >
          <div className="py-2">
            <h4 className="font-medium leading-none">상금 등록</h4>
          </div>
          <div className="mb-1 grid grid-cols-4 items-center gap-4">
            <Label>제목</Label>
            <Input className="col-span-3 h-8" {...register('title')} />
            <Label>날짜</Label>

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DateTimePicker
                  className="col-span-3 h-8"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            <div className="col-span-3 col-start-2 my-4 grid grid-cols-2 gap-4">
              <div className="mb-4 flex flex-col gap-2">
                <div className="text-maya flex items-center justify-between font-bold">
                  절절승절절배
                  <div className="flex items-center">
                    <Label className="text-secondary mr-2">승리</Label>
                    <Switch
                      checked={isMayaWin}
                      onCheckedChange={(checked) => {
                        setIsMayaWin(checked);

                        if (checked) {
                          setIsStanWin(!checked);
                        }
                      }}
                    />
                  </div>
                </div>
                <Input
                  type="number"
                  className="col-span-3 h-8"
                  placeholder="0"
                  value={Math.floor(mayaAmount)}
                  onChange={(e) =>
                    setPrizes((value) => {
                      const result = { ...value };
                      streamers
                        .filter((streamer) => streamer.team === 'MAYA')
                        .forEach((streamer) => {
                          result[streamer.id] = {
                            ...result[streamer.id],
                            amount: parseInt(e.target.value ?? 0) / 5,
                          };
                        });
                      return result;
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-stan flex items-center justify-between font-bold">
                  누렁단
                  <div className="flex items-center">
                    <Label className="text-secondary mr-2">승리</Label>
                    <Switch
                      checked={isStanWin}
                      onCheckedChange={(checked) => {
                        setIsStanWin(checked);

                        if (checked) {
                          setIsMayaWin(!checked);
                        }
                      }}
                    />
                  </div>
                </div>
                <Input
                  type="number"
                  className="col-span-3 h-8"
                  placeholder="0"
                  value={Math.floor(stanAmount)}
                  onChange={(e) =>
                    setPrizes((value) => {
                      const result = { ...value };
                      streamers
                        .filter((streamer) => streamer.team === 'STAN')
                        .forEach((streamer) => {
                          result[streamer.id] = {
                            ...result[streamer.id],
                            amount: parseInt(e.target.value ?? 0) / 5,
                          };
                        });
                      return result;
                    })
                  }
                />
              </div>
              {streamers.map((streamer) => (
                <div key={streamer.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    {streamer.nickname}
                    <div className="flex items-center">
                      <Label className="text-secondary mr-2">승리</Label>
                    </div>
                  </div>
                  <Input
                    type="number"
                    className="col-span-3 h-8"
                    placeholder="0"
                    value={Math.floor(prizes[streamer.id]?.amount)}
                    onChange={(e) =>
                      setPrizes((value) => {
                        value[streamer.id] = {
                          ...value[streamer.id],
                          amount: parseInt(e.target.value ?? 0),
                        };
                        return { ...value };
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="col-span-3 col-start-2 flex gap-4">
              <Button
                className="flex-1"
                type="button"
                variant="outline"
                onClick={() => setSelectedMission(undefined)}
              >
                취소
              </Button>
              <Button className="flex-1" type="submit">
                저장
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const CreateMissionForm = (props: {
  onSubmit: (data: { date: Date; title: string }) => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (date && title) {
      props.onSubmit({
        date: convertSeoulToUtc(date),
        title,
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
        <div className="mb-1 grid grid-cols-3 items-center gap-4">
          <Label>제목</Label>
          <Input
            className="col-span-2 h-8"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label>날짜</Label>
          <DateTimePicker
            className="col-span-2 h-8"
            value={date}
            onChange={setDate}
          />
        </div>
        <Button>저장</Button>
      </div>
    </form>
  );
};
