import { type ComponentType, type JSX, memo } from 'react';
import type {
  MetaFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/cloudflare';

import { UiKitTemplate } from 'components/page-ui-kit/template.tsx';

import { uiKitContext } from 'app/intl/page-ui-kit-context.ts';

import { i18next } from 'app/i18next.server.ts';

type Data = {
  title: string;
  description: string;
};

export const loader: LoaderFunction = async function loader({
  request,
}: LoaderFunctionArgs): Promise<Data> {
  const t = await i18next.getFixedT(request);

  const title = t(uiKitContext.head.messages.title);
  const description = t(uiKitContext.head.messages.description.id);

  return {
    title,
    description,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { title: data.title },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { name: 'description', content: data.description },
  ];
};

function UiKitPage(): JSX.Element {
  return <UiKitTemplate pageContext={uiKitContext} />;
}

export default memo(UiKitPage) as ComponentType;
