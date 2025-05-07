import {
  memo,
  useMemo,
  type JSX,
  type ComponentType,
  type KeyboardEventHandler,
} from 'react';

import { DayPickerCol } from 'library/datepicker/day-picker-col.tsx';

import type { TDayOfMonth } from 'library/datepicker/types.ts';

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
  readonly cols: ReadonlyArray<TDayOfMonth>;
  onDaySelect(item: Readonly<TDayOfMonth>): void;
  onDayKeyDown: KeyboardEventHandler<HTMLButtonElement>;
};

const date = new Date();

const now = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
  disabled: false,
};

function F_DayPickerRow({
  cols,
  year,
  month,
  timestamp,
  onDaySelect,
  onDayKeyDown,
  daysColClassName,
  daysRowClassName,
  daysColOverClassName,
  emptyButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
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

  return (
    <div className={daysRowClassName}>
      {cols.map((day: TDayOfMonth, index: number): JSX.Element => {
        const curMonth = month === cur.month;
        const curYear = year === cur.year;
        const curDay = day.day === cur.day;

        const overMonth = day.disabled || day.month !== month;

        const selected = curYear && curMonth && curDay && !day.disabled;

        const today =
          day.year === now.year &&
          day.month === now.month &&
          day.day === now.day;

        return (
          <DayPickerCol
            day={day}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            today={today}
            selected={selected}
            overMonth={overMonth}
            onDaySelect={onDaySelect}
            onDayKeyDown={onDayKeyDown}
            daysColClassName={daysColClassName}
            daysColOverClassName={daysColOverClassName}
            emptyButtonClassName={emptyButtonClassName}
            daysColCurrentClassName={daysColCurrentClassName}
            daysColSelectedClassName={daysColSelectedClassName}
          />
        );
      })}
    </div>
  );
}

export const DayPickerRow: ComponentType<Props> = memo<Props>(F_DayPickerRow);
