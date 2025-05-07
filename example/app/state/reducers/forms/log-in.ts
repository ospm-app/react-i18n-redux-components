import type {
  BaseFields,
  InputEmailField,
  InputPasswordField,
  InputCheckboxField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type LogInEmailField = InputEmailField<'logIn', 'email'>
export type LogInPasswordField = InputPasswordField<'logIn', 'password'>
export type LogInRememberField = InputCheckboxField<'logIn', 'remember'>

export type LoginFormState = {
  __brand: 'LoginForm'
  formName: 'logIn'
  email: LogInEmailField
  password: LogInPasswordField
  remember: LogInRememberField
}

export type LogInForm = BaseFields & LoginFormState

export type LogInFieldNames = keyof Omit<LoginFormState, 'formName' | '__brand'>

export const initialFieldsLogIn: LogInForm = {
  __brand: 'LoginForm',
  formName: 'logIn',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  email: {
    __brand: 'InputEmailField',

    path: ['logIn', 'email'] as const,
    type: 'email',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  password: {
    __brand: 'InputPasswordField',
    path: ['logIn', 'password'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  remember: {
    __brand: 'InputCheckboxField',
    path: ['logIn', 'remember'] as const,
    isTouched: false,
    checked: false,
    valid: false,
    invalid: false
  }
} as const satisfies LogInForm;

export function fetchSuccessLogIn(
  draft: LogInForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<LogInForm, Partial<LogInForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetLogIn(draft: LogInForm): void {
  Object.assign<LogInForm, LogInForm>(draft, initialFieldsLogIn);
}
