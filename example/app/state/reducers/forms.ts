import { createAction, createReducer } from '@reduxjs/toolkit';

import { mergeDeep } from 'utils/object.ts';

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

type FormFields =
  | UiKitForm

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

const initialState = {
  uiKit: initialFieldsUiKit,
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
    .addCase(fetchSuccess, (_draft, action: FetchSuccessAction): void => {
      switch (action.payload.path[0]) {
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
