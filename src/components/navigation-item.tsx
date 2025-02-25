import Typography from './typography';
import classNames from 'classnames';
import React from 'react';

export interface NavigationItemProps extends React.PropsWithChildren {
  isSelect?: boolean;
  isIcon?: boolean;
  isWIP?: boolean;
}

export const NavigationItem = (props: NavigationItemProps) => {
  return (
    <div
      className={classNames(
        'inset-ring-border dark:inset-ring-dark-border relative box-border flex h-10 select-none flex-col justify-center rounded-lg no-underline transition-all',
        props.isIcon ? 'w-10' : 'px-4',
        props.isWIP
          ? ''
          : 'hover:bg-black-25 active:bg-white-50 dark:hover:bg-white-50 dark:active:bg-black-25 hover:inset-ring hover:font-semibold',
      )}
    >
      {props.isWIP && (
        <Typography
          className="absolute left-0 top-0 w-full text-center text-[10px]"
          type="secondary"
        >
          준비중
        </Typography>
      )}
      <Typography
        className={classNames('flex justify-center text-base', {
          'font-semibold': props.isSelect,
        })}
        type={props.isWIP ? 'secondary' : 'default'}
      >
        {props.children}
      </Typography>
    </div>
  );
};
