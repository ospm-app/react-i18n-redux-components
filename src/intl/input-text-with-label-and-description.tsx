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

import { Label } from 'library/intl/label.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { OnOff, AutoComplete } from 'types/common.ts';
import type { InputTextField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  label: IntlMessageId;
  divClassName: string;
  labelClassName: string;
  inputClassName: string;
  validClassName: string;
  isLabelHidden?: boolean;
  hiddenClassName: string;
  invalidClassName: string;
  inputTouchedClassName: string;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  inputUnTouchedClassName: string;
  autoCorrect?: OnOff | undefined;
  autoCapitalize?: OnOff | undefined;
  errorClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  autoComplete?: AutoComplete | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  field: Readonly<InputTextField<FormName, FieldName>>;
  dataTestId?: string;
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
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  setValueAs?:
    | ((field: Readonly<InputTextField<FormName, FieldName>>) => string)
    | undefined;
};

function F_InputTextWithLabelAndDescription<
  FormName extends FormNames,
  FieldName extends FieldNames = FieldNames,
>({
  id,
  name,
  field,
  label,
  onBlur,
  onFocus,
  inputRef,
  onChange,
  onKeyDown,
  setValueAs,
  description,
  autoCorrect,
  placeholder,
  errorMessage,
  autoComplete,
  divClassName,
  autoCapitalize,
  inputClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  required = true,
  disabled = false,
  invalidClassName,
  inputTouchedClassName,
  isLabelHidden = false,
  inputUnTouchedClassName,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      dispatch(
        changeInput({
          path: field.path,
          value: event.target.value,
        })
      );

      if (typeof onChange === 'function') {
        onChange(event.target.value, field);
      }
    },
    [field, onChange, dispatch]
  );

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      if (event.target.value !== '') {
        event.target.select();
      }

      if (typeof onFocus === 'function') {
        onFocus(event.target.value, field);
      }
    },
    [field, onFocus]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      if (typeof onBlur === 'function') {
        onBlur(event.target.value, field);
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

  const inputTitle = useMemo<string | undefined>(() => {
    return isLabelHidden ? t(label) : undefined;
  }, [t, isLabelHidden, label]);

  const invalid = !field.valid && field.invalid && field.isTouched;

  return (
    <div className={divClassName}>
      {isLabelHidden ? null : (
        <Label
          id={id}
          label={label}
          required={required}
          className={labelClassName}
        />
      )}

      <input
        id={id}
        name={name}
        ref={inputRef}
        type={field.type}
        title={inputTitle}
        required={required}
        disabled={disabled}
        value={setValueAs ? setValueAs(field) : field.value}
        onBlur={onInputBlur}
        onKeyDown={onKeyDown}
        className={className}
        onFocus={onInputFocus}
        onChange={onInputChange}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        placeholder={placeholderMemo}
        autoCapitalize={autoCapitalize}
        data-testid={dataTestId}
      />

      <p className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </p>

      <p className={errorClassName}>
        {invalid && typeof errorMessage === 'string' ? t(errorMessage) : null}
      </p>
    </div>
  );
}

export const InputTextWithLabelAndDescription = reactMemo(
  F_InputTextWithLabelAndDescription
);
