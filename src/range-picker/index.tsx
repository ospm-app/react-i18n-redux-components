import { useRef, useMemo, type JSX, useEffect, type RefObject } from 'react';
import { createPortal } from 'react-dom';

import { isBrowser } from 'utils/is-browser.ts';
import { reactMemo } from 'utils/react-memo.ts';

import { RangePicker } from 'library/range-picker/range-picker';

import type { FormNames, FieldNames } from 'state/reducers/forms.ts';
import type { InputRangePickerField } from 'state/reducers/forms/types.ts';

type Props<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  locale: string;
  firstDay: string;
  containerClass: string;
  daysClassName: string;
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
  min?: number;
  max?: number;
  stepMinutes?: number;
  container?: Element | undefined;
  onBlurEnd?: ((value: number) => void) | undefined;
  onBlurStart?: ((value: number) => void) | undefined;
  forwardedRef?: RefObject<HTMLDivElement> | undefined;
  onChangeEnd?: ((value: number | undefined) => void) | undefined;
  onChangeStart?: ((value: number | undefined) => void) | undefined;
};

function F_RangePicker<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
>({
  field,
  locale,
  firstDay,
  onBlurEnd,
  container,
  onBlurStart,
  onChangeEnd,
  forwardedRef,
  onChangeStart,
  daysClassName,
  containerClass,
  headerClassName,
  daysRowClassName,
  daysColClassName,
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
  stepMinutes = 5,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
}: Props<FormName, FieldName>): JSX.Element {
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
    <RangePicker<FormName, FieldName>
      min={min}
      max={max}
      field={field}
      locale={locale}
      firstDay={firstDay}
      onBlurEnd={onBlurEnd}
      onBlurStart={onBlurStart}
      onChangeEnd={onChangeEnd}
      stepMinutes={stepMinutes}
      onChangeStart={onChangeStart}
      daysClassName={daysClassName}
      containerClass={containerClass}
      wrapperRef={forwardedRef || ref}
      headerClassName={headerClassName}
      daysRowClassName={daysRowClassName}
      daysColClassName={daysColClassName}
      daysBodyClassName={daysBodyClassName}
      daysHeaderClassName={daysHeaderClassName}
      headerYearClassName={headerYearClassName}
      daysColOverClassName={daysColOverClassName}
      emptyButtonClassName={emptyButtonClassName}
      headerMonthClassName={headerMonthClassName}
      calendarsRowClassName={calendarsRowClassName}
      headerButtonClassName={headerButtonClassName}
      daysColCurrentClassName={daysColCurrentClassName}
      daysColSelectedClassName={daysColSelectedClassName}
      headerButtonIconClassName={headerButtonIconClassName}
      daysRangeColSelectedClassName={daysRangeColSelectedClassName}
    />
  );

  if (typeof container !== 'undefined') {
    return createPortal(element, container);
  }

  return element;
}

export const Range = reactMemo(F_RangePicker);
