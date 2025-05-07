import type { IntlMessageId } from 'const/intl/index.ts';
import type { FormNames, FieldNames } from 'state/reducers/forms.ts';

export type Path<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = FormName extends infer P
  ? FieldName extends infer R
    ? readonly [P] | readonly [P, R?] | readonly [P, R?, number?]
    : never
  : never

export type BaseFields = {
  isFetching: boolean
  intlSuccess: IntlMessageId | ''
  success: string
  errors: Array<string>
  intlErrors: Array<IntlMessageId>
}

export type FetchRequestPayload = {
  path: Path
}

export type FetchSuccessPayload = {
  readonly path: Path
  success?: string | undefined
  intlSuccess?: IntlMessageId | undefined
}

export type FetchFailurePayload = {
  readonly path: Path
  errors?: Array<string> | undefined
  intlErrors?: Array<IntlMessageId> | undefined
}

export type FetchCompletePayload = {
  readonly path: Path
}

export type SetInPayload = {
  readonly path: Path
  success: string | ''
  intlSuccess: IntlMessageId | ''
}

export type ChangeSelectPayload = {
  readonly path: Path
  value: string | undefined
  valid?: boolean | undefined
  invalid?: boolean | undefined
}

export type ChangeInputPayload = {
  readonly path: Path
  value: string | number
  valid?: boolean | undefined
  invalid?: boolean | undefined
}

export type ChangeDatePickerInputPayload = {
  readonly path: Path
  value: string | number
  valid?: boolean | undefined
  invalid?: boolean | undefined
}

export type ChangeDatePickerTimePickerInputDatePayload = {
  readonly path: Path
  dateValue: string | number
  valid?: boolean | undefined
  invalid?: boolean | undefined
}

export type ChangeDatePickerTimePickerInputHoursPayload = {
  readonly path: Path
  hours: number
}

export type ChangeDatePickerTimePickerInputMinutesPayload = {
  readonly path: Path
  minutes: number
}

export type ChangeDatePickerTimePickerSelectTimeFormatPayload = {
  readonly path: Path
  timeFormat: string
}

export type ChangeRangePickerStartInputPayload = {
  readonly path: Path
  startValue: number | undefined
  startValid?: boolean | undefined
  startInvalid?: boolean | undefined
}

export type ChangeRangePickerEndInputPayload = {
  readonly path: Path
  endValue: number | undefined
  endValid?: boolean | undefined
  endInvalid?: boolean | undefined
}

export type ChangeRangePickerTimepickerStartInputDatePayload = {
  readonly path: Path
  startValue: number | undefined
  startValid?: boolean | undefined
  startInvalid?: boolean | undefined
}

export type ChangeRangePickerTimePickerStartInputHoursPayload = {
  readonly path: Path
  startHoursValue: number
}

export type ChangeRangePickerTimePickerStartInputMinutesPayload = {
  readonly path: Path
  startMinutesValue: number
}

export type ChangeRangePickerTimePickerStartInputTimeFormatPayload = {
  readonly path: Path
  timeFormat: string
}

export type ChangeRangePickerTimePickerEndInputDatePayload = {
  readonly path: Path
  endValue: number | undefined
  endValid?: boolean | undefined
  endInvalid?: boolean | undefined
}

export type ChangeRangePickerTimePickerEndInputHoursPayload = {
  readonly path: Path
  endHoursValue: number
}

export type ChangeRangePickerTimePickerEndInputMinutesPayload = {
  readonly path: Path
  endMinutesValue: number
}

export type ChangeRangePickerTimePickerEndInputTimeFormatPayload = {
  readonly path: Path
  timeFormat: string
}

export type ChangeRangePickerTimePickerCheckboxSelectPayload = {
  readonly path: Path
  isTimePicker: boolean
}
export type ChangeRangePickerTimePicker24hFormatCheckboxSelectPayload = {
  readonly path: Path
  is24hPicker: boolean
}

export type ChangeCheckboxPayload = {
  readonly path: Path
  checked: boolean
  valid?: boolean | undefined
  invalid?: boolean | undefined
}

