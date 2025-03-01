import Chart from './_components/chart';
import Team from './_components/team';
import React from 'react';

const RecordPage = () => {
  return (
    <div className="mx-auto my-auto flex h-full w-full max-w-[1024px] flex-col gap-8">
      <Chart />
      <div className="flex flex-wrap justify-around gap-y-4">
        <Team type="STAN" />
        <Team type="MAYA" />
      </div>
    </div>
  );
};

export default RecordPage;
