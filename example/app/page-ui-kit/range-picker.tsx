import { memo, type ComponentType, useId, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';

import { InputRangePickerWithLabelAndDescription } from 'library/intl/input-range-picker-with-label-and-description.tsx';

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
import type { UiKitRangePickerField } from 'state/reducers/forms/ui-kit.ts';

type Props = {
  label: IntlMessageId;
  rangePicketTitle: IntlMessageId;
};

function selector(state: ReduxState): UiKitRangePickerField {
  return state.forms.uiKit.rangePicker;
}

function F_RangePicker({ label, rangePicketTitle }: Props): JSX.Element {
  const { i18n, t } = useTranslation();
  const id = useId();

  const field = useAppSelector<UiKitRangePickerField>(selector, shallowEqual);

  return (
    <div className={calendarStyles.divPaddingClassName}>
      <h2 className={calendarStyles.h2ClassName}>{t(rangePicketTitle)}</h2>

      <InputRangePickerWithLabelAndDescription<'uiKit', 'rangePicker'>
        min={new Date(2010, 0, 1).valueOf()}
        max={new Date(2030, 11, 31).valueOf()}
        id={id}
        locale={i18n.language as Locale}
        field={field}
        label={label}
        name={'range-picker'}
        divClassName={divClassName}
        hiddenClassName={hiddenClassName}
        labelClassName={text.labelClassName}
        daysClassName={calendarStyles.daysClassName}
        inputTouchedClassName={inputTouchedClassName}
        headerClassName={calendarStyles.headerClassName}
        inputUnTouchedClassName={inputUnTouchedClassName}
        inputClassName={calendarStyles.dateInputClassName}
        daysRowClassName={calendarStyles.daysRowClassName}
        daysColClassName={calendarStyles.daysColClassName}
        daysBodyClassName={calendarStyles.daysBodyClassName}
        containerClassName={calendarStyles.containerClassName}
        daysHeaderClassName={calendarStyles.daysHeaderClassName}
        headerYearClassName={calendarStyles.headerYearClassName}
        daysColOverClassName={calendarStyles.daysColOverClassName}
        emptyButtonClassName={calendarStyles.emptyButtonClassName}
        headerMonthClassName={calendarStyles.headerMonthClassName}
        headerButtonClassName={calendarStyles.headerButtonClassName}
        daysColCurrentClassName={calendarStyles.daysColCurrentClassName}
        rangeContainerClassName={calendarStyles.rangeContainerClassName}
        daysColSelectedClassName={calendarStyles.daysColSelectedClassName}
        headerButtonIconClassName={calendarStyles.headerButtonIconClassName}
        daysRangeColSelectedClassName={
          calendarStyles.daysRangeColSelectedClassName
        }
        inputContainerClassName={calendarStyles.inputContainerClassName}
        calendarContainerClassName={calendarStyles.calendarContainerClassName}
        calendarsRowClassName={calendarStyles.calendarsRowClassName}
      />
    </div>
  );
}

export const RangePickerUiKit: ComponentType<Props> =
  memo<Props>(F_RangePicker);
