import type {
  BaseFields,
  InputTextField,
  FetchSuccessPayload
} from 'state/reducers/forms/types.ts';

export type DashboardUsernameUpdateUsernamePayload = {
  username: string | undefined
}
export type DashboardUsernameUsernameField = InputTextField<
  'dashboardUsername',
  'username'
>

export type DashboardUsernameFieldNames = keyof Omit<
  DashboardUsernameFormState,
  'formName' | '__brand'
>

export type DashboardUsernameFormState = {
  __brand: 'DashboardUsernameForm'
  formName: 'dashboardUsername'

  username: DashboardUsernameUsernameField
}

export type DashboardUsernameForm = BaseFields & DashboardUsernameFormState

export const initialFieldsDashboardUsername: DashboardUsernameForm = {
  __brand: 'DashboardUsernameForm',
  formName: 'dashboardUsername',
  // Request
  isFetching: false,
  success: '',
  intlSuccess: '',
  errors: [],
  intlErrors: [],

  // Fields
  username: {
    __brand: 'InputTextField',
    path: ['dashboardUsername', 'username'] as const,
    type: 'text',
    isTouched: false,
    value: '',
    valid: false,
    invalid: false
  }
} as const satisfies DashboardUsernameForm;

export function dashboardUsernameUsernameUpdate(
  draft: DashboardUsernameForm,
  payload: DashboardUsernameUpdateUsernamePayload
): void {
  draft.username.value = payload.username ?? '';
}

export function fetchSuccessDashboardUsername(
  draft: DashboardUsernameForm,
  { success, intlSuccess }: FetchSuccessPayload
): void {
  Object.assign<DashboardUsernameForm, Partial<DashboardUsernameForm>>(draft, {
    isFetching: false,
    errors: [],
    intlErrors: [],
    success: success ?? '',
    intlSuccess: intlSuccess ?? ''
  });
}

export function resetDashboardUsername(draft: DashboardUsernameForm): void {
  Object.assign<DashboardUsernameForm, DashboardUsernameForm>(
    draft,
    initialFieldsDashboardUsername
  );
}