export type ChangeTimezonePayload = {
  readonly path: Path
  selectedTimezone: string | undefined
  valid?: boolean
  invalid?: boolean
}

export type ChangeRadioGroupPayload = {
  readonly path: Path
  selected: string
  valid?: boolean | undefined
  invalid?: boolean | undefined
}

export type ValidatePayload<
  Value extends string | number | undefined = string | number | undefined,
> = {
  readonly path: Path
  value: Value
  valid: boolean
  invalid: boolean
}

export type ValidateRangePickerStartPayload<
  Value extends number | undefined = number | undefined,
> = {
  readonly path: Path
  startValue: Value
  startValid: boolean
  startInvalid: boolean
}

export type ValidateEndRangePickerEndPayload<
  Value extends number | undefined = number | undefined,
> = {
  readonly path: Path
  endValue: Value
  endValid: boolean
  endInvalid: boolean
}

export type ValidateRangePickerTimePickerStartPayload<
  Value extends number | undefined = number | undefined,
> = {
  readonly path: Path
  startValue: Value
  startValid: boolean
  startInvalid: boolean
}

export type ValidateEndRangePickerTimePickerEndPayload<
  Value extends number | undefined = number | undefined,
> = {
  readonly path: Path
  endValue: Value
  endValid: boolean
  endInvalid: boolean
}

export type InputCheckboxField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'InputCheckboxField'
  readonly path: Path<FormName, FieldName>
  checked: boolean
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputDatepickerField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'DatePickerField'
  readonly path: Path<FormName, FieldName>
  type: 'date'
  value: number
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputTimezoneField<
  Value extends string | undefined,
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'InputTimezoneField'
  readonly path: Path<FormName, FieldName>
  selectedTimezone: Value
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputDatePickerTimePickerField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'DatePickerTimepickerField'
  readonly path: Path<FormName, FieldName>
  type: 'date'
  dateValue: number
  hoursValue: number
  minutesValue: number
  isTouched: boolean
  valid: boolean
  invalid: boolean
}
export type InputRangePickerField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'RangePickerField'
  readonly path: Path<FormName, FieldName>
  type: 'date'
  startValue: number | undefined
  endValue: number | undefined
  isStartTouched: boolean
  isEndTouched: boolean
  startValid: boolean
  endValid: boolean
  startInvalid: boolean
  endInvalid: boolean
}

export type InputRangePickerTimePickerField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'RangePickerTimePickerField'
  readonly path: Path<FormName, FieldName>
  type: 'date'
  startValue: number | undefined
  endValue: number | undefined
  startHoursValue: number
  startMinutesValue: number
  endHoursValue: number
  endMinutesValue: number
  isStartTouched: boolean
  isEndTouched: boolean
  startValid: boolean
  endValid: boolean
  startInvalid: boolean
  endInvalid: boolean
  timeFormat: '24h' | 'AM' | 'PM'
  isTimePicker: boolean
  is24hPicker: boolean
}

export type RadioGroupField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'RadioGroupField'
  readonly path: Path<FormName, FieldName>
  selected: string
  isTouched: false
  valid: boolean
  invalid: boolean
}

export type SelectField<
  Value extends string | undefined,
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'SelectField'
  readonly path: Path<FormName, FieldName>
  value: Value
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputNumberField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'InputNumberField'
  readonly path: Path<FormName, FieldName>
  type: 'number'
  value: number
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputPasswordField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'InputPasswordField'
  readonly path: Path<FormName, FieldName>
  type: 'password'
  value: string
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputTextField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'InputTextField'
  readonly path: Path<FormName, FieldName>
  type: 'text'
  value: string
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputTelField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'InputTelField'
  readonly path: Path<FormName, FieldName>
  type: 'tel'
  value: string
  isTouched: boolean
  valid: boolean
  invalid: boolean
}

export type InputEmailField<
  FormName extends FormNames = FormNames,
  FieldName extends FieldNames = FieldNames,
> = {
  __brand: 'InputEmailField'
  readonly path: Path<FormName, FieldName>
  type: 'email'
  value: string
  isTouched: boolean
  valid: boolean
  invalid: boolean
}
