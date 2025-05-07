import type {
  BaseFields,
  InputTelField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type ProfilePhoneUpdatePhonePayload = {
  phone: string
}

export type ProfilePhonePhoneField = InputTelField<'profilePhone', 'phone'>

export type ProfilePhoneFieldNames = keyof Omit<
  ProfilePhoneFormState,
  'formName' | '__brand'
>

export type ProfilePhoneFormState = {
  __brand: 'ProfilePhoneForm'
  formName: 'profilePhone'

  phone: ProfilePhonePhoneField
}

export type ProfilePhoneForm = BaseFields & ProfilePhoneFormState

export const initialFieldsProfilePhone: ProfilePhoneForm = {
  __brand: 'ProfilePhoneForm',
  formName: 'profilePhone',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],

  // Fields
  phone: {
    __brand: 'InputTelField',
    path: ['profilePhone', 'phone'] as const,
    type: 'tel',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ProfilePhoneForm;

export function profilePhonePhoneUpdate(
  draft: ProfilePhoneForm,
  payload: ProfilePhoneUpdatePhonePayload
): void {
  draft.phone.value = payload.phone;
}

export function fetchSuccessProfilePhone(
  draft: ProfilePhoneForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ProfilePhoneForm, Partial<ProfilePhoneForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetProfilePhone(draft: ProfilePhoneForm): void {
  Object.assign<ProfilePhoneForm, ProfilePhoneForm>(
    draft,
    initialFieldsProfilePhone
  );
}
