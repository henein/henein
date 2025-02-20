'use client';

import { writePost } from '@/actions/post-action';
import { Button } from '@/components';
import { Editor } from '@/components/editor/Editor';
import { EditorTitle } from '@/components/editor/EditorTitle';
import { editorExtensions, editorStyles } from '@/utils/tiptap';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type WriteFormData = {
  title: string;
  category: string;
};

const WritePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: editorStyles,
      },
    },
    extensions: editorExtensions,
  });

  const methods = useForm<WriteFormData>();

  const onSubmit = async (data: WriteFormData) => {
    setIsSubmitting(true);

    const { data: postData, error } = await writePost({
      title: data.title,
      content: JSON.stringify(editor?.getJSON()), // NOTE: editor?.getJSON() 그냥 넘기면 전달이 안 되네요.
      category_id: data.category,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push(postData.url);
    }

    setIsSubmitting(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto flex w-full max-w-5xl flex-col gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <EditorTitle className="mt-6" />

        <Editor editor={editor} />

        <div className="flex justify-end gap-2">
          {/* <Button type="button" sort="secondary">
            저장하기
          </Button>
          <Button type="button" sort="secondary">
            불러오기
          </Button> */}
          <Button type="submit" sort="primary" disabled={isSubmitting}>
            등록하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default WritePage;
