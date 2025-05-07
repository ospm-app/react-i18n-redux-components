import type { JSX, RefObject, KeyboardEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Label } from 'library/intl/label.tsx';
import { Combobox } from 'app/library/with-intl-label/select-responsive/combobox.tsx';

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
  readonly options: ReadonlyArray<SelectOption<Value>>;
  field: Readonly<SelectField<Value, FormName, FieldName>>;
  errorClassName?: string | undefined;
  placeholder?: IntlMessageId | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
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

function F_ComboboxSelectIntlWithLabeAndDescription<
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
  required = true,
  disabled = false,
  invalidClassName,
  selectDivClassName,
  inputTouchedClassName,
  readonlyInputClassName,
  inputUnTouchedClassName,
  selectButtonIconClassName,
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

      <Combobox<Value, FormName, FieldName>
        id={id}
        field={field}
        invalid={invalid}
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
        {typeof description === 'undefined' ? null : t(description)}
      </div>

      <p className={errorClassName}>
        {invalid && typeof errorMessage === 'string' ? t(errorMessage) : null}
      </p>
    </div>
  );
}

export const ComboboxSelectIntlWithLabeAndDescription = reactMemo(
  F_ComboboxSelectIntlWithLabeAndDescription
);
