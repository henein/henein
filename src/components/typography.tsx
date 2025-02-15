export type TypographyColor = 'default' | 'secondary' | 'link';

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: TypographyColor;
}

export function Typography({ type, className, ...props }: TypographyProps) {
  const typeStyles = {
    default: 'text-primary',
    secondary: 'text-secondary',
    link: 'text-link',
  }[type ?? 'default'];

  return (
    <p className={`${typeStyles} ${className}`} {...props}>
      {props.children}
    </p>
  );
}

export default Typography;
