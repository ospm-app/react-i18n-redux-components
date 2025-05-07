import {
  memo,
  useMemo,
  useState,
  type JSX,
  useCallback,
  type Dispatch,
  type RefObject,
  type ComponentType,
  type SetStateAction,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
} from 'react';

import { DayPicker } from 'library/datepicker-timepicker/day-picker.tsx';
import { CalendarHeader } from 'library/datepicker-timepicker/header.tsx';
import { CalendarFooter } from 'library/datepicker-timepicker/calendar-footer.tsx';

import type { IntlMessageId } from '/app/const/intl/index.ts';

type Props = {
  max: number;
  min: number;
  locale: string;
  firstDay: string;
  stepMinutes: number;
  daysClassName: string;
  containerClass: string;
  headerClassName: string;
  footerClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
  daysBodyClassName: string;
  checkboxClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  inputNumberClassName: string;
  headerButtonClassName: string;
  footerWrapperClassName: string;
  calendarLabelClassName: string;
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  inputTimeFormatClassName: string;
  calendarCheckerClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  timeSectionWrapperClassName: string;
  checkboxMarkerContainerClassName: string;
  value?: number | undefined;
  onBlur?: ((value: number) => void) | undefined;
  onChange?: ((value: number) => void) | undefined;
  handleHoursChange: ((hours: number) => void) | undefined;
  wrapperRef?: RefObject<HTMLDivElement | null> | undefined;
  handleMinutesChange: ((minutes: number) => void) | undefined;
  handleTimeFormatChange: ((timeStamp: string) => void) | undefined;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  datePickerTimePickerLabel: IntlMessageId;
};

