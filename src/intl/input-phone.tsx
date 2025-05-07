import {
  useMemo,
  type JSX,
  useCallback,
  type RefObject,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
} from 'react';
import { debounce } from 'ts-debounce';

import { reactMemo } from 'utils/react-memo.ts';
import { sanitizePhone } from 'utils/sanitize-phone.ts';

import {
  changeInput,
  validateInput,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import { PhoneInput } from 'app/library/intl/phone-input/phone-input';

import { useAppDispatch } from 'state/store.ts';

import type { Flags } from 'app/valibot.ts';
import type { AutoComplete } from 'types/common.ts';
import type { IntlMessageId } from 'const/intl/index.ts';
import type { InputTelField } from 'state/reducers/forms/types.ts';
import type { CountryData } from 'library/intl/phone-input/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  locale: string;
  disabled?: boolean;
  required?: boolean;
  inputClassName: string;
  validClassName: string;
  buttonClassName: string;
  hiddenClassName: string;
  searchClassName: string;
  invalidClassName: string;
  listBoxClassName: string;
  containerClassName: string;
  flagClassName: string;
  searchIconClassName: string;
  searchLabelClassName: string;
  listboxItemClassName: string;
  inputTouchedClassName: string;
  listContainerClassName: string;
  dropdownButtonClassName: string;
  listboxDividerClassName: string;
  inputUnTouchedClassName: string;
  searchInputLabel: IntlMessageId;
  searchPlaceholder: IntlMessageId;
  listboxItemIconClassName: string;
  listboxItemNameClassName: string;
  listboxItemDescClassName: string;
  searchContainerClassName: string;
  noEntriesMessageClassName: string;
  dropdownButtonIconClassName: string;
  field: Readonly<InputTelField<FormName, FieldName>>;
  dataTestId?: string | undefined;
  autoComplete?: AutoComplete | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  onFocus?:
    | ((
        value: string,
        field: Readonly<InputTelField<FormName, FieldName>>
      ) => void)
    | undefined;

  onBlur?:
    | ((
        value: string,
        field: Readonly<InputTelField<FormName, FieldName>>,
        valid: boolean
      ) => void)
    | undefined;
  onKeyDown?:
    | KeyboardEventHandler<HTMLInputElement | HTMLLIElement>
    | undefined;
};

function F_InputPhone<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  field,
  onBlur,
  locale,
  onFocus,
  inputRef,
  // onChange,
  onKeyDown,
  autoComplete,
  inputClassName,
  validClassName,
  hiddenClassName,
  buttonClassName,
  searchClassName,
  invalidClassName,
  listBoxClassName,
  searchInputLabel,
  searchPlaceholder,
  flagClassName,
  containerClassName,
  searchIconClassName,
  listboxItemClassName,
  searchLabelClassName,
  inputTouchedClassName,
  listContainerClassName,
  dropdownButtonClassName,
  listboxDividerClassName,
  inputUnTouchedClassName,
  listboxItemIconClassName,
  listboxItemNameClassName,
  listboxItemDescClassName,
  searchContainerClassName,
  noEntriesMessageClassName,
  dropdownButtonIconClassName,
  required = true,
  disabled = false,
  dataTestId = '',
}: Props<FormName, FieldName>): JSX.Element {
  const dispatch = useAppDispatch();

  const validate = useCallback<
    (
      value: string,
      field: Readonly<InputTelField<FormName, FieldNames>>,
      valid: boolean
    ) => void
  >(
    (value, field, valid): void => {
      dispatch(
        validateInput({
          path: field.path,
          value,
          valid,
          invalid: !valid,
        })
      );
    },
    [dispatch]
  );

  const validateDebounced = useMemo<
    (
      value: string,
      field: Readonly<InputTelField<FormName, FieldNames>>,
      valid: boolean
    ) => void
  >((): (() => void) => {
    return debounce<
      [string, Readonly<InputTelField<FormName, FieldNames>>, boolean],
      (
        value: string,
        field: Readonly<InputTelField<FormName, FieldNames>>,
        valid: boolean
      ) => void
    >(validate, 250, { isImmediate: false });
  }, [validate]);

  const onInputChange = useCallback<
    (value: string, _country: Readonly<CountryData>, valid: boolean) => void
  >(
    (value, _country, valid): void => {
      validateDebounced(value, field, valid);

      const sanitizedValue = sanitizePhone(value);

      if (sanitizedValue === field.value) {
        return;
      }

      dispatch(
        changeInput({
          path: field.path,
          value: sanitizedValue,
        })
      );

      // if (typeof onChange === 'function') {
      //   onChange(sanitizedValue, field, valid)
      // }
    },
    [validateDebounced, field, dispatch]
  );

  const onInputFocus = useCallback<
    (
      event: FocusEvent<HTMLInputElement>,
      _country: Readonly<CountryData>
    ) => void
  >(
    ({ target }, _country): void => {
      target.select();

      if (typeof onFocus === 'function') {
        onFocus(target.value, field);
      }
    },
    [field, onFocus]
  );

  const onInputBlur = useCallback<
    (
      event: FocusEvent<HTMLInputElement>,
      _country: Readonly<CountryData>,
      valid: boolean
    ) => void
  >(
    ({ target: { value } }, _country, valid) => {
      if (typeof onBlur === 'function') {
        onBlur(sanitizePhone(value), field, valid);
      }
    },
    [field, onBlur]
  );

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
    <PhoneInput
      id={id}
      name={name}
      enableSearchField
      inputRef={inputRef}
      disabled={disabled}
      required={required}
      value={field.value}
      valid={field.valid}
      onBlur={onInputBlur}
      onKeyDown={onKeyDown}
      onFocus={onInputFocus}
      invalid={field.invalid}
      inputExtraProps={extra}
      onChange={onInputChange}
      isTouched={field.isTouched}
      autoComplete={autoComplete}
      validClassName={validClassName}
      defaultCountry={defaultCountry}
      inputClassName={inputClassName}
      buttonClassName={buttonClassName}
      hiddenClassName={hiddenClassName}
      searchClassName={searchClassName}
      invalidClassName={invalidClassName}
      listBoxClassName={listBoxClassName}
      searchInputLabel={searchInputLabel}
      searchPlaceholder={searchPlaceholder}
      containerClassName={containerClassName}
      flagClassName={flagClassName}
      searchIconClassName={searchIconClassName}
      listboxItemClassName={listboxItemClassName}
      searchLabelClassName={searchLabelClassName}
      inputTouchedClassName={inputTouchedClassName}
      listContainerClassName={listContainerClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
      listboxDividerClassName={listboxDividerClassName}
      dropdownButtonClassName={dropdownButtonClassName}
      listboxItemIconClassName={listboxItemIconClassName}
      listboxItemNameClassName={listboxItemNameClassName}
      listboxItemDescClassName={listboxItemDescClassName}
      searchContainerClassName={searchContainerClassName}
      noEntriesMessageClassName={noEntriesMessageClassName}
      dropdownButtonIconClassName={dropdownButtonIconClassName}
      dataTestId={dataTestId}
    />
  );
}

export const InputPhone = reactMemo(F_InputPhone);
