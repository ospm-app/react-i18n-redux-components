import {
  useMemo,
  useState,
  type JSX,
  useCallback,
  type RefObject,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';
import { toggleBoolean } from 'utils/boolean.ts';

import {
  changeInput,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import { EyeIcon } from 'svg/icon-eye.tsx';
import { EyeSlashIcon } from 'svg/icon-eye-slash.tsx';

import { Label } from 'library/intl/label.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { AutoComplete } from 'types/common.ts';
import type { IntlMessageId } from 'const/intl/index.ts';
import type { InputPasswordField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  disabled?: boolean;
  label: IntlMessageId;
  inputClassName: string;
  validClassName: string;
  labelClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  inputIconClassName: string;
  inputTouchedClassName: string;
  required?: boolean | undefined;
  inputUnTouchedClassName: string;
  inputIconButtonClassName: string;
  errorClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  placeholder?: IntlMessageId | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  field: Readonly<InputPasswordField<FormName, FieldName>>;
  autoComplete: AutoComplete;
  dataTestId?: string;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onChange?:
    | ((
        value: string,
        field: Readonly<InputPasswordField<FormName, FieldName>>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        value: string,
        field: Readonly<InputPasswordField<FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: string,
        field: Readonly<InputPasswordField<FormName, FieldName>>
      ) => void)
    | undefined;
};

function F_InputPasswordWithLabelIntlAndDescription<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  field,
  label,
  onBlur,
  onFocus,
  onKeyUp,
  inputRef,
  onChange,
  onKeyDown,
  placeholder,
  description,
  autoComplete,
  fieldsetClassName,
  errorMessage,
  inputClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  required = true,
  disabled = false,
  invalidClassName,
  inputIconClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
  inputIconButtonClassName,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
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
    (event): void => {
      event.stopPropagation();

      if (typeof onFocus === 'function') {
        onFocus(event.target.value, field);
      }
    },
    [field, onFocus]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      if (typeof onBlur === 'function') {
        onBlur(event.target.value, field);
      }
    },
    [field, onBlur]
  );

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setOpen(toggleBoolean);
  }, []);

  const placeholderMemo = useMemo<string>(() => {
    return typeof placeholder === 'undefined' ? '' : t(placeholder);
  }, [placeholder, t]);

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
        onKeyUp={onKeyUp}
        required={required}
        disabled={disabled}
        value={field.value}
        onBlur={onInputBlur}
        onKeyDown={onKeyDown}
        className={className}
        onFocus={onInputFocus}
        onChange={onInputChange}
        autoComplete={autoComplete}
        placeholder={placeholderMemo}
        type={open ? 'text' : 'password'}
        data-testid={dataTestId}
      />

      <div className={inputIconClassName}>
        <button
          type='button'
          onClick={onClick}
          aria-expanded={open}
          className={inputIconButtonClassName}
        >
          {open ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      </div>

      <div className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </div>

      <p className={errorClassName}>
        {invalid && typeof errorMessage === 'string' ? t(errorMessage) : null}
      </p>
    </fieldset>
  );
}

export const InputPasswordWithLabelAndDescription = reactMemo(
  F_InputPasswordWithLabelIntlAndDescription
);
