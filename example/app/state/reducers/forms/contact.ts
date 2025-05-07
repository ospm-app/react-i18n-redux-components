import type { IntlMessageId } from 'const/intl/index.ts';
import type {
  BaseFields,
  SelectField,
  InputTelField,
  InputTextField,
  InputEmailField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type ContactEmailField = InputEmailField<'contact', 'email'>
export type ContactPhoneField = InputTelField<'contact', 'phone'>
export type ContactNameField = InputTextField<'contact', 'name'>
export type ContactMessageField = InputTextField<'contact', 'message'>
export type ContactSubjectField = SelectField<
  IntlMessageId | undefined,
  'contact',
  'subject'
>

export type ContactFormState = {
  __brand: 'ContactForm'
  formName: 'contact'
  name: ContactNameField
  email: ContactEmailField
  phone: ContactPhoneField
  message: ContactMessageField
  subject: ContactSubjectField
}

export type ContactForm = BaseFields & ContactFormState

export type ContactFieldNames = keyof Omit<
  ContactFormState,
  'formName' | '__brand'
>

export const initialFieldsContact: ContactForm = {
  __brand: 'ContactForm',
  formName: 'contact',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],
  // Fields
  name: {
    __brand: 'InputTextField',

    path: ['contact', 'name'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  email: {
    __brand: 'InputEmailField',
    path: ['contact', 'email'] as const,
    type: 'email',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  phone: {
    __brand: 'InputTelField',
    path: ['contact', 'phone'] as const,
    type: 'tel',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  },
  subject: {
    __brand: 'SelectField',
    path: ['contact', 'subject'] as const,
    isTouched: false,
    value: undefined,
    valid: false,
    invalid: false
  },
  message: {
    __brand: 'InputTextField',
    path: ['contact', 'message'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies ContactForm;

export function fetchSuccessContact(
  draft: ContactForm,
  payload: FetchSuccessPayload
): void {
  Object.assign<ContactForm, Partial<ContactForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: payload.success ?? '',
    intlSuccess: payload.intlSuccess ?? '' // 'contact.success-message'
  });
}

export function resetContact(draft: ContactForm): void {
  Object.assign<ContactForm, ContactForm>(draft, initialFieldsContact);
}
