import type {
  BaseFields,
  SelectField,
  InputTelField,
  InputTextField,
  InputPasswordField,
  InputCheckboxField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';
import type { Flags } from 'app/valibot.ts';

export type SignUpWithGithubSuccessEmailField = InputTextField<
  'signUpWithGithubSuccess',
  'email'
>
export type SignUpWithGithubSuccessPhoneField = InputTelField<
  'signUpWithGithubSuccess',
  'phone'
>
export type SignUpWithGithubSuccessPasswordField = InputPasswordField<
  'signUpWithGithubSuccess',
  'password'
>
export type SignUpWithGithubSuccessConfirmPasswordField = InputPasswordField<
  'signUpWithGithubSuccess',
  'confirmPassword'
>
export type SignUpWithGithubSuccessFirstNameField = InputTextField<
  'signUpWithGithubSuccess',
  'firstName'
>
export type SignUpWithGithubSuccessLastNameField = InputTextField<
  'signUpWithGithubSuccess',
  'lastName'
>
export type SignUpWithGithubSuccessCountryField = SelectField<
  Flags | '',
  'signUpWithGithubSuccess',
  'country'
>
export type SignUpWithGithubSuccessAgreeField = InputCheckboxField<
  'signUpWithGithubSuccess',
  'agree'
>

export type SignUpWithGithubSuccessFormState = {
  __brand: 'SignUpWithGithubSuccessForm'
  formName: 'signUpWithGithubSuccess'
  email: SignUpWithGithubSuccessEmailField
  phone: SignUpWithGithubSuccessPhoneField
  password: SignUpWithGithubSuccessPasswordField
  confirmPassword: SignUpWithGithubSuccessConfirmPasswordField
  firstName: SignUpWithGithubSuccessFirstNameField
  lastName: SignUpWithGithubSuccessLastNameField
  country: SignUpWithGithubSuccessCountryField
  agree: SignUpWithGithubSuccessAgreeField
}

export type SignUpWithGithubSuccessForm = BaseFields &
  SignUpWithGithubSuccessFormState

export type SignUpWithGithubSuccessFieldNames = keyof Omit<
  SignUpWithGithubSuccessFormState,
  'formName' | '__brand'
>

export const initialFieldsSignUpWithGithubSuccess: SignUpWithGithubSuccessForm =
  {
    __brand: 'SignUpWithGithubSuccessForm',
    formName: 'signUpWithGithubSuccess',
    // Request
    isFetching: false,
    success: '',
    intlSuccess: '',
    errors: [],
    intlErrors: [],
    // Fields
    email: {
      __brand: 'InputTextField',
      path: ['signUpWithGithubSuccess', 'email'] as const,
      type: 'text',
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    firstName: {
      __brand: 'InputTextField',
      path: ['signUpWithGithubSuccess', 'firstName'] as const,
      type: 'text',
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    lastName: {
      __brand: 'InputTextField',
      path: ['signUpWithGithubSuccess', 'lastName'] as const,
      type: 'text',
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    country: {
      __brand: 'SelectField',
      path: ['signUpWithGithubSuccess', 'country'] as const,
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    phone: {
      __brand: 'InputTelField',
      path: ['signUpWithGithubSuccess', 'phone'] as const,
      type: 'tel',
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    password: {
      __brand: 'InputPasswordField',
      path: ['signUpWithGithubSuccess', 'password'] as const,
      type: 'password',
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    confirmPassword: {
      __brand: 'InputPasswordField',
      path: ['signUpWithGithubSuccess', 'confirmPassword'] as const,
      type: 'password',
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    agree: {
      __brand: 'InputCheckboxField',
      path: ['signUpWithGithubSuccess', 'agree'] as const,
      isTouched: false,
      checked: false,
      valid: false,
      invalid: false
    }
  } as const satisfies SignUpWithGithubSuccessForm;

export function fetchSuccessSignUpWithGithubSuccess(
  draft: SignUpWithGithubSuccessForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<
    SignUpWithGithubSuccessForm,
    Partial<SignUpWithGithubSuccessForm>
  >(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetSignUpWithGithubSuccess(
  draft: SignUpWithGithubSuccessForm
): void {
  Object.assign<SignUpWithGithubSuccessForm, SignUpWithGithubSuccessForm>(
    draft,
    initialFieldsSignUpWithGithubSuccess
  );
}
