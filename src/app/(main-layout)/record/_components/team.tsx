import StreamerBtn from './streamer-button';
import { PrismaClient } from '@prisma/client';
import React from 'react';

interface Props {
  type: 'STAN' | 'MAYA';
}
const Team = async (props: Props) => {
  const data = await fetchTeam(props.type);

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-2xl font-bold">
        팀 {props.type === 'STAN' ? '장로스탄' : '마야'}
      </h2>
      <div className="flex flex-wrap justify-center gap-x-8">
        {data.map((streamer) => (
          <StreamerBtn
            key={streamer.id}
            id={streamer.id}
            profiles={streamer.profiles}
            character={streamer.characters}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;

const fetchTeam = async (type: 'STAN' | 'MAYA') => {
  const prisma = new PrismaClient();

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
