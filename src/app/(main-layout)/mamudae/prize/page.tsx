import classNames from 'classnames';
import React from 'react';

function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

const TeamPrizeBox = (props: { team: 'left' | 'right'; prize: number }) => {
  return (
    <div
      className={classNames(
        'flex flex-auto flex-col items-center rounded-2xl',
        props.team === 'left' ? 'bg-[#0075ca]' : 'bg-[#de9300]',
      )}
    >
      <div>
        <p className="">누렁즈</p>
        <h3 className="py-28 font-mono text-6xl font-bold">
          ₩{numberWithCommas(props.prize)}
        </h3>
      </div>
    </div>
  );
};

const MamudaePrizePage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="my-6 pl-1 text-3xl font-bold">상금</h2>
      <div className="flex gap-5">
        <TeamPrizeBox team="left" prize={4_500_000} />
        <TeamPrizeBox team="right" prize={4_500_000} />
      </div>
    </div>
  );
};

export default MamudaePrizePage;
