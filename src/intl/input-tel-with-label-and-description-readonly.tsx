import { memo, type ComponentType, type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Label } from 'library/intl/label.tsx';
import { InputPhoneReadonly } from 'app/library/intl/input-phone-readonly.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  id: string;
  name: string;
  value: string;
  locale: string;
  label: IntlMessageId;
  labelClassName: string;
  inputClassName: string;
  hiddenClassName: string;
  fieldsetClassName: string;
  containerClassName: string;
  flagClassName: string;
  dropdownButtonClassName: string;
  dataTestId?: string | undefined;
  description?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
};

function F_InputTelWithLabelAndDescriptionReadonly({
  id,
  name,
  value,
  label,
  locale,
  description,
  flagClassName,
  labelClassName,
  inputClassName,
  hiddenClassName,
  fieldsetClassName,
  containerClassName,
  dropdownButtonClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={fieldsetClassName}>
      <Label
        id={id}
        label={label}
        required={false}
        className={labelClassName}
      />

      <InputPhoneReadonly
        id={id}
        name={name}
        locale={locale}
        value={value}
        inputClassName={inputClassName}
        flagClassName={flagClassName}
        containerClassName={containerClassName}
        dropdownButtonClassName={dropdownButtonClassName}
        dataTestId={dataTestId}
      />

      <p className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </p>
    </div>
  );
}

export const InputTelWithLabelAndDescriptionReadonly: ComponentType<Props> =
  memo<Props>(F_InputTelWithLabelAndDescriptionReadonly);
