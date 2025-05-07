import { createAction, createReducer } from '@reduxjs/toolkit';

import { mergeDeep } from 'utils/object.ts';

import type {
  Flags,
  UserResponse,
  CreateOrganizationResponse
} from 'app/valibot.ts';

import {
  resetContact,
  type ContactForm,
  fetchSuccessContact,
  initialFieldsContact,
  type ContactFieldNames
} from 'state/reducers/forms/contact.ts';
import {
  resetForgot,
  type ForgotForm,
  fetchSuccessForgot,
  initialFieldsForgot,
  type ForgotFieldNames
} from 'state/reducers/forms/forgot.ts';
import {
  resetLogIn,
  type LogInForm,
  fetchSuccessLogIn,
  initialFieldsLogIn,
  type LogInFieldNames
} from 'state/reducers/forms/log-in.ts';
import {
  resetProfilePassword,
  type ProfilePasswordForm,
  fetchSuccessProfilePassword,
  initialFieldsProfilePassword,
  type ProfilePasswordFieldNames
} from 'state/reducers/forms/profile-password.ts';
import {
  logInProfilePersonal,
  resetProfilePersonal,
  type ProfilePersonalForm,
  fetchSuccessProfilePersonal,
  initialFieldsProfilePersonal,
  profilePersonalLastNameUpdate,
  type ProfilePersonalFieldNames,
  profilePersonalFirstNameUpdate,
  type ProfilePersonalUpdateLastNamePayload,
  type ProfilePersonalUpdateFirstNamePayload
} from 'state/reducers/forms/profile-personal.ts';
import {
  resetProfileDetails,
  type ProfileDetailsForm,
  fetchSuccessProfileDetails,
  initialFieldsProfileDetails,
  type ProfileDetailsFieldNames
} from 'state/reducers/forms/profile-details.ts';
import {
  resetReset,
  type ResetForm,
  fetchSuccessReset,
  initialFieldsReset,
  type ResetFieldNames
} from 'state/reducers/forms/reset.ts';
import {
  resetSignUpWithGithubSuccess,
  type SignUpWithGithubSuccessForm,
  fetchSuccessSignUpWithGithubSuccess,
  initialFieldsSignUpWithGithubSuccess,
  type SignUpWithGithubSuccessFieldNames
} from 'state/reducers/forms/sign-up-with-github-success.ts';
import {
  resetSignUp,
  type SignUpForm,
  fetchSuccessSignUp,
  initialFieldsSignUp,
  type SignUpFieldNames
} from 'state/reducers/forms/sign-up.ts';
import type {
  SetInPayload,
  ValidatePayload,
  ChangeInputPayload,
  FetchRequestPayload,
  FetchSuccessPayload,
  FetchFailurePayload,
  ChangeSelectPayload,
  FetchCompletePayload,
  ChangeCheckboxPayload,
  ChangeTimezonePayload,
  ChangeRadioGroupPayload,
  ChangeDatePickerInputPayload,
  ValidateRangePickerStartPayload,
  ValidateEndRangePickerEndPayload,
  ChangeRangePickerEndInputPayload,
  ChangeRangePickerStartInputPayload,
  ValidateRangePickerTimePickerStartPayload,
  ChangeDatePickerTimePickerInputDatePayload,
  ValidateEndRangePickerTimePickerEndPayload,
  ChangeDatePickerTimePickerInputHoursPayload,
  ChangeDatePickerTimePickerInputMinutesPayload,
  ChangeRangePickerTimePickerEndInputDatePayload,
  ChangeRangePickerTimePickerEndInputHoursPayload,
  ChangeRangePickerTimepickerStartInputDatePayload,
  ChangeRangePickerTimePickerCheckboxSelectPayload,
  ChangeDatePickerTimePickerSelectTimeFormatPayload,
  ChangeRangePickerTimePickerStartInputHoursPayload,
  ChangeRangePickerTimePickerEndInputMinutesPayload,
  ChangeRangePickerTimePickerStartInputMinutesPayload,
  ChangeRangePickerTimePickerEndInputTimeFormatPayload,
  ChangeRangePickerTimePickerStartInputTimeFormatPayload,
  ChangeRangePickerTimePicker24hFormatCheckboxSelectPayload
} from 'state/reducers/forms/types.ts';
import {
  type UiKitForm,
  initialFieldsUiKit,
  type UiKitFieldNames
} from 'state/reducers/forms/ui-kit.ts';
import {
  resetProfileCountry,
  type ProfileCountryForm,
  fetchSuccessProfileCountry,
  initialFieldsProfileCountry,
  profileCountryCountryUpdate,
  type ProfileCountryFieldNames,
  type ProfileCountryUpdateCountryPayload
} from 'state/reducers/forms/profile-country.ts';
import {
  resetProfilePhone,
  type ProfilePhoneForm,
  profilePhonePhoneUpdate,
  fetchSuccessProfilePhone,
  initialFieldsProfilePhone,
  type ProfilePhoneFieldNames,
  type ProfilePhoneUpdatePhonePayload
} from 'state/reducers/forms/profile-phone.ts';
import {
  resetProfileUsername,
  type ProfileUsernameForm,
  fetchSuccessProfileUsername,
  initialFieldsProfileUsername,
  profileUsernameUsernameUpdate,
  type ProfileUsernameFieldNames,
  type ProfileUsernameUpdateUsernamePayload
} from 'state/reducers/forms/profile-username.ts';
import {
  resetCreateOrganization,
  type CreateOrganizationForm,
  fetchSuccessCreateOrganization,
  initialFieldsCreateOrganization,
  type CreateOrganizationFieldNames
} from 'state/reducers/forms/create-organization.ts';
import {
  resetDashboardUsername,
  type DashboardUsernameForm,
  fetchSuccessDashboardUsername,
  initialFieldsDashboardUsername,
  type DashboardUsernameFieldNames
} from 'state/reducers/forms/dashboard-username.ts';
import {
  resetInviteOrganizationMember,
  type InviteOrganizationMemberForm,
  fetchSuccessInviteOrganizationMember,
  initialFieldsInviteOrganizationMember,
  type InviteOrganizationMemberFieldNames
} from 'state/reducers/forms/invite-organization-member.ts';

