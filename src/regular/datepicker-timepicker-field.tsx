import {
  memo,
  useMemo,
  useState,
  type JSX,
  useCallback,
  type RefObject,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';

import { useTranslation } from 'react-i18next';

import { useTouch } from 'utils/use-touch.ts';
import { toggleBoolean } from 'utils/boolean.ts';

import { DatePickerTimePicker } from 'library/datepicker-timepicker/index.tsx';

import type { IntlMessageId } from '/app/const/intl/index.ts';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

type Props = {
  min?: number;
  max?: number;
  id: string;
  name: string;
  value: number;
  locale: string;
  valid: boolean;
  daysClassName: string;
  inputClassName: string;
  headerClassName: string;
  footerClassName: string;
  daysColClassName: string;
  daysRowClassName: string;
  daysBodyClassName: string;
  checkboxClassName: string;
  containerClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  inputNumberClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  calendarLabelClassName: string;
  footerWrapperClassName: string;
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
  inputContainerClassName: string;
  calendarCheckerClassName: string;
  daysColSelectedClassName: string;
  inputTimeFormatClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  onChange: (value: number) => void;
  calendarContainerClassName: string;
  timeSectionWrapperClassName: string;
  onHoursChange: (hours: number) => void;
  checkboxMarkerContainerClassName: string;
  onMinutesChange: (minutes: number) => void;
  onTimeFormatChange: (timeFormat: string) => void;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  datePickerTimePickerLabel: IntlMessageId;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  placeholder?: string | undefined;
  onBlur?: ((value: number) => void) | undefined;
  onFocus?: ((value: number) => void) | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
};

function F_DatePickerTimePickerField({
  id,
  name,
  value,
  valid,
  locale,
  onBlur,
  onFocus,
  required,
  disabled,
  inputRef,
  onChange,
  placeholder,
  onHoursChange,
  daysClassName,
  inputClassName,
  onMinutesChange,
  headerClassName,
  footerClassName,
  daysColClassName,
  daysRowClassName,
  daysBodyClassName,
  checkboxClassName,
  containerClassName,
  onTimeFormatChange,
  daysHeaderClassName,
  headerYearClassName,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  inputNumberClassName,
  headerButtonClassName,
  calendarLabelClassName,
  selectOptionsClassName,
  footerWrapperClassName,
  inputContainerClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  inputTimeFormatClassName,
  calendarCheckerClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  calendarContainerClassName,
  timeSectionWrapperClassName,
  checkboxMarkerContainerClassName,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  datePickerTimePickerLabel,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [blurValue, setBlurValue] = useState<number>(Number.NEGATIVE_INFINITY);

  const onDateChange = useCallback<(value: number) => void>(
    (value) => {
      if (typeof onChange === 'function') {
        onChange(value);
      }

      setBlurValue(Number.NEGATIVE_INFINITY);

      setOpen(false);
    },
    [onChange]
  );
  const handleHoursChange = useCallback<(hours: number) => void>(
    (hours) => {
      if (typeof onHoursChange === 'function') {
        onHoursChange(hours);
      }

      setBlurValue(Number.NEGATIVE_INFINITY);
    },
    [onHoursChange]
  );

  const handleMinutesChange = useCallback<(minutes: number) => void>(
    (minutes) => {
      if (typeof onMinutesChange === 'function') {
        onMinutesChange(minutes);
      }

      setBlurValue(Number.NEGATIVE_INFINITY);
    },
    [onMinutesChange]
  );

  const handleTimeFormatChange = useCallback<(timeFormat: string) => void>(
    (timeFormat) => {
      if (typeof onTimeFormatChange === 'function') {
        onTimeFormatChange(timeFormat);
      }

      setBlurValue(Number.NEGATIVE_INFINITY);
    },
    [onTimeFormatChange]
  );

  const onDatepickerBlur = useCallback<(val: number) => void>((val): void => {
    setBlurValue(val);
  }, []);

  const onDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event): void => {
      event.stopPropagation();

      if (
        event.relatedTarget instanceof HTMLElement &&
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        if (Number.isFinite(blurValue)) {
          onChange(blurValue);
        }

        setOpen(false);
      } else {
        setBlurValue(Number.NEGATIVE_INFINITY);
      }
    },
    [onChange, blurValue]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (typeof onBlur === 'function') {
      onBlur(value);
    }
  }, [onBlur, value]);

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (typeof onFocus === 'function') {
      onFocus(value);
    }
  }, [onFocus, value]);

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      const timestamp = new Date(value).valueOf();

      if (!Number.isNaN(timestamp)) {
        onChange(timestamp);
      }
    },
    [onChange]
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

  const strValue = useMemo<string>(() => {
    if (!Number.isFinite(value)) {
      return '';
    }

    const date = new Date(value);

    return isTouch
      ? (date.toISOString().split('T')[0] ?? '')
      : date.toLocaleDateString(locale, dateOptions);
  }, [isTouch, locale, value]);

  const firstDay = useMemo<string>(() => {
    switch (locale) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case 'ar': {
        return t('days-of-week.saturday'); // 'Saturday'
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case 'ru':

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case 'fr':

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case 'es':

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
      {isTouch ? (
        // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
        <input
          id={id}
          step={1}
          max={max}
          min={min}
          type='date'
          name={name}
          ref={inputRef}
          value={strValue}
          disabled={disabled}
          required={required}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          onChange={onInputChange}
          placeholder={placeholder}
          className={inputClassName}
          aria-invalid={!valid}
        />
      ) : (
        // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
        <input
          id={id}
          readOnly
          type='text'
          name={name}
          ref={inputRef}
          value={strValue}
          disabled={disabled}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          onClick={onInputClick}
          onChange={onInputChange}
          placeholder={placeholder}
          onKeyDown={onInputKeyDown}
          className={inputClassName}
          aria-invalid={!valid}
        />
      )}

      <div className={calendarContainerClassName}>
        {open && !isTouch ? (
          <DatePickerTimePicker
            min={min}
            max={max}
            value={value}
            locale={locale}
            firstDay={firstDay}
            onChange={onDateChange}
            onBlur={onDatepickerBlur}
            daysClassName={daysClassName}
            footerClassName={footerClassName}
            headerClassName={headerClassName}
            containerClass={containerClassName}
            daysColClassName={daysColClassName}
            daysRowClassName={daysRowClassName}
            handleHoursChange={handleHoursChange}
            daysBodyClassName={daysBodyClassName}
            checkboxClassName={checkboxClassName}
            handleMinutesChange={handleMinutesChange}
            daysHeaderClassName={daysHeaderClassName}
            headerYearClassName={headerYearClassName}
            emptyButtonClassName={emptyButtonClassName}
            daysColOverClassName={daysColOverClassName}
            headerMonthClassName={headerMonthClassName}
            inputNumberClassName={inputNumberClassName}
            headerButtonClassName={headerButtonClassName}
            handleTimeFormatChange={handleTimeFormatChange}
            footerWrapperClassName={footerWrapperClassName}
            calendarLabelClassName={calendarLabelClassName}
            selectOptionsClassName={selectOptionsClassName}
            daysColCurrentClassName={daysColCurrentClassName}
            daysColSelectedClassName={daysColSelectedClassName}
            inputTimeFormatClassName={inputTimeFormatClassName}
            calendarCheckerClassName={calendarCheckerClassName}
            headerButtonIconClassName={headerButtonIconClassName}
            timeInputWrapperClassName={timeInputWrapperClassName}
            timeSectionWrapperClassName={timeSectionWrapperClassName}
            checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
            amPmLabel={amPmLabel}
            hoursLabel={hoursLabel}
            minutesLabel={minutesLabel}
            hoursFormatLabel={hoursFormatLabel}
            datePickerTimePickerLabel={datePickerTimePickerLabel}
          />
        ) : null}
      </div>
    </div>
  );
}

export const DatePickerTimePickerField: ComponentType<Props> = memo<Props>(
  F_DatePickerTimePickerField
);
