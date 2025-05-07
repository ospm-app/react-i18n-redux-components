import type {
  BaseFields,
  SelectField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';
import type { Flags } from 'app/valibot.ts';

export type ProfileCountryUpdateCountryPayload = {
  country: '' | Flags
}

export type ProfileCountryCountryField = SelectField<
  Flags | '',
  'profileCountry',
  'country'
>

export type ProfileCountryFieldNames = keyof Omit<
  ProfileCountryFormState,
  'formName' | '__brand'
>

export type ProfileCountryFormState = {
  __brand: 'ProfileCountryForm'
  formName: 'profileCountry'

  country: ProfileCountryCountryField
}

export type ProfileCountryForm = BaseFields & ProfileCountryFormState

export const initialFieldsProfileCountry: ProfileCountryForm = {
  __brand: 'ProfileCountryForm',
  formName: 'profileCountry',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],

  // Fields
  country: {
    __brand: 'SelectField',
    path: ['profileCountry', 'country'] as const,
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ProfileCountryForm;

export function profileCountryCountryUpdate(
  draft: ProfileCountryForm,
  payload: ProfileCountryUpdateCountryPayload
): void {
  draft.country.value = payload.country;
}

export function fetchSuccessProfileCountry(
  draft: ProfileCountryForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<ProfileCountryForm, Partial<ProfileCountryForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetProfileCountry(draft: ProfileCountryForm): void {
  Object.assign<ProfileCountryForm, ProfileCountryForm>(
    draft,
    initialFieldsProfileCountry
  );
}
