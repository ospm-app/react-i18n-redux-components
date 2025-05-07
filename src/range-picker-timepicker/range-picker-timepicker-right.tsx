import {
  memo,
  type JSX,
  type Dispatch,
  type RefObject,
  type ComponentType,
  type SetStateAction,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';

import { CalendarHeaderRight } from 'library/range-picker-timepicker/header-right.tsx';
import { DayPicker } from 'library/range-picker-timepicker/day-picker.tsx';
import { RightCalendarFooter } from 'library/range-picker-timepicker/range-picker-footer-right.tsx';

import type { IntlMessageId } from '/app/const/intl/index.ts';
import type { TDayOfMonth } from 'library/range-picker-timepicker/types.ts';

type Props = {
  max: number;
  min: number;
  year: number;
  month: number;
  hours: number;
  locale: string;
  minutes: number;
  firstDay: string;
  yearLeft: number;
  monthLeft: number;
  timeFormat: string;
  date: Readonly<Date>;
  daysClassName: string;
  footerClassName: string;
  headerClassName: string;
  is24HourFormat: boolean;
  daysRowClassName: string;
  daysColClassName: string;
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
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
  inputTimeFormatClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  timeSectionWrapperClassName: string;
  daysRangeColSelectedClassName: string;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  onDivBlur: FocusEventHandler<HTMLDivElement>;
  onDivClick: MouseEventHandler<HTMLDivElement>;
  onDivFocus: FocusEventHandler<HTMLDivElement>;
  setDate: Dispatch<SetStateAction<Readonly<Date>>>;
  onDaySelect: (item: Readonly<TDayOfMonth>) => void;
  onDivKeyDown: KeyboardEventHandler<HTMLDivElement>;
  handleHoursChange: ChangeEventHandler<HTMLInputElement>;
  handleAmPmChange: ChangeEventHandler<HTMLSelectElement>;
  handleMinutesChange: ChangeEventHandler<HTMLInputElement>;
  onDayPickerChange: Dispatch<SetStateAction<Readonly<Date>>>;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  endDate: Date | undefined;
  startDate: Date | undefined;
  wrapperRef?: RefObject<HTMLDivElement | null> | undefined;
  updateRightCalendar: (newMonth: number, newYear: number) => void;
};

function F_RangePickerTimepickerRight({
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
  setMonth,
  yearLeft,
  monthLeft,
  timeFormat,
  firstDay,
  onDivBlur,
  startDate,
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
  daysBodyClassName,
  onDayPickerChange,
  containerClassName,
  handleMinutesChange,
  updateRightCalendar,
  isTimePickerEnabled,
  daysHeaderClassName,
  headerYearClassName,
  headerMonthClassName,
  daysColOverClassName,
  emptyButtonClassName,
  inputNumberClassName,
  headerButtonClassName,
  calendarLabelClassName,
  selectOptionsClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  inputTimeFormatClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  timeSectionWrapperClassName,
  daysRangeColSelectedClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
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
      <CalendarHeaderRight
        min={min}
        max={max}
        yearRight={year}
        monthRight={month}
        setYearRight={setYear}
        yearLeft={yearLeft}
        monthLeft={monthLeft}
        headerClassName={headerClassName}
        updateRightCalendar={updateRightCalendar}
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

      <RightCalendarFooter
        hours={hours}
        minutes={minutes}
        timeFormat={timeFormat}
        is24HourFormat={is24HourFormat}
        onAmPmChange={handleAmPmChange}
        footerClassName={footerClassName}
        onHoursChange={handleHoursChange}
        onMinutesChange={handleMinutesChange}
        isTimePickerEnabled={isTimePickerEnabled}
        inputNumberClassName={inputNumberClassName}
        calendarLabelClassName={calendarLabelClassName}
        selectOptionsClassName={selectOptionsClassName}
        inputTimeFormatClassName={inputTimeFormatClassName}
        timeInputWrapperClassName={timeInputWrapperClassName}
        timeSectionWrapperClassName={timeSectionWrapperClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
      />
    </div>
  );
}

export const RangePickerTimepickerRight: ComponentType<Props> = memo<Props>(
  F_RangePickerTimepickerRight
);
