import { memo, useMemo, type JSX, type ComponentType } from 'react';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  locale: string;
  readonly weekDays: ReadonlyArray<string>;
  daysColClassName?: string | undefined;
  daysHeaderClassName?: string | undefined;
};

export const daysOfWeekIntl: ReadonlyArray<IntlMessageId> = [
  'days-of-week.monday',
  'days-of-week.tuesday',
  'days-of-week.wednesday',
  'days-of-week.thursday',
  'days-of-week.friday',
  'days-of-week.saturday',
  'days-of-week.sunday',
] as const;

const defaultArray: ReadonlyArray<string> = [];

function F_DayPickerHeader({
  locale,
  weekDays,
  daysColClassName,
  daysHeaderClassName,
}: Props): JSX.Element {
  const names = useMemo<ReadonlyArray<string>>(() => {
    const list: Array<string> = [];

    const firstDayOfWeek = weekDays[0];

    if (typeof firstDayOfWeek !== 'string') {
      return defaultArray;
    }

    const date = new Date(
      1970,
      0,
      (4 + daysOfWeekIntl.indexOf(firstDayOfWeek) + 7) % weekDays.length
    );

    const intl = new Intl.DateTimeFormat(locale, { weekday: 'short' });

    for (let i = 0; i < 7; ++i) {
      list.push(intl.format(date.setDate(date.getDate() + 1)));
    }

    return list;
  }, [locale, weekDays]);

  return (
    <div className={daysHeaderClassName}>
      {names.map((name: string): JSX.Element => {
        return (
          <div key={name} className={daysColClassName}>
            {name}
          </div>
        );
      })}
    </div>
  );
}

export const DayPickerHeader: ComponentType<Props> =
  memo<Props>(F_DayPickerHeader);
