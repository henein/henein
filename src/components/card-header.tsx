import classNames from 'classnames';
import React from 'react';

export interface CardHeaderProps extends React.PropsWithChildren {
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
  return (
    <div
      className={classNames(
        'bg-white-800 dark:bg-grey-700/90 inset-ring-border dark:inset-ring-dark-border rounded-2xl shadow ring-inset backdrop-blur-sm',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
