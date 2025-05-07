import type {
  BaseFields,
  InputPasswordField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type ResetPasswordField = InputPasswordField<'reset', 'password'>
export type ResetConfirmPasswordField = InputPasswordField<
  'reset',
  'confirmPassword'
>

export type ResetFormState = {
  __brand: 'ResetForm'
  formName: 'reset'
  password: ResetPasswordField
  confirmPassword: ResetConfirmPasswordField
}

export type ResetForm = BaseFields & ResetFormState

export type ResetFieldNames = keyof Omit<ResetFormState, 'formName' | '__brand'>

export const initialFieldsReset: ResetForm = {
  __brand: 'ResetForm',
  formName: 'reset',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  password: {
    __brand: 'InputPasswordField',
    path: ['reset', 'password'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  confirmPassword: {
    __brand: 'InputPasswordField',
    path: ['reset', 'confirmPassword'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ResetForm;

export function fetchSuccessReset(
  draft: ResetForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ResetForm, Partial<ResetForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetReset(draft: ResetForm): void {
  Object.assign<ResetForm, ResetForm>(draft, initialFieldsReset);
}
