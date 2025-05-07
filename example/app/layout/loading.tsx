import { type ComponentType, type JSX, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SpinnerIcon } from 'svg/spinner.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  className: string;
  ariaLabel: IntlMessageId;
};

function F_Loading({ ariaLabel, className }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div role='img' aria-label={t(ariaLabel)} className={className}>
      <SpinnerIcon />
    </div>
  );
}

export const Loading: ComponentType<Props> = memo<Props>(F_Loading);
