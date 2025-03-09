import Chart from './_components/chart';
import Team from './_components/team';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcnUI/card';
import { Skeleton } from '@/components/shadcnUI/skeleton';
import { prisma } from '@/utils/prisma';

// const Chart = lazy(() => import('./_components/chart'));

const RecordPage = async () => {
  const streamers = await prisma.streamer.findMany();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">성장 현황</h2>
      {/* <Suspense fallback={<SkeletonFallbackUI />}> */}
      <Chart streamers={streamers} />
      {/* </Suspense> */}
      <div className="flex flex-wrap justify-around gap-y-4 my-8">
        <Team type="MAYA" streamers={streamers} />
        <Team type="STAN" streamers={streamers} />
      </div>
    </div>
  );
};

export default RecordPage;

const SkeletonFallbackUI = () => {
  return (
    <Card className="w-full pt-0">
      <CardHeader>
        <div className="flex w-full gap-3 border-b">
          <Skeleton className="h-[76px] w-1/2 rounded-none" />
          <Skeleton className="h-[76px] w-1/2 rounded-none" />
        </div>
        <CardTitle className="my-3">
          <Skeleton className="h-6 w-[120px]" />
        </CardTitle>

        <div className="flex justify-end">
          <Skeleton className="h-8 w-[230px]" />
        </div>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-[350px] w-full" />
      </CardContent>
    </Card>
  );
};
