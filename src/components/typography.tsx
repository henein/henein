export type TypographyColor = 'default' | 'secondary' | 'link';

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: TypographyColor;
}

export function Typography({ type, className, ...props }: TypographyProps) {
  const typeStyles = {
    default: 'text-black-800 dark:text-white-900',
    secondary: 'text-black-500 dark:text-white-600',
    link: 'text-brand dark:text-dark-brand hover:text-brand-hover hover:dark:dark-brand-hover active:text-brand-active active:dark:text-dark-brand-active transition-colors',
  }[type ?? 'default'];

  return (
    <p className={`${typeStyles} ${className}`} {...props}>
      {props.children}
    </p>
  );
}

export default Typography;
