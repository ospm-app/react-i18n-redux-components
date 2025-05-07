import {
  useRef,
  useMemo,
  type JSX,
  useState,
  useEffect,
  useCallback,
  type RefObject,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useTouch } from 'utils/use-touch.ts';
import { reactMemo } from 'utils/react-memo.ts';
import { toggleBoolean } from 'utils/boolean.ts';

import { RangePickerWithTimepicker } from 'library/range-picker-timepicker/index.tsx';
import { RangePickerTimepickerEndInput } from 'library/range-picker-timepicker/range-picker-end-input.tsx';
import { RangePickerTimepickerStartInput } from 'library/range-picker-timepicker/range-picker-start-input.tsx';

import type { IntlMessageId } from '/app/const/intl/index.ts';
import type { FormNames, FieldNames } from 'state/reducers/forms.ts';
import type { InputRangePickerTimePickerField } from 'state/reducers/forms/types.ts';

const dateFormats: Record<string, string> = {
  ru: 'DD.MM.YYYY',
  en: 'MM/DD/YYYY',
  fr: 'DD/MM/YYYY',
  de: 'DD/MM/YYYY',
};

type Props<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  min?: number;
  max?: number;
  id: string;
  name: string;
  locale: string;
  endValid: boolean;
  startValid: boolean;
  daysClassName: string;
  inputClassName: string;
  footerClassName: string;
  headerClassName: string;
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
  calendarLabelClassName: string;
  footerWrapperClassName: string;
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
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
  onChangeEnd(value: number | undefined): void;
  onChangeStart(value: number | undefined): void;
  field: InputRangePickerTimePickerField<FormName, FieldName>;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  rangePickerTimePickerLabel: IntlMessageId;
  endValue?: number | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  startValue?: number | undefined;
  placeholder?: string | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onHoursChangeEnd?: ((hours: number) => void) | undefined;
  onHoursChangeStart?: ((hours: number) => void) | undefined;
  onMinutesChangeEnd?: ((minutes: number) => void) | undefined;
  onBlurEnd?: ((value: number | undefined) => void) | undefined;
  onFocusEnd?: ((value: number | undefined) => void) | undefined;
  onMinutesChangeStart?: ((minutes: number) => void) | undefined;
  onBlurStart?: ((value: number | undefined) => void) | undefined;
  onFocusStart?: ((value: number | undefined) => void) | undefined;
  onTimeFormatChangeEnd?: ((timeFormat: string) => void) | undefined;
  onTimeFormatChangeStart?: ((timeFormat: string) => void) | undefined;
  is24hCheckboxesSelect?: ((is24hPicker: boolean) => void) | undefined;
  isTimePickerCheckboxSelect?: ((isTimePicker: boolean) => void) | undefined;
};

