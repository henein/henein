import Chart from './_components/chart';
import Team from './_components/team';
import { prisma } from '@/utils/prisma';
import React from 'react';

const RecordPage = async () => {
  const streamers = await prisma.streamer.findMany();
  const data = await fetchLogs();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">성장 현황</h2>
      <Chart logs={data.logs} streamers={streamers} />
      <div className="my-8 flex flex-wrap justify-around gap-y-4">
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
