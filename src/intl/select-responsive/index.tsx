import type { JSX, RefObject, KeyboardEventHandler } from 'react';

import { useTouch } from 'utils/use-touch.ts';
import { reactMemo } from 'utils/react-memo.ts';

import { SelectWithLabelAndDescription } from 'library/intl/select-responsive/select-with-label-and-description.tsx';
import { ComboboxSelectIntlWithLabeAndDescription } from 'library/intl/select-responsive/combobox-with-label-and-description.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { SelectOptionIntl } from 'library/types.ts';
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
  listClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  optionClassName: string;
  selectClassName: string;
  invalidClassName: string;
  selectDivClassName: string;
  inputTouchedClassName: string;
  readonlyInputClassName: string;
  inputUnTouchedClassName: string;
  selectButtonIconClassName: string;
  onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onSelectKeyDown: KeyboardEventHandler<HTMLSelectElement>;
  field: Readonly<SelectField<Value, FormName, FieldName>>;
  readonly options: ReadonlyArray<SelectOptionIntl<Value>>;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  selectRef?: RefObject<HTMLSelectElement | null> | undefined;
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

function F_SelectResponsive<
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
  inputRef,
  onChange,
  selectRef,
  description,
  placeholder,
  divClassName,
  errorMessage,
  listClassName,
  labelClassName,
  validClassName,
  onInputKeyDown,
  hiddenClassName,
  optionClassName,
  selectClassName,
  onSelectKeyDown,
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
  const isTouch: boolean = useTouch();

  if (isTouch) {
    return (
      <SelectWithLabelAndDescription<Value, FormName, FieldName>
        id={id}
        name={name}
        label={label}
        field={field}
        onBlur={onBlur}
        onFocus={onFocus}
        options={options}
        required={required}
        disabled={disabled}
        onChange={onChange}
        selectRef={selectRef}
        description={description}
        placeholder={placeholder}
        divClassName={divClassName}
        errorMessage={errorMessage}
        onKeyDown={onSelectKeyDown}
        labelClassName={labelClassName}
        errorClassName={errorClassName}
        validClassName={validClassName}
        hiddenClassName={hiddenClassName}
        optionClassName={optionClassName}
        selectClassName={selectClassName}
        invalidClassName={invalidClassName}
        descriptionClassName={descriptionClassName}
        inputTouchedClassName={inputTouchedClassName}
        inputUnTouchedClassName={inputUnTouchedClassName}
      />
    );
  }

  return (
    <ComboboxSelectIntlWithLabeAndDescription<Value, FormName, FieldName>
      id={id}
      label={label}
      field={field}
      onBlur={onBlur}
      onFocus={onFocus}
      options={options}
      required={required}
      disabled={disabled}
      onChange={onChange}
      inputRef={inputRef}
      description={description}
      placeholder={placeholder}
      onKeyDown={onInputKeyDown}
      divClassName={divClassName}
      errorMessage={errorMessage}
      listClassName={listClassName}
      errorClassName={errorClassName}
      labelClassName={labelClassName}
      validClassName={validClassName}
      hiddenClassName={hiddenClassName}
      optionClassName={optionClassName}
      invalidClassName={invalidClassName}
      selectDivClassName={selectDivClassName}
      descriptionClassName={descriptionClassName}
      inputTouchedClassName={inputTouchedClassName}
      readonlyInputClassName={readonlyInputClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
      selectButtonIconClassName={selectButtonIconClassName}
    />
  );
}

export const SelectResponsive = reactMemo(F_SelectResponsive);