function F_RangePickerTimePickerField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
>({
  id,
  name,
  field,
  locale,
  disabled,
  endValue,
  endValid,
  inputRef,
  required,
  onBlurEnd,
  onFocusEnd,
  startValue,
  startValid,
  onBlurStart,
  onChangeEnd,
  placeholder,
  onFocusStart,
  onChangeStart,
  daysClassName,
  inputClassName,
  headerClassName,
  footerClassName,
  daysColClassName,
  daysRowClassName,
  onHoursChangeEnd,
  checkboxClassName,
  daysBodyClassName,
  onHoursChangeStart,
  containerClassName,
  onMinutesChangeEnd,
  daysHeaderClassName,
  headerYearClassName,
  onMinutesChangeStart,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  inputNumberClassName,
  is24hCheckboxesSelect,
  onTimeFormatChangeEnd,
  headerButtonClassName,
  calendarLabelClassName,
  footerWrapperClassName,
  selectOptionsClassName,
  inputContainerClassName,
  daysColCurrentClassName,
  onTimeFormatChangeStart,
  rangeContainerClassName,
  calendarCheckerClassName,
  daysColSelectedClassName,
  inputTimeFormatClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  calendarContainerClassName,
  isTimePickerCheckboxSelect,
  timeSectionWrapperClassName,
  daysRangeColSelectedClassName,
  rangePickerTimePickerClassName,
  checkboxMarkerContainerClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  rangePickerTimePickerLabel,
  hoursFormatLabel,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (typeof timeoutRef.current === 'number') {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [open, setOpen] = useState<boolean>(false);

  const [blurValueStart, setBlurValueStart] = useState<number>(
    Number.NEGATIVE_INFINITY
  );
  const [blurValueEnd, setBlurValueEnd] = useState<number>(
    Number.NEGATIVE_INFINITY
  );

  const formatDate = useCallback(
    (timestamp: number, locale: string): string => {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());

      const format = dateFormats[locale] ?? 'MM/DD/YYYY';

      return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year);
    },
    []
  );

  const onDateChangeStart = useCallback<(value: number | undefined) => void>(
    (value) => {
      if (typeof onChangeStart === 'function') {
        onChangeStart(value);
      }

      setBlurValueStart(Number.NEGATIVE_INFINITY);
    },
    [onChangeStart]
  );

  const onDateChangeEnd = useCallback<(value: number | undefined) => void>(
    (value) => {
      if (typeof onChangeEnd === 'function') {
        onChangeEnd(value);
      }

      setBlurValueStart(Number.NEGATIVE_INFINITY);
      setBlurValueEnd(Number.NEGATIVE_INFINITY);

      timeoutRef.current = window.setTimeout((): void => {
        setOpen(false);
      }, 300);
    },
    [onChangeEnd]
  );

  const handleStartHoursChange = useCallback<(hours: number) => void>(
    (hours) => {
      if (onHoursChangeStart) {
        onHoursChangeStart(hours);
      }

      setBlurValueStart(Number.NEGATIVE_INFINITY);
    },
    [onHoursChangeStart]
  );

  const handleEndHoursChange = useCallback<(hours: number) => void>(
    (hours) => {
      if (onHoursChangeEnd) {
        onHoursChangeEnd(hours);
      }

      setBlurValueEnd(Number.NEGATIVE_INFINITY);
    },
    [onHoursChangeEnd]
  );

  const handleStartMinutesChange = useCallback<(minutes: number) => void>(
    (minutes) => {
      if (onMinutesChangeStart) {
        onMinutesChangeStart(minutes);
      }

      setBlurValueStart(Number.NEGATIVE_INFINITY);
    },
    [onMinutesChangeStart]
  );

  const handleEndMinutesChange = useCallback<(minutes: number) => void>(
    (minutes) => {
      if (onMinutesChangeEnd) {
        onMinutesChangeEnd(minutes);
      }

      setBlurValueEnd(Number.NEGATIVE_INFINITY);
    },
    [onMinutesChangeEnd]
  );

  const handleStartTimeFormatChange = useCallback<(timeFormat: string) => void>(
    (timeFormat) => {
      if (onTimeFormatChangeStart) {
        onTimeFormatChangeStart(timeFormat);
      }

      setBlurValueStart(Number.NEGATIVE_INFINITY);
    },
    [onTimeFormatChangeStart]
  );

  const handleEndTimeFormatChange = useCallback<(timeFormat: string) => void>(
    (timeFormat) => {
      if (onTimeFormatChangeEnd) {
        onTimeFormatChangeEnd(timeFormat);
      }

      setBlurValueEnd(Number.NEGATIVE_INFINITY);
    },
    [onTimeFormatChangeEnd]
  );

  const handleTimePickerCheckboxChange = useCallback<
    (isTimePicker: boolean) => void
  >(
    (isTimePicker) => {
      if (isTimePickerCheckboxSelect) {
        isTimePickerCheckboxSelect(isTimePicker);
      }
    },
    [isTimePickerCheckboxSelect]
  );

  const handle24hPickerCheckboxChange = useCallback<
    (is24hPicker: boolean) => void
  >(
    (is24hPicker) => {
      if (is24hCheckboxesSelect) {
        is24hCheckboxesSelect(is24hPicker);
      }
    },
    [is24hCheckboxesSelect]
  );

  const onDatepickerBlurStart = useCallback<(val: number) => void>(
    (val): void => {
      setBlurValueStart(val);
    },
    []
  );

  const onDatepickerBlurEnd = useCallback<(val: number) => void>(
    (val): void => {
      setBlurValueEnd(val);
    },
    []
  );

  const onDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event): void => {
      event.stopPropagation();

      if (
        event.relatedTarget instanceof HTMLElement &&
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        if (Number.isFinite(blurValueStart)) {
          onChangeStart(blurValueStart);
        }

        setOpen(false);
      }

      if (
        event.relatedTarget instanceof HTMLElement &&
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        if (Number.isFinite(blurValueEnd)) {
          onChangeEnd(blurValueEnd);
        }

        setOpen(false);
      } else {
        setBlurValueStart(Number.NEGATIVE_INFINITY);
        setBlurValueEnd(Number.NEGATIVE_INFINITY);
      }
    },
    [onChangeStart, onChangeEnd, blurValueStart, blurValueEnd]
  );

  const onInputBlurStart = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onBlurStart === 'function') {
      onBlurStart(startValue);
    }
  }, [onBlurStart, startValue]);

  const onInputBlurEnd = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onBlurEnd === 'function') {
      onBlurEnd(startValue);
    }
  }, [onBlurEnd, startValue]);

  const onStartInputFocus = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onFocusStart === 'function') {
      onFocusStart(startValue);
    }
  }, [onFocusStart, startValue]);

  const onEndInputFocus = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onFocusEnd === 'function') {
      onFocusEnd(endValue);
    }
  }, [onFocusEnd, endValue]);

  const onInputChangeStart = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      const timestamp = new Date(value).valueOf();

      if (!Number.isNaN(timestamp)) {
        onChangeStart(timestamp);
      }
    },
    [onChangeStart]
  );

  const onInputChangeEnd = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      const timestamp = new Date(value).valueOf();

      if (!Number.isNaN(timestamp)) {
        onChangeEnd(timestamp);
      }
    },
    [onChangeEnd]
  );

  const onInputClick = useCallback<MouseEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      setOpen(toggleBoolean);
    },
    []
  );

  const onInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();

          setOpen(toggleBoolean);

          break;

        default:
          break;
      }
    },
    []
  );

  const isTouch = useTouch();
  //
  const strValueStart = useMemo<string | undefined>(() => {
    if (typeof startValue === 'undefined' || !Number.isFinite(startValue)) {
      return '';
    }

    const dateFromValueStart = new Date(startValue);

    return isTouch
      ? dateFromValueStart.toISOString().split('T')[0]
      : formatDate(startValue, locale);
  }, [isTouch, locale, startValue, formatDate]);

  const strValueEnd = useMemo<string | undefined>(() => {
    if (typeof endValue === 'undefined' || !Number.isFinite(endValue)) {
      return '';
    }

    const dateFromValueEnd = new Date(endValue);

    return isTouch
      ? dateFromValueEnd.toISOString().split('T')[0]
      : formatDate(endValue, locale);
  }, [isTouch, locale, endValue, formatDate]);

  const onDateSelectStart = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = new Date(event.target.value).valueOf();

      onChangeStart(selectedDate);
    },
    [onChangeStart]
  );

  const onDateSelectEnd = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = new Date(event.target.value).valueOf();

      onChangeEnd(selectedDate);
    },
    [onChangeEnd]
  );

  const firstDay = useMemo<string>(() => {
    switch (locale) {
      case 'ar': {
        return t('days-of-week.saturday'); // 'Saturday'
      }

      case 'ru':
      case 'fr':
      case 'es':
      case 'de': {
        return t('days-of-week.monday'); // 'Monday'
      }

      // case 'ja-JP':
      // case 'he':
      case 'zh': {
        return t('days-of-week.sunday'); // 'Sunday'
      }

      default: {
        return t('days-of-week.sunday'); // 'Sunday'
      }
    }
  }, [t, locale]);

  return (
    <div
      className={inputContainerClassName}
      onBlur={isTouch ? undefined : onDivBlur}
    >
      <div className={rangeContainerClassName}>
        <RangePickerTimepickerStartInput
          id={id}
          name={name}
          inputRef={inputRef}
          disabled={disabled}
          required={required}
          invalid={!startValid}
          placeholder={placeholder}
          onInputClick={onInputClick}
          strValueStart={strValueStart}
          inputClassName={inputClassName}
          onInputKeyDown={onInputKeyDown}
          onDateSelect={onDateSelectStart}
          onInputFocus={onStartInputFocus}
          onInputChange={onInputChangeStart}
          onInputBlurStart={onInputBlurStart}
        />

        <RangePickerTimepickerEndInput
          id={id}
          name={name}
          inputRef={inputRef}
          disabled={disabled}
          invalid={!endValid}
          required={required}
          placeholder={placeholder}
          strValueEnd={strValueEnd}
          onInputClick={onInputClick}
          onInputFocus={onEndInputFocus}
          onInputBlurEnd={onInputBlurEnd}
          onInputChange={onInputChangeEnd}
          onInputKeyDown={onInputKeyDown}
          inputClassName={inputClassName}
          onDateSelect={onDateSelectEnd}
        />
      </div>

      <div className={calendarContainerClassName}>
        {open && !isTouch ? (
          <RangePickerWithTimepicker<FormName, FieldName>
            min={min}
            max={max}
            field={field}
            locale={locale}
            firstDay={firstDay}
            daysClassName={daysClassName}
            onChangeEnd={onDateChangeEnd}
            onBlurEnd={onDatepickerBlurEnd}
            footerClassName={footerClassName}
            headerClassName={headerClassName}
            onChangeStart={onDateChangeStart}
            daysColClassName={daysColClassName}
            daysRowClassName={daysRowClassName}
            onBlurStart={onDatepickerBlurStart}
            checkboxClassName={checkboxClassName}
            daysBodyClassName={daysBodyClassName}
            containerClassName={containerClassName}
            daysHeaderClassName={daysHeaderClassName}
            headerYearClassName={headerYearClassName}
            emptyButtonClassName={emptyButtonClassName}
            daysColOverClassName={daysColOverClassName}
            handleEndHoursChange={handleEndHoursChange}
            headerMonthClassName={headerMonthClassName}
            inputNumberClassName={inputNumberClassName}
            headerButtonClassName={headerButtonClassName}
            calendarLabelClassName={calendarLabelClassName}
            footerWrapperClassName={footerWrapperClassName}
            handleStartHoursChange={handleStartHoursChange}
            handleEndMinutesChange={handleEndMinutesChange}
            selectOptionsClassName={selectOptionsClassName}
            daysColCurrentClassName={daysColCurrentClassName}
            handleStartMinutesChange={handleStartMinutesChange}
            inputTimeFormatClassName={inputTimeFormatClassName}
            calendarCheckerClassName={calendarCheckerClassName}
            daysColSelectedClassName={daysColSelectedClassName}
            handleEndTimeFormatChange={handleEndTimeFormatChange}
            headerButtonIconClassName={headerButtonIconClassName}
            timeInputWrapperClassName={timeInputWrapperClassName}
            handleStartTimeFormatChange={handleStartTimeFormatChange}
            timeSectionWrapperClassName={timeSectionWrapperClassName}
            handle24hPickerCheckboxChange={handle24hPickerCheckboxChange}
            daysRangeColSelectedClassName={daysRangeColSelectedClassName}
            handleTimePickerCheckboxChange={handleTimePickerCheckboxChange}
            rangePickerTimePickerClassName={rangePickerTimePickerClassName}
            checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
            amPmLabel={amPmLabel}
            hoursLabel={hoursLabel}
            minutesLabel={minutesLabel}
            hoursFormatLabel={hoursFormatLabel}
            rangePickerTimePickerLabel={rangePickerTimePickerLabel}
          />
        ) : null}
      </div>
    </div>
  );
}

export const RangePickerTimePickerField = reactMemo(
  F_RangePickerTimePickerField
);
