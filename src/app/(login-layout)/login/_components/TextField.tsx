import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  align?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent';
}

export const TextField: React.FC<TextFieldProps> = ({
  register,
  placeholder,
  ...props
}) => {
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <div className="relative flex flex-col">
      {/* Label */}
      <label
        className={`text-secondary pointer-events-none absolute left-3 px-1 text-sm transition-all ${
          isEmpty ? 'top-3' : 'bg-white-900 dark:bg-grey-900 -top-2 rounded-sm'
        }`}
      >
        {placeholder}
      </label>

      {/* Input */}
      <input
        {...props}
        {...register}
        className={`inset-ring-default hover:inset-ring-brand dark:hover:inset-ring-dark-brand disabled:bg-grey-200 hover:inset-ring-2 focus:inset-ring-2 inset-ring dark:bg-grey-900 w-full rounded-lg px-4 py-3 text-sm outline-none transition-all disabled:cursor-not-allowed`}
        style={{ textAlign: props.align || 'left' }}
        onChange={(event) => {
          setIsEmpty(event.target.value === '');
          register?.onChange(event);
        }}
      />
    </div>
  );
};
