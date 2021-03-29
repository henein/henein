import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`px-4 py-2 rounded-full text-opacity-90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-primary-600 ${className}`}
      {...props}
    ></input>
  );
};
