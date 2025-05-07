import { memo, useMemo, type JSX, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import { Label } from 'library/intl/label.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  id: string;
  name: string;
  type: string;
  value: string;
  label: IntlMessageId;
  divClassName: string;
  labelClassName: string;
  inputClassName: string;
  isLabelHidden?: boolean;
  hiddenClassName: string;
  description?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  dataTestId?: string;
};

function F_InputTextWithLabelAndDescriptionReadonly({
  id,
  name,
  type,
  value,
  label,
  description,
  divClassName,
  labelClassName,
  hiddenClassName,
  inputClassName,
  isLabelHidden = false,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props): JSX.Element {
  const { t } = useTranslation();

  const inputTitle = useMemo<string | undefined>(() => {
    return isLabelHidden ? t(label) : undefined;
  }, [t, isLabelHidden, label]);

  return (
    <div className={divClassName}>
      {isLabelHidden ? null : (
        <Label
          id={id}
          label={label}
          required={false}
          className={labelClassName}
        />
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        title={inputTitle}
        readOnly
        className={inputClassName}
        data-testid={dataTestId}
      />

      <p className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </p>
    </div>
  );
}

export const InputTextWithLabelAndDescriptionReadonly: ComponentType<Props> =
  memo<Props>(F_InputTextWithLabelAndDescriptionReadonly);
