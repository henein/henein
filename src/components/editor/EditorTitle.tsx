import { ToolBarDivider } from './ToolBarDivider';
import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface EditorTitleProps {
  board?: string;
  className?: string;
}

export const EditorTitle = (
  props: EditorTitleProps,
) => {
  const { register } = useFormContext();

  return (
    <div
      className={classNames(
        'bg-white-900 dark:bg-grey-800 inset-ring-border dark:inset-ring-dark-border relative flex w-full items-center rounded-2xl px-6 ring-inset',
        props.className,
      )}
    >
      {/* <SelectBoard {...props.register('selectBoard', { required: true })}>
        {boardList &&
          boardList.data.map((boardType: string) => (
            <option key={boardType} value={boardType}>
              {boardType}
            </option>
          ))}
      </SelectBoard> */}

      <ToolBarDivider />

      <input
        {...register('title')}
        className="placeholder-black-500 dark:placeholder-white-600 h-12 w-full outline-none"
        placeholder="제목"
        type="text"
        // {...props.register('title', { required: true })}
      />
    </div>
  );
};

// const SelectBoard = styled.select`
//   border: none;
//   background-color: transparent;
//   outline: none;
//   color: ${({ theme }) => theme.text};
//   font-size: 14px;
// `;
