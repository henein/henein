import { fetchPrizes } from '@/actions/prize-action';
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
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

export const CurrentPrize = async () => {
  const prizes = await fetchPrizes();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>팀명</TableHead>
          <TableHead>닉네임</TableHead>
          <TableHead className="text-right">상금</TableHead>
          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prizes
          .sort((a, b) => ((a.team ?? '') > (b.team ?? '') ? 1 : -1))
          .map((prize) => (
            <TableRow key={prize.nickname}>
              <TableCell>
                {prize.team === 'MAYA' ? '절절승절절배' : '누렁단'}
              </TableCell>
              <TableCell className="font-medium">{prize.nickname}</TableCell>
              <TableCell className="text-right">
                ₩
                {prize.prizes
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
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    // onClick={() =>
                    //   navigator.clipboard.writeText(payment.id)
                    // }
                    >
                      Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
