import React from 'react';
import { Divider } from './Divider';

export const CardTitle: React.FC = (props) => {
  return (
    <>
      <h2 className="font-bold text-black text-opacity-90 text-3xl">
        {props.children}
      </h2>
      <Divider />
    </>
  );
};
