import { PrizeManagementForm } from './_components/prize-management-form';
import { prisma } from '@/utils/prisma';

const PrizeManagementPage = () => {
  const dailyMissions = prisma.daily_missions.findMany({
    include: { daily_mission_prizes: { include: { streamer: true } } },
  });

  const streamers = prisma.streamer.findMany({
    orderBy: { order: 'desc' },
  });

  return (
    <div className="flex flex-1 flex-col p-4">
      <PrizeManagementForm
        dailyMissions={dailyMissions}
        streamers={streamers}
      />
    </div>
  );
};

export default PrizeManagementPage;
