import Chart from './_components/chart';
import Team from './_components/team';
import { prisma } from '@/utils/prisma';
import React from 'react';

const RecordPage = async () => {
  const streamers = await prisma.streamer.findMany();
  const data = await fetchLogs();

  return (
    <div className="mx-auto my-auto flex h-full w-full max-w-[1024px] flex-col gap-8">
      <Chart logs={data.logs} streamers={streamers} />
      <div className="flex flex-wrap justify-around gap-y-4">
        <Team type="MAYA" streamers={streamers} />
        <Team type="STAN" streamers={streamers} />
      </div>
    </div>
  );
};

export default RecordPage;

const fetchLogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/fetch-logs`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` || '',
        },
        next: { revalidate: 360 },
      },
    );

    return res.json();
  } catch (error) {
    console.error('Error fetching logs 😭:', error);
    return { logs: [] };
  }
};
