import {
  useMemo,
  type JSX,
  useCallback,
  type ReactNode,
  type FocusEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { changeInput, type FormNames } from 'state/reducers/forms.ts';

import { Label } from 'library/intl/label.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { InputNumberField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames> = {
  id: string;
  name: string;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  label: IntlMessageId;
  divClassName: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  invalidClassName: string;
  min?: number | undefined;
  max?: number | undefined;
  icon?: ReactNode | undefined;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  iconClassName?: string | undefined;
  inputDivClassName?: string | undefined;
  placeholder?: IntlMessageId | undefined;
  field: Readonly<InputNumberField<FormName>>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onChange?:
    | ((value: number, field: Readonly<InputNumberField<FormName>>) => void)
    | undefined;
  onFocus?:
    | ((value: number, field: Readonly<InputNumberField<FormName>>) => void)
    | undefined;
  onBlur?:
    | ((value: number, field: Readonly<InputNumberField<FormName>>) => void)
    | undefined;
};

function F_InputNumberWithLabel<FormName extends FormNames>({
  id,
  min,
  max,
  name,
  step,
  icon,
  field,
  label,
  onBlur,
  onKeyUp,
  onFocus,
  onChange,
  placeholder,
  divClassName,
  iconClassName,
  labelClassName,
  inputClassName,
  validClassName,
  required = true,
  disabled = false,
  invalidClassName,
  inputDivClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
}: Props<FormName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      const num = Number.parseFloat(value);

      dispatch(
        changeInput({
          path: field.path,
          value: num,
        })
      );

      if (typeof onChange === 'function') {
        onChange(num, field);
      }
    },
    [field, onChange, dispatch]
  );

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      if (typeof onFocus === 'function') {
        onFocus(Number.parseFloat(value), field);
      }
    },
    [field, onFocus]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      let num = Number.parseFloat(value);

      if (Number.isNaN(num)) {
        num = min ?? 1;
      } else if (typeof min !== 'undefined' && num < min) {
        num = min;
      } else if (typeof max !== 'undefined' && num > max) {
        num = max;
      }

      dispatch(
        changeInput({
          path: field.path,
          value: num,
        })
      );

      if (typeof onBlur === 'function') {
        onBlur(num, field);
      }
    },
    [min, max, onBlur, field, dispatch]
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

      <div className={inputDivClassName}>
        {typeof icon === 'undefined' ? null : (
          <div role='img' aria-hidden className={iconClassName}>
            {icon}
          </div>
        )}

        <input
          id={id}
          min={min}
          max={max}
          name={name}
          step={step}
          type='number'
          onKeyUp={onKeyUp}
          required={required}
          disabled={disabled}
          onBlur={onInputBlur}
          className={className}
          onFocus={onInputFocus}
          onChange={onInputChange}
          placeholder={placeholderMemo}
          value={Number.isNaN(field.value) ? '' : field.value}
        />
      </div>
    </div>
  );
}

export const InputNumberWithLabel = reactMemo(F_InputNumberWithLabel);
