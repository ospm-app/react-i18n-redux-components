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
  type KeyboardEventHandler,
} from 'react';

import { CalendarHeader } from 'library/datepicker/header.tsx';
import { DayPicker } from 'library/datepicker/day-picker.tsx';

type Props = {
  max: number;
  min: number;
  locale: string;
  firstDay: string;
  stepMinutes: number;
  daysClassName: string;
  containerClass: string;
  headerClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
  daysBodyClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  value?: number | undefined;
  onBlur?: ((value: number) => void) | undefined;
  onChange?: ((value: number) => void) | undefined;
  wrapperRef?: RefObject<HTMLDivElement | null> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
};

function F_Calendar({
  min,
  max,
  value,
  locale,
  onBlur,
  onChange,
  firstDay,
  onKeyDown,
  wrapperRef,
  stepMinutes,
  daysClassName,
  containerClass,
  headerClassName,
  daysColClassName,
  daysRowClassName,
  daysBodyClassName,
  daysHeaderClassName,
  headerYearClassName,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  headerButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
}: Props): JSX.Element {
  const alignTime = useCallback<(date: Date) => Date>(
    (date: Date): Date => {
      const newDate = new Date(date);

      newDate.setMinutes(
        newDate.getMinutes() +
          ((stepMinutes - (newDate.getMinutes() % stepMinutes)) % stepMinutes),
        0,
        0
      );

      return newDate;
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
      event.stopPropagation();

      event.preventDefault();
    },
    []
  );

  const onDivFocus = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event) => {
      if (
        wrapperRef &&
        !(typeof wrapperRef === 'function') &&
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
        !wrapperRef.current.contains(event.relatedTarget)
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
      }
    },
    [alignTime, setDate, onChange, initialValue]
  );

  const onDivKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
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
          if (typeof onKeyDown === 'function') {
            onKeyDown(event);
          }

          break;
        }

        case 'ArrowRight': {
          if (typeof onKeyDown === 'function') {
            onKeyDown(event);
          }

          break;
        }
        case 'ArrowUp': {
          event.preventDefault();

          if (typeof onKeyDown === 'function') {
            const prevDate = new Date(date.valueOf());

            prevDate.setDate(prevDate.getDate() - 7);

            onKeyDown(event);
          }

          break;
        }

        case 'ArrowDown': {
          event.preventDefault();

          if (typeof onKeyDown === 'function') {
            const nextDate = new Date(date.valueOf());

            nextDate.setDate(nextDate.getDate() + 7);

            onKeyDown(event);
          }

          break;
        }

        default: {
          break;
        }
      }
    },
    [date, onKeyDown]
  );

  return (
    <div
      tabIndex={-1}
      ref={wrapperRef}
      onBlur={onDivBlur}
      role='application'
      onClick={onDivClick}
      onFocus={onDivFocus}
      onKeyDown={onDivKeyDown}
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
    </div>
  );
}

export const Calendar: ComponentType<Props> = memo<Props>(F_Calendar);
