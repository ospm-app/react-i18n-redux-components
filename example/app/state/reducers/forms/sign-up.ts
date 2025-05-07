import type {
  BaseFields,
  SelectField,
  InputTelField,
  InputTextField,
  InputEmailField,
  InputPasswordField,
  InputCheckboxField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';
import type { Flags } from 'app/valibot.ts';

export type SignUpEmailField = InputEmailField<'signUp', 'email'>
export type SignUpPhoneField = InputTelField<'signUp', 'phone'>
export type SignUpPasswordField = InputPasswordField<'signUp', 'password'>
export type SignUpConfirmPasswordField = InputPasswordField<
  'signUp',
  'confirmPassword'
>
export type SignUpFirstNameField = InputTextField<'signUp', 'firstName'>
export type SignUpLastNameField = InputTextField<'signUp', 'lastName'>
export type SignUpCountryField = SelectField<Flags | '', 'signUp', 'country'>
export type SignUpAgreeField = InputCheckboxField<'signUp', 'agree'>

export type SignUpFormState = {
  __brand: 'SignUpForm'
  formName: 'signUp'
  email: SignUpEmailField
  phone: SignUpPhoneField
  password: SignUpPasswordField
  confirmPassword: SignUpConfirmPasswordField
  firstName: SignUpFirstNameField
  lastName: SignUpLastNameField
  country: SignUpCountryField
  agree: SignUpAgreeField
}

export type SignUpForm = BaseFields & SignUpFormState

export type SignUpFieldNames = keyof Omit<
  SignUpFormState,
  'formName' | '__brand'
>

export const initialFieldsSignUp: SignUpForm = {
  __brand: 'SignUpForm',
  formName: 'signUp',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  email: {
    __brand: 'InputEmailField',
    path: ['signUp', 'email'] as const,
    type: 'email',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  firstName: {
    __brand: 'InputTextField',
    path: ['signUp', 'firstName'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  lastName: {
    __brand: 'InputTextField',
    path: ['signUp', 'lastName'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  country: {
    __brand: 'SelectField',
    path: ['signUp', 'country'] as const,
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  phone: {
    __brand: 'InputTelField',
    path: ['signUp', 'phone'] as const,
    type: 'tel',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  password: {
    __brand: 'InputPasswordField',
    path: ['signUp', 'password'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  confirmPassword: {
    __brand: 'InputPasswordField',
    path: ['signUp', 'confirmPassword'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  agree: {
    __brand: 'InputCheckboxField',
    path: ['signUp', 'agree'] as const,
    isTouched: false,
    checked: false,
    valid: false,
    invalid: false
  }
} as const satisfies SignUpForm;

export function fetchSuccessSignUp(
  draft: SignUpForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<SignUpForm, Partial<SignUpForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetSignUp(draft: SignUpForm): void {
  Object.assign<SignUpForm, SignUpForm>(draft, initialFieldsSignUp);
}
