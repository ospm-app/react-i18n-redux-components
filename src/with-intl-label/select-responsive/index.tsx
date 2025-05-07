import type { JSX, RefObject, KeyboardEventHandler } from 'react';

import { useTouch } from 'utils/use-touch.ts';
import { reactMemo } from 'utils/react-memo.ts';

import { SelectWithLabelAndDescription } from 'library/with-intl-label/select-responsive/select-with-label-and-description.tsx';
import { ComboboxSelectIntlWithLabeAndDescription } from 'library/with-intl-label/select-responsive/combobox-with-label-and-description.tsx';

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
  required?: boolean;
  disabled?: boolean;
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
  readonlyInputClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  selectButtonIconClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  readonly options: ReadonlyArray<SelectOption<Value>>;
  field: Readonly<SelectField<Value, FormName, FieldName>>;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  selectRef: RefObject<HTMLSelectElement>;
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
  onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onSelectKeyDown: KeyboardEventHandler<HTMLSelectElement>;
};

function F_SelectResponsive<
  Value extends string,
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
  selectRef,
  onChange,
  description,
  placeholder,
  divClassName,
  errorMessage,
  listClassName,
  labelClassName,
  onInputKeyDown,
  validClassName,
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
