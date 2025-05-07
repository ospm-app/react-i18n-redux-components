import { type ReactNode, type JSX, memo, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';

import { Spinner } from 'components/common/spinner.tsx';
import { LogIn, type LogInPageContext } from 'components/page-log-in/index.tsx';

import { UserBar } from 'layout/user-bar.tsx';
import { NotVerified } from 'layout/not-verified.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { LayoutContext } from 'layout/index.ts';

type Props = {
  children: ReactNode;
  layoutClassName: string;
  layoutContext: LayoutContext;
  logInPageContext: LogInPageContext;
};

type SelectorProps = {
  isVerified: boolean;
  isLoggedIn: boolean;
  isAutoLoginFinished: boolean;
};

function selector({
  app: { isAutoLoginFinished },
  profile: { isVerified, isLoggedIn },
}: ReduxState): SelectorProps {
  return {
    isVerified,
    isLoggedIn,
    isAutoLoginFinished,
  };
}

function F_RestrictedLayout({
  children,
  layoutContext,
  layoutClassName,
  logInPageContext,
}: Props): JSX.Element {
  const { i18n } = useTranslation();

  const { isVerified, isLoggedIn, isAutoLoginFinished } =
    useAppSelector<SelectorProps>(selector, shallowEqual);

  return (
    <>
      {isLoggedIn ? (
        <UserBar
          incompleteProfileMessage={
            layoutContext.userBar.incompleteProfileMessage
          }
        />
      ) : null}

      <main className={layoutClassName}>
        {isLoggedIn ? (
          isVerified ? (
            children
          ) : (
            <NotVerified
              currentLocale={i18n.language}
              resendVerificationEmailButtonLabel={
                layoutContext.resendVerificationEmailButtonLabel
              }
            />
          )
        ) : isAutoLoginFinished ? (
          <LogIn logInPageContext={logInPageContext} />
        ) : (
          <Spinner />
        )}
      </main>
    </>
  );
}

export const RestrictedLayout: ComponentType<Props> =
  memo<Props>(F_RestrictedLayout);
