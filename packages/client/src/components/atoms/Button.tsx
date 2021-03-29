import React from 'react';

export interface ButtonProps {
  title: string;
  color?: 'primary' | 'secondary' | 'danger';
  className?: string;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.VFC<ButtonProps> = ({
  color = 'primary',
  ...props
}) => {
  const buttonClass = (() => {
    switch (color) {
      case 'primary':
        return `bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600`;
      case 'secondary':
        return `bg-white text-primary-600 hover:bg-gray-100 focus:ring-primary-600`;
      case 'danger':
        return `bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-600`;
    }
  })();

  return (
    <button
      className={`px-4 py-2 rounded-full font-semibold text-opacity-90 ${
        props.isLoading ? 'opacity-50' : ''
      } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonClass} ${
        props.className
      }`}
      disabled={props.isLoading}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};
