'use client';

import ChartNav from './chart-nav';
import {
  Card,
  CardContent,
  CardDescription,
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
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

const Chart = () => {
  const { state } = useRecordSelect();
  const { chartConfig, chartData } = useChart();

  // if (!state.length) {
  //   return (
  //     <Card className="w-full">
  //       <h2 className="flex min-h-[200px] items-center justify-center text-3xl font-bold">
  //         조회하고 싶은 스트리머를 선택해주세요.
  //       </h2>
  //     </Card>
  //   );
  // }

  return (
    <Card className="w-full pt-0">
      <CardHeader>
        {/* header navigator */}
        <ChartNav />

        {/* header info */}
        <CardTitle className="my-3">
          <div className="flex items-center gap-2">
            <span>조회된 스트리머: </span>
            <ul className="flex gap-2">
              {state.map((item) => (
                <li
                  key={item.streamerId}
                  className="bg-black-300 rounded-xl px-2 py-1"
                >
                  {item.profile.nickname}
                </li>
              ))}
            </ul>
          </div>
        </CardTitle>
        {/* <CardTitle>본캐 닉네임: {state.character_id}</CardTitle> */}
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>

      <CardContent>
        {state.length ? (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              {Object.keys(chartConfig).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="natural"
                  stroke={'#FFF'}
                  strokeWidth={2}
                  dot={{
                    fill: '#333',
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        ) : (
          <h2 className="flex min-h-[200px] items-center justify-center text-3xl font-bold">
            캐릭터 정보가 없습니다.
          </h2>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
