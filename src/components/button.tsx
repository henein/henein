import React from "react";

type BtnStyle = "primary" | "secondary" | "danger";
type BtnType = "reset" | "submit" | "button";

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
  const baseStyles = "flex items-center justify-center rounded-lg h-10 px-4 text-sm cursor-pointer transition-all hover:ring-4 hover:ring-black-25 active:ring-2 active:ring-black-50";
  const sortStyles = {
    primary: "bg-primary-600 dark:bg-primary-500 hover:bg-primary-400 hover:dark:bg-primary-300 active:bg-primary-700 active:dark:bg-primary-600 text-white-900",
    secondary: "bg-button text-black hover:bg-buttonHover active:bg-buttonActive",
    danger: "bg-danger text-white hover:bg-dangerHover active:bg-dangerActive",
  }[sort];
  const disabledStyles = "bg-buttonDisableBackground text-buttonDisableText cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sortStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};
