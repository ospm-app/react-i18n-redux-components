import {
  memo,
  useId,
  type JSX,
  useCallback,
  type RefObject,
  type ComponentType,
  type KeyboardEventHandler,
} from 'react';
import { shallowEqual } from 'react-redux';

import { countries } from 'app/valibot.ts';

import { CountryCombobox } from 'library/country-combobox/country-combobox.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitCountryField } from 'state/reducers/forms/ui-kit.ts';

type SelectorProps = {
  disabled: boolean;
  field: UiKitCountryField;
};

type Props = {
  label: IntlMessageId;
  listClassName: string;
  itemClassName: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  placeholder: IntlMessageId;
  flagClassName: string;
  optionFlagClassName: string;
  spanOptionClassName: string;
  inputSelectedClassName: string;
  inputUnselectedClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  nextInputRef?: RefObject<HTMLInputElement | null> | undefined;
};

function selector({
  forms: {
    uiKit: { isFetching, country },
  },
}: ReduxState): SelectorProps {
  return {
    field: country,
    disabled: isFetching,
  };
}

function F_ComboboxCountry({
  label,
  inputRef,
  description,
  placeholder,
  errorMessage,
  nextInputRef,
  listClassName,
  itemClassName,
  errorClassName,
  inputClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  invalidClassName,
  fieldsetClassName,
  flagClassName,
  optionFlagClassName,
  spanOptionClassName,
  descriptionClassName,
  inputSelectedClassName,
  inputUnselectedClassName,
}: Props): JSX.Element {
  const id = useId();

  const { disabled, field } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      if (event.key === 'Tab') {
        event.preventDefault();

        nextInputRef?.current?.focus();
      }
    },
    [nextInputRef]
  );

  return (
    <CountryCombobox<'uiKit', 'country'>
      id={id}
      name='country'
      label={label}
      field={field}
      inputRef={inputRef}
      disabled={disabled}
      iso2List={countries}
      onKeyDown={onKeyDown}
      description={description}
      placeholder={placeholder}
      errorMessage={errorMessage}
      listClassName={listClassName}
      itemClassName={itemClassName}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      errorClassName={errorClassName}
      validClassName={validClassName}
      hiddenClassName={hiddenClassName}
      invalidClassName={invalidClassName}
      fieldsetClassName={fieldsetClassName}
      flagClassName={flagClassName}
      optionFlagClassName={optionFlagClassName}
      spanOptionClassName={spanOptionClassName}
      descriptionClassName={descriptionClassName}
      inputSelectedClassName={inputSelectedClassName}
      inputUnselectedClassName={inputUnselectedClassName}
    />
  );
}

export const ComboboxCountry: ComponentType<Props> =
  memo<Props>(F_ComboboxCountry);
