'use client';

import ChartNav from './chart-nav';
import ChartRangeSelector from './chart-range-selector';
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
import { useRecordQuery } from '@/store/query/record';
import useRecordSelect from '@/store/zustand/useRecordSelect';
import { formatNumber } from '@/utils/number';
import dayjs from 'dayjs';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const Chart = () => {
  const { state, type, timeRange } = useRecordSelect();
  const { query } = useRecordQuery();
  const { chartConfig, chartData, grades } = useChart({
    state,
    type,
    range: timeRange,
    logs: query.data.logs,
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
          <h2 className="flex h-[358px] items-center justify-center text-3xl font-bold">
            조회하고 싶은 스트리머를 선택해 주세요.
          </h2>
        ) : chartData.length === 0 ? (
          <h2 className="flex h-[358px] items-center justify-center text-3xl font-bold">
            조회된 데이터가 없습니다.
          </h2>
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
                tickFormatter={(value) => dayjs(value).format('MM/DD')}
                interval={'equidistantPreserveStart'}
                domain={['dataMin', 'dataMax']}
                padding={{ left: 0, right: 20 }}
                tickMargin={10}
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
              />
              <ChartTooltip
                cursor={false}
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
                  stroke={chartConfig[key].color}
                  strokeWidth={2}
                  dot={false}
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
