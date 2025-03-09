'use client';

import { deleteDailyMission } from '@/actions/prize-action';
import { Button } from '@/components/shadcnUI/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcnUI/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcnUI/table';
import { Prisma } from '@prisma/client';
import classNames from 'classnames';
import { MoreHorizontal } from 'lucide-react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';

export const getDateString = (isoString: string) => {
  return DateTime.fromISO(isoString, {
    zone: 'utc',
  })
    .setZone('asia/seoul')
    .toFormat('yyLLdd-HH:mm');
};

interface DailyMissionTableProps {
  dailyMissions: Prisma.daily_missionsGetPayload<{
    include: { daily_mission_prizes: { include: { streamer: true } } };
  }>[];
  selectId?: bigint;
  onSelect?: (id?: bigint) => void;
}

export const DailyMissionTable = (props: DailyMissionTableProps) => {
  const router = useRouter();

  async function handleDelete(id: bigint) {
    if (confirm('정말로 삭제하시겠습니까?')) {
      await deleteDailyMission(id);
      router.refresh();
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>날짜</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="text-right">절절승절절배</TableHead>
          <TableHead className="text-right">누렁단</TableHead>
          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.dailyMissions
          .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
          .map((mission) => (
            <TableRow
              key={mission.id}
              className={classNames(
                'cursor-pointer',
                mission.id === props.selectId &&
                  'bg-white-50 hover:bg-white-100',
              )}
              onClick={() => props.onSelect?.(mission.id)}
            >
              <TableCell>
                {getDateString(mission.created_at.toISOString())}
              </TableCell>
              <TableCell className="font-medium">{mission.title}</TableCell>
              <TableCell className="text-right">
                ₩
                {mission.daily_mission_prizes
                  .filter((prize) => prize.streamer.team === 'MAYA')
                  .reduce((total, prize) => total + prize.amount, 0)
                  .toLocaleString('ko-KR')}
              </TableCell>
              <TableCell className="text-right">
                ₩
                {mission.daily_mission_prizes
                  .filter((prize) => prize.streamer.team === 'STAN')
                  .reduce((total, prize) => total + prize.amount, 0)
                  .toLocaleString('ko-KR')}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 cursor-pointer">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className='text-danger-600' onClick={() => handleDelete(mission.id)}>삭제</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
