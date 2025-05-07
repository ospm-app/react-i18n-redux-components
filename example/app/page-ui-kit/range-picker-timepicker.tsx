import { memo, type ComponentType, useId, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';

import { InputRangePickerTimePickerWithLabelAndDescription } from 'library/intl/input-range-picker-timepicker-with-label-and-description';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import {
  text,
  divClassName,
  calendarStyles,
  hiddenClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
} from 'styles/styles.ts';

import type { IntlMessageId, Locale } from 'const/intl/index.ts';
import type { UiKitRangePickerTimePickerField } from 'state/reducers/forms/ui-kit.ts';

type Props = {
  label: IntlMessageId;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  rangePickerTimePickerLabel: IntlMessageId;
  rangePickerTimePickerTitle: IntlMessageId;
};

function selector(state: ReduxState): UiKitRangePickerTimePickerField {
  return state.forms.uiKit.rangePickerTimePicker;
}

function F_RangePickerTimepicker({
  label,
  amPmLabel,
  hoursLabel,
  minutesLabel,
  hoursFormatLabel,
  rangePickerTimePickerLabel,
  rangePickerTimePickerTitle,
}: Props): JSX.Element {
  const { i18n, t } = useTranslation();
  const id = useId();

  const field = useAppSelector<UiKitRangePickerTimePickerField>(
    selector,
    shallowEqual
  );

  return (
    <div className={calendarStyles.divPaddingClassName}>
      <h2 className={calendarStyles.h2ClassName}>
        {t(rangePickerTimePickerTitle)}
      </h2>

      <InputRangePickerTimePickerWithLabelAndDescription<
        'uiKit',
        'rangePickerTimePicker'
      >
        min={new Date(2020, 0, 1).valueOf()} // January 1, 2020
        max={new Date(2030, 11, 31).valueOf()} // December 31, 2030
        id={id}
        locale={i18n.language as Locale}
        field={field}
        label={label}
        divClassName={divClassName}
        name={'range-picker-time-picker'}
        hiddenClassName={hiddenClassName}
        labelClassName={text.labelClassName}
        daysClassName={calendarStyles.daysClassName}
        inputTouchedClassName={inputTouchedClassName}
        footerClassName={calendarStyles.footerClassName}
        headerClassName={calendarStyles.headerClassName}
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
        footerWrapperClassName={calendarStyles.footerWrapperClassName}
        selectOptionsClassName={calendarStyles.selectOptionsClassName}
        daysColCurrentClassName={calendarStyles.daysColCurrentClassName}
        rangeContainerClassName={calendarStyles.rangeContainerClassName}
        daysColSelectedClassName={calendarStyles.daysColSelectedClassName}
        calendarCheckerClassName={calendarStyles.calendarCheckerClassName}
        headerButtonIconClassName={calendarStyles.headerButtonIconClassName}
        timeInputWrapperClassName={calendarStyles.timeInputWrapperClassName}
        timeSectionWrapperClassName={calendarStyles.timeSectionWrapperClassName}
        rangePickerTimePickerClassName={calendarStyles.calendarsRowClassName}
        daysRangeColSelectedClassName={
          calendarStyles.daysRangeColSelectedClassName
        }
        checkboxMarkerContainerClassName={
          calendarStyles.checkboxMarkerContainerClassName
        }
        inputContainerClassName={calendarStyles.inputContainerClassName}
        calendarContainerClassName={calendarStyles.calendarContainerClassName}
        amPmLabel={amPmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        rangePickerTimePickerLabel={rangePickerTimePickerLabel}
        hoursFormatLabel={hoursFormatLabel}
      />
    </div>
  );
}

export const RangePickerTimepickerUiKit: ComponentType<Props> = memo<Props>(
  F_RangePickerTimepicker
);
