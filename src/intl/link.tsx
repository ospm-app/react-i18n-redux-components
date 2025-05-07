import type { JSX, ReactNode, ForwardedRef, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Link } from '@remix-run/react';

import { noop } from 'utils/noop.ts';

import { VITE_DEFAULT_LOCALE } from 'app/env.ts';

import type { Routes } from 'app/routes.ts';

type Props<State> = {
  state?: State;
  replace?: boolean;
  className?: string | undefined;
  children?: ReactNode | undefined;
  to: Routes;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  forwardedRef?: ForwardedRef<HTMLAnchorElement> | undefined;
};

function F_LinkIntl<State>({
  to,
  children,
  className,
  onClick = noop,
  ...rest
}: Props<State>): JSX.Element {
  const { i18n } = useTranslation();

  const link = (
    to.startsWith('#')
      ? to
      : i18n.language === VITE_DEFAULT_LOCALE
        ? `/${to}`
        : `/${i18n.language}/${to}`
  ).replace(/\/\//g, '/');

  return (
    <Link {...rest} to={link} onClick={onClick} className={className}>
      {children}
    </Link>
  );
  //                                                 ^?
}

export const LinkIntl = reactMemo(F_LinkIntl);
