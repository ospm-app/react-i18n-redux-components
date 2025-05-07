import { memo, type JSX, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import { CrossIcon } from 'svg/cross.tsx';
import { CheckCircleIcon } from 'svg/check-circle.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  empty: boolean;
  digit: boolean;
  capital: boolean;
  special: boolean;
  capsLock?: boolean;
  lowercase: boolean;
  passLength: boolean;
  divClassName: string;
  listClassName: string;
  itemClassName: string;
  itemIconClassName: string;
  itemIconCheckClassName: string;
  itemIconUncheckClassName: string;
  passwordHint: IntlMessageId;
  passwordDigitHint: IntlMessageId;
  passwordLengthHint: IntlMessageId;
  passwordCapitalHint: IntlMessageId;
  passwordCapsLockHint: IntlMessageId;
  passwordLowercaseHint: IntlMessageId;
  passwordSpecialCharacterHint: IntlMessageId;
};

function F_PasswordHint({
  empty,
  digit,
  capital,
  special,
  lowercase,
  passLength,
  divClassName,
  listClassName,
  itemClassName,
  capsLock = false,
  itemIconClassName,
  itemIconCheckClassName,
  itemIconUncheckClassName,
  passwordHint,
  passwordDigitHint,
  passwordLengthHint,
  passwordCapitalHint,
  passwordCapsLockHint,
  passwordLowercaseHint,
  passwordSpecialCharacterHint,
}: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <output aria-live='polite' aria-relevant='all' className={divClassName}>
      {t(passwordHint)}

      <ul className={listClassName}>
        <li aria-hidden={passLength} className={itemClassName}>
          <div
            role='img'
            aria-hidden
            className={itemIconClassName}
            data-invalid={empty ? undefined : !passLength}
          >
            {!empty && passLength ? (
              <div className={itemIconCheckClassName}>
                <CheckCircleIcon />
              </div>
            ) : (
              <div className={itemIconUncheckClassName}>
                <CrossIcon />
              </div>
            )}
          </div>

          {t(passwordLengthHint)}
        </li>

        <li aria-hidden={capital} className={itemClassName}>
          <div
            role='img'
            aria-hidden
            className={itemIconClassName}
            data-invalid={empty ? undefined : !capital}
          >
            {!empty && capital ? (
              <div className={itemIconCheckClassName}>
                <CheckCircleIcon />
              </div>
            ) : (
              <div className={itemIconUncheckClassName}>
                <CrossIcon />
              </div>
            )}
          </div>

          {t(passwordCapitalHint)}
        </li>

        <li aria-hidden={lowercase} className={itemClassName}>
          <div
            role='img'
            aria-hidden
            className={itemIconClassName}
            data-invalid={empty ? undefined : !lowercase}
          >
            {!empty && lowercase ? (
              <div className={itemIconCheckClassName}>
                <CheckCircleIcon />
              </div>
            ) : (
              <div className={itemIconUncheckClassName}>
                <CrossIcon />
              </div>
            )}
          </div>

          {t(passwordLowercaseHint)}
        </li>

        <li aria-hidden={digit} className={itemClassName}>
          <div
            role='img'
            aria-hidden
            className={itemIconClassName}
            data-invalid={empty ? undefined : !digit}
          >
            {!empty && digit ? (
              <div className={itemIconCheckClassName}>
                <CheckCircleIcon />
              </div>
            ) : (
              <div className={itemIconUncheckClassName}>
                <CrossIcon />
              </div>
            )}
          </div>

          {t(passwordDigitHint)}
        </li>

        <li aria-hidden={special} className={itemClassName}>
          <div
            role='img'
            aria-hidden
            className={itemIconClassName}
            data-invalid={empty ? undefined : !special}
          >
            {!empty && special ? (
              <div className={itemIconCheckClassName}>
                <CheckCircleIcon />
              </div>
            ) : (
              <div className={itemIconUncheckClassName}>
                <CrossIcon />
              </div>
            )}
          </div>

          {t(passwordSpecialCharacterHint)}
        </li>

        {capsLock ? (
          <li aria-hidden={false} className={itemClassName}>
            {t(passwordCapsLockHint)}
          </li>
        ) : null}
      </ul>
    </output>
  );
}

export const PasswordHint: ComponentType<Props> = memo<Props>(F_PasswordHint);
