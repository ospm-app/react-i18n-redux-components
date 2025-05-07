import {
  memo,
  type JSX,
  type Dispatch,
  type ComponentType,
  type SetStateAction,
} from 'react';

import { CalendarHeaderLeft } from 'library/range-picker/header-left';
import { DayPicker } from 'library/range-picker/day-picker';

import type { TDayOfMonth } from 'library/range-picker/types.ts';

type Props = {
  max: number;
  min: number;
  year: number;
  month: number;
  locale: string;
  firstDay: string;
  yearRight: number;
  monthRight: number;
  date: Readonly<Date>;
  daysClassName: string;
  containerClass: string;
  headerClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
  daysBodyClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  daysRangeColSelectedClassName: string;
  endDate?: Date | undefined;
  startDate?: Date | undefined;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  onDaySelect: (item: Readonly<TDayOfMonth>) => void;
  setDate: Dispatch<SetStateAction<Readonly<Date>>>;
  onDayPickerChange: Dispatch<SetStateAction<Readonly<Date>>>;
  updateLeftCalendar: (newMonth: number, newYear: number) => void;
};

function F_RangePickerLeft({
  min,
  max,
  year,
  date,
  month,
  locale,
  endDate,
  firstDay,
  startDate,
  yearRight,
  monthRight,
  daysClassName,
  containerClass,
  headerClassName,
  daysRowClassName,
  daysColClassName,
  daysBodyClassName,
  updateLeftCalendar,
  headerYearClassName,
  daysHeaderClassName,
  headerMonthClassName,
  daysColOverClassName,
  emptyButtonClassName,
  headerButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  daysRangeColSelectedClassName,
  setYear,
  setDate,
  setMonth,
  onDaySelect,
  onDayPickerChange,
}: Props): JSX.Element {
  return (
    <div className={containerClass}>
      <CalendarHeaderLeft
        min={min}
        max={max}
        yearLeft={year}
        monthLeft={month}
        yearRight={yearRight}
        setYearLeft={setYear}
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
        month={month}
        locale={locale}
        setDate={setDate}
        setYear={setYear}
        endDate={endDate}
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

export const RangePickerLeft: ComponentType<Props> =
  memo<Props>(F_RangePickerLeft);
