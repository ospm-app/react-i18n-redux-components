import { memo, type JSX, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import type { IntlMessageId } from 'const/intl/index.ts';

import { text } from 'styles/styles.ts';

type Props = {
  title: IntlMessageId;
};

function F_Title({ title }: Props): JSX.Element {
  const { t } = useTranslation();

  return <h1 className={text.subheadClassName}>{t(title)}</h1>;
}

export const Title: ComponentType<Props> = memo<Props>(F_Title);
