import { memo, type JSX, type ComponentType } from 'react';

import { Title } from 'app/library/intl/title-intl.tsx';
import { SubTitle } from 'app/library/intl/subtitle-intl.tsx';

import { section } from 'styles/styles.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  title: IntlMessageId;
  subtitle: IntlMessageId;
};

function F_TopSectionIntl({ title, subtitle }: Props): JSX.Element {
  return (
    <section className={section.topSectionClassName}>
      <Title title={title} />

      <hr className={section.horizontalDividerClassName} />

      <SubTitle subtitle={subtitle} />
    </section>
  );
}

export const TopSectionIntl: ComponentType<Props> =
  memo<Props>(F_TopSectionIntl);
