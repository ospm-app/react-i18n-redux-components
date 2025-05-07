import type { DetailedHTMLProps, MetaHTMLAttributes } from 'react';

import type { HeadMessages } from 'types/common.ts';

type Head<Value extends string> = {
  image?: string | undefined

  messages: HeadMessages<Value>

  meta?:
    | Array<
        DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
      >
    | undefined
}

type Seo<Value extends string> = {
  title: Value
  description: Value
  keywords: Value
}

export type BasePageContext<Value extends string> = {
  seo: Seo<Value>
}

export type BaseContext<Value extends string> = {
  readonly head: Head<Value>
}
