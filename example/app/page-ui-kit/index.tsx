import { memo, type JSX, type ComponentType } from 'react';

import { Fonts } from 'components/page-ui-kit/fonts.tsx';
import { Icons } from 'components/page-ui-kit/icons.tsx';
import { Buttons } from 'components/page-ui-kit/buttons.tsx';
import { Colors } from 'components/page-ui-kit/colors.tsx';
import { Checkbox } from 'components/page-ui-kit/checkbox.tsx';
import { DatepickerUiKit } from 'components/page-ui-kit/date-picker.tsx';
import { RangePickerUiKit } from 'components/page-ui-kit/range-picker.tsx';
import { Fields, type UiKitFormContext } from 'components/page-ui-kit/fields.tsx';
import { DatePickerTimePickerUiKit } from 'components/page-ui-kit/date-picker-timepicker.tsx';
import { RangePickerTimepickerUiKit } from 'components/page-ui-kit/range-picker-timepicker.tsx';

import { TopSectionIntl } from 'library/intl/top-section-intl.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

import { section } from 'styles/styles.ts';

export type UiKitPageContext = {
  title: IntlMessageId;
  subtitle: IntlMessageId;
  form: UiKitFormContext;
  icons: {
    title: IntlMessageId;
    oldTitle: IntlMessageId;
  };
};

type Props = {
  uiKitPageContext: UiKitPageContext;
};

function F_UiKit({ uiKitPageContext }: Props): JSX.Element {
  return (
    <>
      <TopSectionIntl
        title={uiKitPageContext.title}
        subtitle={uiKitPageContext.subtitle}
      />

      <section className={section.sectionClassName}>
        <Colors />
      </section>

      <section className={section.sectionClassName}>
        <Fields fieldsPageContext={uiKitPageContext.form} />
      </section>

      <section className={section.sectionClassName}>
        <Icons
          iconsTitle={uiKitPageContext.icons.title}
          oldIconsTitle={uiKitPageContext.icons.oldTitle}
        />
      </section>

      <section className={section.sectionClassName}>
        <Buttons />
      </section>

      <section className={section.sectionClassName}>
        <Checkbox />
      </section>

      <section className={section.sectionClassName}>
        <Fonts />
      </section>

      <section className={section.sectionClassName}>
        <DatepickerUiKit
          label={uiKitPageContext.form.datePickerTimePicker.label}
          datePickerTitle={uiKitPageContext.form.datePickerTimePicker.title}
        />
      </section>

      <section className={section.sectionClassName}>
        <DatePickerTimePickerUiKit
          datePickerTimePickerTitle={
            uiKitPageContext.form.datePickerTimePicker.title
          }
          datePickerTimePickerLabel={
            uiKitPageContext.form.datePickerTimePicker.datePickerTimePickerLabel
          }
          label={uiKitPageContext.form.datePickerTimePicker.label}
          amPmLabel={uiKitPageContext.form.datePickerTimePicker.amPmLabel}
          hoursLabel={uiKitPageContext.form.datePickerTimePicker.hoursLabel}
          minutesLabel={uiKitPageContext.form.datePickerTimePicker.minutesLabel}
          hoursFormatLabel={
            uiKitPageContext.form.datePickerTimePicker.hoursFormatLabel
          }
        />
      </section>

      <section className={section.sectionClassName}>
        <RangePickerUiKit
          label={uiKitPageContext.form.rangePicker.label}
          rangePicketTitle={uiKitPageContext.form.rangePicker.title}
        />
      </section>

      <section className={section.sectionClassName}>
        <RangePickerTimepickerUiKit
          label={uiKitPageContext.form.rangePickerTimePicker.label}
          amPmLabel={uiKitPageContext.form.rangePickerTimePicker.amPmLabel}
          hoursLabel={uiKitPageContext.form.rangePickerTimePicker.hoursLabel}
          minutesLabel={
            uiKitPageContext.form.rangePickerTimePicker.minutesLabel
          }
          hoursFormatLabel={
            uiKitPageContext.form.rangePickerTimePicker.hoursFormatLabel
          }
          rangePickerTimePickerLabel={
            uiKitPageContext.form.rangePickerTimePicker
              .rangePickerTimePickerLabel
          }
          rangePickerTimePickerTitle={
            uiKitPageContext.form.rangePickerTimePicker
              .rangePickerTimePickerTitle
          }
        />
      </section>
    </>
  );
}

export const UiKit: ComponentType<Props> = memo<Props>(F_UiKit);
