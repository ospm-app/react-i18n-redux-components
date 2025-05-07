import {
  useRef,
  useMemo,
  type JSX,
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type RefObject,
  type SetStateAction,
  type FocusEventHandler,
  type MouseEventHandler,
} from 'react';

import { reactMemo } from 'utils/react-memo.ts';

import type { TDayOfMonth } from 'library/range-picker/types';

import { RangePickerLeft } from 'library/range-picker/range-picker-left.tsx';
import { RangePickerRight } from 'library/range-picker/range-picker-right.tsx';

import type { FieldNames, FormNames } from 'state/reducers/forms.ts';
import type { InputRangePickerField } from 'state/reducers/forms/types.ts';

type Props<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
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
  calendarsRowClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  daysRangeColSelectedClassName: string;
  field: InputRangePickerField<FormName, FieldName>;
  onBlurEnd?: ((value: number) => void) | undefined;
  wrapperRef?: RefObject<HTMLDivElement | null> | undefined;
  onBlurStart?: ((value: number) => void) | undefined;
  onChangeEnd?: ((value: number | undefined) => void) | undefined;
  onChangeStart?: ((value: number | undefined) => void) | undefined;
};

function F_RangePicker<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
>({
  min,
  max,
  field,
  locale,
  firstDay,
  onBlurEnd,
  wrapperRef,
  onBlurStart,
  stepMinutes,
  onChangeEnd,
  daysClassName,
  onChangeStart,
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
  calendarsRowClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  daysRangeColSelectedClassName,
}: Props<FormName, FieldName>): JSX.Element {
  const alignTime = useCallback<(date: Date) => Date>(
    (date: Date): Date => {
      const adjustedDate = new Date(date);

      adjustedDate.setMinutes(
        adjustedDate.getMinutes() +
          ((stepMinutes - (adjustedDate.getMinutes() % stepMinutes)) %
            stepMinutes),
        0,
        0
      );

      return adjustedDate;
    },
    [stepMinutes]
  );

  const [startDate, setStartDate] = useState<Date | undefined>(
    typeof field.startValue === 'number'
      ? new Date(field.startValue)
      : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    typeof field.endValue === 'number' ? new Date(field.endValue) : undefined
  );

  const initialValue = useMemo<Date>(() => {
    const now = Date.now();
    const date =
      typeof now !== 'undefined' && Number.isFinite(now)
        ? new Date(now)
        : new Date();

    if (date.valueOf() < min) {
      date.setTime(min);
    }

    if (date.valueOf() > max) {
      date.setTime(max);
    }

    return alignTime(date);
  }, [min, max, alignTime]);

  const selectedInOneMonth = useRef<boolean>(false);
  const [inMonth, setInMonth] = useState<'inLeft' | 'inRight' | null>(null);

  const [date, setDateOrig] = useState<Date>(initialValue);

  const [monthLeft, setMonthLeft] = useState<number>(
    startDate ? startDate.getMonth() : new Date().getMonth()
  );

  const [yearLeft, setYearLeft] = useState<number>(
    startDate ? startDate.getFullYear() : new Date().getFullYear()
  );

  const [monthRight, setMonthRight] = useState<number>((monthLeft + 1) % 12);

  const [yearRight, setYearRight] = useState<number>(
    monthLeft === 11 ? yearLeft + 1 : yearLeft
  );

  useEffect(() => {
    if (startDate && endDate) {
      const inOneMonth =
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth();

      selectedInOneMonth.current = inOneMonth;

      if (inOneMonth) {
        if (
          startDate.getMonth() === monthLeft &&
          endDate.getMonth() === monthLeft
        ) {
          setInMonth('inLeft');
        } else if (
          startDate.getMonth() === monthRight &&
          endDate.getMonth() === monthRight
        ) {
          setInMonth('inRight');
        }

        if (inMonth === 'inLeft') {
          setMonthLeft(startDate.getMonth());
          setYearLeft(startDate.getFullYear());
        } else if (inMonth === 'inRight') {
          setMonthRight(startDate.getMonth());
          setYearRight(startDate.getFullYear());
        }

        return;
      }

      setMonthRight(endDate.getMonth());
      setYearRight(endDate.getFullYear());
    }
  }, [startDate, endDate, monthLeft, monthRight, inMonth]);

  const updateLeftCalendar = useCallback(
    (newMonth: number, newYear: number) => {
      const validNewMonth = newMonth < 0 ? 11 : newMonth > 11 ? 0 : newMonth;
      const validNewYear =
        newMonth < 0 ? newYear - 1 : newMonth > 11 ? newYear + 1 : newYear;

      if (
        validNewYear < yearRight ||
        (validNewYear === yearRight && validNewMonth < monthRight)
      ) {
        setMonthLeft(validNewMonth);
        setYearLeft(validNewYear);
      }
    },
    [monthRight, yearRight]
  );

  const updateRightCalendar = useCallback(
    (newMonth: number, newYear: number) => {
      const validNewMonth = newMonth < 0 ? 11 : newMonth > 11 ? 0 : newMonth;
      const validNewYear =
        newMonth < 0 ? newYear - 1 : newMonth > 11 ? newYear + 1 : newYear;

      if (
        validNewYear > yearLeft ||
        (validNewYear === yearLeft && validNewMonth > monthLeft)
      ) {
        setMonthRight(validNewMonth);
        setYearRight(validNewYear);
      }
    },
    [monthLeft, yearLeft]
  );

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
      // Added because clicking on the checkboxes Time picker and 24h format in calendar-footer didn't work correctly due to event.stopPropagation and event.preventDefault
      if (
        event.target instanceof HTMLInputElement &&
        event.target.type === 'checkbox'
      ) {
        return;
      }

      event.stopPropagation();

      event.preventDefault();
    },
    []
  );

  const onDivFocus = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event) => {
      if (
        wrapperRef &&
        typeof wrapperRef !== 'function' &&
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

        if (typeof onBlurStart === 'function') {
          onBlurStart(date.valueOf());
        }

        if (typeof onBlurEnd === 'function') {
          onBlurEnd(date.valueOf());
        }

        if (event.target instanceof HTMLElement) {
          event.target.focus();
        }
      }
    },
    [date, onBlurStart, onBlurEnd, wrapperRef]
  );

  const onDayPickerChange = useCallback<Dispatch<SetStateAction<Date>>>(
    (dateArg) => {
      const newDate =
        typeof dateArg === 'function' ? dateArg(date) : alignTime(dateArg);

      setDate(newDate);

      if (!startDate) {
        setStartDate(newDate);

        if (typeof onChangeStart === 'function') {
          onChangeStart(newDate.valueOf());
        }
      } else if (!endDate) {
        if (newDate < startDate) {
          setEndDate(startDate);
          setStartDate(newDate);

          if (typeof onChangeEnd === 'function') {
            onChangeEnd(startDate.valueOf());
          }

          if (typeof onChangeStart === 'function') {
            onChangeStart(newDate.valueOf());
          }
        } else {
          setEndDate(newDate);

          if (typeof onChangeEnd === 'function') {
            onChangeEnd(newDate.valueOf());
          }
        }
      } else {
        setStartDate(newDate);
        setEndDate(undefined);

        if (typeof onChangeStart === 'function') {
          onChangeStart(newDate.valueOf());
        }
      }
    },
    [alignTime, setDate, date, startDate, endDate, onChangeStart, onChangeEnd]
  );

  const onDaySelect = useCallback<(item: Readonly<TDayOfMonth>) => void>(
    (item) => {
      const newDate = new Date(item.year, item.month, item.day);

      if (endDate && newDate.getTime() === endDate.getTime()) {
        setStartDate(undefined);
        setEndDate(undefined);

        if (typeof onChangeStart === 'function') onChangeStart(undefined);

        if (typeof onChangeEnd === 'function') onChangeEnd(undefined);

        return;
      }

      if (typeof startDate === 'undefined') {
        setStartDate(newDate);
        onDayPickerChange(newDate);

        return;
      }

      if (typeof endDate === 'undefined') {
        if (newDate < startDate) {
          setEndDate(startDate);
          setStartDate(newDate);
        } else {
          setEndDate(newDate);
        }

        onDayPickerChange(newDate);

        return;
      }

      if (newDate < startDate) {
        setEndDate(startDate);
        setStartDate(newDate);
      } else if (newDate > endDate) {
        setEndDate(newDate);
      }

      if (newDate.getTime() === endDate.getTime()) {
        setStartDate(undefined);

        if (typeof onChangeStart === 'function') onChangeStart(undefined);

        if (typeof onChangeEnd === 'function') onChangeEnd(undefined);
      }

      onDayPickerChange(newDate);
    },
    [endDate, startDate, onDayPickerChange, onChangeStart, onChangeEnd]
  );

  return (
    <div
      tabIndex={-1}
      ref={wrapperRef}
      onBlur={onDivBlur}
      role='application'
      onClick={onDivClick}
      onFocus={onDivFocus}
      onKeyUp={undefined}
      className={calendarsRowClassName}
    >
      <RangePickerLeft
        min={min}
        max={max}
        date={date}
        locale={locale}
        year={yearLeft}
        setDate={setDate}
        endDate={endDate}
        month={monthLeft}
        firstDay={firstDay}
        yearRight={yearRight}
        startDate={startDate}
        setYear={setYearLeft}
        setMonth={setMonthLeft}
        monthRight={monthRight}
        onDaySelect={onDaySelect}
        daysClassName={daysClassName}
        containerClass={containerClass}
        headerClassName={headerClassName}
        daysColClassName={daysColClassName}
        daysRowClassName={daysRowClassName}
        daysBodyClassName={daysBodyClassName}
        onDayPickerChange={onDayPickerChange}
        updateLeftCalendar={updateLeftCalendar}
        daysHeaderClassName={daysHeaderClassName}
        headerYearClassName={headerYearClassName}
        emptyButtonClassName={emptyButtonClassName}
        daysColOverClassName={daysColOverClassName}
        headerMonthClassName={headerMonthClassName}
        headerButtonClassName={headerButtonClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        headerButtonIconClassName={headerButtonIconClassName}
        daysRangeColSelectedClassName={daysRangeColSelectedClassName}
      />

      <RangePickerRight
        min={min}
        max={max}
        date={date}
        locale={locale}
        year={yearRight}
        endDate={endDate}
        setDate={setDate}
        month={monthRight}
        yearLeft={yearLeft}
        firstDay={firstDay}
        monthLeft={monthLeft}
        startDate={startDate}
        setYear={setYearRight}
        setMonth={setMonthRight}
        onDaySelect={onDaySelect}
        daysClassName={daysClassName}
        containerClass={containerClass}
        headerClassName={headerClassName}
        daysRowClassName={daysRowClassName}
        daysColClassName={daysColClassName}
        onDayPickerChange={onDayPickerChange}
        daysBodyClassName={daysBodyClassName}
        updateRightCalendar={updateRightCalendar}
        daysHeaderClassName={daysHeaderClassName}
        headerYearClassName={headerYearClassName}
        headerMonthClassName={headerMonthClassName}
        daysColOverClassName={daysColOverClassName}
        emptyButtonClassName={emptyButtonClassName}
        headerButtonClassName={headerButtonClassName}
        daysColCurrentClassName={daysColCurrentClassName}
        daysColSelectedClassName={daysColSelectedClassName}
        headerButtonIconClassName={headerButtonIconClassName}
        daysRangeColSelectedClassName={daysRangeColSelectedClassName}
      />
    </div>
  );
}

export const RangePicker = reactMemo(F_RangePicker);
