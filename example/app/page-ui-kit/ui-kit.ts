import type { IntlMessageId } from 'const/intl/index.ts';

import type { LayoutContext } from 'layout/index.tsx';
import type { UiKitPageContext } from 'components/page-ui-kit/index.tsx';

import type { BaseContext, BasePageContext } from 'types/page-context/base.ts';

export type UiKitContext = BaseContext<IntlMessageId> & {
  __type: 'UiKitContext';
  layoutContext: LayoutContext;
  uiKitPageContext: BasePageContext<IntlMessageId> & UiKitPageContext;
};
