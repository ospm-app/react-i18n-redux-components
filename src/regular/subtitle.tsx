import { memo, type JSX, type ComponentType } from 'react';

import { text } from 'styles/styles.ts';

type Props = {
  subtitle: string;
};

function F_SubTitle({ subtitle }: Props): JSX.Element {
  return <h2 className={text.paragraphSmallClassName}>{subtitle}</h2>;
}

export const SubTitle: ComponentType<Props> = memo<Props>(F_SubTitle);