function getFormField<F extends FormFields>(
  form: F,
  fieldName: F extends { __brand: string; formName: string }
    ? keyof Omit<
        F,
        | '__brand'
        | 'formName'
        | 'isFetching'
        | 'success'
        | 'intlSuccess'
        | 'errors'
        | 'intlErrors'
      >
    : never
): F[keyof F] {
  return form[fieldName];
}

export type FieldNames =
  | UiKitFieldNames
  | ContactFieldNames
  | LogInFieldNames
  | SignUpFieldNames
  | SignUpWithGithubSuccessFieldNames
  | ForgotFieldNames
  | ResetFieldNames
  | ContactFieldNames
  | ProfilePasswordFieldNames
  | ProfilePersonalFieldNames
  | ProfileDetailsFieldNames
  | ProfileUsernameFieldNames
  | ProfilePhoneFieldNames
  | ProfileCountryFieldNames
  | CreateOrganizationFieldNames
  | DashboardUsernameFieldNames
  | InviteOrganizationMemberFieldNames

type FormFields =
  | UiKitForm
  | ContactForm
  | LogInForm
  | SignUpForm
  | SignUpWithGithubSuccessForm
  | ForgotForm
  | ResetForm
  | ContactForm
  | ProfilePasswordForm
  | ProfilePersonalForm
  | ProfileDetailsForm
  | ProfileUsernameForm
  | ProfilePhoneForm
  | ProfileCountryForm
  | CreateOrganizationForm
  | DashboardUsernameForm
  | InviteOrganizationMemberForm

export const logIn = createAction<
  Omit<UserResponse, 'success' | 'visitorId' | 'interactionId'>,
  'logIn'
>('logIn');
type LogInAction = ReturnType<typeof logIn>

export const logOut = createAction<undefined, 'logOut'>('logOut');
type LogOutAction = ReturnType<typeof logOut>

export const fetchRequest = createAction<FetchRequestPayload, 'fetchRequest'>(
  'fetchRequest'
);
type FetchRequestAction = ReturnType<typeof fetchRequest>

export const fetchSuccess = createAction<FetchSuccessPayload, 'fetchSuccess'>(
  'fetchSuccess'
);
type FetchSuccessAction = ReturnType<typeof fetchSuccess>

export const fetchFailure = createAction<FetchFailurePayload, 'fetchFailure'>(
  'fetchFailure'
);
type FetchFailureAction = ReturnType<typeof fetchFailure>

export const fetchComplete = createAction<
  FetchCompletePayload,
  'fetchComplete'
