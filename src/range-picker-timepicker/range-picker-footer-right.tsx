import {
  memo,
  useId,
  type JSX,
  type ComponentType,
  type ChangeEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import type { IntlMessageId } from '/app/const/intl/index.ts';

type FooterProps = {
  hours: number;
  minutes: number;
  timeFormat: string;
  is24HourFormat: boolean;
  footerClassName: string;
  isTimePickerEnabled: boolean;
  inputNumberClassName: string;
  calendarLabelClassName: string;
  selectOptionsClassName: string;
  inputTimeFormatClassName: string;
  timeInputWrapperClassName: string;
  timeSectionWrapperClassName: string;
  onHoursChange: ChangeEventHandler<HTMLInputElement>;
  onAmPmChange: ChangeEventHandler<HTMLSelectElement>;
  onMinutesChange: ChangeEventHandler<HTMLInputElement>;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
};

function F_RightCalendarFooter({
  hours,
  minutes,
  timeFormat,
  onAmPmChange,
  onHoursChange,
  is24HourFormat,
  onMinutesChange,
  footerClassName,
  isTimePickerEnabled,
  inputNumberClassName,
  calendarLabelClassName,
  selectOptionsClassName,
  inputTimeFormatClassName,
  timeInputWrapperClassName,
  timeSectionWrapperClassName,
  amPmLabel, // AM/PM:
  hoursLabel, // Hours:
  minutesLabel, // Minutes:
}: FooterProps): JSX.Element {
  const { t } = useTranslation();

  const minutesId = useId();
  const hoursId = useId();
  const amPmId = useId();

  return (
    <div className={footerClassName}>
      {isTimePickerEnabled ? (
        <div className={timeSectionWrapperClassName}>
          <div className={timeInputWrapperClassName}>
            <label htmlFor={hoursId} className={calendarLabelClassName}>
              {t(hoursLabel)}
            </label>

            <input
              id={hoursId}
              placeholder='00'
              type='number'
              onChange={onHoursChange}
              min={is24HourFormat ? 0 : 1}
              className={inputNumberClassName}
              max={is24HourFormat ? 23 : 12}
              value={String(hours).padStart(2, '0')}
            />
          </div>

          <div className={timeInputWrapperClassName}>
            <label htmlFor={minutesId} className={calendarLabelClassName}>
              {t(minutesLabel)}
            </label>

            <input
              min={0}
              max={59}
              type='number'
              id={minutesId}
              placeholder='00'
              onChange={onMinutesChange}
              className={inputNumberClassName}
              value={String(minutes).padStart(2, '0')}
            />
          </div>

          {is24HourFormat ? null : (
            <div className={timeInputWrapperClassName}>
              <label
                htmlFor={amPmId}
                className={classnames(
                  timeInputWrapperClassName,
                  calendarLabelClassName
                )}
              >
                {t(amPmLabel)}
                <select
                  id={amPmId}
                  value={timeFormat}
                  onChange={onAmPmChange}
                  className={inputTimeFormatClassName}
                >
                  <option className={selectOptionsClassName} value='AM'>
                    AM
                  </option>

                  <option className={selectOptionsClassName} value='PM'>
                    PM
                  </option>
                </select>
              </label>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export const RightCalendarFooter: ComponentType<FooterProps> =
  memo<FooterProps>(F_RightCalendarFooter);
