import {
  memo,
  type JSX,
  type ComponentType,
  type ChangeEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import type { IntlMessageId } from 'const/intl/index.ts';

export type RadioOption = {
  id: string;
  label: IntlMessageId;
  description?: IntlMessageId | undefined;
};

type Props = {
  name: string;
  selected: string;
  required: boolean;
  disabled: boolean;
  option: RadioOption;
  divClassName: string;
  labelClassName: string;
  inputClassName: string;
  hiddenClassName: string;
  checkerClassName: string;
  checkmarkClassName: string;
  containerClassName: string;
  descriptionClassName?: string | undefined;
  invalid?: boolean | undefined;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
};

function F_RadioOptionIntl({
  name,
  option,
  invalid,
  required,
  disabled,
  selected,
  divClassName,
  onInputChange,
  labelClassName,
  inputClassName,
  hiddenClassName,
  checkerClassName,
  checkmarkClassName,
  containerClassName,
  descriptionClassName = hiddenClassName,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const { id } = option;

  const description = option.description;

  return (
    <div className={containerClassName}>
      <div className={divClassName}>
        <input
          id={id}
          type='radio'
          name={name}
          required={required}
          disabled={disabled}
          onChange={onInputChange}
          className={inputClassName}
          checked={selected === id}
        />

        <div className={checkerClassName}>
          {selected === id ? <div className={checkmarkClassName} /> : null}
        </div>

        <label htmlFor={id} data-invalid={invalid} className={labelClassName}>
          {typeof option.label === 'string' ? t(option.label) : null}
        </label>
      </div>

      <div className={descriptionClassName}>
        {typeof description === 'string' ? t(description) : null}
      </div>
    </div>
  );
}

export const RadioOptionIntl: ComponentType<Props> =
  memo<Props>(F_RadioOptionIntl);
