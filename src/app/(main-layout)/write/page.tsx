'use client';

import { writePost } from '@/actions/post';
import { Button } from '@/components';
import { Editor } from '@/components/editor/Editor';
import { EditorTitle } from '@/components/editor/EditorTitle';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FormProvider, useForm } from 'react-hook-form';

export const extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Placeholder.configure({ placeholder: '내용을 입력해주세요...' }),
  Underline,
  Image,
];

type WriteFormData = {
  title: string;
}

const WritePage = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm prose-editor max-w-none prose-h1:font-normal prose-h2:font-normal prose-h3:font-normal focus:outline-none min-h-[678px] p-6',
      },
    },
    extensions: extensions,
  });

  const methods = useForm<WriteFormData>();

  const onSubmit = (data: WriteFormData) => {
    writePost({
      title: data.title,
      content: editor?.getJSON() ?? {},
      category_id: 'general',
    });
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
          <Button sort="primary">등록하기</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default WritePage;
