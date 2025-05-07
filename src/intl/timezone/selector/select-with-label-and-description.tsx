import type { JSX, KeyboardEventHandler, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Label } from 'library/intl/label.tsx';
import { TimezoneSelect } from 'library/intl/timezone/selector/select.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { FormNames, FieldNames } from 'state/reducers/forms.ts';
import type { InputTimezoneField } from 'state/reducers/forms/types.ts';
import type { SelectTimezoneOption } from 'library/intl/timezone/types.ts';

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
  onKeyDown: KeyboardEventHandler<HTMLSelectElement>;
  readonly options: ReadonlyArray<SelectTimezoneOption<Value>>;
  field: Readonly<InputTimezoneField<Value, FormName, FieldName>>;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  inputUnTouchedClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  selectRef?: RefObject<HTMLSelectElement | null> | undefined;
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

function F_TimezoneSelectWithLabelAndDescription<
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
  required = false,
  disabled = false,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props<Value, FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const invalid =
    field.invalid === true && field.valid !== true && field.isTouched;

  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <TimezoneSelect<Value, FormName, FieldName>
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
        {invalid === true && typeof errorMessage === 'string'
          ? t(errorMessage)
          : null}
      </p>
    </div>
  );
}

export const TimezoneSelectWithLabelAndDescription = reactMemo(
  F_TimezoneSelectWithLabelAndDescription
);
