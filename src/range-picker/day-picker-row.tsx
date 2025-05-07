import {
  memo,
  useMemo,
  type JSX,
  type ComponentType,
  type KeyboardEventHandler,
} from 'react';

import { DayPickerCol } from 'library/range-picker/day-picker-col';

import type { TDayOfMonth } from 'library/range-picker/types';

type Props = {
  year: number;
  month: number;
  timestamp: number;
  daysColClassName: string;
  daysRowClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  daysRangeColSelectedClassName: string;
  readonly cols: ReadonlyArray<TDayOfMonth>;
  endDate?: Readonly<Date> | undefined;
  startDate?: Readonly<Date> | undefined;
  onDaySelect(item: Readonly<TDayOfMonth>): void;
  onDayKeyDown: KeyboardEventHandler<HTMLButtonElement>;
};

function F_DayPickerRow({
  cols,
  year,
  month,
  endDate,
  timestamp,
  startDate,
  onDaySelect,
  onDayKeyDown,
  daysColClassName,
  daysRowClassName,
  daysColOverClassName,
  emptyButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  daysRangeColSelectedClassName,
}: Props): JSX.Element {
  const cur = useMemo<Readonly<TDayOfMonth>>(() => {
    const date = new Date(timestamp);

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      disabled: false,
    };
  }, [timestamp]);

  const now = useMemo<Readonly<TDayOfMonth>>(() => {
    const date = new Date();

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      disabled: false,
    };
  }, []);

  return (
    <div className={daysRowClassName}>
      {cols.map((day: TDayOfMonth, index: number): JSX.Element => {
        const curMonth = month === cur.month;
        const curYear = year === cur.year;
        const curDay = day.day === cur.day;

        const overMonth = day.disabled || day.month !== month;
        const today =
          day.year === now.year &&
          day.month === now.month &&
          day.day === now.day;

        const inRange =
          startDate &&
          endDate &&
          new Date(day.year, day.month, day.day) >= startDate &&
          new Date(day.year, day.month, day.day) <= endDate;

        const selected =
          (curYear && curMonth && curDay && !day.disabled) ||
          (inRange === true && inRange);

        return (
          <DayPickerCol
            day={day}
            now={now}
            key={`day-col-${day.year}-${day.month}-${day.day}-${index}`}
            today={today}
            endDate={endDate}
            selected={selected}
            startDate={startDate}
            overMonth={overMonth}
            onDaySelect={onDaySelect}
            onDayKeyDown={onDayKeyDown}
            daysColClassName={daysColClassName}
            daysColOverClassName={daysColOverClassName}
            emptyButtonClassName={emptyButtonClassName}
            daysColCurrentClassName={daysColCurrentClassName}
            daysColSelectedClassName={daysColSelectedClassName}
            daysRangeColSelectedClassName={daysRangeColSelectedClassName}
          />
        );
      })}
    </div>
  );
}

export const DayPickerRow: ComponentType<Props> = memo<Props>(F_DayPickerRow);
