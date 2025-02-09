import clsx from 'clsx';
import React from 'react';

type BtnStyle = 'primary' | 'secondary' | 'danger';
type BtnType = 'reset' | 'submit' | 'button';

interface ButtonProps {
  sort: BtnStyle;
  type?: BtnType;
  width?: string;
  fontWeight?: string;
  onClick?: any;
  disabled?: boolean;
}

export const Button = ({
  sort,
  children,
  type,
  onClick,
  disabled,
  width,
  fontWeight,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  const baseStyles =
    'flex items-center justify-center rounded-lg h-10 px-4 text-sm cursor-pointer transition-all';

  const sortStyles = {
    primary:
      'bg-primary-600 dark:bg-primary-500 text-white-900 ' +
      'enabled:hover:bg-primary-400 enabled:dark:hover:bg-primary-300 ' +
      'enabled:active:bg-primary-700 enabled:dark:active:bg-primary-600',
    secondary:
      'bg-button text-black ' +
      'enabled:hover:bg-buttonHover enabled:active:bg-buttonActive',
    danger:
      'bg-danger text-white ' +
      'enabled:hover:bg-dangerHover enabled:active:bg-dangerActive',
  }[sort];

  const disabledStyles =
    'disabled:bg-buttonDisableBackground disabled:text-buttonDisableText disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-400';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, sortStyles, disabledStyles)}
      {...props}
    >
      {children}
    </button>
  );
};
