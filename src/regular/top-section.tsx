import { memo, type JSX, type ComponentType } from 'react';

import { Title } from 'app/library/regular/title.tsx';
import { SubTitle } from 'app/library/regular/subtitle.tsx';

import { section } from 'styles/styles.ts';

type Props = {
  title: string;
  subtitle: string;
};

function F_TopSection({ title, subtitle }: Props): JSX.Element {
  return (
    <section className={section.topSectionClassName}>
      <Title title={title} />

      <hr className={section.horizontalDividerClassName} />

      <SubTitle subtitle={subtitle} />
    </section>
  );
}

export const TopSection: ComponentType<Props> = memo<Props>(F_TopSection);
