import {
  memo,
  useRef,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type RefObject,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useTouch } from 'utils/use-touch.ts';
import { toggleBoolean } from 'utils/boolean.ts';

import { Range } from 'library/range-picker/index.tsx';
import { RangePickerEndInput } from 'library/range-picker/range-picker-end-input.tsx';
import { RangePickerStartInput } from 'library/range-picker/range-picker-start-input.tsx';

import type { FormNames, FieldNames } from 'state/reducers/forms.ts';
import type { InputRangePickerField } from 'state/reducers/forms/types.ts';

const dateFormats: Record<string, string> = {
  ru: 'DD.MM.YYYY',
  en: 'MM/DD/YYYY',
  fr: 'DD/MM/YYYY',
  de: 'DD/MM/YYYY',
};

type Props<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  min?: number;
  max?: number;
  id: string;
  name: string;
  locale: string;
  endValid: boolean;
  startValid: boolean;
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
  calendarsRowClassName: string;
  daysColCurrentClassName: string;
  inputContainerClassName: string;
  rangeContainerClassName: string;
  daysColSelectedClassName: string;
  headerButtonIconClassName: string;
  calendarContainerClassName: string;
  daysRangeColSelectedClassName: string;
  onChangeEnd(value: number | undefined): void;
  onChangeStart(value: number | undefined): void;
  field: InputRangePickerField<FormName, FieldName>;
  endValue?: number | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  startValue?: number | undefined;
  placeholder?: string | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onBlurEnd?: ((value: number | undefined) => void) | undefined;
  onFocusEnd?: ((value: number | undefined) => void) | undefined;
  onBlurStart?: ((value: number | undefined) => void) | undefined;
  onFocusStart?: ((value: number | undefined) => void) | undefined;
};

function formatDate(timestamp: number, locale: string): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const format = dateFormats[locale] ?? 'MM/DD/YYYY';

  return format.replace('DD', day).replace('MM', month).replace('YYYY', year);
}

