import { useRef, useMemo, type JSX, useEffect, type RefObject } from 'react';
import { createPortal } from 'react-dom';

import { isBrowser } from 'utils/is-browser.ts';
import { reactMemo } from 'utils/react-memo.ts';

import { RangePickerTimepicker } from 'library/range-picker-timepicker/range-picker-timepicker.tsx';

import type { IntlMessageId } from '/app/const/intl/index.ts';
import type { FieldNames, FormNames } from 'state/reducers/forms.ts';
import type { InputRangePickerTimePickerField } from 'state/reducers/forms/types.ts';

type Props<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  min?: number;
  max?: number;
  stepMinutes?: number;
  locale: string;
  firstDay: string;
  daysClassName: string;
  footerClassName: string;
  headerClassName: string;
  daysRowClassName: string;
  daysColClassName: string;
  checkboxClassName: string;
  daysBodyClassName: string;
  containerClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  inputNumberClassName: string;
  headerButtonClassName: string;
  calendarLabelClassName: string;
  footerWrapperClassName: string;
  selectOptionsClassName: string;
  daysColCurrentClassName: string;
  calendarCheckerClassName: string;
  daysColSelectedClassName: string;
  inputTimeFormatClassName: string;
  headerButtonIconClassName: string;
  timeInputWrapperClassName: string;
  timeSectionWrapperClassName: string;
  daysRangeColSelectedClassName: string;
  rangePickerTimePickerClassName: string;
  checkboxMarkerContainerClassName: string;
  field: InputRangePickerTimePickerField<FormName, FieldName>;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  rangePickerTimePickerLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  container?: Element | undefined;
  onBlurEnd?: ((value: number) => void) | undefined;
  onBlurStart?: ((value: number) => void) | undefined;
  forwardedRef?: RefObject<HTMLDivElement> | undefined;
  handleEndHoursChange?: ((hours: number) => void) | undefined;
  handleStartHoursChange?: ((hours: number) => void) | undefined;
  onChangeEnd?: ((value: number | undefined) => void) | undefined;
  handleEndMinutesChange?: ((minutes: number) => void) | undefined;
  onChangeStart?: ((value: number | undefined) => void) | undefined;
  handleStartMinutesChange: ((minutes: number) => void) | undefined;
  handleEndTimeFormatChange?: ((timeStamp: string) => void) | undefined;
  handleStartTimeFormatChange?: ((timeStamp: string) => void) | undefined;
  handle24hPickerCheckboxChange?: ((is24hPicker: boolean) => void) | undefined;
  handleTimePickerCheckboxChange?:
    | ((isTimePicker: boolean) => void)
    | undefined;
};

function F_RangePickerWithTimepicker<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
>({
  field,
  locale,
  firstDay,
  container,
  onBlurEnd,
  onBlurStart,
  onChangeEnd,
  forwardedRef,
  onChangeStart,
  daysClassName,
  footerClassName,
  headerClassName,
  daysRowClassName,
  daysColClassName,
  checkboxClassName,
  daysBodyClassName,
  containerClassName,
  daysHeaderClassName,
  headerYearClassName,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  inputNumberClassName,
  handleEndHoursChange,
  headerButtonClassName,
  handleStartHoursChange,
  calendarLabelClassName,
  footerWrapperClassName,
  selectOptionsClassName,
  handleEndMinutesChange,
  daysColCurrentClassName,
  handleStartMinutesChange,
  inputTimeFormatClassName,
  calendarCheckerClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  timeInputWrapperClassName,
  handleEndTimeFormatChange,
  handleStartTimeFormatChange,
  timeSectionWrapperClassName,
  daysRangeColSelectedClassName,
  handle24hPickerCheckboxChange,
  handleTimePickerCheckboxChange,
  rangePickerTimePickerClassName,
  checkboxMarkerContainerClassName,
  stepMinutes = 5,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  rangePickerTimePickerLabel,
  hoursFormatLabel,
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
    <RangePickerTimepicker<FormName, FieldName>
      min={min}
      max={max}
      field={field}
      locale={locale}
      firstDay={firstDay}
      onBlurEnd={onBlurEnd}
      stepMinutes={stepMinutes}
      onBlurStart={onBlurStart}
      onChangeEnd={onChangeEnd}
      onChangeStart={onChangeStart}
      daysClassName={daysClassName}
      wrapperRef={forwardedRef || ref}
      headerClassName={headerClassName}
      footerClassName={footerClassName}
      daysRowClassName={daysRowClassName}
      daysColClassName={daysColClassName}
      checkboxClassName={checkboxClassName}
      daysBodyClassName={daysBodyClassName}
      containerClassName={containerClassName}
      daysHeaderClassName={daysHeaderClassName}
      headerYearClassName={headerYearClassName}
      daysColOverClassName={daysColOverClassName}
      emptyButtonClassName={emptyButtonClassName}
      handleEndHoursChange={handleEndHoursChange}
      headerMonthClassName={headerMonthClassName}
      inputNumberClassName={inputNumberClassName}
      headerButtonClassName={headerButtonClassName}
      calendarLabelClassName={calendarLabelClassName}
      footerWrapperClassName={footerWrapperClassName}
      handleStartHoursChange={handleStartHoursChange}
      handleEndMinutesChange={handleEndMinutesChange}
      selectOptionsClassName={selectOptionsClassName}
      daysColCurrentClassName={daysColCurrentClassName}
      calendarCheckerClassName={calendarCheckerClassName}
      daysColSelectedClassName={daysColSelectedClassName}
      handleStartMinutesChange={handleStartMinutesChange}
      inputTimeFormatClassName={inputTimeFormatClassName}
      handleEndTimeFormatChange={handleEndTimeFormatChange}
      headerButtonIconClassName={headerButtonIconClassName}
      timeInputWrapperClassName={timeInputWrapperClassName}
      handleStartTimeFormatChange={handleStartTimeFormatChange}
      timeSectionWrapperClassName={timeSectionWrapperClassName}
      daysRangeColSelectedClassName={daysRangeColSelectedClassName}
      handle24hPickerCheckboxChange={handle24hPickerCheckboxChange}
      handleTimePickerCheckboxChange={handleTimePickerCheckboxChange}
      rangePickerTimePickerClassName={rangePickerTimePickerClassName}
      checkboxMarkerContainerClassName={checkboxMarkerContainerClassName}
      amPmLabel={amPmLabel}
      hoursLabel={hoursLabel}
      minutesLabel={minutesLabel}
      hoursFormatLabel={hoursFormatLabel}
      rangePickerTimePickerLabel={rangePickerTimePickerLabel}
    />
  );

  if (typeof container !== 'undefined') {
    return createPortal(element, container);
  }

  return element;
}

export const RangePickerWithTimepicker = reactMemo(F_RangePickerWithTimepicker);
