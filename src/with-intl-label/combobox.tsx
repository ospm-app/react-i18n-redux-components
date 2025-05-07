import { memo, type JSX, type ComponentType } from 'react';

import { Label } from 'library/intl/label.tsx';

import { ComboboxSelect } from 'library/regular/combobox-select.tsx';

import type { SelectOption } from 'library/types.ts';
import type { IntlMessageId } from 'const/intl/index.ts';
import type { SelectField } from 'state/reducers/forms/types.ts';

type Props = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  label: IntlMessageId;
  divClassName: string;
  listClassName: string;
  labelClassName: string;
  optionClassName: string;
  selectClassName: string;
  selectDivClassName: string;
  selectValueClassName: string;
  selectArrowClassName: string;
  selectButtonClassName: string;
  field: Readonly<SelectField<string>>;
  readonly options: ReadonlyArray<SelectOption>;
  onChange?:
    | ((
        value: string | undefined,
        field: Readonly<SelectField<string>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: string | undefined,
        field: Readonly<SelectField<string>>
      ) => void)
    | undefined;
};

function F_Combobox({
  id,
  field,
  label,
  onBlur,
  options,
  onChange,
  divClassName,
  listClassName,
  labelClassName,
  selectClassName,
  optionClassName,
  selectDivClassName,
  selectValueClassName,
  selectArrowClassName,
  selectButtonClassName,
  required = true,
  disabled = false,
}: Props): JSX.Element {
  return (
    <div className={divClassName}>
      <Label
        id={id}
        label={label}
        required={required}
        className={labelClassName}
      />

      <ComboboxSelect
        id={id}
        field={field}
        onBlur={onBlur}
        options={options}
        onChange={onChange}
        disabled={disabled}
        listClassName={listClassName}
        selectClassName={selectClassName}
        optionClassName={optionClassName}
        selectDivClassName={selectDivClassName}
        selectValueClassName={selectValueClassName}
        selectIconClassName={selectArrowClassName}
        selectButtonClassName={selectButtonClassName}
      />
    </div>
  );
}

export const Combobox: ComponentType<Props> = memo<Props>(F_Combobox);
