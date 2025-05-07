import {
  memo,
  useRef,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
  type MouseEventHandler as ReactMouseEventHandler,
  type KeyboardEventHandler as ReactKeyboardEventHandler,
} from 'react';
import classnames from 'classnames';

import type { TDayOfMonth } from 'library/datepicker/types.ts';

type Props = {
  today: boolean;
  selected: boolean;
  overMonth: boolean;
  daysColClassName: string;
  day: Readonly<TDayOfMonth>;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  daysColCurrentClassName: string;
  daysColSelectedClassName: string;
  onDaySelect(day: Readonly<TDayOfMonth>): void;
  onDayKeyDown: ReactKeyboardEventHandler<HTMLButtonElement>;
};

function F_DayPickerCol({
  day,
  today,
  selected,
  overMonth,
  onDaySelect,
  onDayKeyDown,
  daysColClassName,
  daysColOverClassName,
  emptyButtonClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
}: Props): JSX.Element {
  const onDayClick = useCallback<
    ReactMouseEventHandler<HTMLButtonElement>
  >((): void => {
    onDaySelect(day);
  }, [day, onDaySelect]);

  const colRef = useRef<HTMLButtonElement>(null);

  const [, setSelected] = useState<boolean>(false);

  useEffect((): void => {
    setSelected((prevSelected: boolean): boolean => {
      if (selected !== prevSelected && selected && colRef.current !== null) {
        colRef.current.focus();
      }

      return selected;
    });
  }, [selected]);

  const label = useMemo<string>(() => {
    const date = new Date(day.year, day.month, day.day);

    return date.toLocaleDateString();
  }, [day]);

  const buttonClassName = useMemo<string>(() => {
    return classnames(daysColClassName, {
      [daysColOverClassName]: overMonth,
      [daysColCurrentClassName]: today,
      [daysColSelectedClassName]: selected,
    });
  }, [
    daysColClassName,
    daysColOverClassName,
    overMonth,
    daysColCurrentClassName,
    today,
    daysColSelectedClassName,
    selected,
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
