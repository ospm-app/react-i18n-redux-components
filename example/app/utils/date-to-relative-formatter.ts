// utils/dateFormatter.ts

import moment from 'moment';
import { useTranslation } from 'react-i18next';

export function useFormatDateToRelative(
  dateString: string,
  locale = 'en'
): string {
  moment.locale(locale);
  const date = moment(dateString);

  const diffInSeconds = moment().diff(date, 'seconds');
  const diffInMinutes = moment().diff(date, 'minutes');
  const diffInHours = moment().diff(date, 'hours');
  const diffInDays = moment().diff(date, 'days');
  const diffInMonths = moment().diff(date, 'months');
  const diffInYears = moment().diff(date, 'years');

  const { t } = useTranslation();

  if (diffInSeconds < 45) {
    return t('time.now');
  }

  if (diffInSeconds < 90) {
    return t('time.seconds', { count: Math.floor(diffInSeconds / 60) });
  }

  if (diffInMinutes < 45) {
    return t('time.minutes', { count: diffInMinutes });
  }

  if (diffInMinutes < 90) {
    return t('time.minute');
  }

  if (diffInHours < 22) {
    return t('time.hours', { count: diffInHours });
  }

  if (diffInHours < 36) {
    return t('time.hour');
  }

  if (diffInDays < 25) {
    return t('time.days', { count: diffInDays });
  }

  if (diffInDays < 45) {
    return t('time.day');
  }

  if (diffInMonths < 10) {
    return t('time.months', { count: diffInMonths });
  }

  if (diffInMonths < 22) {
    return t('time.month');
  }

  if (diffInYears < 1.5) {
    return t('time.year');
  }

  return t('time.years', { count: diffInYears });
}
