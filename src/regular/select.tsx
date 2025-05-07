import {
  type JSX,
  useCallback,
  type RefObject,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';

import { reactMemo } from 'utils/react-memo.ts';

import {
  changeInput,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import { Option } from 'library/regular/option.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { AutoComplete } from 'types/common.ts';
import type { SelectOption } from 'library/types.ts';
import type { SelectField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  optionClassName: string;
  selectClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  placeholder?: string | undefined;
  field: Readonly<SelectField<string, FormName, FieldName>>;
  autoComplete: AutoComplete | undefined;
  selectRef: RefObject<HTMLSelectElement>;
  readonly options: ReadonlyArray<SelectOption>;
  onChange?:
    | ((
        value: string,
        field: Readonly<SelectField<string, FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((value: string, field: Readonly<SelectField<string>>) => void)
    | undefined;
  onKeyDown: KeyboardEventHandler<HTMLSelectElement>;
};

function F_Select<FormName extends FormNames, FieldName extends FieldNames>({
  id,
  name,
  field,
  onBlur,
  options,
  onChange,
  selectRef,
  onKeyDown,
  placeholder,
  autoComplete,
  optionClassName,
  selectClassName,
  required = true,
  disabled = false,
  inputTouchedClassName,
  inputUnTouchedClassName,
}: Props<FormName, FieldName>): JSX.Element {
  const dispatch = useAppDispatch();

  const onSelectChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      if (typeof onChange === 'function') {
        onChange(event.target.value, field);
      } else {
        dispatch(
          changeInput({
            path: field.path,
            value: event.target.value,
          })
        );
      }
    },
    [field, onChange, dispatch]
  );

  const onSelectBlur = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      if (onBlur instanceof Function) {
        onBlur(event.target.value, field);
      } else {
        dispatch(
          changeInput({
            path: field.path,
            value: event.target.value,
          })
        );
      }
    },
    [field, onBlur, dispatch]
  );

  const className = classnames(selectClassName, {
    [inputUnTouchedClassName]: field.valid || !field.isTouched,
    [inputTouchedClassName]: !disabled && !field.valid && field.isTouched,
  });

  return (
    <select
      id={id}
      name={name}
      ref={selectRef}
      value={field.value}
      disabled={disabled}
      required={required}
      className={className}
      onBlur={onSelectBlur}
      onKeyDown={onKeyDown}
      onChange={onSelectChange}
      autoComplete={autoComplete}
    >
      {typeof placeholder === 'undefined' ? null : (
        <option value='' hidden>
          {placeholder}
        </option>
      )}

      {options.map(({ value, label }): JSX.Element => {
        return (
          <Option
            key={value}
            value={value}
            label={label}
            optionClassName={optionClassName}
          />
        );
      })}
    </select>
  );
}

export const Select = reactMemo(F_Select);
