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

import { SvgLeft } from 'library/range-picker/svg-left';
import { SvgRight } from 'library/range-picker/svg-right';

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
  monthLeft: number;
  yearRight: number;
  monthRight: number;
  headerClassName: string;
  headerYearClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  headerButtonIconClassName: string;
  setYearLeft: Dispatch<SetStateAction<number>>;
  updateLeftCalendar: (newMonth: number, newYear: number) => void;
};

function F_CalendarHeaderLeft({
  min,
  max,
  yearLeft,
  yearRight,
  monthLeft,
  monthRight,
  setYearLeft,
  headerClassName,
  updateLeftCalendar,
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
    updateLeftCalendar(monthLeft - 1, yearLeft);
  }, [monthLeft, yearLeft, updateLeftCalendar]);

  const onNextMonth = useCallback(() => {
    updateLeftCalendar(monthLeft + 1, yearLeft);
  }, [monthLeft, yearLeft, updateLeftCalendar]);

  const onPrevYear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const newYearLeft = yearLeft - 1;

    if (
      newYearLeft < yearRight ||
      (newYearLeft === yearRight && monthLeft < monthRight)
    ) {
      setYearLeft(newYearLeft);
    }
  }, [setYearLeft, yearLeft, monthLeft, monthRight, yearRight]);

  const onNextYear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const newYearLeft = yearLeft + 1;

    if (
      newYearLeft < yearRight ||
      (newYearLeft === yearRight && monthLeft < monthRight)
    ) {
      setYearLeft(newYearLeft);
    }
  }, [setYearLeft, yearLeft, monthLeft, monthRight, yearRight]);

  const isMinYear = useMemo<boolean>(() => {
    const minDate = new Date(min);

    return yearLeft === minDate.getFullYear();
  }, [min, yearLeft]);

  const isMaxYear = useMemo<boolean>(() => {
    const maxDate = new Date(max);

    return yearLeft === maxDate.getFullYear();
  }, [max, yearLeft]);

  const isMinMonth = useMemo<boolean>(() => {
    const minDate = new Date(min);

    return (
      yearLeft === minDate.getFullYear() && monthLeft === minDate.getMonth()
    );
  }, [min, monthLeft, yearLeft]);

  const isMaxMonth = useMemo<boolean>(() => {
    const maxDate = new Date(max);

    return (
      yearLeft === maxDate.getFullYear() && monthLeft === maxDate.getMonth()
    );
  }, [max, monthLeft, yearLeft]);

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

        {yearLeft}

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

        {monthsOfYear[monthLeft]}

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

export const CalendarHeaderLeft: ComponentType<Props> =
  memo<Props>(F_CalendarHeaderLeft);
