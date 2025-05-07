import {
  memo,
  useMemo,
  type JSX,
  type ComponentType,
  type InputHTMLAttributes,
} from 'react';

import { PhoneInputReadonly } from 'library/intl/phone-input/phone-input-readonly.tsx';

import type { Flags } from 'app/valibot.ts';

type Props = {
  id: string;
  name: string;
  value: string;
  locale: string;
  inputClassName: string;
  containerClassName: string;
  flagClassName: string;
  dropdownButtonClassName: string;
  dataTestId?: string | undefined;
};

function F_InputPhoneReadonly({
  id,
  name,
  value,
  locale,
  inputClassName,
  containerClassName,
  flagClassName,
  dropdownButtonClassName,
  dataTestId = '',
}: Props): JSX.Element {
  const extra = useMemo<InputHTMLAttributes<HTMLInputElement>>(() => {
    return {
      'aria-live': 'polite',
      'aria-describedby': `${id}-error`,
      autoCorrect: 'off',
      autoComplete: 'tel',
    };
  }, [id]);

  const defaultCountry = useMemo<Flags>(() => {
    switch (locale) {
      // case 'ja-JP': {
      //   return 'jp'
      // }

      case 'te': {
        return 'us';
      }

      // case 'he': {
      //   return 'il'
      // }

      // case 'zh': {
      //   return 'cn'
      // }

      case 'ru': {
        return 'ru';
      }

      default: {
        return 'us';
      }
    }
  }, [locale]);

  return (
    <PhoneInputReadonly
      id={id}
      name={name}
      value={value}
      inputExtraProps={extra}
      defaultCountry={defaultCountry}
      inputClassName={inputClassName}
      flagClassName={flagClassName}
      containerClassName={containerClassName}
      dropdownButtonClassName={dropdownButtonClassName}
      dataTestId={dataTestId}
    />
  );
}

export const InputPhoneReadonly: ComponentType<Props> =
  memo<Props>(F_InputPhoneReadonly);
