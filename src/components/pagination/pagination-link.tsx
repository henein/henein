import classNames from 'classnames';
import Link from 'next/link';

export interface PaginationItemProps {
  href?: string;
  children?: React.ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
}

export const PaginationLink = (props: PaginationItemProps) => {
  if (!props.href) {
    return <div className="h-8 w-8"></div>;
  }

  if (props.disabled) {
    return (
      <div className="text-secondary flex h-8 w-8 cursor-not-allowed select-none items-center justify-center text-xs">
        {props.children}
      </div>
    );
  }

  return (
    <Link
      className={classNames(
        'flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full text-xs',
        props.isSelected ? 'bg-brand' : 'hover:bg-grey-800 transition-colors',
      )}
      href={props.href}
    >
      {props.children}
    </Link>
  );
};
