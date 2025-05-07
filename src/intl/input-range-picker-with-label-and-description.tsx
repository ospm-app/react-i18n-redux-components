import { useMemo, type JSX, useCallback, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { reactMemo } from 'utils/react-memo.ts';

import {
  type FormNames,
  type FieldNames,
  changeRangePickerEndInput,
  changeRangePickerStartInput,
  validateRangePickerEndInput,
  validateRangePickerStartInput,
} from 'state/reducers/forms.ts';

import { Label } from 'library/intl/label.tsx';

import { RangePickerField } from 'library/regular/range-picker-field.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { IntlMessageId, Locale } from 'const/intl/index.ts';
import type { InputRangePickerField } from 'state/reducers/forms/types.ts';

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
  calendarsRowClassName: string;
  headerButtonClassName: string;
  inputTouchedClassName: string;
  daysColCurrentClassName: string;
  inputUnTouchedClassName: string;
  inputContainerClassName: string;
  rangeContainerClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  calendarContainerClassName: string;
  daysRangeColSelectedClassName: string;
  field: Readonly<InputRangePickerField<FormName, fieldName>>;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onFocus?:
    | ((
        value: number,
        field: Readonly<InputRangePickerField<FormName, fieldName>>
      ) => void)
    | undefined;
};

function F_InputRangePickerWithLabelAndDescription<
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
  calendarsRowClassName,
  headerButtonClassName,
  inputTouchedClassName,
  daysColCurrentClassName,
  inputUnTouchedClassName,
  inputContainerClassName,
  rangeContainerClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  calendarContainerClassName,
  daysRangeColSelectedClassName,
  required = true,
  disabled = false,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props<FormName, fieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onChangeStart = useCallback<(value: number) => void>(
    (value: number): void => {
      const isValid = value >= min && value <= max;

      dispatch(
        changeRangePickerStartInput({
          path: field.path,
          startValue: value,
          startValid: isValid,
          startInvalid: !isValid,
        })
      );
    },
    [field.path, min, max, dispatch]
  );
  const onChangeEnd = useCallback<(value: number) => void>(
    (value: number): void => {
      const isValid = value >= min && value <= max;

      dispatch(
        changeRangePickerEndInput({
          path: field.path,
          endValue: value,
          endValid: isValid,
          endInvalid: !isValid,
        })
      );
    },
    [field.path, min, max, dispatch]
  );

  const onBlurStart = useCallback(() => {
    const isValid =
      field.startValue !== 0 &&
      typeof field.endValue !== 'undefined' &&
      field.endValue < max;

    dispatch(
      validateRangePickerStartInput({
        path: field.path,
        startValue: field.startValue,
        startValid: isValid,
        startInvalid: !isValid,
      })
    );
  }, [dispatch, field.endValue, field.path, field.startValue, max]);

  const onBlurEnd = useCallback(() => {
    const isValid =
      field.startValue !== 0 &&
      typeof field.endValue !== 'undefined' &&
      field.endValue < max;

    dispatch(
      validateRangePickerEndInput({
        path: field.path,
        endValue: field.endValue,
        endValid: isValid,
        endInvalid: !isValid,
      })
    );
  }, [dispatch, field.path, field.startValue, field.endValue, max]);

  const onInputFocusStart = useCallback<
    (startValue: number | undefined) => void
  >(
    (startValue): void => {
      if (typeof onFocus !== 'undefined') {
        if (startValue !== undefined) {
          onFocus(startValue, field);
        }
      }
    },
    [field, onFocus]
  );
  const onInputFocusEnd = useCallback<(endValue: number | undefined) => void>(
    (endValue): void => {
      if (typeof onFocus !== 'undefined') {
        if (endValue !== undefined) {
          onFocus(endValue, field);
        }
      }
    },
    [field, onFocus]
  );

  function getDateFormatString(lang = 'default'): string {
    const formatObj = new Intl.DateTimeFormat(lang).formatToParts(new Date());

    return formatObj
      .map((obj) => {
        switch (obj.type) {
          case 'day':
            return 'DD';
          case 'month':
            return 'MM';
          case 'year':
            return 'YYYY';
          default:
            return obj.value;
        }
      })
      .join('');
  }

  const dateFormat = getDateFormatString(locale);
  const placeholderMemo = useMemo(() => dateFormat, [dateFormat]);

  const inputClassNameCombined = classnames(inputClassName, {
    [inputTouchedClassName]:
      !disabled && !field.startValid && field.isStartTouched,
    [inputUnTouchedClassName]: field.startValid || !field.isStartTouched,
  });

  const startInvalid =
    !field.startValid && field.startInvalid && field.isStartTouched;
  const endInvalid = !field.endValid && field.endInvalid && field.isEndTouched;

  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <RangePickerField
        id={id}
        min={min}
        max={max}
        name={name}
        field={field}
        locale={locale}
        inputRef={inputRef}
        disabled={disabled}
        required={required}
        onBlurEnd={onBlurEnd}
        onBlurStart={onBlurStart}
        endValue={field.endValue}
        endValid={field.endValid}
        onChangeEnd={onChangeEnd}
        onFocusEnd={onInputFocusEnd}
        daysClassName={daysClassName}
        onChangeStart={onChangeStart}
        placeholder={placeholderMemo}
        startValue={field.startValue}
        startValid={field.startValid}
        onFocusStart={onInputFocusStart}
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
        calendarsRowClassName={calendarsRowClassName}
        inputContainerClassName={inputContainerClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        rangeContainerClassName={rangeContainerClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        headerButtonIconClassName={headerButtonIconClassName}
        calendarContainerClassName={calendarContainerClassName}
        daysRangeColSelectedClassName={daysRangeColSelectedClassName}
      />

      <p className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </p>

      <p className={errorClassName}>
        {(startInvalid || endInvalid) && typeof errorMessage === 'string'
          ? t(errorMessage)
          : null}
      </p>
    </div>
  );
}

export const InputRangePickerWithLabelAndDescription = reactMemo(
  F_InputRangePickerWithLabelAndDescription
);
