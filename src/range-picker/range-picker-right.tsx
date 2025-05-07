import {
  memo,
  type JSX,
  type Dispatch,
  type ComponentType,
  type SetStateAction,
} from 'react';

import { CalendarHeaderRight } from 'library/range-picker/header-right';
import { DayPicker } from 'library/range-picker/day-picker';

import type { TDayOfMonth } from 'library/range-picker/types.ts';

type Props = {
  max: number;
  min: number;
  year: number;
  month: number;
  locale: string;
  yearLeft: number;
  firstDay: string;
  monthLeft: number;
  date: Readonly<Date>;
  containerClass: string;
  headerClassName: string;
  daysClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
  daysBodyClassName: string;
  headerYearClassName: string;
  daysHeaderClassName: string;
  headerMonthClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerButtonClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  daysRangeColSelectedClassName: string;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setDate: Dispatch<SetStateAction<Readonly<Date>>>;
  onDaySelect: (item: Readonly<TDayOfMonth>) => void;
  onDayPickerChange: Dispatch<SetStateAction<Readonly<Date>>>;
  updateRightCalendar: (newMonth: number, newYear: number) => void;
  endDate?: Date | undefined;
  startDate?: Date | undefined;
};

function F_RangePickerRight({
  min,
  max,
  date,
  year,
  month,
  locale,
  setYear,
  setDate,
  endDate,
  setMonth,
  firstDay,
  yearLeft,
  monthLeft,
  startDate,
  onDaySelect,
  daysClassName,
  containerClass,
  headerClassName,
  daysRowClassName,
  daysColClassName,
  onDayPickerChange,
  daysBodyClassName,
  updateRightCalendar,
  daysHeaderClassName,
  headerYearClassName,
  daysColOverClassName,
  headerMonthClassName,
  emptyButtonClassName,
  headerButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  daysRangeColSelectedClassName,
}: Props): JSX.Element {
  return (
    <div className={containerClass}>
      <CalendarHeaderRight
        min={min}
        max={max}
        yearRight={year}
        monthRight={month}
        yearLeft={yearLeft}
        monthLeft={monthLeft}
        setYearRight={setYear}
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
    </div>
  );
}

export const RangePickerRight: ComponentType<Props> =
  memo<Props>(F_RangePickerRight);
