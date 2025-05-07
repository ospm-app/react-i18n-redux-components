import type {
  BaseFields,
  InputEmailField,
  FetchSuccessPayload,
  SelectField
} from 'state/reducers/forms/types.ts';

export type InviteOrganizationMemberEmailField = InputEmailField<
  'inviteOrganizationMember',
  'email'
>

export type InviteOrganizationMemberRoleField = SelectField<
  'member' | 'administrator',
  'inviteOrganizationMember',
  'role'
>

type InviteOrganizationMemberFormState = {
  __brand: 'InviteOrganizationMemberForm'
  formName: 'inviteOrganizationMember'
  email: InviteOrganizationMemberEmailField
  role: InviteOrganizationMemberRoleField
}

export type InviteOrganizationMemberForm = BaseFields &
  InviteOrganizationMemberFormState

export type InviteOrganizationMemberFieldNames = keyof Omit<
  InviteOrganizationMemberFormState,
  'formName' | '__brand'
>

export const initialFieldsInviteOrganizationMember: InviteOrganizationMemberForm =
  {
    __brand: 'InviteOrganizationMemberForm',
    formName: 'inviteOrganizationMember',
    // Request
    isFetching: false,
    success: '',
    intlSuccess: '',
    errors: [],
    intlErrors: [],
    // Fields
    email: {
      __brand: 'InputEmailField',
      path: ['inviteOrganizationMember', 'email'] as const,
      type: 'email',
      isTouched: false,
      value: '',
      valid: false,
      invalid: false
    },
    role: {
      __brand: 'SelectField',
      path: ['inviteOrganizationMember', 'role'] as const,
      value: 'member',
      isTouched: false,
      valid: false,
      invalid: false
    }
  } as const satisfies InviteOrganizationMemberForm;

export function fetchSuccessInviteOrganizationMember(
  draft: InviteOrganizationMemberForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<
    InviteOrganizationMemberForm,
    Partial<InviteOrganizationMemberForm>
  >(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetInviteOrganizationMember(
  draft: InviteOrganizationMemberForm
): void {
  Object.assign<
    InviteOrganizationMemberForm,
    Partial<InviteOrganizationMemberForm>
  >(draft, initialFieldsInviteOrganizationMember);
}
