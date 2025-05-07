import {
  memo,
  type JSX,
  type Dispatch,
  type RefObject,
  type ChangeEvent,
  type ComponentType,
  type SetStateAction,
  type FocusEventHandler,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react';

import { DayPicker } from 'library/range-picker-timepicker/day-picker.tsx';
import { CalendarHeaderLeft } from 'library/range-picker-timepicker/header-left.tsx';
import { LeftCalendarFooter } from 'library/range-picker-timepicker/range-picker-footer-left.tsx';

import type { TDayOfMonth } from 'library/range-picker-timepicker/types.ts';
import type { IntlMessageId } from '/app/const/intl/index.ts';

type Props = {
  max: number;
  min: number;
  year: number;
  month: number;
  hours: number;
  locale: string;
  minutes: number;
  firstDay: string;
  yearRight: number;
  timeFormat: string;
  monthRight: number;
  date: Readonly<Date>;
  daysClassName: string;
  is24HourFormat: boolean;
  footerClassName: string;
  headerClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
  checkboxClassName: string;
  daysBodyClassName: string;
  containerClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  isTimePickerEnabled: boolean;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  inputNumberClassName: string;
  headerButtonClassName: string;
  calendarLabelClassName: string;
  footerWrapperClassName: string;
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
  inputTimeFormatClassName: string;
  calendarCheckerClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  handleToggleTimePicker: () => void;
  timeSectionWrapperClassName: string;
  daysRangeColSelectedClassName: string;
  checkboxMarkerContainerClassName: string;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  onDivBlur: FocusEventHandler<HTMLDivElement>;
  onDivClick: MouseEventHandler<HTMLDivElement>;
  onDivFocus: FocusEventHandler<HTMLDivElement>;
  setDate: Dispatch<SetStateAction<Readonly<Date>>>;
  onDivKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onDaySelect: (item: Readonly<TDayOfMonth>) => void;
  onDayPickerChange: Dispatch<SetStateAction<Readonly<Date>>>;
  updateLeftCalendar: (newMonth: number, newYear: number) => void;
  handleAmPmChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleHoursChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleMinutesChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleToggle24HourFormat: (event: ChangeEvent<HTMLInputElement>) => void;
  endDate: Date | undefined;
  startDate: Date | undefined;
  wrapperRef?: RefObject<HTMLDivElement | null> | undefined;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  rangePickerTimePickerLabel: IntlMessageId;
};

function F_RangePickerTimepickerLeft({
  min,
  max,
  date,
  year,
  hours,
  month,
  locale,
  endDate,
  minutes,
  setDate,
  setYear,
  firstDay,
  setMonth,
  startDate,
  onDivBlur,
  yearRight,
  timeFormat,
  monthRight,
  onDivClick,
  onDivFocus,
  wrapperRef,
  onDaySelect,
  onDivKeyDown,
  daysClassName,
  is24HourFormat,
  footerClassName,
  headerClassName,
  daysRowClassName,
  daysColClassName,
  handleAmPmChange,
  handleHoursChange,
  checkboxClassName,
  daysBodyClassName,
  onDayPickerChange,
  updateLeftCalendar,
  containerClassName,
  daysHeaderClassName,
  handleMinutesChange,
  headerYearClassName,
  isTimePickerEnabled,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  inputNumberClassName,
  headerButtonClassName,
  calendarLabelClassName,
  footerWrapperClassName,
  handleToggleTimePicker,
  selectOptionsClassName,
  daysColCurrentClassName,
  inputTimeFormatClassName,
  calendarCheckerClassName,
  daysColSelectedClassName,
  handleToggle24HourFormat,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  timeSectionWrapperClassName,
  daysRangeColSelectedClassName,
  checkboxMarkerContainerClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  rangePickerTimePickerLabel,
}: Props): JSX.Element {
  return (
    <div
      tabIndex={-1}
      ref={wrapperRef}
      onBlur={onDivBlur}
      role='application'
      onClick={onDivClick}
      onFocus={onDivFocus}
      onKeyDown={onDivKeyDown}
      className={containerClassName}
    >
      <CalendarHeaderLeft
        min={min}
        max={max}
        yearLeft={year}
        monthLeft={month}
        setYearLeft={setYear}
        yearRight={yearRight}
        monthRight={monthRight}
        headerClassName={headerClassName}
        updateLeftCalendar={updateLeftCalendar}
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
        locale={locale}
        month={month}
        endDate={endDate}
        setDate={setDate}
        setYear={setYear}
        setMonth={setMonth}
        firstDay={firstDay}
        startDate={startDate}
        onDaySelect={onDaySelect}
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
        daysRangeColSelectedClassName={daysRangeColSelectedClassName}
      />

      <LeftCalendarFooter
        timeFormat={timeFormat}
        hours={hours}
        minutes={minutes}
        onAmPmChange={handleAmPmChange}
        is24HourFormat={is24HourFormat}
        footerClassName={footerClassName}
        onHoursChange={handleHoursChange}
        checkboxClassName={checkboxClassName}
        onMinutesChange={handleMinutesChange}
        isTimePickerEnabled={isTimePickerEnabled}
        inputNumberClassName={inputNumberClassName}
        onToggleTimePicker={handleToggleTimePicker}
        calendarLabelClassName={calendarLabelClassName}
        footerWrapperClassName={footerWrapperClassName}
        onToggle24HourFormat={handleToggle24HourFormat}
        selectOptionsClassName={selectOptionsClassName}
        inputTimeFormatClassName={inputTimeFormatClassName}
        calendarCheckerClassName={calendarCheckerClassName}
        timeInputWrapperClassName={timeInputWrapperClassName}
        timeSectionWrapperClassName={timeSectionWrapperClassName}
        checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        hoursFormatLabel={hoursFormatLabel}
        rangePickerTimePickerLabel={rangePickerTimePickerLabel}
      />
    </div>
  );
}

export const RangePickerTimepickerLeft: ComponentType<Props> = memo<Props>(
  F_RangePickerTimepickerLeft
);
