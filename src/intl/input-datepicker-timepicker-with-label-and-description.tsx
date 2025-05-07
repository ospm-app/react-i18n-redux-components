import { useMemo, type JSX, useCallback, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { reactMemo } from 'utils/react-memo.ts';

import {
  type FormNames,
  type FieldNames,
  validateDatePickerTimePickerInput,
  changeDatePickerTimePickerDateInput,
  changeDatePickerTimePickerHoursInput,
  changeDatePickerTimePickerMinutesInput,
  changeDatePickerTimePickerTimeFormatSelect,
} from 'state/reducers/forms.ts';
import { useAppDispatch } from 'state/store.ts';

import { Label } from 'library/intl/label.tsx';
import { DatePickerTimePickerField } from 'library/regular/datepicker-timepicker-field.tsx';

import type { IntlMessageId, Locale } from 'const/intl/index.ts';
import type { InputDatePickerTimePickerField } from 'state/reducers/forms/types.ts';

function getDateFormatString(locale = 'en-US'): string {
  const formatObj = new Intl.DateTimeFormat(locale).formatToParts(new Date());

  return formatObj
    .map((obj: Intl.DateTimeFormatPart): string => {
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
  divClassName: string;
  daysClassName: string;
  labelClassName: string;
  inputClassName: string;
  headerClassName: string;
  hiddenClassName: string;
  footerClassName: string;
  daysColClassName: string;
  daysRowClassName: string;
  checkboxClassName: string;
  daysBodyClassName: string;
  containerClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  inputNumberClassName: string;
  headerButtonClassName: string;
  inputTouchedClassName: string;
  calendarLabelClassName: string;
  footerWrapperClassName: string;
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
  inputUnTouchedClassName: string;
  inputContainerClassName: string;
  calendarCheckerClassName: string;
  daysColSelectedClassName: string;
  inputTimeFormatClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  calendarContainerClassName: string;
  timeSectionWrapperClassName: string;
  checkboxMarkerContainerClassName: string;
  field: Readonly<InputDatePickerTimePickerField<FormName, fieldName>>;
  label: IntlMessageId;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  datePickerTimePickerLabel: IntlMessageId;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onFocus?:
    | ((
        value: number,
        field: Readonly<InputDatePickerTimePickerField<FormName, fieldName>>
      ) => void)
    | undefined;
};

function F_InputDatepickerTimepickerWithLabelAndDescription<
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
  footerClassName,
  daysColClassName,
  daysRowClassName,
  checkboxClassName,
  daysBodyClassName,
  containerClassName,
  daysHeaderClassName,
  headerYearClassName,
  emptyButtonClassName,
  daysColOverClassName,
  headerMonthClassName,
  inputNumberClassName,
  headerButtonClassName,
  inputTouchedClassName,
  calendarLabelClassName,
  footerWrapperClassName,
  selectOptionsClassName,
  daysColCurrentClassName,
  inputUnTouchedClassName,
  inputContainerClassName,
  calendarCheckerClassName,
  daysColSelectedClassName,
  inputTimeFormatClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  calendarContainerClassName,
  timeSectionWrapperClassName,
  required = true,
  disabled = false,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
  checkboxMarkerContainerClassName,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  datePickerTimePickerLabel,
}: Props<FormName, fieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onChange = useCallback<(value: number) => void>(
    (value) => {
      const isValid = value >= min && value <= max;

      dispatch(
        changeDatePickerTimePickerDateInput({
          path: field.path,
          dateValue: value,
          valid: isValid,
          invalid: !isValid,
        })
      );
    },
    [field.path, min, max, dispatch]
  );

  const onHoursChange = useCallback<(hours: number) => void>(
    (hours) => {
      dispatch(
        changeDatePickerTimePickerHoursInput({
          path: field.path,
          hours,
        })
      );
    },
    [field.path, dispatch]
  );
  const onMinutesChange = useCallback<(minutes: number) => void>(
    (minutes) => {
      dispatch(
        changeDatePickerTimePickerMinutesInput({
          path: field.path,
          minutes,
        })
      );
    },
    [field.path, dispatch]
  );

  const onTimeFormatChange = useCallback<(timeFormat: string) => void>(
    (timeFormat) => {
      dispatch(
        changeDatePickerTimePickerTimeFormatSelect({
          path: field.path,
          timeFormat,
        })
      );
    },
    [field.path, dispatch]
  );

  const onBlur = useCallback(() => {
    const isValid = field.dateValue !== 0 && field.dateValue < max;

    dispatch(
      validateDatePickerTimePickerInput({
        path: field.path,
        value: field.dateValue,
        valid: isValid,
        invalid: !isValid,
      })
    );
  }, [dispatch, field.path, field.dateValue, max]);

  const onInputFocus = useCallback<(value: number) => void>(
    (value): void => {
      if (typeof onFocus !== 'undefined') {
        onFocus(value, field);
      }
    },
    [field, onFocus]
  );

  const placeholderMemo = useMemo<string>(() => {
    return placeholder !== undefined ? getDateFormatString(locale) : '';
  }, [placeholder, locale]);

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

      <DatePickerTimePickerField
        id={id}
        min={min}
        max={max}
        name={name}
        onBlur={onBlur}
        locale={locale}
        inputRef={inputRef}
        valid={field.valid}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onFocus={onInputFocus}
        value={field.dateValue}
        onHoursChange={onHoursChange}
        placeholder={placeholderMemo}
        daysClassName={daysClassName}
        headerClassName={headerClassName}
        footerClassName={footerClassName}
        onMinutesChange={onMinutesChange}
        daysColClassName={daysColClassName}
        daysRowClassName={daysRowClassName}
        checkboxClassName={checkboxClassName}
        daysBodyClassName={daysBodyClassName}
        inputClassName={inputClassNameCombined}
        containerClassName={containerClassName}
        onTimeFormatChange={onTimeFormatChange}
        daysHeaderClassName={daysHeaderClassName}
        headerYearClassName={headerYearClassName}
        emptyButtonClassName={emptyButtonClassName}
        daysColOverClassName={daysColOverClassName}
        headerMonthClassName={headerMonthClassName}
        inputNumberClassName={inputNumberClassName}
        headerButtonClassName={headerButtonClassName}
        calendarLabelClassName={calendarLabelClassName}
        footerWrapperClassName={footerWrapperClassName}
        selectOptionsClassName={selectOptionsClassName}
        inputContainerClassName={inputContainerClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        calendarCheckerClassName={calendarCheckerClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        inputTimeFormatClassName={inputTimeFormatClassName}
        headerButtonIconClassName={headerButtonIconClassName}
        timeInputWrapperClassName={timeInputWrapperClassName}
        calendarContainerClassName={calendarContainerClassName}
        timeSectionWrapperClassName={timeSectionWrapperClassName}
        checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        hoursFormatLabel={hoursFormatLabel}
        datePickerTimePickerLabel={datePickerTimePickerLabel}
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

export const InputDatepickerTimepickerWithLabelAndDescription = reactMemo(
  F_InputDatepickerTimepickerWithLabelAndDescription
);
