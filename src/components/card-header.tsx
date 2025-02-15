import classNames from 'classnames';
import React from 'react';

export interface CardHeaderProps extends React.PropsWithChildren {
  className?: string;
  isBlur?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
  return (
    <div
      className={classNames(
        'bg-white-800 dark:bg-grey-700/90 inset-ring inset-ring-default rounded-2xl shadow-md',
        props.className,
        { 'backdrop-blur-sm': props.isBlur },
      )}
    >
      {props.children}
    </div>
  );
};
