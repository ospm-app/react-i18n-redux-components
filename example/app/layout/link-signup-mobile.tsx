import {
  memo,
  type JSX,
  type ComponentType,
  type MouseEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from 'app/routes.ts';

import { LinkIntl } from 'library/intl/link.tsx';

import { MobileSignupIcon } from 'svg/mobile-signup.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  linkClassName: string;
  iconClassName: string;
  linkLabel: IntlMessageId;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

function selector(state: ReduxState): boolean {
  return state.profile.isLoggedIn;
}

function F_LinkSignUp({
  linkLabel,
  linkClassName,
  iconClassName,
  onClick,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const isLoggedIn = useAppSelector<boolean>(selector);

  return (
    <LinkIntl
      to={routes.signUp}
      aria-hidden={isLoggedIn}
      className={linkClassName}
      onClick={onClick}
    >
      <span role='img' aria-hidden className={iconClassName}>
        <MobileSignupIcon />
      </span>

      {t(linkLabel)}
    </LinkIntl>
  );
}

export const LinkSignUp: ComponentType<Props> = memo<Props>(F_LinkSignUp);
