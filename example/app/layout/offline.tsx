import {
  memo,
  type JSX,
  useState,
  useEffect,
  useCallback,
  type ComponentType,
} from 'react';
import { useTranslation } from 'react-i18next';

import { noop } from 'utils/noop.ts';
import { isBrowser } from 'utils/is-browser.ts';

import { OfflineIcon } from 'svg/offline.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

// Hidden = 0,
// FadeIn = 1,
// Visible = 2,
// FadeOut = 3,
type OfflineStatus = 0 | 1 | 2 | 3;

function getOnlineStatus(): OfflineStatus {
  return isBrowser
    ? window.navigator.onLine
      ? 0 // Hidden
      : 2 // Visible
    : 0; // Hidden
}

type Props = {
  divClassName: string;
  wrapperClassName: string;
  iconClassName: string;
  messageClassName: string;
  message: IntlMessageId;
};

function F_Offline({
  message,
  divClassName,
  wrapperClassName,
  iconClassName,
  messageClassName,
}: Props): JSX.Element | null {
  const { t } = useTranslation();

  const [status, setStatus] = useState<OfflineStatus>(getOnlineStatus);

  const onChangeStatus = useCallback<() => void>(() => {
    setStatus(
      window.navigator.onLine ? 3 /* FadeOut */ : 1 // FadeIn
    );
  }, []);

  useEffect((): (() => void) => {
    switch (status) {
      case 1: {
        // FadeIn
        const timer = window.setTimeout((): void => {
          setStatus(2); // Visible
        }, 50);

        return function cleanup() {
          window.clearTimeout(timer);
        };
      }

      case 3: {
        // FadeOut
        const timer = window.setTimeout((): void => {
          setStatus(0); // Hidden
        }, 500);

        return function cleanup() {
          window.clearTimeout(timer);
        };
      }

      default:
        return noop;
    }
  }, [status]);

  useEffect((): (() => void) => {
    if (isBrowser) {
      window.addEventListener('online', onChangeStatus);
      window.addEventListener('offline', onChangeStatus);

      return function cleanup() {
        window.removeEventListener('online', onChangeStatus);
        window.removeEventListener('offline', onChangeStatus);
      };
    }

    return noop;
  }, [onChangeStatus]);

  if (status === 0) {
    // If Hidden
    return null;
  }

  return (
    <div
      role='alert'
      aria-hidden={status !== 2} // If not visible
      className={divClassName}
    >
      <div className={wrapperClassName}>
        <div role='img' aria-hidden className={iconClassName}>
          <OfflineIcon />
        </div>
        <div className={messageClassName}>{t(message)}</div>
      </div>
    </div>
  );
}

export const Offline: ComponentType<Props> = memo<Props>(F_Offline);
