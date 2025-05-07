import {
  memo,
  useRef,
  type JSX,
  useEffect,
  type RefObject,
  type ComponentType,
} from 'react';
import { useTranslation } from 'react-i18next';

import { VITE_CAPTCHA_KEY } from 'app/env.ts';

import { fetchFailure } from 'state/reducers/forms.ts';
import {
  useAppDispatch,
  useAppSelector,
  type ReduxState,
} from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { Path } from 'state/reducers/forms/types.ts';

type Props = {
  path: Path;
  action: string;
  captchaClassName: string;
  captchaValidationError: IntlMessageId;
  captchaTokenRef: RefObject<string | undefined>;
};

function selector(state: ReduxState): boolean {
  return state.app.isDarkMode;
}

function F_Captcha({
  path,
  action,
  captchaTokenRef,
  captchaClassName,
  captchaValidationError,
}: Props): JSX.Element {
  const { i18n } = useTranslation();

  const turnstileScriptRef = useRef(document.createElement('script'));

  const turnstileRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector(selector);

  useEffect((): (() => void) => {
    window.onloadTurnstileCallback = (): void => {
      if (turnstileRef.current !== null) {
        turnstile.render(turnstileRef.current, {
          action,
          language: i18n.language,
          sitekey: VITE_CAPTCHA_KEY,
          theme: isDarkMode ? 'dark' : 'light',
          callback: (token: string): void => {
            // eslint-disable-next-line react-compiler/react-compiler
            captchaTokenRef.current = token;
          },
          'expired-callback': (token: string): void => {
            captchaTokenRef.current = token;
          },
          'error-callback': (error: string): void => {
            dispatch(
              fetchFailure({
                path,
                errors: [error],
                intlErrors: [captchaValidationError],
              })
            );
          },
          'timeout-callback': (): void => {
            console.error('captcha timeout-callback');
          },
        });
      }
    };

    const captcha = turnstileScriptRef.current;

    turnstileScriptRef.current.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';

    turnstileScriptRef.current.nonce = 'DhcnhD3khTMePgXw';

    turnstileScriptRef.current.async = true;

    turnstileScriptRef.current.defer = true;

    document.body.appendChild(turnstileScriptRef.current);

    return (): void => {
      window.onloadTurnstileCallback = undefined;

      document.body.removeChild(captcha);
    };
  }, [
    path,
    action,
    dispatch,
    isDarkMode,
    i18n.language,
    captchaTokenRef,
    captchaValidationError,
  ]);

  return (
    <div
      ref={turnstileRef}
      className={captchaClassName}
      data-sitekey={VITE_CAPTCHA_KEY}
    />
  );
}

export const Captcha: ComponentType<Props> = memo<Props>(F_Captcha);
