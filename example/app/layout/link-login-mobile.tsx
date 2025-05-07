import {
  memo,
  type JSX,
  type ComponentType,
  type MouseEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from 'app/routes.ts';

import { MobileLoginIcon } from 'svg/mobile-login.tsx';

import { LinkIntl } from 'library/intl/link.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

function selector(state: ReduxState): boolean {
  return state.profile.isLoggedIn;
}

type Props = {
  linkLabel: IntlMessageId;
  linkClassName: string;
  iconClassName: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

function F_LinkLoginMobile({
  linkLabel,
  linkClassName,
  iconClassName,
  onClick,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const isLoggedIn = useAppSelector<boolean>(selector);

  return (
    <LinkIntl
      to={routes.logIn}
      aria-hidden={isLoggedIn}
      className={linkClassName}
      onClick={onClick}
    >
      <span role='img' aria-hidden className={iconClassName}>
        <MobileLoginIcon />
      </span>

      {t(linkLabel)}
    </LinkIntl>
  );
}

export const LinkLogInMobile: ComponentType<Props> =
  memo<Props>(F_LinkLoginMobile);