function F_Calendar({
  min,
  max,
  value,
  locale,
  onBlur,
  onChange,
  firstDay,
  wrapperRef,
  stepMinutes,
  daysClassName,
  containerClass,
  headerClassName,
  footerClassName,
  daysColClassName,
  daysRowClassName,
  checkboxClassName,
  daysBodyClassName,
  handleHoursChange,
  daysHeaderClassName,
  handleMinutesChange,
  headerYearClassName,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  inputNumberClassName,
  headerButtonClassName,
  calendarLabelClassName,
  footerWrapperClassName,
  handleTimeFormatChange,
  selectOptionsClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  inputTimeFormatClassName,
  calendarCheckerClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  timeSectionWrapperClassName,
  checkboxMarkerContainerClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  datePickerTimePickerLabel,
}: Props): JSX.Element {
  const alignTime = useCallback<(date: Date) => Date>(
    (inputDate: Date): Date => {
      const alignedDate = new Date(inputDate);

      alignedDate.setMinutes(
        alignedDate.getMinutes() +
          ((stepMinutes - (alignedDate.getMinutes() % stepMinutes)) %
            stepMinutes),
        0,
        0
      );

      return alignedDate;
    },
    [stepMinutes]
  );

  const initialValue = useMemo<Date>(() => {
    const date =
      typeof value !== 'undefined' && Number.isFinite(value)
        ? new Date(value)
        : new Date();

    if (date.valueOf() < min) {
      date.setTime(min);
    }

    if (date.valueOf() > max) {
      date.setTime(max);
    }

    return alignTime(date);
  }, [value, min, max, alignTime]);

  const [date, setDateOrig] = useState<Date>(initialValue);
  const [month, setMonth] = useState<number>(date.getMonth());
  const [year, setYear] = useState<number>(date.getFullYear());
  const [isTimePickerEnabled, setIsTimePickerEnabled] = useState(false);
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(true);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [timeFormat, setTimeFormat] = useState<'24h' | 'AM' | 'PM'>(() =>
    is24HourFormat ? '24h' : 'AM'
  );

  const handleToggleTimePicker = useCallback(() => {
    setIsTimePickerEnabled((prevState) => !prevState);
  }, []);

  const handleToggle24HourFormat = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const is24Hour = event.target.checked;

      setIs24HourFormat(is24Hour);

      if (is24Hour === true) {
        setTimeFormat('24h');
      } else {
        setTimeFormat(timeFormat === '24h' ? 'AM' : timeFormat);
      }
    },
    [timeFormat]
  );

  const updateHoursChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const hours = Number.parseInt(event.target.value, 10);

      if (!Number.isNaN(hours)) {
        setHours(hours);
      }
    },
    []
  );

  const updateMinutesChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const minutes = Number.parseInt(event.target.value, 10);

      if (!Number.isNaN(minutes)) {
        setMinutes(minutes);
      }
    },
    []
  );

  const updateAmPmChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      const value = event.target.value as 'AM' | 'PM';

      setTimeFormat(value);
    },
    []
  );

  const setDate = useCallback<Dispatch<SetStateAction<Date>>>(
    (argDate: SetStateAction<Date>) => {
      setDateOrig((dt: Date): Date => {
        return alignTime(typeof argDate === 'function' ? argDate(dt) : argDate);
      });
    },
    [alignTime]
  );

  const onDivClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event): void => {
      // Added because clicking on the checkboxes Time picker and 24h format in calendar-footer didn't work correctly due to event.stopPropagation and event.preventDefault
      if (
        event.target instanceof HTMLInputElement &&
        event.target.type === 'checkbox'
      ) {
        return;
      }

      event.stopPropagation();

      event.preventDefault();
    },
    []
  );

  const onDivFocus = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event) => {
      if (
        wrapperRef &&
        typeof wrapperRef !== 'function' &&
        event.target === wrapperRef.current
      ) {
        event.stopPropagation();
        event.preventDefault();

        if (event.relatedTarget instanceof HTMLElement) {
          event.relatedTarget.focus();
        }
      }
    },
    [wrapperRef]
  );

  const onDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event) => {
      if (
        wrapperRef &&
        typeof wrapperRef !== 'function' &&
        wrapperRef.current !== null &&
        event.relatedTarget instanceof HTMLElement &&
        wrapperRef.current.contains(event.relatedTarget) === false
      ) {
        event.preventDefault();

        if (typeof onBlur === 'function') {
          onBlur(date.valueOf());
        }

        if (event.target instanceof HTMLElement) {
          event.target.focus();
        }
      }
    },
    [date, onBlur, wrapperRef]
  );

  const onDayPickerChange = useCallback<Dispatch<SetStateAction<Date>>>(
    (argDate) => {
      const newDate =
        typeof argDate === 'function'
          ? argDate(initialValue)
          : alignTime(argDate);

      setDate(newDate);

      if (typeof onChange === 'function') {
        onChange(newDate.valueOf());

        if (typeof handleHoursChange === 'function') {
          handleHoursChange(hours);
        }

        if (typeof handleMinutesChange === 'function') {
          handleMinutesChange(minutes);
        }

        if (typeof handleTimeFormatChange === 'function') {
          handleTimeFormatChange(timeFormat);
        }
      }
    },
    [
      alignTime,
      setDate,
      onChange,
      handleHoursChange,
      handleMinutesChange,
      handleTimeFormatChange,
      hours,
      minutes,
      timeFormat,
      initialValue,
    ]
  );

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      tabIndex={-1}
      ref={wrapperRef}
      onBlur={onDivBlur}
      role='application'
      onClick={onDivClick}
      onFocus={onDivFocus}
      className={containerClass}
    >
      <CalendarHeader
        min={min}
        max={max}
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
        headerClassName={headerClassName}
        headerYearClassName={headerYearClassName}
        headerMonthClassName={headerMonthClassName}
        headerButtonClassName={headerButtonClassName}
        headerButtonIconClassName={headerButtonIconClassName}
      />

      <DayPicker
        min={min}
        max={max}
        date={date}
        year={year}
        month={month}
        locale={locale}
        setDate={setDate}
        setYear={setYear}
        setMonth={setMonth}
        firstDay={firstDay}
        onChange={onDayPickerChange}
        daysClassName={daysClassName}
        daysRowClassName={daysRowClassName}
        daysColClassName={daysColClassName}
        daysBodyClassName={daysBodyClassName}
        daysHeaderClassName={daysHeaderClassName}
        daysColOverClassName={daysColOverClassName}
        emptyButtonClassName={emptyButtonClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        daysColSelectedClassName={daysColSelectedClassName}
      />

      <CalendarFooter
        hours={hours}
        minutes={minutes}
        timeFormat={timeFormat}
        is24HourFormat={is24HourFormat}
        onAmPmChange={updateAmPmChange}
        onHoursChange={updateHoursChange}
        footerClassName={footerClassName}
        onMinutesChange={updateMinutesChange}
        checkboxClassName={checkboxClassName}
        isTimePickerEnabled={isTimePickerEnabled}
        onToggleTimePicker={handleToggleTimePicker}
        inputNumberClassName={inputNumberClassName}
        onToggle24HourFormat={handleToggle24HourFormat}
        footerWrapperClassName={footerWrapperClassName}
        calendarLabelClassName={calendarLabelClassName}
        selectOptionsClassName={selectOptionsClassName}
        calendarCheckerClassName={calendarCheckerClassName}
        inputTimeFormatClassName={inputTimeFormatClassName}
        timeInputWrapperClassName={timeInputWrapperClassName}
        timeSectionWrapperClassName={timeSectionWrapperClassName}
        checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        hoursFormatLabel={hoursFormatLabel}
        datePickerTimePickerLabel={datePickerTimePickerLabel}
      />
    </div>
  );
}

export const Calendar: ComponentType<Props> = memo<Props>(F_Calendar);
