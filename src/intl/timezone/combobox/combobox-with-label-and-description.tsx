import type { JSX, RefObject, KeyboardEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Label } from 'library/intl/label.tsx';
import { TimezoneCombobox } from 'library/intl/timezone/combobox/combobox.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { SelectOptionIntl } from 'library/types.ts';
import type { FormNames, FieldNames } from 'state/reducers/forms.ts';
import type { InputTimezoneField } from 'state/reducers/forms/types.ts';

type Props<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
> = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  label: IntlMessageId;
  divClassName: string;
  listClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  optionClassName: string;
  invalidClassName: string;
  selectDivClassName: string;
  inputTouchedClassName: string;
  readonlyInputClassName: string;
  inputUnTouchedClassName: string;
  selectButtonIconClassName: string;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  readonly options: ReadonlyArray<SelectOptionIntl<Value>>;
  field: Readonly<InputTimezoneField<Value, FormName, FieldName>>;
  errorClassName?: string | undefined;
  placeholder?: IntlMessageId | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  onChange?:
    | ((
        value: Value,
        field: Readonly<InputTimezoneField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: Value,
        field: Readonly<InputTimezoneField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        value: Value,
        field: Readonly<InputTimezoneField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
};

function F_TimezoneComboboxSelectIntlWithLabeAndDescription<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  field,
  label,
  onBlur,
  onFocus,
  options,
  onChange,
  inputRef,
  onKeyDown,
  description,
  placeholder,
  divClassName,
  errorMessage,
  listClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  optionClassName,
  invalidClassName,
  selectDivClassName,
  inputTouchedClassName,
  readonlyInputClassName,
  inputUnTouchedClassName,
  selectButtonIconClassName,
  required = true,
  disabled = false,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props<Value, FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const invalid =
    field.valid !== true && field.invalid === true && field.isTouched;

  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <TimezoneCombobox<Value, FormName, FieldName>
        id={id}
        field={field}
        onBlur={onBlur}
        onFocus={onFocus}
        options={options}
        disabled={disabled}
        onChange={onChange}
        inputRef={inputRef}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        listClassName={listClassName}
        validClassName={validClassName}
        hiddenClassName={hiddenClassName}
        optionClassName={optionClassName}
        invalidClassName={invalidClassName}
        selectDivClassName={selectDivClassName}
        inputTouchedClassName={inputTouchedClassName}
        readonlyInputClassName={readonlyInputClassName}
        inputUnTouchedClassName={inputUnTouchedClassName}
        selectButtonIconClassName={selectButtonIconClassName}
      />

      <div className={descriptionClassName}>
        {typeof description === 'string' ? t(description) : null}
      </div>

      <p className={errorClassName}>
        {invalid === true && typeof errorMessage === 'string'
          ? t(errorMessage)
          : null}
      </p>
    </div>
  );
}

export const TimezoneComboboxSelectIntlWithLabeAndDescription = reactMemo(
  F_TimezoneComboboxSelectIntlWithLabeAndDescription
);
