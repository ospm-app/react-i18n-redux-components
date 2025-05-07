import type {
  BaseFields,
  InputTextField,
  InputEmailField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';
import type { UserResponse } from 'app/valibot.ts';

export type ProfilePersonalUpdateFirstNamePayload = {
  firstName: string
  updatedAt: string
}

export type ProfilePersonalUpdateLastNamePayload = {
  lastName: string
  updatedAt: string
}

export type ProfilePersonalEmailField = InputEmailField<
  'profilePersonal',
  'email'
>

export type ProfilePersonalFirstNameField = InputTextField<
  'profilePersonal',
  'firstName'
>
export type ProfilePersonalLastNameField = InputTextField<
  'profilePersonal',
  'lastName'
>

export type ProfilePersonalFormState = {
  __brand: 'ProfilePersonalForm'
  formName: 'profilePersonal'
  email: ProfilePersonalEmailField
  firstName: ProfilePersonalFirstNameField
  lastName: ProfilePersonalLastNameField
}

export type ProfilePersonalForm = BaseFields & ProfilePersonalFormState

export type ProfilePersonalFieldNames = keyof Omit<
  ProfilePersonalFormState,
  'formName' | '__brand'
>

export const initialFieldsProfilePersonal: ProfilePersonalForm = {
  __brand: 'ProfilePersonalForm',
  formName: 'profilePersonal',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],

  // Fields
  email: {
    __brand: 'InputEmailField',
    path: ['profilePersonal', 'email'] as const,
    type: 'email',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  firstName: {
    __brand: 'InputTextField',
    path: ['profilePersonal', 'firstName'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  lastName: {
    __brand: 'InputTextField',
    path: ['profilePersonal', 'lastName'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ProfilePersonalForm;

export function fetchSuccessProfilePersonal(
  draft: ProfilePersonalForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ProfilePersonalForm, Partial<ProfilePersonalForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function profilePersonalFirstNameUpdate(
  draft: ProfilePersonalForm,
  payload: ProfilePersonalUpdateFirstNamePayload
): void {
  draft.firstName.value = payload.firstName;
}

export function profilePersonalLastNameUpdate(
  draft: ProfilePersonalForm,
  payload: ProfilePersonalUpdateLastNamePayload
): void {
  draft.lastName.value = payload.lastName;
}

export function logInProfilePersonal(
  draft: ProfilePersonalForm,
  payload: Pick<UserResponse, 'email' | 'firstName' | 'lastName'>
): void {
  draft.email.value = payload.email;

  draft.firstName.value = payload.firstName;
  draft.lastName.value = payload.lastName;
}

export function resetProfilePersonal(draft: ProfilePersonalForm): void {
  Object.assign<ProfilePersonalForm, ProfilePersonalForm>(
    draft,
    initialFieldsProfilePersonal
  );
}
