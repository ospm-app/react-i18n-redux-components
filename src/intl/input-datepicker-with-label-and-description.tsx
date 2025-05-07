import { useMemo, type JSX, useCallback, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { reactMemo } from 'utils/react-memo.ts';

import {
  validateInput,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';
import { useAppDispatch } from 'state/store.ts';

import { Label } from 'library/intl/label.tsx';
import { DatePickerField } from 'library/regular/datepicker-field.tsx';

import type { IntlMessageId, Locale } from 'const/intl/index.ts';
import type { InputDatepickerField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, fieldName extends FieldNames> = {
  min?: number;
  max?: number;
  required?: boolean;
  disabled?: boolean;
  errorClassName?: string;
  descriptionClassName?: string;
  id: string;
  name: string;
  locale: Locale;
  label: IntlMessageId;
  divClassName: string;
  daysClassName: string;
  labelClassName: string;
  inputClassName: string;
  headerClassName: string;
  hiddenClassName: string;
  daysColClassName: string;
  daysRowClassName: string;
  daysBodyClassName: string;
  containerClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  inputTouchedClassName: string;
  daysColCurrentClassName: string;
  inputUnTouchedClassName: string;
  inputContainerClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  calendarContainerClassName: string;
  calendarAnimationClassName: string;
  field: Readonly<InputDatepickerField<FormName, fieldName>>;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onFocus?:
    | ((
        value: number,
        field: Readonly<InputDatepickerField<FormName, fieldName>>
      ) => void)
    | undefined;
};

function F_InputDatepickerWithLabelAndDescription<
  FormName extends FormNames,
  fieldName extends FieldNames,
>({
  id,
  name,
  field,
  label,
  locale,
  onFocus,
  inputRef,
  description,
  placeholder,
  errorMessage,
  divClassName,
  daysClassName,
  labelClassName,
  inputClassName,
  hiddenClassName,
  headerClassName,
  daysColClassName,
  daysRowClassName,
  daysBodyClassName,
  containerClassName,
  daysHeaderClassName,
  headerYearClassName,
  emptyButtonClassName,
  daysColOverClassName,
  headerMonthClassName,
  headerButtonClassName,
  inputTouchedClassName,
  daysColCurrentClassName,
  inputUnTouchedClassName,
  inputContainerClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  calendarContainerClassName,
  calendarAnimationClassName,
  required = true,
  disabled = false,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props<FormName, fieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onChange = useCallback<(value: number) => void>(
    (value: number): void => {
      const isValid = value >= min && value <= max;

      dispatch(
        validateInput({
          path: field.path,
          value,
          valid: isValid,
          invalid: !isValid,
        })
      );
    },
    [field.path, min, max, dispatch]
  );

  const onBlur = useCallback(() => {
    const isValid = field.value !== 0 && field.value < max;

    dispatch(
      validateInput({
        path: field.path,
        value: field.value,
        valid: isValid,
        invalid: !isValid,
      })
    );
  }, [dispatch, field.path, field.value, max]);

  const onInputFocus = useCallback<(value: number) => void>(
    (value): void => {
      if (typeof onFocus !== 'undefined') {
        onFocus(value, field);
      }
    },
    [field, onFocus]
  );

  const placeholderMemo = useMemo<string>(() => {
    return placeholder !== undefined ? t(placeholder) : '';
  }, [t, placeholder]);

  const inputClassNameCombined = classnames(inputClassName, {
    [inputTouchedClassName]: !disabled && !field.valid && field.isTouched,
    [inputUnTouchedClassName]: field.valid || !field.isTouched,
  });

  const invalid = !field.valid && field.invalid && field.isTouched;

  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <DatePickerField
        id={id}
        min={min}
        max={max}
        name={name}
        onBlur={onBlur}
        locale={locale}
        inputRef={inputRef}
        value={field.value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onFocus={onInputFocus}
        placeholder={placeholderMemo}
        daysClassName={daysClassName}
        headerClassName={headerClassName}
        daysColClassName={daysColClassName}
        daysRowClassName={daysRowClassName}
        daysBodyClassName={daysBodyClassName}
        inputClassName={inputClassNameCombined}
        containerClassName={containerClassName}
        daysHeaderClassName={daysHeaderClassName}
        headerYearClassName={headerYearClassName}
        emptyButtonClassName={emptyButtonClassName}
        daysColOverClassName={daysColOverClassName}
        headerMonthClassName={headerMonthClassName}
        headerButtonClassName={headerButtonClassName}
        inputContainerClassName={inputContainerClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        headerButtonIconClassName={headerButtonIconClassName}
        calendarContainerClassName={calendarContainerClassName}
        calendarAnimationClassName={calendarAnimationClassName}
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

export const InputDatepickerWithLabelAndDescription = reactMemo(
  F_InputDatepickerWithLabelAndDescription
);
