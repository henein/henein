import classNames from 'classnames';
import React from 'react';

export interface ToolBarButtonProps extends React.PropsWithChildren {
  isChecked?: boolean;
  onClick: VoidFunction;
  disabled?: boolean;
}

export const ToolBarButton: React.FC<ToolBarButtonProps> = (props) => {
  return (
    <button
      className={classNames(
        'border-border dark:border-dark-border flex min-h-8 min-w-8 items-center justify-center rounded-lg',
        {
          'bg-grey-100 dark:bg-grey-800': props.isChecked,
          'cursor-pointer hover:border': !props.disabled,
          'text-black-200 dark:text-white-300': props.disabled,
        },
      )}
      type="button"
      onClick={props.disabled ? undefined : props.onClick}
    >
      {props.children}
    </button>
  );
};