function F_RangePickerField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
>({
  id,
  name,
  field,
  locale,
  endValid,
  endValue,
  disabled,
  inputRef,
  required,
  onBlurEnd,
  startValue,
  startValid,
  onFocusEnd,
  onBlurStart,
  onChangeEnd,
  placeholder,
  onFocusStart,
  onChangeStart,
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
  calendarsRowClassName,
  headerButtonClassName,
  inputContainerClassName,
  daysColCurrentClassName,
  rangeContainerClassName,
  daysColSelectedClassName,
  headerButtonIconClassName,
  calendarContainerClassName,
  daysRangeColSelectedClassName,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
}: Props<FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (typeof timeoutRef.current === 'number') {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [blurValueStart, setBlurValueStart] = useState<number>(
    Number.NEGATIVE_INFINITY
  );
  const [blurValueEnd, setBlurValueEnd] = useState<number>(
    Number.NEGATIVE_INFINITY
  );

  const onDateChangeStart = useCallback<(value: number | undefined) => void>(
    (value) => {
      if (typeof onChangeStart === 'function') {
        onChangeStart(value);
      }

      setBlurValueStart(Number.NEGATIVE_INFINITY);
    },
    [onChangeStart]
  );

  const onDateChangeEnd = useCallback<(value: number | undefined) => void>(
    (value) => {
      if (typeof onChangeEnd === 'function') {
        onChangeEnd(value);
      }

      setBlurValueEnd(Number.NEGATIVE_INFINITY);

      timeoutRef.current = window.setTimeout((): void => {
        setOpen(false);
      }, 300);
    },
    [onChangeEnd]
  );

  const onDatepickerBlurStart = useCallback<(val: number) => void>(
    (val): void => {
      setBlurValueStart(val);
    },
    []
  );

  const onDatepickerBlurEnd = useCallback<(val: number) => void>(
    (val): void => {
      setBlurValueEnd(val);
    },
    []
  );

  const onDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event): void => {
      event.stopPropagation();

      if (
        event.relatedTarget instanceof HTMLElement &&
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        if (Number.isFinite(blurValueStart)) {
          onChangeStart(blurValueStart);
        }

        setOpen(false);
      }

      if (
        event.relatedTarget instanceof HTMLElement &&
        !event.currentTarget.contains(event.relatedTarget) // условие с blurValueEnd
      ) {
        if (Number.isFinite(blurValueEnd)) {
          onChangeEnd(blurValueEnd);
        }

        setOpen(false);
      } else {
        setBlurValueStart(Number.NEGATIVE_INFINITY);
        setBlurValueEnd(Number.NEGATIVE_INFINITY);
      }
    },
    [onChangeStart, onChangeEnd, blurValueStart, blurValueEnd]
  );

  const onInputBlurStart = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onBlurStart === 'function') {
      onBlurStart(startValue);
    }
  }, [onBlurStart, startValue]);

  const onInputBlurEnd = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onBlurEnd === 'function') {
      onBlurEnd(startValue);
    }
  }, [onBlurEnd, startValue]);

  const onStartInputFocus = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onFocusStart === 'function') {
      onFocusStart(startValue);
    }
  }, [onFocusStart, startValue]);

  const onEndInputFocus = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (typeof onFocusEnd === 'function') {
      onFocusEnd(endValue);
    }
  }, [onFocusEnd, endValue]);

  const onInputChangeStart = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      const timestamp = new Date(value).valueOf();

      if (!Number.isNaN(timestamp)) {
        onChangeStart(timestamp);
      }
    },
    [onChangeStart]
  );

  const onInputChangeEnd = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      const {
        target: { value },
      } = event;

      const timestamp = new Date(value).valueOf();

      if (!Number.isNaN(timestamp)) {
        onChangeEnd(timestamp);
      }
    },
    [onChangeEnd]
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

  const strValueStart = useMemo<string | undefined>(() => {
    if (typeof startValue === 'undefined' || !Number.isFinite(startValue)) {
      return '';
    }

    const dateFromValueStart = new Date(startValue);

    return isTouch
      ? dateFromValueStart.toISOString().split('T')[0]
      : formatDate(startValue, locale);
  }, [isTouch, locale, startValue]);

  const onDateSelectStart = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = new Date(event.target.value).valueOf(); // Получаем временную метку

      onChangeStart(selectedDate);
    },
    [onChangeStart]
  );

  const onDateSelectEnd = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = new Date(event.target.value).valueOf(); // Получаем временную метку

      onChangeEnd(selectedDate);
    },
    [onChangeEnd]
  );

  const strValueEnd = useMemo<string | undefined>(() => {
    if (typeof endValue === 'undefined' || !Number.isFinite(endValue)) {
      return '';
    }

    const dateFromValueEnd = new Date(endValue);

    return isTouch
      ? dateFromValueEnd.toISOString().split('T')[0]
      : formatDate(endValue, locale);
  }, [isTouch, locale, endValue]);

  const firstDay = useMemo<string>(() => {
    switch (locale) {
      case 'ar': {
        return t('days-of-week.saturday'); // 'Saturday'
      }

      case 'ru':
      case 'fr':
      case 'es':
      case 'de': {
        return t('days-of-week.monday'); // 'Monday'
      }
      case 'zh': {
        return t('days-of-week.sunday'); // 'Sunday'
      }

      default: {
        return t('days-of-week.sunday'); // 'Sunday'
      }
    }
  }, [t, locale]);

  return (
    <div
      className={inputContainerClassName}
      onBlur={isTouch ? undefined : onDivBlur}
    >
      <div className={rangeContainerClassName}>
        <RangePickerStartInput
          id={id}
          name={name}
          inputRef={inputRef}
          strValueStart={strValueStart}
          disabled={disabled}
          onInputBlurStart={onInputBlurStart}
          onInputFocus={onStartInputFocus}
          onInputClick={onInputClick}
          onInputChange={onInputChangeStart}
          placeholder={placeholder}
          onInputKeyDown={onInputKeyDown}
          inputClassName={inputClassName}
          invalid={!startValid}
          required={required}
          onDateSelect={onDateSelectStart}
        />

        <RangePickerEndInput
          id={id}
          name={name}
          inputRef={inputRef}
          strValueEnd={strValueEnd}
          disabled={disabled}
          onInputBlurEnd={onInputBlurEnd}
          onInputFocus={onEndInputFocus}
          onInputClick={onInputClick}
          onInputChange={onInputChangeEnd}
          placeholder={placeholder}
          onInputKeyDown={onInputKeyDown}
          inputClassName={inputClassName}
          invalid={!endValid}
          required={required}
          onDateSelect={onDateSelectEnd}
        />
      </div>

      <div className={calendarContainerClassName}>
        {open && !isTouch ? (
          <Range<FormName, FieldName>
            min={min}
            max={max}
            field={field}
            locale={locale}
            firstDay={firstDay}
            daysClassName={daysClassName}
            onChangeEnd={onDateChangeEnd}
            onBlurEnd={onDatepickerBlurEnd}
            onChangeStart={onDateChangeStart}
            headerClassName={headerClassName}
            onBlurStart={onDatepickerBlurStart}
            containerClass={containerClassName}
            daysColClassName={daysColClassName}
            daysRowClassName={daysRowClassName}
            daysBodyClassName={daysBodyClassName}
            daysHeaderClassName={daysHeaderClassName}
            headerYearClassName={headerYearClassName}
            emptyButtonClassName={emptyButtonClassName}
            daysColOverClassName={daysColOverClassName}
            headerMonthClassName={headerMonthClassName}
            calendarsRowClassName={calendarsRowClassName}
            headerButtonClassName={headerButtonClassName}
            daysColCurrentClassName={daysColCurrentClassName}
            daysColSelectedClassName={daysColSelectedClassName}
            headerButtonIconClassName={headerButtonIconClassName}
            daysRangeColSelectedClassName={daysRangeColSelectedClassName}
          />
        ) : null}
      </div>
    </div>
  );
}

export const RangePickerField: ComponentType<Props> =
  memo<Props>(F_RangePickerField);
