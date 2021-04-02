import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  inputRef,
  description,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {props.label && <label>{props.label}</label>}
      <input
        className={`w-full px-4 py-2 rounded-full text-opacity-90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-primary-600 ${className}`}
        ref={inputRef}
        {...props}
      ></input>
      {description && <p className="text-gray-400">{description}</p>}
      {error && <p className="text-danger-600">{error}</p>}
    </div>
  );
};
