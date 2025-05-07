import {
  useMemo,
  type JSX,
  useCallback,
  type RefObject,
  type KeyboardEventHandler,
} from 'react';
import moment from 'moment-timezone';

import { useTouch } from 'utils/use-touch.ts';
import { reactMemo } from 'utils/react-memo.ts';

import timezonesData from './data/timezones.json' with { type: 'json' };
import zoneToCCData from './data/zoneToCC.json' with { type: 'json' };
import CCToCountryNameData from './data/CCToCountryName.json' with {
  type: 'json',
};

import { TimezoneSelectWithLabelAndDescription } from 'library/intl/timezone/selector/select-with-label-and-description.tsx';
import { TimezoneComboboxSelectIntlWithLabeAndDescription } from 'library/intl/timezone/combobox/combobox-with-label-and-description.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { FormNames, FieldNames } from 'state/reducers/forms.ts';
import type { InputTimezoneField } from 'state/reducers/forms/types.ts';

type Props<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
> = {
  id: string;
  name: string;
  label: IntlMessageId;
  divClassName: string;
  listClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  optionClassName: string;
  selectClassName: string;
  invalidClassName: string;
  selectDivClassName: string;
  inputTouchedClassName: string;
  readonlyInputClassName: string;
  inputUnTouchedClassName: string;
  selectButtonIconClassName: string;
  onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onSelectKeyDown: KeyboardEventHandler<HTMLSelectElement>;
  field: Readonly<InputTimezoneField<Value, FormName, FieldName>>;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
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

function F_Timezone<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  label,
  field,
  onBlur,
  onFocus,
  inputRef,
  onChange,
  selectRef,
  description,
  placeholder,
  divClassName,
  errorMessage,
  listClassName,
  labelClassName,
  validClassName,
  onInputKeyDown,
  hiddenClassName,
  optionClassName,
  selectClassName,
  onSelectKeyDown,
  invalidClassName,
  selectDivClassName,
  inputTouchedClassName,
  readonlyInputClassName,
  inputUnTouchedClassName,
  selectButtonIconClassName,
  required = false,
  disabled = false,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props<Value, FormName, FieldName>): JSX.Element {
  const isTouch: boolean = useTouch();

  const timezonesGroupedByCC = Object.entries(timezonesData).reduce(
    (
      output: Record<
        string,
        Array<{
          id: string;
          name: IntlMessageId;
          offset: string;
          nOffset: number;
        }>
      >,
      [_key, tzData]
    ) => {
      const tId = tzData.id;

      if (
        typeof zoneToCCData[tId as keyof typeof zoneToCCData] !== 'undefined'
      ) {
        const CC = zoneToCCData[tId as keyof typeof zoneToCCData];

        output[CC] = output[CC] ?? [];

        output[CC].push(
          tzData as {
            id: string;
            name: IntlMessageId;
            offset: string;
            nOffset: number;
          }
        );
      }

      return output;
    },
    {}
  );

  const timezoneGroups = Object.entries(timezonesGroupedByCC).reduce(
    (
      output: Array<{
        text: string;
        children: Array<{
          id: string;
          name: IntlMessageId;
          offset: string;
          nOffset: number;
        }>;
      }>,
      [CC, zonesByCountry]
    ) => {
      output.push({
        text: `${CCToCountryNameData[CC as keyof typeof CCToCountryNameData]}: `,
        children: zonesByCountry,
      });

      return output;
    },
    []
  );

  const guessedTimezoneName = moment.tz.guess();

  if (
    guessedTimezoneName !== '' &&
    Object.keys(timezonesData).includes(guessedTimezoneName)
  ) {
    const guessedTimezone =
      timezonesData[guessedTimezoneName as keyof typeof timezonesData];

    timezoneGroups.unshift({
      text: 'Local: ',
      children: [
        guessedTimezone as {
          id: string;
          name: IntlMessageId;
          offset: string;
          nOffset: number;
        },
      ],
    });
  }

  const createOptions = useCallback(
    (
      timezoneGroups: Array<{
        text: string;
        children: Array<{
          id: string;
          name: IntlMessageId;
          offset: string;
          nOffset: number;
        }>;
      }>
    ): Array<{
      value: Value;
      label: IntlMessageId;
      time: string;
      id: string;
      offset: string;
    }> => {
      return timezoneGroups.flatMap(
        (
          group
        ): Array<{
          value: Value;
          label: IntlMessageId;
          time: string;
          id: string;
          offset: string;
        }> => {
          return group.children.map(
            (timezone: {
              id: string;
              name: IntlMessageId;
              offset: string;
              nOffset: number;
            }): {
              value: Value;
              label: IntlMessageId;
              time: string;
              id: string;
              offset: string;
            } => {
              const value = timezone.id.split('/').join('_');
              const time = moment.tz(timezone.id).format('LT');
              const offset = timezone.offset;

              return {
                value: value as Value,
                label: timezone.name,
                time,
                id: timezone.id,
                offset,
              };
            }
          );
        }
      );
    },
    []
  );

  const availableTimezones = useMemo<
    Array<{
      value: Value;
      label: IntlMessageId;
      time: string;
      id: string;
      offset: string;
    }>
  >(() => {
    return createOptions(timezoneGroups);
  }, [createOptions, timezoneGroups]);

  if (isTouch) {
    return (
      <TimezoneSelectWithLabelAndDescription<Value, FormName, FieldName>
        id={id}
        name={name}
        label={label}
        field={field}
        onBlur={onBlur}
        onFocus={onFocus}
        required={required}
        disabled={disabled}
        onChange={onChange}
        selectRef={selectRef}
        description={description}
        divClassName={divClassName}
        errorMessage={errorMessage}
        onKeyDown={onSelectKeyDown}
        options={availableTimezones}
        labelClassName={labelClassName}
        errorClassName={errorClassName}
        validClassName={validClassName}
        hiddenClassName={hiddenClassName}
        optionClassName={optionClassName}
        selectClassName={selectClassName}
        invalidClassName={invalidClassName}
        descriptionClassName={descriptionClassName}
        inputTouchedClassName={inputTouchedClassName}
        inputUnTouchedClassName={inputUnTouchedClassName}
      />
    );
  }

  return (
    <TimezoneComboboxSelectIntlWithLabeAndDescription<
      Value,
      FormName,
      FieldName
    >
      id={id}
      label={label}
      field={field}
      onBlur={onBlur}
      onFocus={onFocus}
      required={required}
      disabled={disabled}
      onChange={onChange}
      inputRef={inputRef}
      description={description}
      placeholder={placeholder}
      onKeyDown={onInputKeyDown}
      divClassName={divClassName}
      errorMessage={errorMessage}
      options={availableTimezones}
      listClassName={listClassName}
      errorClassName={errorClassName}
      labelClassName={labelClassName}
      validClassName={validClassName}
      hiddenClassName={hiddenClassName}
      optionClassName={optionClassName}
      invalidClassName={invalidClassName}
      selectDivClassName={selectDivClassName}
      descriptionClassName={descriptionClassName}
      inputTouchedClassName={inputTouchedClassName}
      readonlyInputClassName={readonlyInputClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
      selectButtonIconClassName={selectButtonIconClassName}
    />
  );
}

export const Timezone = reactMemo(F_Timezone);
