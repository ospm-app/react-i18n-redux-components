import { type ReactNode, type JSX, memo, type ComponentType } from 'react';

import { UserBar } from 'layout/user-bar.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

export type LayoutContext = {
  scrollToTop: {
    label: IntlMessageId;
  };
  offline: {
    message: IntlMessageId;
  };
  userBar: {
    incompleteProfileMessage: IntlMessageId;
  };
  resendVerificationEmailButtonLabel: IntlMessageId;
};

type Props = {
  children: ReactNode;
  layoutClassName: string;
  layoutContext: LayoutContext;
};

function selector({ profile: { isLoggedIn } }: ReduxState): boolean {
  return isLoggedIn;
}

function F_Layout({
  children,
  layoutContext,
  layoutClassName,
}: Props): JSX.Element {
  const isLoggedIn = useAppSelector<boolean>(selector);

  return (
    <>
      {isLoggedIn ? (
        <UserBar
          incompleteProfileMessage={
            layoutContext.userBar.incompleteProfileMessage
          }
        />
      ) : null}

      <main className={layoutClassName}>{children}</main>
    </>
  );
}

export const Layout: ComponentType<Props> = memo<Props>(F_Layout);
