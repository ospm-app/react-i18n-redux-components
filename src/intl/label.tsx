import { memo, type JSX, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  id: string;
  className: string;
  required?: boolean;
  label: IntlMessageId;
};

function F_Label({
  id,
  label,
  className,
  required = true,
}: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <label id={`${id}-label`} htmlFor={id} className={className}>
      {t(label)}
      {required === true ? ' *' : ''}
    </label>
  );
}

export const Label: ComponentType<Props> = memo<Props>(F_Label);
