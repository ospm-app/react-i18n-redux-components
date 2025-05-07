import {
  memo,
  useRef,
  useMemo,
  type JSX,
  useEffect,
  useCallback,
  type ReactNode,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { createPortal } from 'react-dom';

import { isBrowser } from 'utils/is-browser.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  id: string;
  onClose(): void;
  children: ReactNode;
  title: IntlMessageId;
  modalClassName: string;
  headerClassName: string;
  contentClassName: string;
  backdropClassName: string;
  buttonCloseClassName: string;
};

function F_Modal({
  id,
  title,
  onClose,
  children,
  modalClassName,
  headerClassName,
  contentClassName,
  backdropClassName,
  buttonCloseClassName,
}: Props): JSX.Element {
  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event): void => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onClose();
          break;

        default:
          break;
      }
    },
    [onClose]
  );

  const onDivClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.stopPropagation();

      if (event.currentTarget === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  const onBlur = useCallback<FocusEventHandler>((event) => {
    event.stopPropagation();
  }, []);

  const ref = useRef<HTMLButtonElement>(null);
  const prev = useRef<Element | null>(null);

  useEffect((): (() => void) => {
    prev.current = document.activeElement;

    if (ref.current !== null) {
      ref.current.focus();
    }

    return function cleanup(): void {
      if (prev.current instanceof HTMLElement) {
        prev.current.focus();
      }
    };
  }, []);

  const container = useMemo<HTMLElement | null>(() => {
    return isBrowser ? document.getElementById('modal-root') : null;
  }, []);

  const element = (
    <div
      tabIndex={-1}
      onBlur={onBlur}
      aria-hidden={false}
      onClick={onDivClick}
      onKeyDown={onKeyDown}
      className={backdropClassName}
    >
      <dialog
        id={id}
        className={modalClassName}
        aria-labelledby={`dialog-${id}-title`}
        aria-describedby={`dialog-${id}-content`}
      >
        <header className={headerClassName}>
          <h3 id={`dialog-${id}-title`}>{title}</h3>

          <button
            ref={ref}
            type='button'
            onClick={onClose}
            className={buttonCloseClassName}
          >
            &times;
          </button>
        </header>

        <div id={`dialog-${id}-content`} className={contentClassName}>
          {children}
        </div>
      </dialog>
    </div>
  );

  if (container !== null) {
    return createPortal(element, container);
  }

  return element;
}

export const Modal: ComponentType<Props> = memo<Props>(F_Modal);
