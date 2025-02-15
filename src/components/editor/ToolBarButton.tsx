import classNames from 'classnames';
import React from 'react';

export interface ToolBarButtonProps extends React.PropsWithChildren {
  isChecked?: boolean;
  onClick: VoidFunction;
}

export const ToolBarButton: React.FC<ToolBarButtonProps> = (props) => {
  return (
    <button
      className={classNames(
        'border-border dark:border-dark-border flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:border',
        {
          'bg-grey-100 dark:bg-grey-800': props.isChecked,
        },
      )}
      type="button"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
