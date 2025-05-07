import {
  useMemo,
  type JSX,
  useCallback,
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

import { Label } from 'library/intl/label.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { OnOff, AutoComplete } from 'types/common.ts';
import type { InputTextField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  label: IntlMessageId;
  divClassName: string;
  labelClassName: string;
  inputClassName: string;
  validClassName: string;
  invalidClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  autoCorrect?: OnOff | undefined;
  autoCapitalize?: OnOff | undefined;
  placeholder?: IntlMessageId | undefined;
  autoComplete?: AutoComplete | undefined;
  field: Readonly<InputTextField<FormName>>;
  onChange?:
    | ((
        value: string,
        field: Readonly<InputTextField<FormName, FieldName>>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        value: string,
        field: Readonly<InputTextField<FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: string,
        field: Readonly<InputTextField<FormName, FieldName>>
      ) => void)
    | undefined;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
};

function F_InputTextWithLabel<
  FormName extends FormNames,
  FieldName extends FieldNames = FieldNames,
>({
  id,
  name,
  field,
  label,
  required = true,
  onBlur,
  onFocus,
  onKeyUp,
  onChange,
  autoCorrect,
  placeholder,
  autoComplete,
  divClassName,
  autoCapitalize,
  inputClassName,
  labelClassName,
  validClassName,
  disabled = false,
  invalidClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      dispatch(
        changeInput({
          path: field.path,
          value,
        })
      );

      if (typeof onChange === 'function') {
        onChange(value, field);
      }
    },
    [field, onChange, dispatch]
  );

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      const { target } = event;
      const { value } = target;

      if (value !== '') {
        target.select();
      }

      if (typeof onFocus === 'function') {
        onFocus(value, field);
      }
    },
    [field, onFocus]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      if (typeof onBlur === 'function') {
        onBlur(value, field);
      }
    },
    [field, onBlur]
  );

  const placeholderMemo = useMemo<string>(() => {
    return typeof placeholder === 'undefined' ? '' : t(placeholder);
  }, [t, placeholder]);

  const className = classnames(inputClassName, {
    [validClassName]: field.valid && field.isTouched,
    [invalidClassName]: field.invalid && field.isTouched,
    [inputUnTouchedClassName]: field.valid || !field.isTouched,
    [inputTouchedClassName]: !disabled && !field.valid && field.isTouched,
  });

  // const invalid = !field.valid && field.invalid && field.isTouched

  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <input
        id={id}
        name={name}
        type={field.type}
        onKeyUp={onKeyUp}
        required={required}
        disabled={disabled}
        value={field.value}
        onBlur={onInputBlur}
        className={className}
        onFocus={onInputFocus}
        onChange={onInputChange}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        placeholder={placeholderMemo}
        autoCapitalize={autoCapitalize}
      />
    </div>
  );
}

export const InputTextWithLabel = reactMemo(F_InputTextWithLabel);
