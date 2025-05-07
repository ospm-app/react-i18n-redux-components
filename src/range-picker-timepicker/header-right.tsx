import {
  memo,
  useMemo,
  type JSX,
  useCallback,
  type Dispatch,
  type ComponentType,
  type SetStateAction,
  type MouseEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import { SvgLeft } from 'library/range-picker-timepicker/svg-left';
import { SvgRight } from 'library/range-picker-timepicker/svg-right';

import type { IntlMessageId } from 'const/intl/index.ts';

const monthsOfYearIntl: ReadonlyArray<IntlMessageId> = [
  'months-of-year.january',
  'months-of-year.february',
  'months-of-year.march',
  'months-of-year.april',
  'months-of-year.may',
  'months-of-year.june',
  'months-of-year.july',
  'months-of-year.august',
  'months-of-year.september',
  'months-of-year.october',
  'months-of-year.november',
  'months-of-year.december',
];

type Props = {
  min: number;
  max: number;
  yearLeft: number;
  yearRight: number;
  monthLeft: number;
  monthRight: number;
  headerClassName: string;
  headerYearClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  headerButtonIconClassName: string;
  setYearRight: Dispatch<SetStateAction<number>>;
  updateRightCalendar: (newMonth: number, newYear: number) => void;
};

function F_CalendarHeaderRight({
  min,
  max,
  yearLeft,
  yearRight,
  monthLeft,
  monthRight,
  setYearRight,
  headerClassName,
  updateRightCalendar,
  headerYearClassName,
  headerMonthClassName,
  headerButtonClassName,
  headerButtonIconClassName,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const monthsOfYear = useMemo<ReadonlyArray<string>>(() => {
    return monthsOfYearIntl.map((month: IntlMessageId): string => {
      return t(month);
    });
  }, [t]);

  const onPrevMonth = useCallback(() => {
    updateRightCalendar(monthRight - 1, yearRight);
  }, [monthRight, yearRight, updateRightCalendar]);

  const onNextMonth = useCallback(() => {
    updateRightCalendar(monthRight + 1, yearRight);
  }, [monthRight, yearRight, updateRightCalendar]);

  const onPrevYear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const newYearRight = yearRight - 1;

    if (
      newYearRight > yearLeft ||
      (newYearRight === yearLeft && monthRight > monthLeft)
    ) {
      setYearRight(newYearRight);
    }
  }, [setYearRight, yearRight, monthRight, monthLeft, yearLeft]);

  const onNextYear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const newYearRight = yearRight + 1;

    if (
      newYearRight > yearLeft ||
      (newYearRight === yearLeft && monthRight > monthLeft)
    ) {
      setYearRight(newYearRight);
    }
  }, [setYearRight, yearRight, monthRight, monthLeft, yearLeft]);

  const isMinYear = useMemo<boolean>(() => {
    const minDate = new Date(min);

    return yearRight === minDate.getFullYear();
  }, [min, yearRight]);

  const isMaxYear = useMemo<boolean>(() => {
    const maxDate = new Date(max);

    return yearRight === maxDate.getFullYear();
  }, [max, yearRight]);

  const isMinMonth = useMemo<boolean>(() => {
    const minDate = new Date(min);

    return (
      yearRight === minDate.getFullYear() && monthRight === minDate.getMonth()
    );
  }, [min, monthRight, yearRight]);

  const isMaxMonth = useMemo<boolean>(() => {
    const maxDate = new Date(max);

    return (
      yearRight === maxDate.getFullYear() && monthRight === maxDate.getMonth()
    );
  }, [max, monthRight, yearRight]);

  return (
    <div className={headerClassName}>
      <div className={headerYearClassName}>
        <button
          className={headerButtonClassName}
          disabled={isMinYear}
          onClick={onPrevYear}
          type='button'
        >
          <span role='img' aria-hidden className={headerButtonIconClassName}>
            <SvgLeft />
          </span>
        </button>

        {yearRight}

        <button
          className={headerButtonClassName}
          disabled={isMaxYear}
          onClick={onNextYear}
          type='button'
        >
          <span role='img' aria-hidden className={headerButtonIconClassName}>
            <SvgRight />
          </span>
        </button>
      </div>

      <div className={headerMonthClassName}>
        <button
          className={headerButtonClassName}
          disabled={isMinMonth}
          onClick={onPrevMonth}
          type='button'
        >
          <span role='img' aria-hidden className={headerButtonIconClassName}>
            <SvgLeft />
          </span>
        </button>

        {monthsOfYear[monthRight]}

        <button
          className={headerButtonClassName}
          disabled={isMaxMonth}
          onClick={onNextMonth}
          type='button'
        >
          <span role='img' aria-hidden className={headerButtonIconClassName}>
            <SvgRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export const CalendarHeaderRight: ComponentType<Props> = memo<Props>(
  F_CalendarHeaderRight
);
