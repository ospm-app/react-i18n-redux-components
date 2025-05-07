import {
  useMemo,
  type JSX,
  useCallback,
  type FocusEventHandler,
  type ChangeEventHandler,
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
  required?: boolean;
  disabled?: boolean;
  label: IntlMessageId;
  divClassName: string;
  labelClassName: string;
  textareaClassName: string;
  textareaTouchedClassName: string;
  textareaUnTouchedClassName: string;
  placeholder?: IntlMessageId | undefined;
  field: Readonly<InputTextField<FormName, FieldName>>;
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
};

function F_TextareaWithLabel<
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
  placeholder,
  divClassName,
  labelClassName,
  required = true,
  disabled = false,
  textareaClassName,
  textareaTouchedClassName,
  textareaUnTouchedClassName,
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onTextareaChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
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

  const onTextareaFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      event.stopPropagation();

      if (typeof onFocus === 'function') {
        onFocus(event.target.value, field);
      }
    },
    [field, onFocus]
  );

  const onTextareaBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
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

  const className = classnames(textareaClassName, {
    [textareaUnTouchedClassName]: field.valid || !field.isTouched,
    [textareaTouchedClassName]: !disabled && !field.valid && field.isTouched,
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

      <textarea
        id={id}
        name={name}
        required={required}
        value={field.value}
        disabled={disabled}
        className={className}
        onBlur={onTextareaBlur}
        onFocus={onTextareaFocus}
        onChange={onTextareaChange}
        placeholder={placeholderMemo}
      />
    </div>
  );
}

export const TextareaWithLabel = reactMemo(F_TextareaWithLabel);
