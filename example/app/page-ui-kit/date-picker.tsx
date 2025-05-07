import { memo, type ComponentType, type JSX, useId } from 'react';
import { useTranslation } from 'react-i18next';

import { InputDatepickerWithLabelAndDescription } from 'library/intl/input-datepicker-with-label-and-description.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import {
  text,
  divClassName,
  calendarStyles,
  hiddenClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
} from 'styles/styles.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitDatepickerField } from 'state/reducers/forms/ui-kit.ts';

type Props = {
  label: IntlMessageId;
  datePickerTitle: IntlMessageId;
};

function selector(state: ReduxState): UiKitDatepickerField {
  return state.forms.uiKit.datePicker;
}

function F_Datepicker({ label, datePickerTitle }: Props): JSX.Element {
  const { t } = useTranslation();

  const id = useId();

  const field = useAppSelector<UiKitDatepickerField>(selector);

  return (
    <div className={calendarStyles.divPaddingClassName}>
      <h2 className={calendarStyles.h2ClassName}>{t(datePickerTitle)}</h2>

      <InputDatepickerWithLabelAndDescription<'uiKit', 'datePicker'>
        min={new Date(2020, 0, 1).valueOf()} // January 1, 2020
        max={new Date(2030, 11, 31).valueOf()} // December 31, 2030
        id={id}
        locale='en'
        label={label}
        field={field}
        name='datepicker'
        divClassName={divClassName}
        hiddenClassName={hiddenClassName}
        labelClassName={text.labelClassName}
        daysClassName={calendarStyles.daysClassName}
        inputTouchedClassName={inputTouchedClassName}
        headerClassName={calendarStyles.headerClassName}
        inputUnTouchedClassName={inputUnTouchedClassName}
        daysRowClassName={calendarStyles.daysRowClassName}
        daysColClassName={calendarStyles.daysColClassName}
        inputClassName={calendarStyles.dateInputClassName}
        daysBodyClassName={calendarStyles.daysBodyClassName}
        containerClassName={calendarStyles.containerClassName}
        daysHeaderClassName={calendarStyles.daysHeaderClassName}
        headerYearClassName={calendarStyles.headerYearClassName}
        daysColOverClassName={calendarStyles.daysColOverClassName}
        emptyButtonClassName={calendarStyles.emptyButtonClassName}
        headerMonthClassName={calendarStyles.headerMonthClassName}
        headerButtonClassName={calendarStyles.headerButtonClassName}
        daysColCurrentClassName={calendarStyles.daysColCurrentClassName}
        daysColSelectedClassName={calendarStyles.daysColSelectedClassName}
        headerButtonIconClassName={calendarStyles.headerButtonIconClassName}
        inputContainerClassName={calendarStyles.inputContainerClassName}
        calendarContainerClassName={calendarStyles.calendarContainerClassName}
        calendarAnimationClassName={calendarStyles.calendarAnimationClassName}
      />
    </div>
  );
}

export const DatepickerUiKit: ComponentType<Props> = memo<Props>(F_Datepicker);
