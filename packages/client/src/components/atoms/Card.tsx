import React from 'react';

export interface CardProps {
  className?: string;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`px-8 py-6 bg-white bg-opacity-70 backdrop-blur border border-gray-200 rounded-2xl transition-shadow hover:shadow-md ${props.className}`}
    >
      {props.children}
    </div>
  );
};
