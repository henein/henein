import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
}

const ClientPortal = ({ children, show, onClose }: Props) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.getElementById('portal');

    // esc 키 누르면 닫기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return show && ref.current
    ? createPortal(
        <div
          className="bg-black-200 fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>,
        ref.current,
      )
    : null;
};

export default ClientPortal;
