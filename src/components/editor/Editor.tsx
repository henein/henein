'use client';

import { Card } from '../card';
import { ToolBar } from './ToolBar';
import { EditorContent, Editor as RawEditor } from '@tiptap/react';
import React from 'react';

export interface EditorProps {
  editor: RawEditor | null;
}

export const Editor: React.FC<EditorProps> = ({ editor }) => {
  return (
    <div>
      <Card>
        <ToolBar editor={editor} />
        <EditorContent
          editor={editor}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' || !event.nativeEvent.isComposing) {
              return;
            }

            editor?.commands.focus(editor.state.selection.$anchor.pos + 1);
          }}
        />
      </Card>
    </div>
  );
};

// const Container = styled.div`
//   .ProseMirror {
//     min-height: 678px;
//     padding: 24px;
//     font-size: 14px;
//     color: ${({ theme }) => theme.text};

//     h1,
//     h2,
//     h3,
//     p {
//       font-weight: normal;
//       margin-block-end: 1em;
//     }

//     h1 {
//       font-size: 2em;
//     }

//     h2 {
//       font-size: 1.5em;
//     }

//     h3 {
//       font-size: 1.25em;
//     }
//   }

//   .ProseMirror:focus {
//     outline: none;
//   }

//   .ProseMirror p.is-editor-empty:first-child::before {
//     color: ${({ theme }) => theme.subText};
//     content: attr(data-placeholder);
//     float: left;
//     height: 0;
//     pointer-events: none;
//   }
// `;
