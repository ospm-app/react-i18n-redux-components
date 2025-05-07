import type { JSX, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Label } from 'library/intl/label.tsx';
import { Select } from 'app/library/intl/select-responsive/select-readonly.tsx';

import type { SelectOption } from 'library/types.ts';
import type { IntlMessageId } from 'const/intl/index.ts';

type Props<Value extends string | undefined> = {
  id: string;
  name: string;
  value: Value;
  label: IntlMessageId;
  divClassName: string;
  labelClassName: string;
  optionClassName: string;
  selectClassName: string;
  hiddenClassName: string;
  description?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  selectRef?: RefObject<HTMLSelectElement> | undefined;
  readonly options: ReadonlyArray<SelectOption<Value>>;
};

function F_SelectWithLabelAndDescriptionReadonly<
  Value extends string | undefined,
>({
  id,
  name,
  label,
  value,
  options,
  selectRef,
  description,
  divClassName,
  labelClassName,
  hiddenClassName,
  optionClassName,
  selectClassName,
  descriptionClassName = hiddenClassName,
}: Props<Value>): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        className={labelClassName}
        required={false}
      />

      <Select<Value>
        id={id}
        name={name}
        value={value}
        options={options}
        selectRef={selectRef}
        optionClassName={optionClassName}
        selectClassName={selectClassName}
      />

      <div className={descriptionClassName}>
        {typeof description === 'string' ? t(description) : null}
      </div>
    </div>
  );
}

export const SelectWithLabelAndDescriptionReadonly = reactMemo(
  F_SelectWithLabelAndDescriptionReadonly
);
