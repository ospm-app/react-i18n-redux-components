import { memo, type ComponentType, type JSX } from 'react';

import { Layout } from 'layout/index.tsx';

import { UiKit } from 'components/page-ui-kit/index.tsx';

import type { StaticPage } from 'types/common.ts';

import type { UiKitContext } from 'types/page-context/ui-kit.ts';

import { layoutClassName } from 'styles/styles.ts';

type Props = StaticPage<UiKitContext>;

function F_UiKitTemplate({
  pageContext: { layoutContext, uiKitPageContext },
}: Props): JSX.Element {
  return (
    <Layout layoutClassName={layoutClassName} layoutContext={layoutContext}>
      <UiKit uiKitPageContext={uiKitPageContext} />
    </Layout>
  );
}

export const UiKitTemplate: ComponentType<Props> = memo<Props>(F_UiKitTemplate);
