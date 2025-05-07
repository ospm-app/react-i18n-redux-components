import {
  memo,
  useRef,
  useMemo,
  type JSX,
  useEffect,
  useCallback,
  type ReactNode,
  type RefObject,
  type ComponentType,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { createPortal } from 'react-dom';

import { isBrowser } from 'utils/is-browser.ts';

type Props = {
  id: string;
  onClose(): void;
  children: ReactNode;
  closeClassName: string;
  dialogClassName: string;
  headerClassName: string;
  backdropClassName: string;
  focusRef: RefObject<HTMLElement | null>;
};

function F_ModalTemplate({
  id,
  onClose,
  focusRef,
  children,
  closeClassName,
  dialogClassName,
  headerClassName,
  backdropClassName,
}: Props): JSX.Element {
  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      switch (event.key) {
        case 'Escape': {
          event.preventDefault();
          onClose();
          break;
        }

        default: {
          break;
        }
      }
    },
    [onClose]
  );

  const onCloseClick = useCallback<
    MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  >(
    (event) => {
      if (event.currentTarget === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  const prev = useRef<Element | null>(null);

  useEffect((): (() => void) => {
    prev.current = document.activeElement;

    if (focusRef.current !== null) {
      focusRef.current.focus();
    }

    return function cleanup(): void {
      if (prev.current instanceof HTMLElement) {
        prev.current.focus();
      }
    };
  }, [focusRef]);

  const container = useMemo<HTMLElement | null>(() => {
    return isBrowser ? document.getElementById('modal-root') : null;
  }, []);

  const element = (
    <div
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseDown={onCloseClick}
      className={backdropClassName}
    >
      <dialog aria-labelledby={id} className={dialogClassName}>
        <header className={headerClassName}>
          <button
            type='button'
            onClick={onCloseClick}
            className={closeClassName}
          >
            &times;
          </button>
        </header>

        {children}
      </dialog>
    </div>
  );

  if (container !== null) {
    return createPortal(element, container);
  }

  return element;
}

export const ModalTemplate: ComponentType<Props> = memo<Props>(F_ModalTemplate);
