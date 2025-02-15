import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

export const proseStyles =
  'prose dark:prose-invert prose-sm prose-editor max-w-none prose-h1:font-normal prose-h2:font-normal prose-h3:font-normal focus:outline-none';

export const editorStyles = `${proseStyles} min-h-[42.375rem] p-6`;

export const editorExtensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Placeholder.configure({ placeholder: '내용을 입력해주세요...' }),
  Underline,
  Image,
];
