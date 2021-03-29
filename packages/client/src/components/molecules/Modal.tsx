import React from 'react';
import { Card } from '../atoms/Card';

export interface ModalProps {
  visible?: boolean;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { visible } = props;

  return (
    <div
      className={`fixed transform w-screen h-screen flex items-center justify-center z-50 transition-opacity ${
        visible ? '' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute bg-gray-500 opacity-30 w-full h-full"></div>
      <Card
        className={`transform w-8/12 transition-transform ${
          visible ? '' : 'translate-y-2'
        }`}
      >
        {props.children}
      </Card>
    </div>
  );
};
