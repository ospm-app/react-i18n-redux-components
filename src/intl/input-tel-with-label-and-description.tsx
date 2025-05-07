import type { JSX, KeyboardEventHandler, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Label } from 'library/intl/label.tsx';
import { InputPhone } from 'app/library/intl/input-phone';

import type { AutoComplete } from 'types/common.ts';
import type { IntlMessageId } from 'const/intl/index.ts';
import type { InputTelField } from 'state/reducers/forms/types.ts';
import type { FormNames, FieldNames } from 'state/reducers/forms.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  locale: string;
  label: IntlMessageId;
  labelClassName: string;
  inputClassName: string;
  validClassName: string;
  buttonClassName: string;
  hiddenClassName: string;
  searchClassName: string;
  invalidClassName: string;
  listBoxClassName: string;
  fieldsetClassName: string;
  containerClassName: string;
  flagClassName: string;
  searchIconClassName: string;
  listboxItemClassName: string;
  searchLabelClassName: string;
  inputTouchedClassName: string;
  listContainerClassName: string;
  searchInputLabel: IntlMessageId;
  dropdownButtonClassName: string;
  listboxDividerClassName: string;
  inputUnTouchedClassName: string;
  listboxItemIconClassName: string;
  listboxItemNameClassName: string;
  listboxItemDescClassName: string;
  searchContainerClassName: string;
  searchPlaceholder: IntlMessageId;
  noEntriesMessageClassName: string;
  dropdownButtonIconClassName: string;
  field: Readonly<InputTelField<FormName, FieldName>>;
  errorClassName?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  dataTestId?: string | undefined;
  description?: IntlMessageId | undefined;
  autoComplete?: AutoComplete | undefined;
  descriptionClassName?: string | undefined;
  errorMessage?: IntlMessageId | '' | undefined;
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
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
};

function F_InputTelWithLabelAndDescription<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  field,
  label,
  locale,
  onBlur,
  onFocus,
  inputRef,
  onKeyDown,
  description,
  autoComplete,
  errorMessage,
  flagClassName,
  labelClassName,
  inputClassName,
  validClassName,
  buttonClassName,
  hiddenClassName,
  searchClassName,
  invalidClassName,
  listBoxClassName,
  searchInputLabel,
  fieldsetClassName,
  searchPlaceholder,
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
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const invalid = field.invalid && !field.valid && field.isTouched;

  return (
    <div className={fieldsetClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <InputPhone
        id={id}
        name={name}
        field={field}
        locale={locale}
        onBlur={onBlur}
        onFocus={onFocus}
        inputRef={inputRef}
        disabled={disabled}
        required={required}
        onKeyDown={onKeyDown}
        autoComplete={autoComplete}
        flagClassName={flagClassName}
        inputClassName={inputClassName}
        validClassName={validClassName}
        buttonClassName={buttonClassName}
        hiddenClassName={hiddenClassName}
        searchClassName={searchClassName}
        invalidClassName={invalidClassName}
        listBoxClassName={listBoxClassName}
        searchInputLabel={searchInputLabel}
        searchPlaceholder={searchPlaceholder}
        containerClassName={containerClassName}
        searchIconClassName={searchIconClassName}
        searchLabelClassName={searchLabelClassName}
        listboxItemClassName={listboxItemClassName}
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

      {
        <p className={descriptionClassName}>
          {typeof description === 'undefined' ? null : t(description)}
        </p>
      }

      {
        <p className={errorClassName}>
          {invalid && typeof errorMessage === 'string' && errorMessage !== ''
            ? t(errorMessage)
            : null}
        </p>
      }
    </div>
  );
}

export const InputTelWithLabelAndDescription = reactMemo(
  F_InputTelWithLabelAndDescription
);
