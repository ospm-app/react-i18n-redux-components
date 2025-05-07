import type {
  BaseFields,
  InputTextField,
  InputEmailField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type CreateOrganizationNameField = InputTextField<
  'createOrganization',
  'name'
>
export type CreateOrganizationEmailField = InputEmailField<
  'createOrganization',
  'email'
>
export type CreateOrganizationSlugField = InputTextField<
  'createOrganization',
  'slug'
>

export type CreateOrganizationDescriptionField = InputTextField<
  'createOrganization',
  'description'
>

type CreateOrganizationFormState = {
  __brand: 'CreateOrganizationForm'
  formName: 'createOrganization'
  name: CreateOrganizationNameField
  slug: CreateOrganizationSlugField
  email: CreateOrganizationEmailField
  description: CreateOrganizationDescriptionField
}

export type CreateOrganizationForm = BaseFields & CreateOrganizationFormState

export type CreateOrganizationFieldNames = keyof Omit<
  CreateOrganizationFormState,
  'formName' | '__brand'
>

export const initialFieldsCreateOrganization: CreateOrganizationForm = {
  __brand: 'CreateOrganizationForm',
  formName: 'createOrganization',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  name: {
    __brand: 'InputTextField',
    path: ['createOrganization', 'name'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  email: {
    __brand: 'InputEmailField',
    path: ['createOrganization', 'email'] as const,
    type: 'email',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  slug: {
    __brand: 'InputTextField',
    path: ['createOrganization', 'slug'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  description: {
    __brand: 'InputTextField',
    path: ['createOrganization', 'description'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies CreateOrganizationForm;

export function fetchSuccessCreateOrganization(
  draft: CreateOrganizationForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<CreateOrganizationForm, Partial<CreateOrganizationForm>>(
    draft,
    {
      isFetching: false,
      errors: [],
      intlErrors: [],
      success: success ?? '',
      intlSuccess: intlSuccess ?? ''
    }
  );
}

export function resetCreateOrganization(draft: CreateOrganizationForm): void {
  Object.assign<CreateOrganizationForm, Partial<CreateOrganizationForm>>(
    draft,
    initialFieldsCreateOrganization
  );
}
