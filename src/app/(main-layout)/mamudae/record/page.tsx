import Team from './_components/team';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcnUI/card';
import { Skeleton } from '@/components/shadcnUI/skeleton';
import React, { lazy, Suspense } from 'react';

const Chart = lazy(() => import('./_components/chart'));

const RecordPage = () => {
  return (
    <div className="mx-auto my-auto flex h-full w-full max-w-[1024px] flex-col gap-8">
      <Suspense fallback={<SkeletonFallbackUI />}>
        <Chart />
      </Suspense>
      <div className="flex flex-wrap justify-around gap-y-4">
        <Team type="STAN" />
        <Team type="MAYA" />
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
