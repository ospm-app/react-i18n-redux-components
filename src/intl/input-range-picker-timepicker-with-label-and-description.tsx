import { useMemo, type JSX, useCallback, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { reactMemo } from 'utils/react-memo.ts';

import {
  type FormNames,
  type FieldNames,
  validateRangePickerTimepickerEndInput,
  changeRangePickerTimePickerEndDateInput,
  validateRangePickerTimepickerStartInput,
  changeRangePickerTimePickerEndHoursInput,
  changeRangePickerTimePickerStartDateInput,
  changeRangePickerTimePickerCheckboxSelect,
  changeRangePickerTimePickerStartHoursInput,
  changeRangePickerTimePickerEndMinutesInput,
  changeRangePickerTimePickerStartMinutesInput,
  changeRangePickerTimePicker24hCheckboxSelect,
  changeRangePickerTimePickerEndTimeFormatInput,
  changeRangePickerTimePickerStartTimeFormatInput,
} from 'state/reducers/forms.ts';
import { useAppDispatch } from 'state/store.ts';

import { Label } from 'library/intl/label.tsx';
import { RangePickerTimePickerField } from 'library/regular/range-picker-timepicker-field.tsx';

import type { IntlMessageId, Locale } from 'const/intl/index.ts';
import type { InputRangePickerTimePickerField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, fieldName extends FieldNames> = {
  id: string;
  name: string;
  locale: Locale;
  divClassName: string;
  daysClassName: string;
  labelClassName: string;
  inputClassName: string;
  footerClassName: string;
  headerClassName: string;
  hiddenClassName: string;
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
  rangeContainerClassName: string;
  calendarCheckerClassName: string;
  daysColSelectedClassName: string;
  inputTimeFormatClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  calendarContainerClassName: string;
  timeSectionWrapperClassName: string;
  daysRangeColSelectedClassName: string;
  rangePickerTimePickerClassName: string;
  checkboxMarkerContainerClassName: string;
  field: Readonly<InputRangePickerTimePickerField<FormName, fieldName>>;
  label: IntlMessageId;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  rangePickerTimePickerLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  min?: number | undefined;
  max?: number | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onFocus?:
    | ((
        value: number,
        field: Readonly<InputRangePickerTimePickerField<FormName, fieldName>>
      ) => void)
    | undefined;
};

function F_InputRangePickerTimePickerWithLabelAndDescription<
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
  footerClassName,
  headerClassName,
  hiddenClassName,
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
  rangeContainerClassName,
  calendarCheckerClassName,
  inputTimeFormatClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  calendarContainerClassName,
  timeSectionWrapperClassName,
  daysRangeColSelectedClassName,
  rangePickerTimePickerClassName,
  checkboxMarkerContainerClassName,
  required = true,
  disabled = false,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  rangePickerTimePickerLabel,
}: Props<FormName, fieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onChangeStart = useCallback<(value: number) => void>(
    (value: number): void => {
      const isValid = value >= min && value <= max;

      dispatch(
        changeRangePickerTimePickerStartDateInput({
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
        changeRangePickerTimePickerEndDateInput({
          path: field.path,
          endValue: value,
          endValid: isValid,
          endInvalid: !isValid,
        })
      );
    },
    [field.path, min, max, dispatch]
  );

  const onHoursChangeStart = useCallback<(hours: number) => void>(
    (hours) => {
      dispatch(
        changeRangePickerTimePickerStartHoursInput({
          path: field.path,
          startHoursValue: hours,
        })
      );
    },
    [field.path, dispatch]
  );

  const onHoursChangeEnd = useCallback<(hours: number) => void>(
    (hours) => {
      dispatch(
        changeRangePickerTimePickerEndHoursInput({
          path: field.path,
          endHoursValue: hours,
        })
      );
    },
    [field.path, dispatch]
  );

  const onMinutesChangeStart = useCallback<(minutes: number) => void>(
    (minutes) => {
      dispatch(
        changeRangePickerTimePickerStartMinutesInput({
          path: field.path,
          startMinutesValue: minutes,
        })
      );
    },
    [field.path, dispatch]
  );

  const onMinutesChangeEnd = useCallback<(minutes: number) => void>(
    (minutes) => {
      dispatch(
        changeRangePickerTimePickerEndMinutesInput({
          path: field.path,
          endMinutesValue: minutes,
        })
      );
    },
    [field.path, dispatch]
  );

  const onTimeFormatChangeStart = useCallback<(timeFormat: string) => void>(
    (timeFormat) => {
      dispatch(
        changeRangePickerTimePickerStartTimeFormatInput({
          path: field.path,
          timeFormat,
        })
      );
    },
    [field.path, dispatch]
  );

  const onTimeFormatChangeEnd = useCallback<(timeFormat: string) => void>(
    (timeFormat) => {
      dispatch(
        changeRangePickerTimePickerEndTimeFormatInput({
          path: field.path,
          timeFormat,
        })
      );
    },
    [field.path, dispatch]
  );

  const isTimePickerCheckboxSelect = useCallback<
    (isTimePicker: boolean) => void
  >(
    (isTimePicker) => {
      dispatch(
        changeRangePickerTimePickerCheckboxSelect({
          path: field.path,
          isTimePicker,
        })
      );
    },
    [field.path, dispatch]
  );

  const is24hCheckboxesSelect = useCallback<(is24hPicker: boolean) => void>(
    (is24hPicker) => {
      dispatch(
        changeRangePickerTimePicker24hCheckboxSelect({
          path: field.path,
          is24hPicker,
        })
      );
    },
    [field.path, dispatch]
  );

  const onBlurStart = useCallback(() => {
    const isValid =
      field.startValue !== 0 &&
      typeof field.endValue !== 'undefined' &&
      field.endValue < max;

    dispatch(
      validateRangePickerTimepickerStartInput({
        path: field.path,
        startValue: field.startValue,
        startValid: isValid,
        startInvalid: !isValid,
      })
    );
  }, [dispatch, field.endValue, field.path, field.startValue, max]);

  const onBlurEnd = useCallback(() => {
    const isValid =
      field.endValue !== 0 &&
      typeof field.endValue !== 'undefined' &&
      field.endValue < max;

    dispatch(
      validateRangePickerTimepickerEndInput({
        path: field.path,
        endValue: field.endValue,
        endValid: isValid,
        endInvalid: !isValid,
      })
    );
  }, [dispatch, field.path, field.endValue, max]);

  const onInputFocusStart = useCallback<
    (valueStart: number | undefined) => void
  >(
    (valueStart): void => {
      if (typeof onFocus !== 'undefined') {
        if (valueStart !== undefined) {
          onFocus(valueStart, field);
        }
      }
    },
    [field, onFocus]
  );
  const onInputFocusEnd = useCallback<(valueEnd: number | undefined) => void>(
    (valueEnd): void => {
      if (typeof onFocus !== 'undefined') {
        if (valueEnd !== undefined) {
          onFocus(valueEnd, field);
        }
      }
    },
    [field, onFocus]
  );

  // const placeholderMemo = useMemo<string>(() => {
  //   return placeholder !== undefined ? t(placeholder) : ''
  // }, [t, placeholder])
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

      <RangePickerTimePickerField
        id={id}
        min={min}
        max={max}
        name={name}
        field={field}
        locale={locale}
        inputRef={inputRef}
        required={required}
        disabled={disabled}
        onBlurEnd={onBlurEnd}
        onBlurStart={onBlurStart}
        onChangeEnd={onChangeEnd}
        endValue={field.endValue}
        endValid={field.endValid}
        onFocusEnd={onInputFocusEnd}
        startValue={field.startValue}
        startValid={field.startValid}
        daysClassName={daysClassName}
        placeholder={placeholderMemo}
        onChangeStart={onChangeStart}
        onFocusStart={onInputFocusStart}
        footerClassName={footerClassName}
        headerClassName={headerClassName}
        daysColClassName={daysColClassName}
        daysRowClassName={daysRowClassName}
        onHoursChangeEnd={onHoursChangeEnd}
        checkboxClassName={checkboxClassName}
        daysBodyClassName={daysBodyClassName}
        inputClassName={inputClassNameCombined}
        containerClassName={containerClassName}
        onHoursChangeStart={onHoursChangeStart}
        onMinutesChangeEnd={onMinutesChangeEnd}
        daysHeaderClassName={daysHeaderClassName}
        headerYearClassName={headerYearClassName}
        emptyButtonClassName={emptyButtonClassName}
        daysColOverClassName={daysColOverClassName}
        headerMonthClassName={headerMonthClassName}
        inputNumberClassName={inputNumberClassName}
        onMinutesChangeStart={onMinutesChangeStart}
        headerButtonClassName={headerButtonClassName}
        is24hCheckboxesSelect={is24hCheckboxesSelect}
        onTimeFormatChangeEnd={onTimeFormatChangeEnd}
        calendarLabelClassName={calendarLabelClassName}
        footerWrapperClassName={footerWrapperClassName}
        selectOptionsClassName={selectOptionsClassName}
        onTimeFormatChangeStart={onTimeFormatChangeStart}
        inputContainerClassName={inputContainerClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        rangeContainerClassName={rangeContainerClassName}
        inputTimeFormatClassName={inputTimeFormatClassName}
        calendarCheckerClassName={calendarCheckerClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        headerButtonIconClassName={headerButtonIconClassName}
        timeInputWrapperClassName={timeInputWrapperClassName}
        isTimePickerCheckboxSelect={isTimePickerCheckboxSelect}
        calendarContainerClassName={calendarContainerClassName}
        timeSectionWrapperClassName={timeSectionWrapperClassName}
        daysRangeColSelectedClassName={daysRangeColSelectedClassName}
        rangePickerTimePickerClassName={rangePickerTimePickerClassName}
        checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        hoursFormatLabel={hoursFormatLabel}
        rangePickerTimePickerLabel={rangePickerTimePickerLabel}
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

export const InputRangePickerTimePickerWithLabelAndDescription = reactMemo(
  F_InputRangePickerTimePickerWithLabelAndDescription
);