>('fetchComplete');
type FetchCompleteAction = ReturnType<typeof fetchComplete>

// Profile

export type ProfileValuesPayload = {
  firstName: string
  lastName: string
  username: string
  email: string
  enable2fa: boolean
  isVerified: boolean
  country: Flags | ''
  phone: string
  githubAccountSync: boolean
  accountLastUsed?: string | undefined
  createdAt: string
  updatedAt: string
}

export const updateProfileValues = createAction<
  ProfileValuesPayload,
  'updateProfileValues'
>('updateProfileValues');
type UpdateProfileValuesAction = ReturnType<typeof updateProfileValues>

export const profilePersonalUpdateFirstName = createAction<
  ProfilePersonalUpdateFirstNamePayload,
  'profilePersonalUpdateFirstName'
>('profilePersonalUpdateFirstName');
type ProfilePersonalUpdateFirstNameAction = ReturnType<
  typeof profilePersonalUpdateFirstName
>

export const profilePersonalUpdateLastName = createAction<
  ProfilePersonalUpdateLastNamePayload,
  'profilePersonalUpdateLastName'
>('profilePersonalUpdateLastName');

type ProfilePersonalUpdateLastNameAction = ReturnType<
  typeof profilePersonalUpdateLastName
>

export const profileUsernameUpdateUsername = createAction<
  ProfileUsernameUpdateUsernamePayload,
  'profileUsernameUpdateUsername'
>('profileUsernameUpdateUsername');

type ProfileUsernameUpdateUsernameAction = ReturnType<
  typeof profileUsernameUpdateUsername
>

export const profilePhoneUpdatePhone = createAction<
  ProfilePhoneUpdatePhonePayload,
  'profilePhoneUpdatePhone'
>('profilePhoneUpdatePhone');

type ProfilePhoneUpdatePhoneAction = ReturnType<typeof profilePhoneUpdatePhone>

export const profileCountryUpdateCountry = createAction<
  ProfileCountryUpdateCountryPayload,
  'profileCountryUpdateCountry'
>('profileCountryUpdateCountry');

type ProfileCountryUpdateCountryAction = ReturnType<
  typeof profileCountryUpdateCountry
>

// Library

export const setIn = createAction<SetInPayload, 'setIn'>('setIn');
type SetInAction = ReturnType<typeof setIn>

export const changeSelect = createAction<ChangeSelectPayload, 'changeSelect'>(
  'changeSelect'
);
type ChangeSelectAction = ReturnType<typeof changeSelect>

export const changeInput = createAction<ChangeInputPayload, 'changeInput'>(
  'changeInput'
);
type ChangeInputAction = ReturnType<typeof changeInput>

export const changeCheckbox = createAction<
  ChangeCheckboxPayload,
  'changeCheckbox'
>('changeCheckbox');
type ChangeCheckboxAction = ReturnType<typeof changeCheckbox>

export const changeRadioGroup = createAction<
  ChangeRadioGroupPayload,
  'changeRadioGroup'
>('changeRadioGroup');

type ChangeRadioGroupAction = ReturnType<typeof changeRadioGroup>

export const changeDatePickerInput = createAction<
  ChangeDatePickerInputPayload,
  'changeDatePickerInput'
>('changeDatePickerInput');

type ChangeDatePickerInputAction = ReturnType<typeof changeDatePickerInput>

export const changeDatePickerTimePickerDateInput = createAction<
  ChangeDatePickerTimePickerInputDatePayload,
  'changeDatePickerTimePickerDateInput'
>('changeDatePickerTimePickerDateInput');

type ChangeDatePickerTimePickerInputDateAction = ReturnType<
  typeof changeDatePickerTimePickerDateInput
>

export const changeDatePickerTimePickerHoursInput = createAction<
  ChangeDatePickerTimePickerInputHoursPayload,
  'changeDatePickerTimePickerHoursInput'
>('changeDatePickerTimePickerHoursInput');

type ChangeDatePickerTimePickerInputHoursAction = ReturnType<
  typeof changeDatePickerTimePickerHoursInput
>

export const changeDatePickerTimePickerMinutesInput = createAction<
  ChangeDatePickerTimePickerInputMinutesPayload,
  'changeDatePickerTimePickerMinutesInput'
>('changeDatePickerTimePickerMinutesInput');

type ChangeDatePickerTimePickerInputMinutesAction = ReturnType<
  typeof changeDatePickerTimePickerMinutesInput
>

