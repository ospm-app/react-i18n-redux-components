import { memo, type JSX, type ComponentType } from 'react';

import { text } from 'styles/styles.ts';

type Props = {
  title: string;
};

function F_Title({ title }: Props): JSX.Element {
  return <h1 className={text.subheadClassName}>{title}</h1>;
}

export const Title: ComponentType<Props> = memo<Props>(F_Title);
