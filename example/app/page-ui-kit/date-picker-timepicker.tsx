import { memo, type ComponentType, useId, type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { InputDatepickerTimepickerWithLabelAndDescription } from 'library/intl/input-datepicker-timepicker-with-label-and-description.tsx';

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
import type { UiKitDatepickerTimepickerField } from 'state/reducers/forms/ui-kit.ts';

type Props = {
  label: IntlMessageId;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  datePickerTimePickerLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  datePickerTimePickerTitle: IntlMessageId;
};

function selector(state: ReduxState): UiKitDatepickerTimepickerField {
  return state.forms.uiKit.datePickerTimePicker;
}

function F_DatePickerTimePickerUiKit({
  label,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  datePickerTimePickerLabel,
  hoursFormatLabel,
  datePickerTimePickerTitle,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const id = useId();

  const field = useAppSelector<UiKitDatepickerTimepickerField>(selector);

  return (
    <div className={calendarStyles.divPaddingClassName}>
      <h2 className={calendarStyles.h2ClassName}>
        {t(datePickerTimePickerTitle)}
      </h2>

      <InputDatepickerTimepickerWithLabelAndDescription<
        'uiKit',
        'datePickerTimePicker'
      >
        min={new Date(2020, 0, 1).valueOf()} // January 1, 2020
        max={new Date(2030, 11, 31).valueOf()} // December 31, 2030
        id={id}
        locale='en'
        label={label}
        field={field}
        divClassName={divClassName}
        name='datepicker-timepicker'
        hiddenClassName={hiddenClassName}
        labelClassName={text.labelClassName}
        daysClassName={calendarStyles.daysClassName}
        inputTouchedClassName={inputTouchedClassName}
        headerClassName={calendarStyles.headerClassName}
        footerClassName={calendarStyles.footerClassName}
        inputUnTouchedClassName={inputUnTouchedClassName}
        daysRowClassName={calendarStyles.daysRowClassName}
        daysColClassName={calendarStyles.daysColClassName}
        inputClassName={calendarStyles.dateInputClassName}
        checkboxClassName={calendarStyles.checkboxClassName}
        daysBodyClassName={calendarStyles.daysBodyClassName}
        containerClassName={calendarStyles.containerClassName}
        daysHeaderClassName={calendarStyles.daysHeaderClassName}
        headerYearClassName={calendarStyles.headerYearClassName}
        daysColOverClassName={calendarStyles.daysColOverClassName}
        emptyButtonClassName={calendarStyles.emptyButtonClassName}
        headerMonthClassName={calendarStyles.headerMonthClassName}
        inputNumberClassName={calendarStyles.inputNumberClassName}
        inputTimeFormatClassName={calendarStyles.inputTimeFormatClassName}
        headerButtonClassName={calendarStyles.headerButtonClassName}
        calendarLabelClassName={calendarStyles.calendarLabelClassName}
        selectOptionsClassName={calendarStyles.selectOptionsClassName}
        footerWrapperClassName={calendarStyles.footerWrapperClassName}
        daysColCurrentClassName={calendarStyles.daysColCurrentClassName}
        calendarCheckerClassName={calendarStyles.calendarCheckerClassName}
        daysColSelectedClassName={calendarStyles.daysColSelectedClassName}
        headerButtonIconClassName={calendarStyles.headerButtonIconClassName}
        timeInputWrapperClassName={calendarStyles.timeInputWrapperClassName}
        timeSectionWrapperClassName={calendarStyles.timeSectionWrapperClassName}
        checkboxMarkerContainerClassName={
          calendarStyles.checkboxMarkerContainerClassName
        }
        inputContainerClassName={calendarStyles.inputContainerClassName}
        calendarContainerClassName={calendarStyles.calendarContainerClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        hoursFormatLabel={hoursFormatLabel}
        datePickerTimePickerLabel={datePickerTimePickerLabel}
      />
    </div>
  );
}

export const DatePickerTimePickerUiKit: ComponentType<Props> = memo<Props>(
  F_DatePickerTimePickerUiKit
);