export const changeDatePickerTimePickerTimeFormatSelect = createAction<
  ChangeDatePickerTimePickerSelectTimeFormatPayload,
  'changeDatePickerTimePickerTimeFormatSelect'
>('changeDatePickerTimePickerTimeFormatSelect');

type ChangeDatePickerTimePickerSelectTimeFormatAction = ReturnType<
  typeof changeDatePickerTimePickerTimeFormatSelect
>

export const changeRangePickerStartInput = createAction<
  ChangeRangePickerStartInputPayload,
  'changeRangePickerStartInput'
>('changeRangePickerStartInput');
type ChangeRangePickerStartInputAction = ReturnType<
  typeof changeRangePickerStartInput
>

export const changeRangePickerEndInput = createAction<
  ChangeRangePickerEndInputPayload,
  'changeRangePickerEndInput'
>('changeRangePickerEndInput');
type ChangeRangePickerEndInputAction = ReturnType<
  typeof changeRangePickerEndInput
>

export const changeRangePickerTimePickerStartDateInput = createAction<
  ChangeRangePickerTimepickerStartInputDatePayload,
  'changeRangePickerTimePickerStartDateInput'
>('changeRangePickerTimePickerStartDateInput');
type ChangeRangePickerTimePickerStartInputDateAction = ReturnType<
  typeof changeRangePickerTimePickerStartDateInput
>

export const changeRangePickerTimePickerStartHoursInput = createAction<
  ChangeRangePickerTimePickerStartInputHoursPayload,
  'changeRangePickerTimePickerStartHoursInput'
>('changeRangePickerTimePickerStartHoursInput');
type ChangeRangePickerTimePickerStartInputHoursAction = ReturnType<
  typeof changeRangePickerTimePickerStartHoursInput
>

export const changeRangePickerTimePickerStartMinutesInput = createAction<
  ChangeRangePickerTimePickerStartInputMinutesPayload,
  'changeRangePickerTimePickerStartMinutesInput'
>('changeRangePickerTimePickerStartMinutesInput');
type ChangeRangePickerTimePickerStartInputMinutesAction = ReturnType<
  typeof changeRangePickerTimePickerStartMinutesInput
>

export const changeRangePickerTimePickerStartTimeFormatInput = createAction<
  ChangeRangePickerTimePickerStartInputTimeFormatPayload,
  'changeRangePickerTimePickerStartTimeFormatInput'
>('changeRangePickerTimePickerStartTimeFormatInput');
type ChangeRangePickerTimePickerStartInputTimeFormatAction = ReturnType<
  typeof changeRangePickerTimePickerStartTimeFormatInput
>

export const changeRangePickerTimePickerEndDateInput = createAction<
  ChangeRangePickerTimePickerEndInputDatePayload,
  'changeRangePickerTimePickerEndDateInput'
>('changeRangePickerTimePickerEndDateInput');
type ChangeRangePickerTimePickerEndInputDateAction = ReturnType<
  typeof changeRangePickerTimePickerEndDateInput
>

export const changeRangePickerTimePickerEndHoursInput = createAction<
  ChangeRangePickerTimePickerEndInputHoursPayload,
  'changeRangePickerTimePickerEndHoursInput'
>('changeRangePickerTimePickerEndHoursInput');
type ChangeRangePickerTimePickerEndInputHoursAction = ReturnType<
  typeof changeRangePickerTimePickerEndHoursInput
>

export const changeRangePickerTimePickerEndMinutesInput = createAction<
  ChangeRangePickerTimePickerEndInputMinutesPayload,
  'changeRangePickerTimePickerEndMinutesInput'
>('changeRangePickerTimePickerEndMinutesInput');
type ChangeRangePickerTimePickerEndInputMinutesAction = ReturnType<
  typeof changeRangePickerTimePickerEndMinutesInput
>

export const changeRangePickerTimePickerEndTimeFormatInput = createAction<
  ChangeRangePickerTimePickerEndInputTimeFormatPayload,
  'changeRangePickerTimePickerEndTimeFormatInput'
>('changeRangePickerTimePickerEndTimeFormatInput');
type ChangeRangePickerTimePickerEndInputTimeFormatAction = ReturnType<
  typeof changeRangePickerTimePickerEndTimeFormatInput
>

export const changeRangePickerTimePickerCheckboxSelect = createAction<
  ChangeRangePickerTimePickerCheckboxSelectPayload,
  'changeRangePickerTimePickerCheckboxSelect'
