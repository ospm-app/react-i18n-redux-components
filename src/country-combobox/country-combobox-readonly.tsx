import { memo, type JSX, useState, useEffect, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { Label } from 'library/intl/label.tsx';

import * as flagsBgClasses from 'styles/flags.module.css';

import type { Flags } from 'app/valibot.ts';
import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  id: string;
  name: string;
  value: Flags | '';
  label: IntlMessageId;
  flagClassName: string;
  inputClassName: string;
  labelClassName: string;
  hiddenClassName: string;
  fieldsetClassName: string;
  dataTestId?: string | undefined;
  description?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
};

function F_CountryComboboxReadonly({
  id,
  name,
  label,
  value,
  description,
  flagClassName,
  inputClassName,
  labelClassName,
  hiddenClassName,
  fieldsetClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props): JSX.Element {
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>(() => {
    return value === '' ? '' : t(`country.${value}`);
  });

  useEffect((): void => {
    if (value !== '') {
      setSearch(t(`country.${value}`));
    }
  }, [t, value]);

  const flag_ClassName = classnames(
    flagClassName,
    value === '' ? '' : flagsBgClasses[value]
  );

  return (
    <fieldset className={fieldsetClassName}>
      <div>
        <Label
          id={id}
          label={label}
          required={false}
          className={labelClassName}
        />

        <input
          id={id}
          type='text'
          name={name}
          value={search}
          readOnly
          className={inputClassName}
          data-testid={dataTestId}
        />

        {value === '' ? null : <div className={flag_ClassName} />}

        <div className={descriptionClassName}>
          {typeof description === 'undefined' ? null : t(description)}
        </div>
      </div>
    </fieldset>
  );
}

export const CountryComboboxReadonly: ComponentType<Props> = memo<Props>(
  F_CountryComboboxReadonly
);
