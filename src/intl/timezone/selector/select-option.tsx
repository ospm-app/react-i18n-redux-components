import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

type Props<Value extends string | undefined> = {
  time: string;
  value: Value;
  label: string;
  offset: string;
  optionClassName: string;
};

function F_Option<Value extends string | undefined>({
  time,
  value,
  label,
  offset,
  optionClassName,
}: Props<Value>): JSX.Element | null {
  const { t } = useTranslation();

  return (
    <option className={optionClassName} value={value}>
      {`${t(label)}  ${offset} (${time})`}
    </option>
  );
}

export const Option = reactMemo(F_Option);
