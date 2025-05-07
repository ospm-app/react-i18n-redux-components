import { memo, useMemo, type JSX, type ComponentType } from 'react';

import {
  testPassForNumber,
  testPassForCapital,
  testPassForLowerCase,
  testPassForSpecialSymbol,
} from 'utils/regexp.ts';

import { PasswordHint } from 'library/intl/password-hint.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  capsLock: boolean;
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

function selector({
  forms: {
    uiKit: {
      password: { value },
    },
  },
}: ReduxState): string {
  return value;
}

function F_Hint({
  capsLock,
  divClassName,
  listClassName,
  itemClassName,
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
  const value = useAppSelector<string>(selector);

  const { empty, passLength, capital, lowercase, digit, special } = useMemo<{
    empty: boolean;
    digit: boolean;
    capital: boolean;
    special: boolean;
    lowercase: boolean;
    passLength: boolean;
  }>(() => {
    return {
      empty: value.length === 0,
      passLength: value.length >= 8,
      digit: testPassForNumber(value),
      capital: testPassForCapital(value),
      lowercase: testPassForLowerCase(value),
      special: testPassForSpecialSymbol(value),
    };
  }, [value]);

  return (
    <PasswordHint
      digit={digit}
      empty={empty}
      capital={capital}
      special={special}
      capsLock={capsLock}
      lowercase={lowercase}
      passLength={passLength}
      divClassName={divClassName}
      listClassName={listClassName}
      itemClassName={itemClassName}
      itemIconClassName={itemIconClassName}
      itemIconCheckClassName={itemIconCheckClassName}
      itemIconUncheckClassName={itemIconUncheckClassName}
      passwordHint={passwordHint}
      passwordDigitHint={passwordDigitHint}
      passwordLengthHint={passwordLengthHint}
      passwordCapitalHint={passwordCapitalHint}
      passwordCapsLockHint={passwordCapsLockHint}
      passwordLowercaseHint={passwordLowercaseHint}
      passwordSpecialCharacterHint={passwordSpecialCharacterHint}
    />
  );
}

export const Hint: ComponentType<Props> = memo<Props>(F_Hint);
