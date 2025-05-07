import {
  memo,
  useId,
  type JSX,
  type ComponentType,
  type ChangeEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { CheckCircleIcon } from 'svg/check-circle.tsx';

import type { IntlMessageId } from '/app/const/intl/index.ts';

type FooterProps = {
  hours: number;
  minutes: number;
  timeFormat: string;
  is24HourFormat: boolean;
  footerClassName: string;
  checkboxClassName: string;
  inputNumberClassName: string;
  isTimePickerEnabled: boolean;
  calendarLabelClassName: string;
  selectOptionsClassName: string;
  footerWrapperClassName: string;
  inputTimeFormatClassName: string;
  calendarCheckerClassName: string;
  timeInputWrapperClassName: string;
  timeSectionWrapperClassName: string;
  checkboxMarkerContainerClassName: string;
  onHoursChange: ChangeEventHandler<HTMLInputElement>;
  onAmPmChange: ChangeEventHandler<HTMLSelectElement>;
  onMinutesChange: ChangeEventHandler<HTMLInputElement>;
  onToggleTimePicker: ChangeEventHandler<HTMLInputElement>;
  onToggle24HourFormat: ChangeEventHandler<HTMLInputElement>;
  amPmLabel: IntlMessageId;
  hoursLabel: IntlMessageId;
  minutesLabel: IntlMessageId;
  hoursFormatLabel: IntlMessageId;
  rangePickerTimePickerLabel: IntlMessageId;
};

function F_LeftCalendarFooter({
  hours,
  minutes,
  timeFormat,
  onAmPmChange,
  onHoursChange,
  is24HourFormat,
  onMinutesChange,
  footerClassName,
  checkboxClassName,
  onToggleTimePicker,
  isTimePickerEnabled,
  onToggle24HourFormat,
  inputNumberClassName,
  footerWrapperClassName,
  calendarLabelClassName,
  selectOptionsClassName,
  inputTimeFormatClassName,
  calendarCheckerClassName,
  timeInputWrapperClassName,
  timeSectionWrapperClassName,
  checkboxMarkerContainerClassName,
  amPmLabel, // AM/PM:
  hoursLabel, // Hours:
  minutesLabel, // Minutes:
  hoursFormatLabel, // 24h Format
  rangePickerTimePickerLabel, // Time picker
}: FooterProps): JSX.Element {
  const { t } = useTranslation();

  const timepickerId = useId();
  const hoursFormatId = useId();
  const minutesId = useId();
  const amPmId = useId();
  const hoursId = useId();

  return (
    <div className={footerClassName}>
      <div className={footerWrapperClassName}>
        <div className={checkboxMarkerContainerClassName}>
          <input
            id={timepickerId}
            type='checkbox'
            className={checkboxClassName}
            checked={isTimePickerEnabled}
            onChange={onToggleTimePicker}
          />

          <div className={calendarCheckerClassName}>
            {isTimePickerEnabled ? <CheckCircleIcon /> : null}
          </div>

          <label htmlFor={timepickerId} className={calendarLabelClassName}>
            {t(rangePickerTimePickerLabel)}
          </label>
        </div>

        {isTimePickerEnabled ? (
          <div className={checkboxMarkerContainerClassName}>
            <input
              id={hoursFormatId}
              type='checkbox'
              className={checkboxClassName}
              checked={is24HourFormat}
              onChange={onToggle24HourFormat}
            />

            <div className={calendarCheckerClassName}>
              {is24HourFormat ? <CheckCircleIcon /> : null}
            </div>

            <label htmlFor={hoursFormatId} className={calendarLabelClassName}>
              {t(hoursFormatLabel)}
            </label>
          </div>
        ) : null}
      </div>

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
              value={String(hours).padStart(2, '0')}
              onChange={onHoursChange}
              className={inputNumberClassName}
              min={is24HourFormat ? 0 : 1}
              max={is24HourFormat ? 23 : 12}
            />
          </div>

          <div className={timeInputWrapperClassName}>
            <label htmlFor={minutesId} className={calendarLabelClassName}>
              {t(minutesLabel)}
            </label>

            <input
              id={minutesId}
              placeholder='00'
              type='number'
              value={String(minutes).padStart(2, '0')}
              onChange={onMinutesChange}
              className={inputNumberClassName}
              min={0}
              max={59}
            />
          </div>

          {is24HourFormat ? null : (
            <div className={classnames(timeInputWrapperClassName)}>
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

export const LeftCalendarFooter: ComponentType<FooterProps> =
  memo<FooterProps>(F_LeftCalendarFooter);
