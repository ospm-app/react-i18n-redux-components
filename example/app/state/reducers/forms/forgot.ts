import type {
  BaseFields,
  InputEmailField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type ForgotEmailField = InputEmailField<'forgot', 'email'>

export type ForgotFormState = {
  __brand: 'ForgotForm'
  formName: 'forgot'
  email: ForgotEmailField
}

export type ForgotForm = BaseFields & ForgotFormState

export type ForgotFieldNames = keyof Omit<
  ForgotFormState,
  'formName' | '__brand'
>

export const initialFieldsForgot: ForgotForm = {
  __brand: 'ForgotForm',
  formName: 'forgot',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  email: {
    __brand: 'InputEmailField',
    path: ['forgot', 'email'] as const,
    type: 'email',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ForgotForm;

export function fetchSuccessForgot(
  draft: ForgotForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ForgotForm, Partial<ForgotForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetForgot(draft: ForgotForm): void {
  Object.assign<ForgotForm, ForgotForm>(draft, initialFieldsForgot);
}
