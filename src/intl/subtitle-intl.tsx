import { memo, type JSX, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import { text } from 'styles/styles.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  subtitle: IntlMessageId;
};

function F_SubTitle({ subtitle }: Props): JSX.Element {
  const { t } = useTranslation();

  return <h2 className={text.paragraphSmallClassName}>{t(subtitle)}</h2>;
}

export const SubTitle: ComponentType<Props> = memo<Props>(F_SubTitle);
