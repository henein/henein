// import Attachment from "../../../public/writingPageImages/attachment.svg";
// import FormatAlignCenter from "../../../public/writingPageImages/formatAlignCenter.svg";
// import FormatAlignJustify from "../../../public/writingPageImages/formatAlignJustify.svg";
// import FormatAlignLeft from "../../../public/writingPageImages/formatAlignLeft.svg";
// import FormatAlignRight from "../../../public/writingPageImages/formatAlignRight.svg";
// import FormatBold from "../../../public/writingPageImages/formatBold.svg";
// import FormatItalic from "../../../public/writingPageImages/formatItalic.svg";
// import FormatStrikethrough from "../../../public/writingPageImages/formatStrikethrough.svg";
// import FormatUnderlined from "../../../public/writingPageImages/formatUnderlined.svg";
// import ImageIcon from "../../../public/writingPageImages/imageIcon.svg";
// import FormatH1 from "../../../public/writingPageImages/format_h1.svg";
// import FormatH2 from "../../../public/writingPageImages/format_h2.svg";
// import FormatH3 from "../../../public/writingPageImages/format_h3.svg";
import { CardHeader } from '../card-header';
import { ToolBarButton } from './ToolBarButton';
import { ToolBarDivider } from './ToolBarDivider';
import { Editor } from '@tiptap/react';

// import { useLocalStorage } from "../../hooks/storage/useLocalStorage";
// import { uploadImage } from "../../api/board";

export interface ToolBarProps {
  editor: Editor | null;
}

// display: flex;
// align-items: center;
// gap: 4px;
// color: ${({ theme }) => theme.text};
// padding: 8px 20px;
// position: sticky;
// top: ${({ isScrollDown }) => (isScrollDown ? '16px' : '88px')};
// z-index: 1;
// transition: top 0.2s ease-in-out;

// svg {
//   width: 20px;
//   height: 20px;
//   fill: currentColor;
// }

export const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  return (
    <CardHeader
      className="sticky top-0 z-10 flex items-center gap-1 px-5 py-2"
      isBlur
    >
      <ToolBarButton
        isChecked={editor?.isActive('heading', { level: 1 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <span className="material-symbols-outlined">format_h1</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('heading', { level: 2 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <span className="material-symbols-outlined">format_h2</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('heading', { level: 3 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <span className="material-symbols-outlined">format_h3</span>
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        isChecked={editor?.isActive('bold')}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <span className="material-symbols-outlined">format_bold</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('italic')}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <span className="material-symbols-outlined">format_italic</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('underline')}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <span className="material-symbols-outlined">format_underlined</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('strike')}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <span className="material-symbols-outlined">format_strikethrough</span>
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'left' })}
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
      >
        <span className="material-symbols-outlined">format_align_left</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'center' })}
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      >
        <span className="material-symbols-outlined">format_align_center</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'right' })}
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      >
        <span className="material-symbols-outlined">format_align_right</span>
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'justify' })}
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
      >
        <span className="material-symbols-outlined">format_align_justify</span>
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        onClick={() => {
          editor?.commands.focus();

          const input = document.createElement('input');

          input.type = 'file';
          input.multiple = true;
          input.onchange = (_) => {
            if (!input.files) {
              return;
            }

            const files = Array.from(input.files);

            // files.forEach(async (file) => {
            //   const url = await uploadImage({
            //     accessToken: accessToken,
            //     image: file,
            //   });
            //   editor?.chain().focus().setImage({ src: url }).run();
            // });
          };
          input.click();
        }}
      >
        <span className="material-symbols-outlined">image</span>
      </ToolBarButton>
      <ToolBarButton onClick={() => editor?.chain().focus().run()}>
        <span className="material-symbols-outlined">attachment</span>
      </ToolBarButton>
    </CardHeader>
  );
};
