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
              if (!range) return;
              selectRange(range);
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
