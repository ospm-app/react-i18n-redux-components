import type { JSX, KeyboardEventHandler, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Label } from 'library/intl/label.tsx';
import { Select } from 'app/library/intl/select-responsive/select.tsx';

import type { SelectOption } from 'library/types.ts';
import type { IntlMessageId } from 'const/intl/index.ts';
import type { SelectField } from 'state/reducers/forms/types.ts';
import type { FormNames, FieldNames } from 'state/reducers/forms.ts';

type Props<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
> = {
  id: string;
  name: string;
  label: IntlMessageId;
  divClassName: string;
  labelClassName: string;
  validClassName: string;
  optionClassName: string;
  selectClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  readonly options: ReadonlyArray<SelectOption<Value>>;
  field: Readonly<SelectField<Value, FormName, FieldName>>;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  selectRef?: RefObject<HTMLSelectElement | null> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLSelectElement> | undefined;
  onChange?:
    | ((
        value: Value | undefined,
        field: Readonly<SelectField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: Value | undefined,
        field: Readonly<SelectField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        value: Value | undefined,
        field: Readonly<SelectField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
};

function F_SelectWithLabelAndDescription<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  label,
  field,
  onBlur,
  onFocus,
  options,
  onChange,
  onKeyDown,
  selectRef,
  description,
  placeholder,
  divClassName,
  errorMessage,
  labelClassName,
  validClassName,
  hiddenClassName,
  optionClassName,
  selectClassName,
  invalidClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
  required = true,
  disabled = false,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props<Value, FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const invalid = field.invalid && !field.valid && field.isTouched;

  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <Select<Value, FormName, FieldName>
        id={id}
        name={name}
        field={field}
        onBlur={onBlur}
        onFocus={onFocus}
        options={options}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onKeyDown={onKeyDown}
        selectRef={selectRef}
        placeholder={placeholder}
        validClassName={validClassName}
        optionClassName={optionClassName}
        selectClassName={selectClassName}
        invalidClassName={invalidClassName}
        inputTouchedClassName={inputTouchedClassName}
        inputUnTouchedClassName={inputUnTouchedClassName}
      />

      <div className={descriptionClassName}>
        {typeof description === 'string' ? t(description) : null}
      </div>

      <p className={errorClassName}>
        {invalid && typeof errorMessage === 'string' ? t(errorMessage) : null}
      </p>
    </div>
  );
}

export const SelectWithLabelAndDescription = reactMemo(
  F_SelectWithLabelAndDescription
);
