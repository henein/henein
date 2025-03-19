'use client';

import ChartNav from './chart-nav';
import ChartRangeSelector from './chart-range-selector';
import { GroupedRecordType } from '@/app/api/mamudae/record/route';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcnUI/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/shadcnUI/chart';
import { useChart } from '@/hooks/useChart';
import useRecordSelect from '@/store/zustand/useRecordSelect';
import { formatNumber } from '@/utils/number';
import type { streamer } from '@prisma/client';
import { scalePow } from 'd3-scale';
import dayjs from 'dayjs';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

interface Props {
  logs: GroupedRecordType;
  streamers: streamer[];
}

const Chart = ({ logs, streamers }: Props) => {
  const { state, type, timeRange } = useRecordSelect();
  const { chartConfig, chartData, grades } = useChart({
    state,
    type,
    range: timeRange,
    logs: logs || [],
  });

  return (
    <Card className="w-full pt-0">
      <CardHeader>
        {/* header navigator */}
        <ChartNav />

        {/* header info */}
        <CardTitle className="my-3">
          <div className="flex w-full gap-2">
            <span className="relative top-1 min-w-[105px]">
              조회된 스트리머:
            </span>
            <ul className="flex w-[88%] flex-wrap gap-2">
              {state.map((item) => (
                <li
                  key={item.id}
                  className="bg-black-300 h-fit rounded-lg px-2 py-1"
                >
                  {item.nickname}
                </li>
              ))}
            </ul>
          </div>
        </CardTitle>

        {/* header range selector */}
        <ChartRangeSelector />
      </CardHeader>

      <CardContent>
        {state.length === 0 ? (
          <span className="flex h-[358px] items-center justify-center text-3xl font-bold">
            조회하고 싶은 스트리머를 선택해 주세요.
          </span>
        ) : chartData.length === 0 ? (
          <span className="flex h-[358px] items-center justify-center text-3xl font-bold">
            조회된 데이터가 없습니다.
          </span>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={true}
                tickFormatter={(value) => dayjs(value).format('MM/DD HH:mm')}
                interval={'equidistantPreserveStart'}
                domain={['dataMin', 'dataMax']}
                tick={<CustomizedTick />}
                padding={{ right: 20 }}
                tickMargin={8}
                minTickGap={60}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                padding={{ top: 20, bottom: 20 }}
                tickFormatter={(value) =>
                  type === 'level' ? `${value} lv` : formatNumber(value)
                }
                domain={['dataMin', 'dataMax']}
                ticks={grades}
                tickMargin={5}
                scale={type === 'level' ? scalePow().exponent(10) : 'linear'}
              />
              <ChartTooltip
                cursor={{ strokeWidth: 2 }}
                content={
                  <ChartTooltipContent
                    valueFormatter={(value) =>
                      type === 'level'
                        ? `${value}lv`
                        : formatNumber(Number(value))
                    }
                    labelFormatter={(value) =>
                      new Date(value).toLocaleString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    }
                  />
                }
              />
              {Object.keys(chartConfig).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={
                    streamers.find((s) => s.nickname === key)?.color ?? ''
                  }
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                  activeDot={{
                    r: 6,
                  }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;

const CustomizedTick = ({ ...props }) => {
  const { x, y, payload } = props;
  const [date, time] = dayjs(payload.value).format('MM/DD HH:mm').split(' ');

  return (
    <g transform={`translate(${x},${y})`} textAnchor="middle">
      <text y={-5} fill="#666" fontSize={12} dy={10}>
        {date}
      </text>
      <text y={10} fill="#666" fontSize={10} dy={6}>
        {time}
      </text>
    </g>
  );
};
