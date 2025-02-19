'use client';

import { fetchCategories } from '@/actions/category-action';
import { modifyPost } from '@/actions/post-action';
import { Button } from '@/components';
import { Editor } from '@/components/editor/Editor';
import { EditorTitle } from '@/components/editor/EditorTitle';
import { editorExtensions, editorStyles } from '@/utils/tiptap';
import { categories } from '@prisma/client';
import { JSONContent, useEditor } from '@tiptap/react';
import { use, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type ModifyFormData = {
  title: string;
  category: string;
};

export const ModifyForm = (props: {
  id: bigint;
  data: Promise<any>;
  categories: categories[];
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = use(props.data);

  const editor = useEditor({
    content: data?.content as JSONContent,
    editorProps: {
      attributes: {
        class: editorStyles,
      },
    },
    extensions: editorExtensions,
  });

  const methods = useForm<ModifyFormData>({
    defaultValues: { title: data?.title, category: data?.category_id },
  });

  const onSubmit = async (data: ModifyFormData) => {
    setIsSubmitting(true);

    try {
      const error = await modifyPost({
        id: props.id,
        title: data.title,
        content: JSON.stringify(editor?.getJSON()), // NOTE: editor?.getJSON() 그냥 넘기면 전달이 안 되네요.
        category_id: data.category,
      });
      alert(error);
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto flex w-full max-w-5xl flex-col gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <EditorTitle className="mt-6" categories={props.categories} />

        <Editor editor={editor} />

        <div className="flex justify-end gap-2">
          {/* <Button type="button" sort="secondary">
              저장하기
            </Button>
            <Button type="button" sort="secondary">
              불러오기
            </Button> */}
          <Button type="submit" sort="primary" disabled={isSubmitting}>
            수정하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
