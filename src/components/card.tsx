import classNames from 'classnames';
import React from 'react';

export interface CardProps extends React.PropsWithChildren {
  className?: string;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={classNames(
        'bg-white-900 dark:bg-grey-800 rounded-2xl',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
