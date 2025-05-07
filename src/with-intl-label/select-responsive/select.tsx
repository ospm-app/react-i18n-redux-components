import {
  useMemo,
  type JSX,
  useCallback,
  type RefObject,
  type FocusEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import {
  changeInput,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import { Option } from 'library/regular/option.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { SelectOption } from 'library/types.ts';
import type { IntlMessageId } from 'const/intl/index.ts';
import type { SelectField } from 'state/reducers/forms/types.ts';

type Props<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
> = {
  id: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  optionClassName: string;
  selectClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  field: Readonly<SelectField<Value, FormName, FieldName>>;
  placeholder?: IntlMessageId | undefined;
  selectRef?: RefObject<HTMLSelectElement> | undefined;
  readonly options: ReadonlyArray<SelectOption<Value>>;
  onKeyDown: KeyboardEventHandler<HTMLSelectElement>;
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

function F_Select<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  field,
  onBlur,
  onFocus,
  options,
  onChange,
  onKeyDown,
  selectRef,
  placeholder,
  required = true,
  disabled = false,
  selectClassName,
  optionClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
}: Props<Value, FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onSelectChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      dispatch(
        changeInput({
          path: field.path,
          value: event.target.value,
        })
      );

      if (onChange instanceof Function) {
        onChange(event.target.value as Value | undefined, field);
      }
    },
    [field, onChange, dispatch]
  );

  const onSelectBlur = useCallback<FocusEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      if (typeof onBlur === 'function') {
        onBlur(event.target.value as Value | undefined, field);
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

  const onSelectFocus = useCallback<FocusEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      if (typeof onFocus === 'function') {
        onFocus(event.target.value as Value | undefined, field);
      } else {
        dispatch(
          changeInput({
            path: field.path,
            value: event.target.value,
          })
        );
      }
    },
    [onFocus, field, dispatch]
  );

  const placeholderMemo = useMemo<string>(() => {
    return typeof placeholder === 'undefined' ? '' : t(placeholder);
  }, [t, placeholder]);

  const optionsMemo = useMemo<
    Array<{ value: Value | undefined; label: string }>
  >(() => {
    return options.map(({ label, value }: SelectOption<Value>) => {
      return {
        label: t(label),
        value,
      };
    });
  }, [t, options]);

  const className = classnames(selectClassName, {
    [inputUnTouchedClassName]:
      field.valid === true || field.isTouched === false,
    [inputTouchedClassName]:
      !disabled && field.valid === false && field.isTouched,
  });

  return (
    <select
      id={id}
      name={name}
      ref={selectRef}
      value={field.value}
      disabled={disabled}
      required={required}
      onBlur={onSelectBlur}
      className={className}
      onKeyDown={onKeyDown}
      onFocus={onSelectFocus}
      onChange={onSelectChange}
    >
      {placeholderMemo.length > 0 ? (
        <option value='' hidden>
          {placeholderMemo}
        </option>
      ) : null}

      {optionsMemo.map(({ value, label }): JSX.Element => {
        return (
          <Option
            optionClassName={optionClassName}
            key={value}
            value={value}
            label={label}
          />
        );
      })}
    </select>
  );
}

export const Select = reactMemo(F_Select);
