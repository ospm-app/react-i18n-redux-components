import type {
  BaseFields,
  InputTextField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type ProfileUsernameUpdateUsernamePayload = {
  username: string | undefined
}
export type ProfileUsernameUsernameField = InputTextField<
  'profileUsername',
  'username'
>

export type ProfileUsernameFieldNames = keyof Omit<
  ProfileUsernameFormState,
  'formName' | '__brand'
>

export type ProfileUsernameFormState = {
  __brand: 'ProfileUsernameForm'
  formName: 'profileUsername'

  username: ProfileUsernameUsernameField
}

export type ProfileUsernameForm = BaseFields & ProfileUsernameFormState

export const initialFieldsProfileUsername: ProfileUsernameForm = {
  __brand: 'ProfileUsernameForm',
  formName: 'profileUsername',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],

  // Fields
  username: {
    __brand: 'InputTextField',
    path: ['profileUsername', 'username'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ProfileUsernameForm;

export function profileUsernameUsernameUpdate(
  draft: ProfileUsernameForm,
  payload: ProfileUsernameUpdateUsernamePayload
): void {
  draft.username.value = payload.username ?? '';
}

export function fetchSuccessProfileUsername(
  draft: ProfileUsernameForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ProfileUsernameForm, Partial<ProfileUsernameForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetProfileUsername(draft: ProfileUsernameForm): void {
  Object.assign<ProfileUsernameForm, ProfileUsernameForm>(
    draft,
    initialFieldsProfileUsername
  );
}
