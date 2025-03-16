import React from 'react';
import Typography from './typography';
import classNames from 'classnames';

export interface NavigationItemProps extends React.PropsWithChildren {
  isSelect?: boolean;
  isIcon?: boolean;
  isWIP?: boolean;
}

export const NavigationItem = (props: NavigationItemProps) => {
  return (
    <div
      className={classNames(
        'select-none relative flex flex-col justify-center box-border no-underline h-10 rounded-lg transition-all inset-ring-default',
        props.isIcon ? 'w-10' : 'px-4',
        props.isWIP
          ? ''
          : 'hover:bg-black-25 dark:hover:bg-white-50 hover:font-semibold hover:inset-ring'
      )}
    >
      {props.isWIP && (
        <Typography className="absolute left-0 top-0 w-full text-center text-[10px]" type="secondary">
          준비중
        </Typography>
      )}
      <Typography
        className={classNames('text-base flex justify-center', {
          'font-semibold': props.isSelect,
        })}
        type={props.isWIP ? 'secondary' : 'default'}
      >
        {props.children}
      </Typography>
    </div>
  );
};
