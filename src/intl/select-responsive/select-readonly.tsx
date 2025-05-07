import { useMemo, type JSX, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Option } from 'library/regular/option.tsx';

import type { SelectOption } from 'library/types.ts';

type Props<Value extends string | undefined> = {
  id: string;
  name: string;
  value: Value;
  optionClassName: string;
  selectClassName: string;
  selectRef?: RefObject<HTMLSelectElement> | undefined;
  readonly options: ReadonlyArray<SelectOption<Value>>;
};

function F_Select<Value extends string | undefined>({
  id,
  name,
  value,
  options,
  selectRef,
  optionClassName,
  selectClassName,
}: Props<Value>): JSX.Element {
  const { t } = useTranslation();

  const optionsMemo = useMemo<
    Array<{ value: Value | undefined; label: string }>
  >(() => {
    return options.map(({ label, value }: SelectOption<Value>) => {
      return {
        label: t(label),
        value,
      };
    });
  }, [t, options]);

  return (
    <select
      id={id}
      name={name}
      value={value}
      ref={selectRef}
      disabled
      className={selectClassName}
    >
      {optionsMemo.map(({ value, label }): JSX.Element => {
        return (
          <Option
            optionClassName={optionClassName}
            key={value}
            value={value}
            label={label}
          />
        );
      })}
    </select>
  );
}

export const Select = reactMemo(F_Select);
