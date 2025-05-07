import {
  memo,
  useMemo,
  useState,
  type JSX,
  useCallback,
  type RefObject,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTouch } from 'utils/use-touch.ts';
import { toggleBoolean } from 'utils/boolean.ts';

import { DatePicker } from 'library/datepicker/index.tsx';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

type Props = {
  id: string;
  name: string;
  value: number;
  locale: string;
  daysClassName: string;
  inputClassName: string;
  headerClassName: string;
  daysColClassName: string;
  daysRowClassName: string;
  daysBodyClassName: string;
  containerClassName: string;
  daysHeaderClassName: string;
  headerYearClassName: string;
  daysColOverClassName: string;
  emptyButtonClassName: string;
  headerMonthClassName: string;
  headerButtonClassName: string;
  onChange(value: number): void;
  daysColCurrentClassName: string;
  inputContainerClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  calendarContainerClassName: string;
  calendarAnimationClassName: string;
  min?: number | undefined;
  max?: number | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  placeholder?: string | undefined;
  onBlur?: ((value: number) => void) | undefined;
  onFocus?: ((value: number) => void) | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
};

function F_DatePickerField({
  id,
  name,
  value,
  locale,
  onBlur,
  onFocus,
  required,
  disabled,
  inputRef,
  onChange,
  placeholder,
  daysClassName,
  inputClassName,
  headerClassName,
  daysColClassName,
  daysRowClassName,
  daysBodyClassName,
  containerClassName,
  daysHeaderClassName,
  headerYearClassName,
  daysColOverClassName,
  emptyButtonClassName,
  headerMonthClassName,
  headerButtonClassName,
  inputContainerClassName,
  daysColCurrentClassName,
  daysColSelectedClassName,
  calendarContainerClassName,
  headerButtonIconClassName,
  calendarAnimationClassName,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [blurValue, setBlurValue] = useState<number>(Number.NEGATIVE_INFINITY);

  const onDateChange = useCallback<(val: number) => void>(
    (val) => {
      onChange(val);

      setBlurValue(Number.NEGATIVE_INFINITY);

      setOpen(false);
    },
    [onChange]
  );

  const onDatepickerBlur = useCallback<(val: number) => void>((val): void => {
    setBlurValue(val);
  }, []);

  const onDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event): void => {
      event.stopPropagation();

      if (
        event.relatedTarget instanceof HTMLElement &&
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        if (Number.isFinite(blurValue)) {
          onChange(blurValue);
        }

        setOpen(false);
      } else {
        setBlurValue(Number.NEGATIVE_INFINITY);
      }
    },
    [onChange, blurValue]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (typeof onBlur === 'function') {
      onBlur(value);
    }
  }, [onBlur, value]);

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (typeof onFocus === 'function') {
      onFocus(value);
    }
  }, [onFocus, value]);

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      const timestamp = new Date(value).valueOf();

      if (!Number.isNaN(timestamp)) {
        onChange(timestamp);
      }
    },
    [onChange]
  );

  const onInputClick = useCallback<MouseEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      setOpen(toggleBoolean);
    },
    []
  );

  const onInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();

          setOpen(toggleBoolean);

          break;

        default:
          break;
      }
    },
    []
  );

  const isTouch = useTouch();

  const strValue = useMemo<string>(() => {
    if (!Number.isFinite(value)) {
      return '';
    }

    const date = new Date(value);

    return isTouch
      ? (date.toISOString().split('T')[0] ?? '')
      : date.toLocaleDateString(locale, dateOptions);
  }, [isTouch, locale, value]);

  const firstDay = useMemo<string>(() => {
    switch (locale) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case 'ar': {
        return t('days-of-week.saturday'); // 'Saturday'
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case 'ru':

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      case 'fr':

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      case 'es':

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      case 'de': {
        return t('days-of-week.monday'); // 'Monday'
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      // case 'ja-JP':
      // case 'he':
      case 'zh': {
        return t('days-of-week.sunday'); // 'Sunday'
      }

      default: {
        return t('days-of-week.sunday'); // 'Sunday'
      }
    }
  }, [t, locale]);

  const animationClassName = useMemo<string>(() => {
    return classnames({
      [calendarAnimationClassName]: open,
    });
  }, [open, calendarAnimationClassName]);

  return (
    <div
      className={inputContainerClassName}
      onBlur={isTouch ? undefined : onDivBlur}
    >
      {isTouch ? (
        <input
          id={id}
          step={1}
          max={max}
          min={min}
          type='date'
          name={name}
          ref={inputRef}
          value={strValue}
          disabled={disabled}
          required={required}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          onChange={onInputChange}
          placeholder={placeholder}
          className={inputClassName}
        />
      ) : (
        <input
          id={id}
          readOnly
          type='text'
          name={name}
          ref={inputRef}
          value={strValue}
          disabled={disabled}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          onClick={onInputClick}
          onChange={onInputChange}
          placeholder={placeholder}
          onKeyDown={onInputKeyDown}
          className={inputClassName}
        />
      )}

      <div
        className={classnames(calendarContainerClassName, animationClassName)}
      >
        {open && !isTouch ? (
          <div className={animationClassName}>
            <DatePicker
              min={min}
              max={max}
              value={value}
              locale={locale}
              firstDay={firstDay}
              onChange={onDateChange}
              onBlur={onDatepickerBlur}
              daysClassName={daysClassName}
              headerClassName={headerClassName}
              containerClass={containerClassName}
              daysColClassName={daysColClassName}
              daysRowClassName={daysRowClassName}
              daysBodyClassName={daysBodyClassName}
              daysHeaderClassName={daysHeaderClassName}
              headerYearClassName={headerYearClassName}
              emptyButtonClassName={emptyButtonClassName}
              daysColOverClassName={daysColOverClassName}
              headerMonthClassName={headerMonthClassName}
              headerButtonClassName={headerButtonClassName}
              daysColCurrentClassName={daysColCurrentClassName}
              daysColSelectedClassName={daysColSelectedClassName}
              headerButtonIconClassName={headerButtonIconClassName}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const DatePickerField: ComponentType<Props> =
  memo<Props>(F_DatePickerField);