>('changeRangePickerTimePickerCheckboxSelect');

type ChangeRangePickerTimePickerSelectCheckboxAction = ReturnType<
  typeof changeRangePickerTimePickerCheckboxSelect
>

export const changeRangePickerTimePicker24hCheckboxSelect = createAction<
  ChangeRangePickerTimePicker24hFormatCheckboxSelectPayload,
  'changeRangePickerTimePicker24hCheckboxSelect'
>('changeRangePickerTimePicker24hCheckboxSelect');

type ChangeRangePickerTimePickerSelect24hCheckboxAction = ReturnType<
  typeof changeRangePickerTimePicker24hCheckboxSelect
>

export const selectTimezone = createAction<
  ChangeTimezonePayload,
  'selectTimezone'
>('selectTimezone');
type SelectTimezoneAction = ReturnType<typeof selectTimezone>

// Library Validation

export const validateInput = createAction<ValidatePayload, 'validateInput'>(
  'validateInput'
);
type ValidateInputAction = ReturnType<typeof validateInput>

export const validateDatePickerInput = createAction<
  ValidatePayload,
  'validateDatePickerInput'
>('validateDatePickerInput');
type ValidateDatePickerAction = ReturnType<typeof validateDatePickerInput>

export const validateDatePickerTimePickerInput = createAction<
  ValidatePayload,
  'validateDatePickerTimePickerInput'
>('validateDatePickerTimePickerInput');
type ValidateDatePickerTimePickerAction = ReturnType<
  typeof validateDatePickerTimePickerInput
>

export const validateRangePickerStartInput = createAction<
  ValidateRangePickerStartPayload,
  'validateRangePickerStartInput'
>('validateRangePickerStartInput');
type ValidateRangePickerInputStartAction = ReturnType<
  typeof validateRangePickerStartInput
>

export const validateRangePickerEndInput = createAction<
  ValidateEndRangePickerEndPayload,
  'validateRangePickerEndInput'
>('validateRangePickerEndInput');
type ValidateRangePickerInputEndAction = ReturnType<
  typeof validateRangePickerEndInput
>

export const validateRangePickerTimepickerStartInput = createAction<
  ValidateRangePickerTimePickerStartPayload,
  'validateRangePickerTimepickerStartInput'
>('validateRangePickerTimepickerStartInput');
type ValidateRangePickerTimepickerInputStartAction = ReturnType<
  typeof validateRangePickerTimepickerStartInput
>

export const validateRangePickerTimepickerEndInput = createAction<
  ValidateEndRangePickerTimePickerEndPayload,
  'validateRangePickerTimepickerEndInput'
>('validateRangePickerTimepickerEndInput');
type ValidateRangePickerTimepickerInputEndAction = ReturnType<
  typeof validateRangePickerTimepickerEndInput
>

// Organization

export const createOrganization = createAction<
  Omit<CreateOrganizationResponse, 'success' | 'visitorId' | 'interactionId'>,
  'createOrganization'
>('createOrganization');

const initialState = {
  uiKit: initialFieldsUiKit,
  forgot: initialFieldsForgot,
  signUp: initialFieldsSignUp,
  logIn: initialFieldsLogIn,
  reset: initialFieldsReset,
  contact: initialFieldsContact,
  profileDetails: initialFieldsProfileDetails,
  profilePassword: initialFieldsProfilePassword,
  profilePersonal: initialFieldsProfilePersonal,
  profileUsername: initialFieldsProfileUsername,
  profilePhone: initialFieldsProfilePhone,
  profileCountry: initialFieldsProfileCountry,
  signUpWithGithubSuccess: initialFieldsSignUpWithGithubSuccess,
  createOrganization: initialFieldsCreateOrganization,
  dashboardUsername: initialFieldsDashboardUsername,
  inviteOrganizationMember: initialFieldsInviteOrganizationMember
} as const;

export type FormsState = typeof initialState

