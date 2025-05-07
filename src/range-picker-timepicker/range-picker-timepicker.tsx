import {
  useRef,
  useMemo,
  type JSX,
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type RefObject,
  type SetStateAction,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';

import { reactMemo } from 'utils/react-memo.ts';

import { RangePickerTimepickerLeft } from 'library/range-picker-timepicker/range-picker-timepicker-left.tsx';
import { RangePickerTimepickerRight } from 'library/range-picker-timepicker/range-picker-timepicker-right.tsx';

import type {
  FormNames,
  FormsState,
  FieldNames,
} from 'state/reducers/forms.ts';
import type { IntlMessageId } from '/app/const/intl/index.ts';
import type { TDayOfMonth } from 'library/range-picker-timepicker/types.ts';
import type { InputRangePickerTimePickerField } from 'state/reducers/forms/types.ts';

type Props<
  FormName extends FormNames = keyof FormsState,
  FieldName extends FieldNames = FieldNames,
> = {
  max: number;
  min: number;
  locale: string;
  firstDay: string;
  stepMinutes: number;
  daysClassName: string;
  footerClassName: string;
  headerClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
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
  calendarCheckerClassName: string;
  daysColSelectedClassName: string;
  inputTimeFormatClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  timeSectionWrapperClassName: string;
  daysRangeColSelectedClassName: string;
  rangePickerTimePickerClassName: string;
  checkboxMarkerContainerClassName: string;
  field: InputRangePickerTimePickerField<FormName, FieldName>;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  rangePickerTimePickerLabel: IntlMessageId;
  onBlurEnd?: ((value: number) => void) | undefined;
  onBlurStart?: ((value: number) => void) | undefined;
  wrapperRef?: RefObject<HTMLDivElement | null> | undefined;
  handleEndHoursChange?: ((hours: number) => void) | undefined;
  handleStartHoursChange?: ((hours: number) => void) | undefined;
  onChangeEnd?: ((value: number | undefined) => void) | undefined;
  handleEndMinutesChange?: ((minutes: number) => void) | undefined;
  onChangeStart?: ((value: number | undefined) => void) | undefined;
  handleStartMinutesChange?: ((minutes: number) => void) | undefined;
  handleEndTimeFormatChange?: ((timeStamp: string) => void) | undefined;
  handleDivKeyDownLeft?: KeyboardEventHandler<HTMLDivElement> | undefined;
  handleStartTimeFormatChange?: ((timeStamp: string) => void) | undefined;
  handleDivKeyDownRight?: KeyboardEventHandler<HTMLDivElement> | undefined;
  handle24hPickerCheckboxChange?: ((is24hPicker: boolean) => void) | undefined;
  handleTimePickerCheckboxChange?:
    | ((isTimePicker: boolean) => void)
    | undefined;
};

function F_RangePicker<
  FormName extends FormNames = keyof FormsState,
  FieldName extends FieldNames = FieldNames,
>({
  min,
  max,
  locale,
  field,
  firstDay,
  onBlurEnd,
  wrapperRef,
  stepMinutes,
  onBlurStart,
  onChangeEnd,
  onChangeStart,
  daysClassName,
  footerClassName,
  headerClassName,
  daysColClassName,
  daysRowClassName,
  checkboxClassName,
  daysBodyClassName,
  containerClassName,
  daysHeaderClassName,
  headerYearClassName,
  daysColOverClassName,
  emptyButtonClassName,
  handleDivKeyDownLeft,
  headerMonthClassName,
  inputNumberClassName,
  handleEndHoursChange,
  handleDivKeyDownRight,
  headerButtonClassName,
  handleStartHoursChange,
  calendarLabelClassName,
  footerWrapperClassName,
  selectOptionsClassName,
  handleEndMinutesChange,
  daysColCurrentClassName,
  handleStartMinutesChange,
  calendarCheckerClassName,
  daysColSelectedClassName,
  inputTimeFormatClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  handleEndTimeFormatChange,
  handleStartTimeFormatChange,
  timeSectionWrapperClassName,
  daysRangeColSelectedClassName,
  handle24hPickerCheckboxChange,
  handleTimePickerCheckboxChange,
  rangePickerTimePickerClassName,
  checkboxMarkerContainerClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  rangePickerTimePickerLabel,
}: Props<FormName, FieldName>): JSX.Element {
  const alignTime = useCallback<(date: Date) => Date>(
    (date: Date): Date => {
      const adjustedDate = new Date(date);

      adjustedDate.setMinutes(
        adjustedDate.getMinutes() +
          ((stepMinutes - (adjustedDate.getMinutes() % stepMinutes)) %
            stepMinutes),
        0,
        0
      );

      return adjustedDate;
    },
    [stepMinutes]
  );

  const [startDate, setStartDate] = useState<Date | undefined>(
    typeof field.startValue === 'undefined'
      ? undefined
      : new Date(field.startValue)
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    typeof field.endValue === 'undefined' ? undefined : new Date(field.endValue)
  );

  const [isTimePickerEnabled, setIsTimePickerEnabled] = useState(
    field.isTimePicker
  );

  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(
    field.is24hPicker
  );

  const [hoursStart, setHoursStart] = useState<number>(field.startHoursValue);

  const [hoursEnd, setHoursEnd] = useState<number>(field.endHoursValue || 0);

  const [minutesStart, setMinutesStart] = useState<number>(
    field.startMinutesValue
  );

  const [minutesEnd, setMinutesEnd] = useState<number>(field.endMinutesValue);

  const [timeFormat, setTimeFormat] = useState<'24h' | 'AM' | 'PM'>(
    () => field.timeFormat // ?? (is24HourFormat ? '24h' : 'AM')
  );

  const initialValue = useMemo<Date>(() => {
    const now = Date.now();

    const date =
      typeof now !== 'undefined' && Number.isFinite(now)
        ? new Date(now)
        : new Date();

    if (date.valueOf() < min) {
      date.setTime(min);
    }

    if (date.valueOf() > max) {
      date.setTime(max);
    }

    return alignTime(date);
  }, [min, max, alignTime]);

  const selectedInOneMonth = useRef<boolean>(false);
  const [inMonth, setInMonth] = useState<'inLeft' | 'inRight' | null>(null);

  const [date, setDateOrig] = useState<Date>(initialValue);

  const [monthLeft, setMonthLeft] = useState<number>(
    startDate ? startDate.getMonth() : new Date().getMonth()
  );

  const [yearLeft, setYearLeft] = useState<number>(
    startDate ? startDate.getFullYear() : new Date().getFullYear()
  );

  const [monthRight, setMonthRight] = useState<number>((monthLeft + 1) % 12);

  const [yearRight, setYearRight] = useState<number>(
    monthLeft === 11 ? yearLeft + 1 : yearLeft
  );

  useEffect(() => {
    if (!(startDate && endDate)) {
      return;
    }

    const inOneMonth =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth();

    selectedInOneMonth.current = inOneMonth;

    if (inOneMonth) {
      if (
        startDate.getMonth() === monthLeft &&
        endDate.getMonth() === monthLeft
      ) {
        setInMonth('inLeft');
      } else if (
        startDate.getMonth() === monthRight &&
        endDate.getMonth() === monthRight
      ) {
        setInMonth('inRight');
      }

      if (inMonth === 'inLeft') {
        setMonthLeft(startDate.getMonth());
        setYearLeft(startDate.getFullYear());
      } else if (inMonth === 'inRight') {
        setMonthRight(startDate.getMonth());
        setYearRight(startDate.getFullYear());
      }
    } else {
      setMonthRight(endDate.getMonth());
      setYearRight(endDate.getFullYear());
    }
  }, [startDate, endDate, monthLeft, monthRight, inMonth]);

  const updateLeftCalendar = useCallback(
    (newMonth: number, newYear: number) => {
      const validNewMonth = newMonth < 0 ? 11 : newMonth > 11 ? 0 : newMonth;
      const validNewYear =
        newMonth < 0 ? newYear - 1 : newMonth > 11 ? newYear + 1 : newYear;

      if (
        validNewYear < yearRight ||
        (validNewYear === yearRight && validNewMonth < monthRight)
      ) {
        setMonthLeft(validNewMonth);
        setYearLeft(validNewYear);
      }
    },
    [monthRight, yearRight]
  );

  const updateRightCalendar = useCallback(
    (newMonth: number, newYear: number) => {
      const validNewMonth = newMonth < 0 ? 11 : newMonth > 11 ? 0 : newMonth;
      const validNewYear =
        newMonth < 0 ? newYear - 1 : newMonth > 11 ? newYear + 1 : newYear;

      if (
        validNewYear > yearLeft ||
        (validNewYear === yearLeft && validNewMonth > monthLeft)
      ) {
        setMonthRight(validNewMonth);
        setYearRight(validNewYear);
      }
    },
    [monthLeft, yearLeft]
  );

  const handleToggleTimePicker = useCallback(() => {
    setIsTimePickerEnabled((prevState) => prevState === false);
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

  const handleHoursStartChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const value = Number.parseInt(event.target.value, 10);

    if (!Number.isNaN(value)) {
      setHoursStart(value);
    }
  }, []);

  const handleHoursEndChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const value = Number.parseInt(event.target.value, 10);

    if (!Number.isNaN(value)) {
      setHoursEnd(value);
    }
  }, []);

  const handleMinutesStartChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const value = Number.parseInt(event.target.value, 10);

    if (!Number.isNaN(value)) {
      setMinutesStart(value);
    }
  }, []);

  const handleMinutesEndChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const value = Number.parseInt(event.target.value, 10);

    if (!Number.isNaN(value)) {
      setMinutesEnd(value);
    }
  }, []);

  const handleAmPmChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
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
        wrapperRef.current !== null &&
        typeof wrapperRef !== 'function' &&
        event.relatedTarget instanceof HTMLElement &&
        wrapperRef.current.contains(event.relatedTarget) === false
      ) {
        event.preventDefault();

        if (typeof onBlurStart === 'function') {
          onBlurStart(date.valueOf());
        }

        if (typeof onBlurEnd === 'function') {
          onBlurEnd(date.valueOf());
        }

        if (event.target instanceof HTMLElement) {
          event.target.focus();
        }
      }
    },
    [date, onBlurStart, onBlurEnd, wrapperRef]
  );

  const onDayPickerChange = useCallback<Dispatch<SetStateAction<Date>>>(
    (dateArg) => {
      const newDate =
        typeof dateArg === 'function' ? dateArg(date) : alignTime(dateArg);

      setDate(newDate);

      if (!startDate) {
        setStartDate(newDate);

        if (typeof onChangeStart === 'function') {
          onChangeStart(newDate.valueOf());
        }
      } else if (endDate) {
        setStartDate(newDate);
        setEndDate(undefined);

        if (typeof onChangeStart === 'function') {
          onChangeStart(newDate.valueOf());
        }
      } else if (newDate < startDate) {
        setEndDate(startDate);
        setStartDate(newDate);

        if (typeof onChangeEnd === 'function') {
          onChangeEnd(startDate.valueOf());
        }

        if (typeof onChangeStart === 'function') {
          onChangeStart(newDate.valueOf());
        }
      } else {
        setEndDate(newDate);

        if (typeof onChangeEnd === 'function') {
          onChangeEnd(newDate.valueOf());
        }

        if (typeof onChangeEnd === 'function') {
          onChangeEnd(newDate.valueOf());
        }

        if (typeof handleStartHoursChange === 'function') {
          handleStartHoursChange(hoursStart);
        }

        if (typeof handleStartMinutesChange === 'function') {
          handleStartMinutesChange(minutesStart);
        }

        if (typeof handleEndHoursChange === 'function') {
          handleEndHoursChange(hoursEnd);
        }

        if (typeof handleEndMinutesChange === 'function') {
          handleEndMinutesChange(minutesEnd);
        }

        if (typeof handleEndTimeFormatChange === 'function') {
          handleEndTimeFormatChange(timeFormat);
        }

        if (typeof handleStartTimeFormatChange === 'function') {
          handleStartTimeFormatChange(timeFormat);
        }

        if (typeof handleTimePickerCheckboxChange === 'function') {
          handleTimePickerCheckboxChange(isTimePickerEnabled);
        }

        if (typeof handle24hPickerCheckboxChange === 'function') {
          handle24hPickerCheckboxChange(is24HourFormat);
        }
      }
    },
    [
      date,
      endDate,
      timeFormat,
      hoursStart,
      hoursEnd,
      startDate,
      minutesEnd,
      minutesStart,
      is24HourFormat,
      isTimePickerEnabled,
      setDate,
      alignTime,
      onChangeEnd,
      onChangeStart,
      handleEndHoursChange,
      handleEndMinutesChange,
      handleStartHoursChange,
      handleStartMinutesChange,
      handleEndTimeFormatChange,
      handleStartTimeFormatChange,
      handle24hPickerCheckboxChange,
      handleTimePickerCheckboxChange,
    ]
  );

  const onDaySelect = useCallback<(item: Readonly<TDayOfMonth>) => void>(
    (item) => {
      const newDate = new Date(item.year, item.month, item.day);

      if (endDate && newDate.getTime() === endDate.getTime()) {
        setStartDate(undefined);
        setEndDate(undefined);

        if (typeof onChangeStart === 'function') {
          onChangeStart(undefined);
        }

        if (typeof onChangeEnd === 'function') {
          onChangeEnd(undefined);
        }

        return;
      }

      if (typeof startDate === 'undefined') {
        setStartDate(newDate);
        onDayPickerChange(newDate);

        return;
      }

      if (typeof endDate === 'undefined') {
        if (newDate < startDate) {
          setEndDate(startDate);
          setStartDate(newDate);
        } else {
          setEndDate(newDate);
        }

        onDayPickerChange(newDate);

        return;
      }

      if (newDate < startDate) {
        setEndDate(startDate);
        setStartDate(newDate);
      } else if (newDate > endDate) {
        setEndDate(newDate);
      }

      if (newDate.getTime() === endDate.getTime()) {
        setStartDate(undefined);

        if (typeof onChangeStart === 'function') {
          onChangeStart(undefined);
        }

        if (typeof onChangeEnd === 'function') {
          onChangeEnd(undefined);
        }
      }

      onDayPickerChange(newDate);
    },
    [endDate, startDate, onDayPickerChange, onChangeStart, onChangeEnd]
  );

  const onDivKeyDownLeft = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown': {
          event.preventDefault();
          break;
        }

        default: {
          break;
        }
      }

      switch (event.key) {
        case 'ArrowLeft': {
          if (typeof handleDivKeyDownLeft === 'function') {
            handleDivKeyDownLeft(event);
          }

          break;
        }

        case 'ArrowRight': {
          if (typeof handleDivKeyDownLeft === 'function') {
            handleDivKeyDownLeft(event);
          }

          break;
        }

        case 'ArrowUp': {
          event.preventDefault();

          if (typeof handleDivKeyDownLeft === 'function') {
            const prevDate = new Date(date);

            prevDate.setDate(prevDate.getDate() - 7);

            handleDivKeyDownLeft(event);
          }

          break;
        }

        case 'ArrowDown': {
          event.preventDefault();

          if (typeof handleDivKeyDownLeft === 'function') {
            const nextDate = new Date(date);

            nextDate.setDate(nextDate.getDate() + 7);

            handleDivKeyDownLeft(event);
          }

          break;
        }

        default: {
          break;
        }
      }
    },
    [date, handleDivKeyDownLeft]
  );

  const onDivKeyDownRight = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown': {
          event.preventDefault();
          break;
        }

        default: {
          break;
        }
      }

      switch (event.key) {
        case 'ArrowLeft': {
          if (typeof handleDivKeyDownRight === 'function') {
            handleDivKeyDownRight(event);
          }

          break;
        }

        case 'ArrowRight': {
          if (typeof handleDivKeyDownRight === 'function') {
            handleDivKeyDownRight(event);
          }

          break;
        }

        case 'ArrowUp': {
          event.preventDefault();

          if (typeof handleDivKeyDownRight === 'function') {
            const prevDate = new Date(date);

            prevDate.setDate(prevDate.getDate() - 7);

            handleDivKeyDownRight(event);
          }

          break;
        }

        case 'ArrowDown': {
          event.preventDefault();

          if (typeof handleDivKeyDownRight === 'function') {
            const nextDate = new Date(date);

            nextDate.setDate(nextDate.getDate() + 7);

            handleDivKeyDownRight(event);
          }

          break;
        }

        default: {
          break;
        }
      }
    },
    [date, handleDivKeyDownRight]
  );

  return (
    <div className={rangePickerTimePickerClassName}>
      <RangePickerTimepickerLeft
        min={min}
        max={max}
        date={date}
        year={yearLeft}
        locale={locale}
        month={monthLeft}
        endDate={endDate}
        setDate={setDate}
        hours={hoursStart}
        firstDay={firstDay}
        setYear={setYearLeft}
        yearRight={yearRight}
        onDivBlur={onDivBlur}
        startDate={startDate}
        minutes={minutesStart}
        setMonth={setMonthLeft}
        monthRight={monthRight}
        timeFormat={timeFormat}
        wrapperRef={wrapperRef}
        onDivClick={onDivClick}
        onDivFocus={onDivFocus}
        onDaySelect={onDaySelect}
        daysClassName={daysClassName}
        is24HourFormat={is24HourFormat}
        onDivKeyDown={onDivKeyDownLeft}
        footerClassName={footerClassName}
        headerClassName={headerClassName}
        daysRowClassName={daysRowClassName}
        daysColClassName={daysColClassName}
        handleAmPmChange={handleAmPmChange}
        checkboxClassName={checkboxClassName}
        daysBodyClassName={daysBodyClassName}
        onDayPickerChange={onDayPickerChange}
        updateLeftCalendar={updateLeftCalendar}
        containerClassName={containerClassName}
        daysHeaderClassName={daysHeaderClassName}
        isTimePickerEnabled={isTimePickerEnabled}
        headerYearClassName={headerYearClassName}
        handleHoursChange={handleHoursStartChange}
        daysColOverClassName={daysColOverClassName}
        headerMonthClassName={headerMonthClassName}
        emptyButtonClassName={emptyButtonClassName}
        inputNumberClassName={inputNumberClassName}
        headerButtonClassName={headerButtonClassName}
        handleMinutesChange={handleMinutesStartChange}
        calendarLabelClassName={calendarLabelClassName}
        footerWrapperClassName={footerWrapperClassName}
        handleToggleTimePicker={handleToggleTimePicker}
        selectOptionsClassName={selectOptionsClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        inputTimeFormatClassName={inputTimeFormatClassName}
        calendarCheckerClassName={calendarCheckerClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        handleToggle24HourFormat={handleToggle24HourFormat}
        headerButtonIconClassName={headerButtonIconClassName}
        timeInputWrapperClassName={timeInputWrapperClassName}
        timeSectionWrapperClassName={timeSectionWrapperClassName}
        daysRangeColSelectedClassName={daysRangeColSelectedClassName}
        checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        hoursFormatLabel={hoursFormatLabel}
        rangePickerTimePickerLabel={rangePickerTimePickerLabel}
      />

      <RangePickerTimepickerRight
        min={min}
        max={max}
        date={date}
        locale={locale}
        year={yearRight}
        hours={hoursEnd}
        endDate={endDate}
        setDate={setDate}
        month={monthRight}
        yearLeft={yearLeft}
        firstDay={firstDay}
        minutes={minutesEnd}
        onDivBlur={onDivBlur}
        startDate={startDate}
        monthLeft={monthLeft}
        setYear={setYearRight}
        timeFormat={timeFormat}
        onDivClick={onDivClick}
        onDivFocus={onDivFocus}
        wrapperRef={wrapperRef}
        setMonth={setMonthRight}
        onDaySelect={onDaySelect}
        daysClassName={daysClassName}
        is24HourFormat={is24HourFormat}
        onDivKeyDown={onDivKeyDownRight}
        footerClassName={footerClassName}
        headerClassName={headerClassName}
        daysRowClassName={daysRowClassName}
        daysColClassName={daysColClassName}
        handleAmPmChange={handleAmPmChange}
        daysBodyClassName={daysBodyClassName}
        onDayPickerChange={onDayPickerChange}
        updateRightCalendar={updateRightCalendar}
        handleHoursChange={handleHoursEndChange}
        containerClassName={containerClassName}
        daysHeaderClassName={daysHeaderClassName}
        isTimePickerEnabled={isTimePickerEnabled}
        headerYearClassName={headerYearClassName}
        daysColOverClassName={daysColOverClassName}
        emptyButtonClassName={emptyButtonClassName}
        headerMonthClassName={headerMonthClassName}
        inputNumberClassName={inputNumberClassName}
        handleMinutesChange={handleMinutesEndChange}
        headerButtonClassName={headerButtonClassName}
        calendarLabelClassName={calendarLabelClassName}
        selectOptionsClassName={selectOptionsClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        inputTimeFormatClassName={inputTimeFormatClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        headerButtonIconClassName={headerButtonIconClassName}
        timeInputWrapperClassName={timeInputWrapperClassName}
        timeSectionWrapperClassName={timeSectionWrapperClassName}
        daysRangeColSelectedClassName={daysRangeColSelectedClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
      />
    </div>
  );
}

export const RangePickerTimepicker = reactMemo(F_RangePicker);
