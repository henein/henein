import { ToolBarDivider } from './ToolBarDivider';
import { fetchCategories } from '@/actions/category-action';
import { categories } from '@prisma/client';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface EditorTitleProps {
  className?: string;
  categories?: categories[];
}

export const EditorTitle = (props: EditorTitleProps) => {
  const [categories, setCategories] = useState<categories[]>(
    props.categories ?? [],
  );

  // TODO: WritePage를 수정하고 이를 제거해야 함.
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories().then((categories) => setCategories(categories));
    }
  });

  const { register } = useFormContext();

  return (
    <div
      className={classNames(
        'bg-white-900 dark:bg-grey-800 inset-ring-border dark:inset-ring-dark-border relative flex w-full items-center rounded-2xl px-6 ring-inset',
        props.className,
      )}
    >
      <select
        className="outline-none"
        {...register('category', { required: true })}
      >
        {categories?.map((category) => (
          <option
            key={category.id}
            className="text-black-900"
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

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
