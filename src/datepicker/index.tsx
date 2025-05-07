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

import { Calendar } from 'library/datepicker/calendar.tsx';

type Props = {
  min?: number;
  max?: number;
  locale: string;
  firstDay: string;
  stepMinutes?: number;
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
  container?: Element | undefined;
  onBlur?: ((value: number) => void) | undefined;
  onChange?: ((value: number) => void) | undefined;
  forwardedRef?: RefObject<HTMLDivElement> | undefined;
};

function F_DatePicker({
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
  daysRowClassName,
  daysColClassName,
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
      wrapperRef={forwardedRef || ref}
      stepMinutes={stepMinutes}
      daysClassName={daysClassName}
      containerClass={containerClass}
      headerClassName={headerClassName}
      daysRowClassName={daysRowClassName}
      daysColClassName={daysColClassName}
      daysBodyClassName={daysBodyClassName}
      daysHeaderClassName={daysHeaderClassName}
      headerYearClassName={headerYearClassName}
      daysColOverClassName={daysColOverClassName}
      emptyButtonClassName={emptyButtonClassName}
      headerMonthClassName={headerMonthClassName}
      headerButtonClassName={headerButtonClassName}
      daysColCurrentClassName={daysColCurrentClassName}
      daysColSelectedClassName={daysColSelectedClassName}
      headerButtonIconClassName={headerButtonIconClassName}
    />
  );

  if (typeof container !== 'undefined') {
    return createPortal(element, container);
  }

  return element;
}

export const DatePicker: ComponentType<Props> = memo<Props>(F_DatePicker);
