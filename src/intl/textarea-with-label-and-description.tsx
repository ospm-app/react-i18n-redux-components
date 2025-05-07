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
import type { InputTextField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  label: IntlMessageId;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  textareaClassName: string;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  textareaTouchedClassName: string;
  textareaUnTouchedClassName: string;
  field: Readonly<InputTextField<FormName, FieldName>>;
  errorClassName?: string | undefined;
  placeholder?: IntlMessageId | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLTextAreaElement | null> | undefined;
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
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
};

function F_TextareaWithLabelAndDescription<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  field,
  label,
  onBlur,
  onFocus,
  onChange,
  inputRef,
  onKeyDown,
  description,
  placeholder,
  errorMessage,
  labelClassName,
  validClassName,
  hiddenClassName,
  required = true,
  disabled = false,
  invalidClassName,
  fieldsetClassName,
  textareaClassName,
  textareaTouchedClassName = '',
  textareaUnTouchedClassName,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onTextareaChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
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

  const onTextareaFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      if (typeof onFocus === 'function') {
        onFocus(value, field);
      }
    },
    [field, onFocus]
  );

  const onTextareaBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
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

  const className = classnames(textareaClassName, {
    [validClassName]: field.valid && field.isTouched,
    [invalidClassName]: field.invalid && field.isTouched,
    [textareaUnTouchedClassName]: field.valid || !field.isTouched,
    [textareaTouchedClassName]: !disabled && !field.valid && field.isTouched,
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

      <textarea
        id={id}
        name={name}
        ref={inputRef}
        required={required}
        value={field.value}
        disabled={disabled}
        className={className}
        onBlur={onTextareaBlur}
        onFocus={onTextareaFocus}
        onChange={onTextareaChange}
        placeholder={placeholderMemo}
        onKeyDown={onKeyDown}
      />

      <p className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </p>

      <p className={errorClassName}>
        {invalid && typeof errorMessage === 'string' ? t(errorMessage) : null}
      </p>
    </fieldset>
  );
}

export const TextareaWithLabelAndDescription = reactMemo(
  F_TextareaWithLabelAndDescription
);
