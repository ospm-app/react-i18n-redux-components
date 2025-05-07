import { memo, type JSX, type ComponentType } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { useLocation } from '@remix-run/react';
import { shallowEqual } from 'react-redux';

import { routes } from 'app/routes.ts';

import { LinkIntl } from 'library/intl/link.tsx';

import { ProfileIncomplete } from 'layout/profile-incomplete.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import { userBar } from 'styles/layout.ts';
import { layoutClassName, text } from 'styles/styles.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type SelectorProps = {
  fullname: string;
};

function selector({
  profile: { firstName, lastName },
}: ReduxState): SelectorProps {
  return {
    fullname: `${firstName} ${lastName}`.trim(),
  };
}

type Props = {
  incompleteProfileMessage: IntlMessageId;
};

function F_UserBar({ incompleteProfileMessage }: Props): JSX.Element {
  const { fullname } = useAppSelector<SelectorProps>(selector, shallowEqual);

  const { pathname } = useLocation();

  return (
    <div className={layoutClassName}>
      <div className={userBar.sectionClassName}>
        <div
          aria-current={
            pathname.includes('profile') === true ? 'page' : 'false'
          }
          className={userBar.userLinkClassNames}
        >
          <LinkIntl to={routes.profile} className={text.linkClassName}>
            {fullname}
          </LinkIntl>
        </div>

        <ClientOnly fallback={null}>
          {(): JSX.Element => {
            return (
              <ProfileIncomplete
                incompleteProfileMessage={incompleteProfileMessage}
              />
            );
          }}
        </ClientOnly>
      </div>
    </div>
  );
}

export const UserBar: ComponentType<Props> = memo<Props>(F_UserBar);
