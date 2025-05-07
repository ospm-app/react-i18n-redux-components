import {
  memo,
  useId,
  useState,
  type JSX,
  useEffect,
  type ComponentType,
} from 'react';
import { useTranslation } from 'react-i18next';

import { noop } from 'utils/noop.ts';
import { isBrowser } from 'utils/is-browser.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  success: string;
  divClassName: string;
  errorClassName: string;
  successClassName: string;
  timeout?: number | undefined;
  intlSuccess: IntlMessageId | '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorsValues?: any | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successValues?: any | undefined;
  readonly errors: ReadonlyArray<string>;
  readonly intlErrors: ReadonlyArray<IntlMessageId>;
};

function F_FormMessages({
  errors,
  success,
  timeout,
  intlErrors,
  intlSuccess,
  divClassName,
  errorsValues,
  successValues,
  errorClassName,
  successClassName,
}: Props): JSX.Element {
  const outputId = useId();

  const { t } = useTranslation();

  const [show, setShow] = useState<boolean>(false);

  useEffect((): void => {
    setShow(errors.length > 0 || Boolean(success));
  }, [errors.length, success]);

  useEffect((): (() => void) => {
    if (isBrowser && (timeout ?? 0) && success !== '') {
      const timer = window.setTimeout(() => {
        setShow(false);
      }, timeout);

      return function cleanup(): void {
        window.clearTimeout(timer);
        setShow(false);
      };
    }

    return noop;
  }, [timeout, success]);

  return (
    <output
      id={outputId}
      aria-hidden={!show}
      className={divClassName}
      // aria-invalid={
      //   errors.length > 0 ||
      //   intlErrors.length > 0 ||
      //   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
      //   (success.length > 0 ? false : undefined) ||
      //   (intlSuccess.length > 0 ? false : undefined)
      // }
    >
      {intlSuccess === '' ? null : (
        <p className={successClassName}>
          {t(intlSuccess, {
            replace: successValues,
          })}
        </p>
      )}

      {success === '' ? null : <p className={successClassName}>{success}</p>}

      {errors.map((error: string, index: number): JSX.Element => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <p className={errorClassName} key={index}>
            {error}
          </p>
        );
      })}

      {intlErrors.map((error: IntlMessageId, index: number): JSX.Element => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <p className={errorClassName} key={index}>
            {t(error, {
              replace: errorsValues,
            })}
          </p>
        );
      })}
    </output>
  );
}

export const FormMessages: ComponentType<Props> = memo<Props>(F_FormMessages);
