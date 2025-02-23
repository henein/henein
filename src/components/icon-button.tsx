import classNames from 'classnames';
import React from 'react';

export interface IconButtonProps {
  icon: string;
  className?: string;
  size?: 16 | 20 | 24;
}

export const IconButton = (props: IconButtonProps) => {
  let sizeStyle = '';

  switch (props.size) {
    case 16:
      sizeStyle = 'icon-16';
      break;
    case 20:
      sizeStyle = 'icon-20';
      break;
    case 24:
      sizeStyle = 'icon-24';
      break;
  }

  return (
    <button
      className={classNames(
        'icon hover:inset-ring inset-ring-default dark:active:bg-white-50 rounded-lg',
        sizeStyle,
        props.className,
      )}
    >
      {props.icon}
    </button>
  );
};
