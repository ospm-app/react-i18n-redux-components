import type {
  BaseFields,
  SelectField,
  InputTelField,
  InputTextField,
  InputEmailField,
  InputPasswordField,
  InputCheckboxField,
  InputTimezoneField,
  InputDatepickerField,
  InputRangePickerField,
  InputDatePickerTimePickerField,
  InputRangePickerTimePickerField
} from 'state/reducers/forms/types.ts';
import type { Flags } from 'app/valibot.ts';
import type { IntlMessageId } from 'const/intl/index.ts';

export type UiKitEmailField = InputEmailField<'uiKit', 'email'>
export type UiKitPhoneField = InputTelField<'uiKit', 'phone'>
export type UiKitPasswordField = InputPasswordField<'uiKit', 'password'>
export type UiKitConfirmPasswordField = InputPasswordField<
  'uiKit',
  'confirmPassword'
>
export type UiKitFirstNameField = InputTextField<'uiKit', 'firstName'>
export type UiKitLastNameField = InputTextField<'uiKit', 'lastName'>
export type UiKitCountryField = SelectField<Flags | '', 'uiKit', 'country'>
export type UiKitAgreeField = InputCheckboxField<'uiKit', 'agree'>
export type UiKitDatepickerField = InputDatepickerField<'uiKit', 'datePicker'>
export type UiKitDatepickerTimepickerField = InputDatePickerTimePickerField<
  'uiKit',
  'datePickerTimePicker'
>
export type UiKitRangePickerField = InputRangePickerField<
  'uiKit',
  'rangePicker'
>
export type UiKitRangePickerTimePickerField = InputRangePickerTimePickerField<
  'uiKit',
  'rangePickerTimePicker'
>

export type UiKitTimezoneField = InputTimezoneField<
  IntlMessageId | undefined,
  'uiKit',
  'timezone'
>

export type UiKitSubjectField = SelectField<
  IntlMessageId | undefined,
  'uiKit',
  'subject'
>
export type UiKitMessageField = InputTextField<'uiKit', 'message'>

export type UiKitFormState = {
  __brand: 'UiKitForm'
  formName: 'uiKit'
  email: UiKitEmailField
  phone: UiKitPhoneField
  password: UiKitPasswordField
  confirmPassword: UiKitConfirmPasswordField
  firstName: UiKitFirstNameField
  lastName: UiKitLastNameField
  country: UiKitCountryField
  subject: UiKitSubjectField
  message: UiKitMessageField
  agree: UiKitAgreeField
  datePicker: UiKitDatepickerField
  datePickerTimePicker: UiKitDatepickerTimepickerField
  rangePicker: UiKitRangePickerField
  rangePickerTimePicker: UiKitRangePickerTimePickerField
  timezone: UiKitTimezoneField
}

export type UiKitForm = BaseFields & UiKitFormState

export type UiKitFieldNames = keyof Omit<UiKitFormState, 'formName' | '__brand'>

export const initialFieldsUiKit: UiKitForm = {
  __brand: 'UiKitForm',
  formName: 'uiKit',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  email: {
    __brand: 'InputEmailField',
    path: ['uiKit', 'email'] as const,
    type: 'email',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  firstName: {
    __brand: 'InputTextField',
    path: ['uiKit', 'firstName'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  lastName: {
    __brand: 'InputTextField',
    path: ['uiKit', 'lastName'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  country: {
    __brand: 'SelectField',
    path: ['uiKit', 'country'] as const,
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  phone: {
    __brand: 'InputTelField',
    path: ['uiKit', 'phone'] as const,
    type: 'tel',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  password: {
    __brand: 'InputPasswordField',
    path: ['uiKit', 'password'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  confirmPassword: {
    __brand: 'InputPasswordField',
    path: ['uiKit', 'confirmPassword'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  subject: {
    __brand: 'SelectField',
    path: ['uiKit', 'subject'] as const,
    isTouched: false,
    value: undefined,
    valid: false,
    invalid: false
  },
  message: {
    __brand: 'InputTextField',
    path: ['uiKit', 'message'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  agree: {
    __brand: 'InputCheckboxField',
    path: ['uiKit', 'agree'] as const,
    isTouched: false,
    checked: false,
    valid: false,
    invalid: false
  },
  datePicker: {
    __brand: 'DatePickerField',
    path: ['uiKit', 'datePicker'] as const,
    type: 'date',
    isTouched: false,
    value: Date.now(),
    valid: false,
    invalid: false
  },
  datePickerTimePicker: {
    __brand: 'DatePickerTimepickerField',
    path: ['uiKit', 'datePickerTimePicker'] as const,
    type: 'date',
    isTouched: false,
    dateValue: Date.now(),
    hoursValue: 0,
    minutesValue: 0,
    valid: false,
    invalid: false
  },
  rangePicker: {
    __brand: 'RangePickerField',
    path: ['uiKit', 'rangePicker'] as const,
    type: 'date',
    isStartTouched: false,
    isEndTouched: false,
    startValue: undefined,
    endValue: undefined,
    startValid: false,
    endValid: false,
    startInvalid: false,
    endInvalid: false
  },
  rangePickerTimePicker: {
    __brand: 'RangePickerTimePickerField',
    path: ['uiKit', 'rangePickerTimePicker'] as const,
    type: 'date',
    isStartTouched: false,
    isEndTouched: false,
    startValue: undefined,
    endValue: undefined,
    startHoursValue: 0,
    startMinutesValue: 0,
    endHoursValue: 0,
    endMinutesValue: 0,
    startValid: false,
    endValid: false,
    startInvalid: false,
    endInvalid: false,
    timeFormat: '24h',
    isTimePicker: false,
    is24hPicker: true
  },
  timezone: {
    __brand: 'InputTimezoneField',
    path: ['uiKit', 'timezone'] as const,
    selectedTimezone: undefined,
    isTouched: false,
    valid: false,
    invalid: false
  }
} as const satisfies UiKitForm;
