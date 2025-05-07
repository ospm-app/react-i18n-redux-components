import {
  memo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
} from 'react';
import { useTranslation } from 'react-i18next';

import { noop } from 'utils/noop.ts';
import { isBrowser } from 'utils/is-browser.ts';

import { ArrowUpIcon } from 'svg/arrow-up.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

function onClick(): void {
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else if (typeof error === 'string') {
      console.error(error);
    } else {
      console.error(JSON.stringify(error));
    }

    window.scrollTo(0, 0);
  }
}

function setVisibleByScrollY(): boolean {
  return window.scrollY > 1000;
}

type Props = {
  buttonWrapperClassName: string;
  buttonClassName: string;
  iconClassName: string;
  buttonLabel: IntlMessageId;
};

function F_ScrollTop({
  buttonWrapperClassName,
  buttonClassName,
  iconClassName,
  buttonLabel,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const [visible, setVisible] = useState<boolean>(false);

  const onScroll = useCallback<() => void>(() => {
    setVisible(setVisibleByScrollY);
  }, []);

  useEffect((): (() => void) => {
    if (isBrowser) {
      const listener = onScroll;

      window.addEventListener('scroll', listener);

      return function cleanup(): void {
        window.removeEventListener('scroll', listener);
      };
    }

    return noop;
  }, [onScroll]);

  return (
    <div className={buttonWrapperClassName}>
      <button
        tabIndex={-1}
        aria-label={t(buttonLabel)}
        aria-hidden={!visible}
        className={buttonClassName}
        onClick={onClick}
        type='button'
      >
        <div className={iconClassName}>
          <ArrowUpIcon />
        </div>
      </button>
    </div>
  );
}

export const ScrollTop: ComponentType<Props> = memo<Props>(F_ScrollTop);
