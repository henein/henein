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
        className={`absolute left-4 px-1 text-sm transition-all ${
          isEmpty ? 'text-grey-400 top-3' : 'text-grey-600 -top-2 bg-white'
        }`}
      >
        {placeholder}
      </label>

      {/* Input */}
      <input
        {...props}
        {...register}
        className={`border-grey-300 enabled:hover:ring-grey-200 focus:border-grey-500 disabled:bg-grey-200 w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:ring-2 focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed`}
        style={{ textAlign: props.align || 'left' }}
        onChange={(event) => {
          setIsEmpty(event.target.value === '');
          register?.onChange(event);
        }}
      />
    </div>
  );
};
