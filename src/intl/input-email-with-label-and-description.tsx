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
import { debounce } from 'ts-debounce';
import { useTranslation } from 'react-i18next';

import { emailRegexp } from 'utils/regexp.ts';
import { reactMemo } from 'utils/react-memo.ts';

import {
  changeInput,
  validateInput,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import { Label } from 'library/intl/label.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { OnOff, AutoComplete } from 'types/common.ts';
import type { InputEmailField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  label: IntlMessageId;
  labelClassName: string;
  inputClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  placeholder: IntlMessageId;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  field: Readonly<InputEmailField<FormName, FieldName>>;
  autoCorrect?: OnOff | undefined;
  autoCapitalize?: OnOff | undefined;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  autoComplete?: AutoComplete | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  dataTestId?: string;
  onChange?:
    | ((
        value: string,
        field: Readonly<InputEmailField<FormName, FieldName>>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        value: string,
        field: Readonly<InputEmailField<FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: string,
        field: Readonly<InputEmailField<FormName, FieldName>>
      ) => void)
    | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
};

function F_InputEmailWithLabelAndDescription<
  FormName extends FormNames,
  FieldName extends FieldNames,
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
  description,
  placeholder,
  autoCorrect,
  autoComplete,
  errorMessage,
  labelClassName,
  inputClassName,
  autoCapitalize,
  validClassName,
  hiddenClassName,
  required = true,
  disabled = false,
  invalidClassName,
  fieldsetClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const validate = useCallback<
    (
      value: string,
      field: Readonly<InputEmailField<FormName, FieldNames>>
    ) => void
  >(
    (value, field): void => {
      const isValid = emailRegexp(value);

      dispatch(
        validateInput({
          path: field.path,
          value,
          valid: isValid,
          invalid: !isValid,
        })
      );
    },
    [dispatch]
  );

  const validateDebounced = useMemo<
    (
      value: string,
      field: Readonly<InputEmailField<FormName, FieldNames>>
    ) => void
  >((): (() => void) => {
    return debounce<
      [string, Readonly<InputEmailField<FormName, FieldNames>>],
      (
        value: string,
        field: Readonly<InputEmailField<FormName, FieldNames>>
      ) => void
    >(validate, 250, { isImmediate: false });
  }, [validate]);

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      validateDebounced(event.target.value, field);

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
    [field, dispatch, validateDebounced, onChange]
  );

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event): void => {
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
    (event): void => {
      event.stopPropagation();

      const isValid = emailRegexp(event.target.value);

      if (typeof onBlur === 'function') {
        onBlur(event.target.value, field);
      } else {
        dispatch(
          validateInput({
            path: field.path,
            value: event.target.value,
            valid: isValid,
            invalid: !isValid,
          })
        );
      }
    },
    [dispatch, field, onBlur]
  );

  const className = classnames(inputClassName, {
    [validClassName]: field.valid && field.isTouched,
    [invalidClassName]: field.invalid && field.isTouched,
    [inputUnTouchedClassName]: field.valid || !field.isTouched,
    [inputTouchedClassName]: !disabled && !field.valid && field.isTouched,
  });

  const invalid = !field.valid && field.invalid && field.isTouched;

  return (
    <fieldset className={fieldsetClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <input
        id={id}
        name={name}
        ref={inputRef}
        type={field.type}
        required={required}
        disabled={disabled}
        value={field.value}
        onBlur={onInputBlur}
        onKeyDown={onKeyDown}
        className={className}
        onFocus={onInputFocus}
        onChange={onInputChange}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        placeholder={t(placeholder)}
        autoCapitalize={autoCapitalize}
        data-testid={dataTestId}
      />

      <div className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </div>

      <p className={errorClassName}>
        {invalid && typeof errorMessage === 'string' ? t(errorMessage) : null}
      </p>
    </fieldset>
  );
}

export const InputEmailWithLabelAndDescription = reactMemo(
  F_InputEmailWithLabelAndDescription
);
