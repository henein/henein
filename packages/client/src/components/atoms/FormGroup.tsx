import React from 'react';

export interface FormGroupProps {
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, ...props }) => {
  return (
    <div
      className={`flex flex-wrap items-center space-x-4 ${props.className}`}
      {...props}
    >
      {children}
    </div>
  );
};