export type FormNames = keyof FormsState

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setIn, (draft, action: SetInAction): void => {
      const { success, intlSuccess } = action.payload;

      const formName = action.payload.path[0];

      const field = draft[formName];

      mergeDeep(field, {
        success,
        intlSuccess
      });
    })
    .addCase(logIn, (draft, action: LogInAction): void => {
      logInProfilePersonal(draft.profilePersonal, action.payload);

      resetLogIn(draft.logIn);
    })

    .addCase(logOut, (draft, _action: LogOutAction): void => {
      resetLogIn(draft.logIn);
      resetReset(draft.reset);
      resetForgot(draft.forgot);
      resetSignUp(draft.signUp);
      resetContact(draft.contact);
      resetProfilePhone(draft.profilePhone);
      resetProfileDetails(draft.profileDetails);
      resetProfileCountry(draft.profileCountry);
      resetProfilePassword(draft.profilePassword);
      resetProfilePersonal(draft.profilePersonal);
      resetProfileUsername(draft.profileUsername);
      resetDashboardUsername(draft.dashboardUsername);
      resetCreateOrganization(draft.createOrganization);
      resetSignUpWithGithubSuccess(draft.signUpWithGithubSuccess);
      resetInviteOrganizationMember(draft.inviteOrganizationMember);
    })
    .addCase(
      changeInput,
      (draft: FormsState, action: ChangeInputAction): void => {
        const { value, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            value,
            valid,
            invalid
          });
        }
      }
    )
    .addCase(
      changeSelect,
      (draft: FormsState, action: ChangeSelectAction): void => {
        const { value, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            value,
            valid,
            invalid
          });
        }
      }
    )
    .addCase(
      changeDatePickerInput,
      (draft: FormsState, action: ChangeDatePickerInputAction): void => {
        const { value, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            value,
            valid,
            invalid
          });
        }
      }
    )
    .addCase(
      changeDatePickerTimePickerDateInput,
      (
        draft: FormsState,
        action: ChangeDatePickerTimePickerInputDateAction
      ): void => {
        const { dateValue, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, { dateValue, valid, invalid });
        }
      }
    )

    .addCase(
      changeDatePickerTimePickerHoursInput,
      (
        draft: FormsState,
        action: ChangeDatePickerTimePickerInputHoursAction
      ): void => {
        const { hours } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, { hours });
        }
      }
    )

    .addCase(
      changeDatePickerTimePickerMinutesInput,
      (
        draft: FormsState,
        action: ChangeDatePickerTimePickerInputMinutesAction
      ): void => {
        const { minutes } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, { minutes });
        }
      }
    )

    .addCase(
      changeDatePickerTimePickerTimeFormatSelect,
      (
        draft: FormsState,
        action: ChangeDatePickerTimePickerSelectTimeFormatAction
      ): void => {
        const { timeFormat } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, { timeFormat });
        }
      }
    )

    .addCase(
      changeRangePickerStartInput,
      (draft: FormsState, action: ChangeRangePickerStartInputAction): void => {
        const { startValue, startInvalid, startValid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            startValue,
            startValid,
            startInvalid
          });
        }
      }
    )
    .addCase(
      changeRangePickerEndInput,
      (draft: FormsState, action: ChangeRangePickerEndInputAction): void => {
        const { endValue, endInvalid, endValid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            endValue,
            endValid,
            endInvalid
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerStartDateInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerStartInputDateAction
      ): void => {
        const { startValue, startValid, startInvalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            startValue,
            startValid,
            startInvalid
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerStartHoursInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerStartInputHoursAction
      ): void => {
        const { startHoursValue } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            startHoursValue
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerStartMinutesInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerStartInputMinutesAction
      ): void => {
        const { startMinutesValue } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            startMinutesValue
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerStartTimeFormatInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerStartInputTimeFormatAction
      ): void => {
        const { timeFormat } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            timeFormat
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerEndDateInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerEndInputDateAction
      ): void => {
        const { endValue, endValid, endInvalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            endValue,
            endValid,
            endInvalid
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerEndHoursInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerEndInputHoursAction
      ): void => {
        const { endHoursValue } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            endHoursValue
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerEndMinutesInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerEndInputMinutesAction
      ): void => {
        const { endMinutesValue } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            endMinutesValue
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerEndTimeFormatInput,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerEndInputTimeFormatAction
      ): void => {
        const { timeFormat } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            timeFormat
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePickerCheckboxSelect,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerSelectCheckboxAction
      ): void => {
        const { isTimePicker } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            isTimePicker
          });
        }
      }
    )

    .addCase(
      changeRangePickerTimePicker24hCheckboxSelect,
      (
        draft: FormsState,
        action: ChangeRangePickerTimePickerSelect24hCheckboxAction
      ): void => {
        const { is24hPicker } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            is24hPicker
          });
        }
      }
    )

    .addCase(fetchRequest, (draft, action: FetchRequestAction): void => {
      const formName = action.payload.path[0];

      const reducer = draft[formName];

      defaultFetchRequest(reducer, action.payload);
    })
    .addCase(fetchSuccess, (draft, action: FetchSuccessAction): void => {
      switch (action.payload.path[0]) {
        case 'logIn': {
          fetchSuccessLogIn(draft.logIn, {
            path: ['logIn'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'signUp': {
          fetchSuccessSignUp(draft.signUp, {
            path: ['signUp'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'signUpWithGithubSuccess': {
          fetchSuccessSignUpWithGithubSuccess(draft.signUpWithGithubSuccess, {
            path: ['signUpWithGithubSuccess'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'reset': {
          fetchSuccessReset(draft.reset, {
            path: ['reset'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'forgot': {
          fetchSuccessForgot(draft.forgot, {
            path: ['forgot'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'contact': {
          fetchSuccessContact(draft.contact, {
            path: ['contact'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'profilePassword': {
          fetchSuccessProfilePassword(draft.profilePassword, {
            path: ['profilePassword'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'profilePersonal': {
          fetchSuccessProfilePersonal(draft.profilePersonal, {
            path: ['profilePersonal'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'profileDetails': {
          fetchSuccessProfileDetails(draft.profileDetails, {
            path: ['profileDetails'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'profileUsername': {
          fetchSuccessProfileUsername(draft.profileUsername, {
            path: ['profileUsername'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'profilePhone': {
          fetchSuccessProfilePhone(draft.profilePhone, {
            path: ['profilePhone'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'profileCountry': {
          fetchSuccessProfileCountry(draft.profileCountry, {
            path: ['profileCountry'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'createOrganization': {
          fetchSuccessCreateOrganization(draft.createOrganization, {
            path: ['createOrganization'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'dashboardUsername': {
          fetchSuccessDashboardUsername(draft.dashboardUsername, {
            path: ['dashboardUsername'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        case 'inviteOrganizationMember': {
          fetchSuccessInviteOrganizationMember(draft.inviteOrganizationMember, {
            path: ['inviteOrganizationMember'],
            success: action.payload.success,
            intlSuccess: action.payload.intlSuccess
          });

          break;
        }

        default: {
          break;
        }
      }
    })

    .addCase(fetchFailure, (draft, action: FetchFailureAction): void => {
      const formName = action.payload.path[0];

      const reducer = draft[formName];

      defaultFetchFailure(reducer, action.payload);
    })
    .addCase(fetchComplete, (draft, action: FetchCompleteAction): void => {
      const formName = action.payload.path[0];

      mergeDeep(draft[formName], {
        isFetching: false
      });
    })

    .addCase(
      profilePersonalUpdateFirstName,
      (draft, action: ProfilePersonalUpdateFirstNameAction): void => {
        profilePersonalFirstNameUpdate(draft.profilePersonal, action.payload);
      }
    )

    .addCase(
      profilePersonalUpdateLastName,
      (draft, action: ProfilePersonalUpdateLastNameAction): void => {
        profilePersonalLastNameUpdate(draft.profilePersonal, action.payload);
      }
    )

    .addCase(
      profileUsernameUpdateUsername,
      (draft, action: ProfileUsernameUpdateUsernameAction): void => {
        profileUsernameUsernameUpdate(draft.profileUsername, action.payload);
      }
    )

    .addCase(
      profilePhoneUpdatePhone,
      (draft, action: ProfilePhoneUpdatePhoneAction): void => {
        profilePhonePhoneUpdate(draft.profilePhone, action.payload);
      }
    )

    .addCase(
      profileCountryUpdateCountry,
      (draft, action: ProfileCountryUpdateCountryAction): void => {
        profileCountryCountryUpdate(draft.profileCountry, action.payload);
      }
    )

    .addCase(changeCheckbox, (draft, action: ChangeCheckboxAction): void => {
      const { checked, valid, invalid } = action.payload;

      const formName = action.payload.path[0];
      const fieldName = action.payload.path[1];

      if (typeof fieldName === 'undefined') {
        return;
      }

      const field = getFormField(draft[formName], fieldName);

      mergeDeep(field, {
        checked,
        valid,
        invalid
      });
    })

    .addCase(
      selectTimezone,
      (draft: FormsState, action: SelectTimezoneAction): void => {
        const { selectedTimezone, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName === 'undefined') {
          return;
        }

        const field = getFormField(draft[formName], fieldName);

        mergeDeep(field, {
          selectedTimezone,
          valid,
          invalid
        });
      }
    )

    .addCase(
      changeRadioGroup,
      (draft, action: ChangeRadioGroupAction): void => {
        const { selected, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName === 'undefined') {
          return;
        }

        const field = getFormField(draft[formName], fieldName);

        mergeDeep(field, {
          selected,
          valid,
          invalid
        });
      }
    )
    .addCase(validateInput, (draft, action: ValidateInputAction): void => {
      const { value, valid, invalid } = action.payload;

      const formName = action.payload.path[0];
      const fieldName = action.payload.path[1];

      if (typeof fieldName !== 'undefined') {
        const field = getFormField(draft[formName], fieldName);

        mergeDeep(field, {
          value,
          isTouched: true,
          valid,
          invalid
        });
      }
    })
    .addCase(
      validateDatePickerInput,
      (draft, action: ValidateDatePickerAction): void => {
        const { value, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            value,
            isTouched: true,
            valid,
            invalid
          });
        }
      }
    )
    .addCase(
      validateDatePickerTimePickerInput,
      (draft, action: ValidateDatePickerTimePickerAction): void => {
        const { value, valid, invalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            value,
            isTouched: true,
            valid,
            invalid
          });
        }
      }
    )
    .addCase(
      validateRangePickerStartInput,
      (draft, action: ValidateRangePickerInputStartAction): void => {
        const { startValue, startValid, startInvalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            startValue,
            isTouched: true,
            startValid,
            startInvalid
          });
        }
      }
    )
    .addCase(
      validateRangePickerEndInput,
      (draft, action: ValidateRangePickerInputEndAction): void => {
        const { endValue, endValid, endInvalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            endValue,
            isTouched: true,
            endValid,
            endInvalid
          });
        }
      }
    )
    .addCase(
      validateRangePickerTimepickerStartInput,
      (draft, action: ValidateRangePickerTimepickerInputStartAction): void => {
        const { startValue, startValid, startInvalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            startValue,
            isTouched: true,
            startValid,
            startInvalid
          });
        }
      }
    )
    .addCase(
      validateRangePickerTimepickerEndInput,
      (draft, action: ValidateRangePickerTimepickerInputEndAction): void => {
        const { endValue, endValid, endInvalid } = action.payload;

        const formName = action.payload.path[0];
        const fieldName = action.payload.path[1];

        if (typeof fieldName !== 'undefined') {
          const field = getFormField(draft[formName], fieldName);

          mergeDeep(field, {
            endValue,
            isTouched: true,
            endValid,
            endInvalid
          });
        }
      }
    )

    .addCase(
      updateProfileValues,
      (draft, action: UpdateProfileValuesAction): void => {
        draft.profilePersonal.email.value = action.payload.email;
        draft.profilePersonal.firstName.value = action.payload.firstName;
        draft.profilePersonal.lastName.value = action.payload.lastName;

        draft.profileUsername.username.value = action.payload.username;

        draft.profileCountry.country.value = action.payload.country;

        draft.profilePhone.phone.value = action.payload.phone;

        draft.profileDetails.enable2fa.checked = action.payload.enable2fa;
        draft.profileDetails.isVerified.checked = action.payload.isVerified;
        draft.profileDetails.githubAccountSync.checked =
          action.payload.githubAccountSync;
        draft.profileDetails.accountLastUsed.value =
          action.payload.accountLastUsed ?? '';
        draft.profileDetails.createdAt.value = action.payload.createdAt;
        draft.profileDetails.updatedAt.value = action.payload.updatedAt;
      }
    )

    .addCase(createOrganization, (draft): void => {
      resetCreateOrganization(draft.createOrganization);
    });
});

function defaultFetchRequest(
  draft: FormFields,
  { path: _path }: FetchRequestPayload
): void {
  draft.isFetching = true;

  draft.errors = [];
  draft.intlErrors = [];

  draft.success = '';
  draft.intlSuccess = '';
}

function defaultFetchFailure(
  draft: FormFields,
  { errors, intlErrors }: FetchFailurePayload
): void {
  draft.isFetching = false;

  draft.success = '';
  draft.intlSuccess = '';

  if (Array.isArray(errors)) {
    draft.errors = errors;
  }

  if (Array.isArray(intlErrors)) {
    draft.intlErrors = intlErrors;
  }
}
