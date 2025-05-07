import {
  memo,
  useRef,
  useMemo,
  type JSX,
  useEffect,
  type RefObject,
  type ComponentType,
} from 'react';
import { createPortal } from 'react-dom';

import { isBrowser } from 'utils/is-browser.ts';

import { Calendar } from 'library/datepicker-timepicker/calendar.tsx';

import type { IntlMessageId } from '/app/const/intl/index.ts';

type Props = {
  min?: number;
  max?: number;
  stepMinutes?: number;
  locale: string;
  firstDay: string;
  daysClassName: string;
  containerClass: string;
  headerClassName: string;
  footerClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
  daysBodyClassName: string;
  checkboxClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  inputNumberClassName: string;
  headerButtonClassName: string;
  footerWrapperClassName: string;
  calendarLabelClassName: string;
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  inputTimeFormatClassName: string;
  calendarCheckerClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  timeSectionWrapperClassName: string;
  checkboxMarkerContainerClassName: string;
  handleHoursChange: ((hours: number) => void) | undefined;
  handleMinutesChange: ((minutes: number) => void) | undefined;
  handleTimeFormatChange: ((timeStamp: string) => void) | undefined;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  datePickerTimePickerLabel: IntlMessageId;
  value?: number | undefined;
  container?: Element | undefined;
  onBlur?: ((value: number) => void) | undefined;
  onChange?: ((value: number) => void) | undefined;
  forwardedRef?: RefObject<HTMLDivElement> | undefined;
};

function F_DatePickerTimePicker({
  value,
  onBlur,
  locale,
  firstDay,
  onChange,
  container,
  forwardedRef,
  daysClassName,
  containerClass,
  headerClassName,
  footerClassName,
  daysRowClassName,
  daysColClassName,
  handleHoursChange,
  daysBodyClassName,
  checkboxClassName,
  handleMinutesChange,
  daysHeaderClassName,
  headerYearClassName,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  inputNumberClassName,
  headerButtonClassName,
  handleTimeFormatChange,
  footerWrapperClassName,
  calendarLabelClassName,
  selectOptionsClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  inputTimeFormatClassName,
  calendarCheckerClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  timeSectionWrapperClassName,
  checkboxMarkerContainerClassName,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  datePickerTimePickerLabel,
  stepMinutes = 5,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
}: Props): JSX.Element {
  const prevFocused = useMemo<HTMLElement | null>(() => {
    return isBrowser && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  }, []);

  useEffect((): (() => void) => {
    return function cleanup(): void {
      if (prevFocused !== null) {
        prevFocused.focus();
      }
    };
  }, [prevFocused]);

  const ref = useRef<HTMLDivElement>(null);

  const element = (
    <Calendar
      min={min}
      max={max}
      value={value}
      onBlur={onBlur}
      locale={locale}
      firstDay={firstDay}
      onChange={onChange}
      stepMinutes={stepMinutes}
      daysClassName={daysClassName}
      containerClass={containerClass}
      wrapperRef={forwardedRef || ref}
      headerClassName={headerClassName}
      footerClassName={footerClassName}
      daysRowClassName={daysRowClassName}
      daysColClassName={daysColClassName}
      handleHoursChange={handleHoursChange}
      daysBodyClassName={daysBodyClassName}
      checkboxClassName={checkboxClassName}
      handleMinutesChange={handleMinutesChange}
      daysHeaderClassName={daysHeaderClassName}
      headerYearClassName={headerYearClassName}
      daysColOverClassName={daysColOverClassName}
      emptyButtonClassName={emptyButtonClassName}
      headerMonthClassName={headerMonthClassName}
      inputNumberClassName={inputNumberClassName}
      headerButtonClassName={headerButtonClassName}
      handleTimeFormatChange={handleTimeFormatChange}
      footerWrapperClassName={footerWrapperClassName}
      calendarLabelClassName={calendarLabelClassName}
      selectOptionsClassName={selectOptionsClassName}
      daysColCurrentClassName={daysColCurrentClassName}
      daysColSelectedClassName={daysColSelectedClassName}
      inputTimeFormatClassName={inputTimeFormatClassName}
      calendarCheckerClassName={calendarCheckerClassName}
      headerButtonIconClassName={headerButtonIconClassName}
      timeInputWrapperClassName={timeInputWrapperClassName}
      timeSectionWrapperClassName={timeSectionWrapperClassName}
      checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
      amPmLabel={amPmLabel}
      hoursLabel={hoursLabel}
      minutesLabel={minutesLabel}
      hoursFormatLabel={hoursFormatLabel}
      datePickerTimePickerLabel={datePickerTimePickerLabel}
    />
  );

  if (typeof container !== 'undefined') {
    return createPortal(element, container);
  }

  return element;
}

export const DatePickerTimePicker: ComponentType<Props> = memo<Props>(
  F_DatePickerTimePicker
);
