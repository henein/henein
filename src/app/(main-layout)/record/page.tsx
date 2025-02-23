import Chart from './_components/chart';
import Team from './_components/team';
import React from 'react';

const RecordPage = () => {
  return (
    <div className="mx-auto my-auto h-full w-full max-w-[1024px]">
      <Chart />
      <div className="mt-4 flex flex-wrap justify-around">
        <Team type="STAN" />
        <Team type="MAYA" />
      </div>
    </div>
  );
};

export default RecordPage;
