import type { JSX } from 'react';

import { reactMemo } from 'utils/react-memo.ts';

type Props<Value extends string | undefined> = {
  value: Value;
  label: string;
  optionClassName: string;
};

function F_Option<Value extends string | undefined>({
  value,
  label,
  optionClassName,
}: Props<Value>): JSX.Element {
  return (
    <option className={optionClassName} value={value}>
      {label}
    </option>
  );
}

export const Option = reactMemo(F_Option);
