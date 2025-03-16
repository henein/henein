import { Button } from '@/components/shadcnUI/button';
import { Calendar } from '@/components/shadcnUI/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcnUI/popover';
import useRecordSelect from '@/store/zustand/useRecordSelect';
import { cn } from '@/utils/shadcn';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateTime } from 'luxon';

const ChartRangeCalendar = () => {
  const { timeRange, selectRange } = useRecordSelect();

  return (
    <div className="flex justify-end">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'bg-grey-700 w-[225px] justify-start text-left font-normal',
              !timeRange && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {timeRange.from ? (
              timeRange.to ? (
                <>
                  {format(timeRange.from, 'yyyy-MM-dd')} -
                  {format(timeRange.to, 'yyyy-MM-dd')}
                </>
              ) : (
                format(timeRange.from, 'yyyy-MM-dd')
              )
            ) : (
              <span>기간 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-grey-900 w-auto p-0">
          <Calendar
            mode="range"
            selected={{
              from: timeRange.from,
              to: timeRange.to,
            }}
            onSelect={(range) => {
              if (!range?.from) return;

              const fromDate = DateTime.fromJSDate(range.from)
                .startOf('day')
                .toJSDate();
              const toDate = range.to
                ? DateTime.fromJSDate(range.to).endOf('day').toJSDate()
                : undefined;

              // 사용자가 `to`를 `from`보다 이전 날짜로 설정하면, `from`을 유지하고 `to`만 변경
              if (toDate && toDate < fromDate) {
                selectRange({
                  from: fromDate, // 기존 from 유지
                  to: toDate, // 새로운 to 적용
                });
              } else if (toDate) {
                // 일반적인 경우 (범위 선택)
                selectRange({
                  from: fromDate,
                  to: toDate,
                });
              } else {
                // 단일 날짜 선택 시, from 00:00 & to 23:59 설정
                selectRange({
                  from: fromDate,
                  to: DateTime.fromJSDate(fromDate).endOf('day').toJSDate(),
                });
              }
            }}
            className=""
            disabled={(date) =>
              date > new Date() || date < new Date('2025-02-27')
            }
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChartRangeCalendar;
