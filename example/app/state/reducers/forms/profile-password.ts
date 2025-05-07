import type {
  BaseFields,
  InputPasswordField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type ProfilePasswordPasswordField = InputPasswordField<
  'profilePassword',
  'password'
>
export type ProfilePasswordNewPasswordField = InputPasswordField<
  'profilePassword',
  'newPassword'
>
export type ProfilePasswordConfirmNewPasswordField = InputPasswordField<
  'profilePassword',
  'confirmNewPassword'
>

export type ProfilePasswordFormState = {
  __brand: 'ProfilePasswordForm'
  formName: 'profilePassword'
  email: string | ''
  password: ProfilePasswordPasswordField
  newPassword: ProfilePasswordNewPasswordField
  confirmNewPassword: ProfilePasswordConfirmNewPasswordField
}

export type ProfilePasswordForm = BaseFields & ProfilePasswordFormState

export type ProfilePasswordFieldNames = keyof Omit<
  ProfilePasswordFormState,
  'formName' | '__brand'
>

export const initialFieldsProfilePassword: ProfilePasswordForm = {
  __brand: 'ProfilePasswordForm',
  formName: 'profilePassword',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  email: '',
  password: {
    __brand: 'InputPasswordField',
    path: ['profilePassword', 'password'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  newPassword: {
    __brand: 'InputPasswordField',
    path: ['profilePassword', 'newPassword'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  confirmNewPassword: {
    __brand: 'InputPasswordField',
    path: ['profilePassword', 'confirmNewPassword'] as const,
    type: 'password',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ProfilePasswordForm;

export function fetchSuccessProfilePassword(
  draft: ProfilePasswordForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ProfilePasswordForm, Partial<ProfilePasswordForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetProfilePassword(draft: ProfilePasswordForm): void {
  Object.assign<ProfilePasswordForm, ProfilePasswordForm>(
    draft,
    initialFieldsProfilePassword
  );
}
