import {
  memo,
  useRef,
  useMemo,
  type JSX,
  useCallback,
  type ComponentType,
  type MouseEventHandler as ReactMouseEventHandler,
  type KeyboardEventHandler as ReactKeyboardEventHandler,
} from 'react';
import classnames from 'classnames';

import type { TDayOfMonth } from 'library/range-picker-timepicker/types';

type Props = {
  today: boolean;
  selected: boolean;
  overMonth: boolean;
  daysColClassName: string;
  day: Readonly<TDayOfMonth>;
  now: Readonly<TDayOfMonth>;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  endDate?: Readonly<Date> | undefined;
  daysRangeColSelectedClassName: string;
  startDate?: Readonly<Date> | undefined;
  onDaySelect(day: Readonly<TDayOfMonth>): void;
  onDayKeyDown: ReactKeyboardEventHandler<HTMLButtonElement>;
};

function F_DayPickerCol({
  day,
  now,
  today,
  endDate,
  selected,
  overMonth,
  startDate,
  onDaySelect,
  onDayKeyDown,
  daysColClassName,
  daysColOverClassName,
  emptyButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  daysRangeColSelectedClassName,
}: Props): JSX.Element {
  const onDayClick = useCallback<
    ReactMouseEventHandler<HTMLButtonElement>
  >(() => {
    onDaySelect(day);
  }, [day, onDaySelect]);

  const colRef = useRef<HTMLButtonElement>(null);

  const label = useMemo<string>(() => {
    const date = new Date(day.year, day.month, day.day);

    return date.toLocaleDateString();
  }, [day]);

  const buttonClassName = useMemo<string>(() => {
    const isInRange =
      startDate &&
      endDate &&
      new Date(day.year, day.month, day.day) >= startDate &&
      new Date(day.year, day.month, day.day) <= endDate;

    const isStartDate =
      startDate &&
      new Date(day.year, day.month, day.day).getTime() === startDate.getTime();

    const isEndDate = endDate
      ? new Date(day.year, day.month, day.day).getTime() === endDate.getTime()
      : false;

    return classnames(daysColClassName, {
      [daysColOverClassName]: overMonth,
      [daysColCurrentClassName]:
        today &&
        day.day === now.day &&
        day.month === now.month &&
        day.year === now.year,
      [daysColSelectedClassName]:
        // isStartDate === true || isEndDate || (today && !(startDate || endDate)),
        isStartDate === true ||
        isEndDate === true ||
        (today &&
          !(startDate || endDate) &&
          !(
            day.day === now.day &&
            day.month === now.month &&
            day.year === now.year
          )),
      [daysRangeColSelectedClassName]:
        isInRange === true && isStartDate === false && !isEndDate,
    });
  }, [
    daysColClassName,
    daysColOverClassName,
    overMonth,
    daysColCurrentClassName,
    today,
    daysColSelectedClassName,
    daysRangeColSelectedClassName,
    startDate,
    endDate,
    day,
    now.day,
    now.month,
    now.year,
  ]);

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    <button
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='radio'
      ref={colRef}
      type='button'
      onClick={onDayClick}
      aria-label={label}
      aria-current={today}
      onKeyDown={onDayKeyDown}
      aria-checked={selected}
      disabled={day.disabled}
      className={classnames(buttonClassName, {
        [emptyButtonClassName]: day.day === 0,
      })}
      tabIndex={selected ? 0 : -1}
    >
      {day.day === 0 ? ' ' : day.day}
    </button>
  );
}

export const DayPickerCol: ComponentType<Props> = memo<Props>(F_DayPickerCol);
