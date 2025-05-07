import type {
  BaseFields,
  SelectField,
  InputTextField,
  InputCheckboxField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';
import type { Flags } from 'app/valibot.ts';

export type ProfileDetailsIsVerifiedField = InputCheckboxField<
  'profileDetails',
  'isVerified'
>

export type ProfileDetailsEnable2faField = InputCheckboxField<
  'profileDetails',
  'enable2fa'
>

export type ProfileDetailsGithubAccountSyncField = InputCheckboxField<
  'profileDetails',
  'githubAccountSync'
>

export type ProfileDetailsAccountLastUsedField = InputTextField<
  'profileDetails',
  'accountLastUsed'
>
export type ProfileDetailsCreatedAtField = InputTextField<
  'profileDetails',
  'createdAt'
>
export type ProfileDetailsUpdatedAtField = InputTextField<
  'profileDetails',
  'updatedAt'
>

export type ProfileDetailsCountryField = SelectField<
  Flags | '',
  'profileDetails',
  'country'
>

export type ProfileDetailsFieldNames = keyof Omit<
  ProfileDetailsFormState,
  'formName' | '__brand'
>

export type ProfileDetailsFormState = {
  __brand: 'ProfileDetailsForm'
  formName: 'profileDetails'
  isVerified: ProfileDetailsIsVerifiedField
  enable2fa: ProfileDetailsEnable2faField
  githubAccountSync: ProfileDetailsGithubAccountSyncField
  accountLastUsed: ProfileDetailsAccountLastUsedField
  createdAt: ProfileDetailsCreatedAtField
  updatedAt: ProfileDetailsUpdatedAtField
}

export type ProfileDetailsForm = BaseFields & ProfileDetailsFormState

export const initialFieldsProfileDetails: ProfileDetailsForm = {
  __brand: 'ProfileDetailsForm',
  formName: 'profileDetails',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],

  // Fields
  isVerified: {
    __brand: 'InputCheckboxField',
    path: ['profileDetails', 'isVerified'] as const,
    isTouched: false,
    checked: false,
    valid: false,
    invalid: false
  },
  enable2fa: {
    __brand: 'InputCheckboxField',
    path: ['profileDetails', 'enable2fa'] as const,
    isTouched: false,
    checked: false,
    valid: false,
    invalid: false
  },
  githubAccountSync: {
    __brand: 'InputCheckboxField',
    path: ['profileDetails', 'githubAccountSync'] as const,
    isTouched: false,
    checked: false,
    valid: false,
    invalid: false
  },
  accountLastUsed: {
    __brand: 'InputTextField',
    path: ['profileDetails', 'accountLastUsed'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  createdAt: {
    __brand: 'InputTextField',
    path: ['profileDetails', 'createdAt'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  updatedAt: {
    __brand: 'InputTextField',
    path: ['profileDetails', 'updatedAt'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ProfileDetailsForm;

export function fetchSuccessProfileDetails(
  draft: ProfileDetailsForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ProfileDetailsForm, Partial<ProfileDetailsForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetProfileDetails(draft: ProfileDetailsForm): void {
  Object.assign<ProfileDetailsForm, ProfileDetailsForm>(
    draft,
    initialFieldsProfileDetails
  );
}
