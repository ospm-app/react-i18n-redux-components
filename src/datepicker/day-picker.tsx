import {
  memo,
  useMemo,
  type JSX,
  useCallback,
  type Dispatch,
  type ComponentType,
  type SetStateAction,
  type KeyboardEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  daysOfWeekIntl,
  DayPickerHeader,
} from 'library/datepicker/day-picker-header.tsx';
import { DayPickerRow } from 'library/datepicker/day-picker-row.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { TDayOfMonth } from 'library/datepicker/types.ts';

type Props = {
  min: number;
  max: number;
  year: number;
  month: number;
  locale: string;
  firstDay: string;
  date: Readonly<Date>;
  daysClassName: string;
  daysColClassName: string;
  daysRowClassName: string;
  daysBodyClassName: string;
  daysHeaderClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setDate: Dispatch<SetStateAction<Readonly<Date>>>;
  onChange: Dispatch<SetStateAction<Readonly<Date>>>;
};

function F_DayPicker({
  min,
  max,
  date,
  year,
  month,
  locale,
  setDate,
  setYear,
  setMonth,
  firstDay,
  onChange,
  daysClassName,
  daysRowClassName,
  daysColClassName,
  daysBodyClassName,
  daysHeaderClassName,
  daysColOverClassName,
  emptyButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const daysOfWeek = useMemo<ReadonlyArray<string>>(() => {
    return daysOfWeekIntl.map((day: IntlMessageId): string => {
      return t(day);
    });
  }, [t]);

  const weekDays = useMemo<ReadonlyArray<string>>(() => {
    const list = [...daysOfWeek];

    const index = list.indexOf(firstDay);

    if (index > 0) {
      list.unshift(...list.splice(index));
    }

    return list;
  }, [daysOfWeek, firstDay]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const monday = useMemo<number>(
    () => {
      return weekDays.indexOf('Monday');
    },
    [firstDay] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const rows = useMemo<
    ReadonlyArray<ReadonlyArray<Readonly<TDayOfMonth>>>
  >(() => {
    const newDate = new Date(year, month, 1);

    const newMin = new Date(min);

    newMin.setHours(0, 0, 0, 0);

    const newMax = new Date(max);

    newMax.setHours(23, 59, 59, 999);

    newDate.setDate(1 - ((newDate.getDay() + 6 + monday) % 7));

    const list: Array<Array<TDayOfMonth>> = [];

    do {
      const arr: Array<TDayOfMonth> = [];

      for (let i = 0; i < 7; ++i) {
        arr.push({
          year: newDate.getFullYear(),
          month: newDate.getMonth(),
          day: newDate.getDate(),
          disabled:
            newDate < newMin ||
            newDate > newMax ||
            newDate.getMonth() !== month,
        });

        newDate.setDate(newDate.getDate() + 1);
      }

      list.push(arr);
    } while (newDate.getMonth() === month);

    return list;
  }, [year, month, min, max, monday]);

  const onDayKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
    (event) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'Escape':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight': {
          event.stopPropagation();

          event.preventDefault();

          break;
        }

        case 'Tab': {
          return;
        }

        default: {
          return;
        }
      }

      switch (event.key) {
        case ' ':
        case 'Enter': {
          setDate(date);

          onChange(date);

          break;
        }

        case 'Escape': {
          onChange(date);

          break;
        }

        case 'ArrowUp': {
          const newDate = new Date(date);

          const currentYear = newDate.getFullYear();
          const prevYear = currentYear - 1;
          const currentMonth = newDate.getMonth();
          const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const year = currentMonth === 0 ? prevYear : currentYear;
          const daysInPrevMonth = new Date(year, prevMonth + 1, 0).getDate();

          const currentDay = newDate.getDate();
          const isFirstWeek = currentDay <= 7;

          if (isFirstWeek) {
            const prevWeekDay = daysInPrevMonth - (7 - currentDay);

            newDate.setDate(prevWeekDay);
            newDate.setMonth(prevMonth);
            setMonth(prevMonth);

            if (prevMonth === 0) {
              newDate.setFullYear(prevYear);
              setYear(prevYear);
            }
          } else {
            newDate.setDate(currentDay - 7);
          }

          if (newDate.valueOf() < min) {
            newDate.setTime(min);
          }

          if (newDate.valueOf() > max) {
            newDate.setTime(max);
          }

          setDate(newDate);

          break;
        }

        case 'ArrowDown': {
          const newDate = new Date(date);

          const currentYear = newDate.getFullYear();

          const nextYear = currentYear + 1;

          const currentMonth = newDate.getMonth();

          const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

          const currentDay = newDate.getDate();

          const daysInCurrentMonth = new Date(
            currentYear,
            currentMonth + 1,
            0
          ).getDate();

          const isLastWeek = currentDay + 7 > daysInCurrentMonth;

          const nextWeekDay = isLastWeek
            ? 7 - (daysInCurrentMonth - currentDay)
            : currentDay + 7;

          if (isLastWeek) {
            newDate.setDate(nextWeekDay);
            newDate.setMonth(nextMonth);
            setMonth(nextMonth);

            if (nextMonth === 0) {
              newDate.setFullYear(nextYear);
              setYear(nextYear);
            }
          } else {
            newDate.setDate(nextWeekDay);
          }

          if (newDate.valueOf() < min) {
            newDate.setTime(min);
          }

          if (newDate.valueOf() > max) {
            newDate.setTime(max);
          }

          setDate(newDate);

          break;
        }

        case 'ArrowLeft': {
          const newDate = new Date(date);
          const prevMonth = newDate.getMonth();
          const currentMonth = prevMonth === 0 ? 11 : prevMonth - 1;
          const daysInPrevMonth = new Date(
            newDate.getFullYear(),
            currentMonth + 1,
            0
          ).getDate();
          const prevDay = newDate.getDate();
          const currentDay = prevDay === 1 ? daysInPrevMonth : prevDay - 1;

          if (prevDay > 1) {
            newDate.setDate(currentDay);
          } else if (prevDay === 1) {
            newDate.setMonth(currentMonth);
            setMonth(currentMonth);
            newDate.setDate(daysInPrevMonth);

            if (prevMonth === 0) {
              const prevYear = newDate.getFullYear();
              const currentYear = prevYear - 1;

              newDate.setFullYear(currentYear);
              setYear(currentYear);
            }
          }

          if (newDate.valueOf() < min) {
            newDate.setTime(min);
          }

          if (newDate.valueOf() > max) {
            newDate.setTime(max);
          }

          setDate(newDate);

          break;
        }

        case 'ArrowRight': {
          const newDate = new Date(date);
          const prevMonth = newDate.getMonth();
          const daysInCurrentMonth = new Date(year, prevMonth + 1, 0).getDate();
          // const daysInNextMonth = new Date(year, prevMonth + 2, 0).getDate()
          const prevDay = newDate.getDate();
          const currentDay = prevDay === daysInCurrentMonth ? 1 : prevDay + 1;
          const currentMonth = prevMonth === 11 ? 0 : prevMonth + 1;

          if (prevDay < daysInCurrentMonth) {
            newDate.setDate(currentDay);
          } else if (prevDay === daysInCurrentMonth) {
            newDate.setMonth(currentMonth);

            setMonth(currentMonth);

            newDate.setDate(currentDay);

            if (prevMonth === 11) {
              const prevYear = newDate.getFullYear();
              const currentYear = prevYear + 1;

              newDate.setFullYear(currentYear);
              setYear(currentYear);
            }
          }

          if (newDate.valueOf() < min) {
            newDate.setTime(min);
          }

          if (newDate.valueOf() > max) {
            newDate.setTime(max);
          }

          setDate(newDate);

          break;
        }

        default: {
          break;
        }
      }
    },
    [date, max, min, onChange, setDate, setMonth, setYear, year]
  );

  const onDaySelect = useCallback<(item: Readonly<TDayOfMonth>) => void>(
    (item) => {
      const newDate = new Date(date);

      const { year, month, day } = item;

      newDate.setFullYear(year, month, day);

      if (newDate.valueOf() < min) {
        newDate.setTime(min);
      } else if (newDate.valueOf() > max) {
        newDate.setTime(max);
      }

      onChange(newDate);

      setDate(newDate);
    },
    [date, max, min, onChange, setDate]
  );

  const timestamp: number = date.valueOf();

  return (
    <div role='radiogroup' className={daysClassName}>
      <DayPickerHeader
        locale={locale}
        weekDays={weekDays}
        daysColClassName={daysColClassName}
        daysHeaderClassName={daysHeaderClassName}
      />

      <div className={daysBodyClassName}>
        {rows.map(
          (cols: ReadonlyArray<TDayOfMonth>, index: number): JSX.Element => {
            return (
              <DayPickerRow
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                cols={cols}
                year={year}
                month={month}
                timestamp={timestamp}
                onDaySelect={onDaySelect}
                onDayKeyDown={onDayKeyDown}
                daysColClassName={daysColClassName}
                daysRowClassName={daysRowClassName}
                daysColOverClassName={daysColOverClassName}
                emptyButtonClassName={emptyButtonClassName}
                daysColCurrentClassName={daysColCurrentClassName}
                daysColSelectedClassName={daysColSelectedClassName}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export const DayPicker: ComponentType<Props> = memo<Props>(F_DayPicker);
