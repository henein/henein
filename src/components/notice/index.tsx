import SlideBox from './slide-box';
import { fetchNotices } from '@/actions/notice-fetch';
import React from 'react';
import { use } from 'react';

const Notice = () => {
  const data = use(fetchNotices());

  return (
    <div className="bg-grey-800 border-grey-700a mx-auto mt-6 box-content flex w-full max-w-5xl items-center justify-center rounded-2xl border py-2">
      <div className="h-6 overflow-hidden">
        <SlideBox notices={data} />
      </div>
    </div>
  );
};

export default Notice;

