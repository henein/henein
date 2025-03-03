import clsx from 'clsx';
import React from 'react';

type BtnStyle = 'primary' | 'secondary' | 'danger';
type BtnType = 'reset' | 'submit' | 'button';

interface ButtonProps {
  sort: BtnStyle;
  type?: BtnType;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  sort,
  children,
  type,
  onClick,
  disabled,
  className,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  const baseStyles =
    'flex items-center justify-center rounded-lg h-10 px-4 text-sm cursor-pointer transition-all border border-default hover:ring-4 hover:ring-black-25 active:ring-2 active:ring-black-50';

  const sortStyles = {
    primary:
      'bg-primary-600 dark:bg-primary-500 text-white-900 ' +
      'enabled:hover:bg-primary-400 enabled:dark:hover:bg-primary-300 ' +
      'enabled:active:bg-primary-700 enabled:dark:active:bg-primary-600',
    secondary:
      'bg-white-900 dark:bg-grey-700 text-black border-grey-700' +
      'enabled:hover:text-brand-hover enabled:active:text-brand-active',
    danger:
      'bg-danger-300 dark:bg-danger-400 text-white-900 ' +
      'enabled:hover:bg-danger-200 enabled:dark:hover:bg-danger-300 ' +
      'enabled:active:bg-danger-400 enabled:dark:active:bg-danger-500',
  }[sort];

  const disabledStyles =
    'disabled:bg-buttonDisableBackground disabled:text-buttonDisableText disabled:cursor-not-allowed disabled:bg-grey-200 dark:disabled:bg-grey-800 disabled:text-grey-400';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, sortStyles, disabledStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
};
