import {
  useMemo,
  type JSX,
  useEffect,
  useCallback,
  type RefObject,
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import {
  selectTimezone,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';
import { useAppDispatch } from 'state/store.ts';

import { Option } from 'library/intl/timezone/selector/select-option.tsx';

import type {
  InputTimezoneField,
  ChangeTimezonePayload,
} from 'state/reducers/forms/types.ts';
import type { SelectTimezoneOption } from 'library/intl/timezone/types.ts';

type Props<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
> = {
  id: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  validClassName: string;
  optionClassName: string;
  selectClassName: string;
  invalidClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  onKeyDown: KeyboardEventHandler<HTMLSelectElement>;
  readonly options: ReadonlyArray<SelectTimezoneOption<Value>>;
  field: Readonly<InputTimezoneField<Value, FormName, FieldName>>;
  selectRef?: RefObject<HTMLSelectElement | null> | undefined;
  onChange?:
    | ((
        value: Value,
        field: Readonly<InputTimezoneField<Value, FormName, FieldName>>
      ) => void)
    | undefined;

  onBlur?:
    | ((
        value: Value,
        field: Readonly<InputTimezoneField<Value, FormName, FieldName>>
      ) => void)
    | undefined;

  onFocus?:
    | ((
        value: Value,
        field: Readonly<InputTimezoneField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
};

function F_TimezoneSelect<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  field,
  onBlur,
  onFocus,
  options,
  onChange,
  onKeyDown,
  selectRef,
  validClassName,
  optionClassName,
  selectClassName,
  invalidClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
  required = false,
  disabled = false,
}: Props<Value, FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof field.selectedTimezone === 'undefined' && options.length > 0) {
      const defaultTimezone = options[0]?.value;
      const payload: ChangeTimezonePayload = {
        path: field.path,
        selectedTimezone: defaultTimezone ?? '',
      };

      dispatch(selectTimezone(payload));
    }
  }, [dispatch, field.path, field.selectedTimezone, options]);

  const onSelectChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      dispatch(
        selectTimezone({
          path: field.path,
          selectedTimezone: event.target.value,
        })
      );

      if (typeof onChange === 'function') {
        onChange(event.target.value as Value, field);
      }
    },
    [field, onChange, dispatch]
  );

  const onSelectBlur = useCallback<FocusEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      if (typeof onBlur === 'function') {
        onBlur(event.target.value as Value, field);
      } else {
        dispatch(
          selectTimezone({
            path: field.path,
            selectedTimezone: event.target.value,
          })
        );
      }
    },
    [field, onBlur, dispatch]
  );

  const onSelectFocus = useCallback<FocusEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      if (typeof onFocus === 'function') {
        onFocus(event.target.value as Value, field);
      } else {
        dispatch(
          selectTimezone({
            path: field.path,
            selectedTimezone: event.target.value,
          })
        );
      }
    },
    [onFocus, field, dispatch]
  );

  const optionsMemo = useMemo<
    Array<{
      value: Value | undefined;
      label: string;
      offset: string;
      time: string;
    }>
  >(() => {
    return options.map(
      (
        { label, value, offset, time }: SelectTimezoneOption<Value>,
        index: number
      ) => {
        return {
          index,
          label: t(label),
          value,
          offset,
          time,
        };
      }
    );
  }, [t, options]);

  const className = classnames(selectClassName, {
    [validClassName]: field.valid === true && field.isTouched,
    [invalidClassName]: field.invalid === true && field.isTouched,
    [inputUnTouchedClassName]:
      field.valid === true || field.isTouched === false,
    [inputTouchedClassName]:
      !disabled && field.valid === false && field.isTouched,
  });

  return (
    <div>
      <select
        id={id}
        name={name}
        ref={selectRef}
        value={field.selectedTimezone}
        disabled={disabled}
        required={required}
        onBlur={onSelectBlur}
        className={className}
        onKeyDown={onKeyDown}
        onFocus={onSelectFocus}
        onChange={onSelectChange}
      >
        {optionsMemo.map(
          ({ value, label, offset, time }, index): JSX.Element => {
            const key = `${value}-${index}-${label}-${time}`;

            return (
              <Option
                optionClassName={optionClassName}
                key={key}
                value={value}
                label={label}
                offset={offset}
                time={time}
              />
            );
          }
        )}
      </select>
    </div>
  );
}

export const TimezoneSelect = reactMemo(F_TimezoneSelect);
