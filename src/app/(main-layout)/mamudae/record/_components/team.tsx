import StreamerBtn from './streamer-button';
import { prisma } from '@/utils/prisma';
import React from 'react';

interface Props {
  type: 'STAN' | 'MAYA';
}
const Team = async (props: Props) => {
  const data = await fetchTeam(props.type);

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-2xl font-bold">
        {props.type === 'STAN' ? '누렁단' : '절절승절절배'}
      </h2>
      <div className="flex flex-wrap justify-center gap-x-8">
        {data.map((streamer) => (
          <StreamerBtn key={streamer.id} {...streamer} />
        ))}
      </div>
    </div>
  );
};

export default Team;

const fetchTeam = async (type: 'STAN' | 'MAYA') => {
  try {
    const data = await prisma.streamer.findMany({
      where: {
        team: type,
      },
      include: {
        profiles: true,
        characters: true,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
