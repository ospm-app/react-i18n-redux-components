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

import { SvgLeft } from 'library/datepicker-timepicker/svg-left.tsx';
import { SvgRight } from 'library/datepicker-timepicker/svg-right.tsx';

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
  year: number;
  month: number;
  headerClassName: string;
  headerYearClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  headerButtonIconClassName: string;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
};

function F_CalendarHeader({
  min,
  max,
  year,
  month,
  setYear,
  setMonth,
  headerClassName,
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

  const onPrevYear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setYear(year - 1);
  }, [setYear, year]);

  const onNextYear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setYear(year + 1);
  }, [setYear, year]);

  const onPrevMonth = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setMonth(month - 1 === -1 ? 11 : month - 1);

    if (month - 1 === -1) {
      setYear(year - 1);
    }
  }, [month, setMonth, setYear, year]);

  const onNextMonth = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setMonth(month === 11 ? 0 : month + 1);

    if (month === 11) {
      setYear(year + 1);
    }
  }, [month, setMonth, setYear, year]);

  const isMinYear = useMemo<boolean>(() => {
    const minDate = new Date(min);

    return year === minDate.getFullYear();
  }, [min, year]);

  const isMaxYear = useMemo<boolean>(() => {
    const maxDate = new Date(max);

    return year === maxDate.getFullYear();
  }, [max, year]);

  const isMinMonth = useMemo<boolean>(() => {
    const minDate = new Date(min);

    return year === minDate.getFullYear() && month === minDate.getMonth();
  }, [min, month, year]);

  const isMaxMonth = useMemo<boolean>(() => {
    const maxDate = new Date(max);

    return year === maxDate.getFullYear() && month === maxDate.getMonth();
  }, [max, month, year]);

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

        {year}

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

        {monthsOfYear[month]}

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

export const CalendarHeader: ComponentType<Props> =
  memo<Props>(F_CalendarHeader);
