import {
  memo,
  useRef,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
} from 'react';
import {
  safeParse,
  type EmailIssue,
  type UnionIssue,
  type NumberIssue,
  type ObjectIssue,
  type StringIssue,
  type BooleanIssue,
  type LiteralIssue,
  type MinLengthIssue,
} from 'valibot';
import { shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';

import { privateRoutes, routes } from 'app/routes.ts';

import { uuidV7 } from 'utils/uuidv7.ts';
import { storage } from 'utils/storage.ts';
import { isTesting } from 'utils/is-testing.ts';

import * as AuthService from 'services/auth.ts';

import { navigateIntl } from 'library/intl/navigate.ts';

import {
  type Flags,
  type UserResponse,
  serverErrorSchema,
  userResponseSchema,
} from 'app/valibot.ts';

import {
  fetchComplete,
  logIn as authLogIn,
  updateProfileValues,
  type ProfileValuesPayload,
} from 'state/reducers/forms.ts';
import { logIn as profileLogIn } from 'state/reducers/profile.ts';
import {
  triggerAutoLogin,
  updateAutoLoginFinished,
} from 'state/reducers/app.ts';
import {
  type ReduxState,
  useAppDispatch,
  useAppSelector,
} from 'state/store.ts';

import type { Path } from 'state/reducers/forms/types.ts';

const path: Path = ['logIn'] as const;

type SelectorProps = {
  isLoggedIn: boolean;
  isAutoLoginTriggered: boolean;
};

function selector({
  profile: { isLoggedIn },
  app: { isAutoLoginTriggered },
}: ReduxState): SelectorProps {
  return { isLoggedIn, isAutoLoginTriggered };
}

type Props = {
  pathname: string | undefined;
};

function F_AutoLogIn({ pathname }: Props): JSX.Element | null {
  const isAutoLogInFetching = useRef(false);

  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const interactionIdRef = useRef<string>(uuidV7());

  const { isLoggedIn, isAutoLoginTriggered } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const autoLogIn = useCallback<() => Promise<void>>(async () => {
    if (!isAutoLoginTriggered) {
      dispatch(triggerAutoLogin());
    }

    // for testing lets disable autoLogIn
    if (isTesting) {
      // When starting the application `isFetching` should be equals `true`
      // @see src/redux/reducers/auth-login.ts
      dispatch(fetchComplete({ path }));

      return;
    }

    if (isAutoLogInFetching.current === true) {
      return;
    }

    try {
      isAutoLogInFetching.current = true;

      const visitorId = storage.getItem('visitorId') ?? '';

      const loginResponse = await AuthService.autoLogIn(
        visitorId,
        interactionIdRef.current
      );

      const safeServerErrorResponse = safeParse(
        serverErrorSchema,
        loginResponse
      );

      if (safeServerErrorResponse.success) {
        isAutoLogInFetching.current = false;

        return;
      }

      const safeLogInSuccessResponse = safeParse(
        userResponseSchema,
        loginResponse
      );

      if (safeLogInSuccessResponse.success) {
        const profile = {
          id: safeLogInSuccessResponse.output.id,
          enable2fa: safeLogInSuccessResponse.output.enable2fa,
          isVerified: safeLogInSuccessResponse.output.isVerified,
          country: safeLogInSuccessResponse.output.country,
          firstName: safeLogInSuccessResponse.output.firstName,
          lastName: safeLogInSuccessResponse.output.lastName,
          username: safeLogInSuccessResponse.output.username,
          email: safeLogInSuccessResponse.output.email,
          phone: safeLogInSuccessResponse.output.phone,
          remember: safeLogInSuccessResponse.output.remember,
          githubAccountSync: safeLogInSuccessResponse.output.githubAccountSync,
          accountLastUsed: safeLogInSuccessResponse.output.accountLastUsed,
          createdAt: safeLogInSuccessResponse.output.createdAt,
          updatedAt: safeLogInSuccessResponse.output.updatedAt,
        } satisfies Omit<
          UserResponse,
          'success' | 'visitorId' | 'interactionId'
        >;

        dispatch(authLogIn(profile));

        dispatch(profileLogIn(profile));

        dispatch(
          updateProfileValues({
            firstName: safeLogInSuccessResponse.output.firstName,
            lastName: safeLogInSuccessResponse.output.lastName,
            email: safeLogInSuccessResponse.output.email,
            phone: safeLogInSuccessResponse.output.phone,
            username: safeLogInSuccessResponse.output.username ?? '',

            country: safeLogInSuccessResponse.output.country as Flags,
            enable2fa: safeLogInSuccessResponse.output.enable2fa,
            isVerified: safeLogInSuccessResponse.output.isVerified,
            githubAccountSync:
              safeLogInSuccessResponse.output.githubAccountSync,
            accountLastUsed: safeLogInSuccessResponse.output.accountLastUsed,
            createdAt: safeLogInSuccessResponse.output.createdAt,
            updatedAt: safeLogInSuccessResponse.output.updatedAt,
          } satisfies ProfileValuesPayload)
        );

        const visitorId = storage.getItem('visitorId');

        if (visitorId !== safeLogInSuccessResponse.output.visitorId) {
          storage.setItem(
            'visitorId',
            safeLogInSuccessResponse.output.visitorId
          );
        }

        isAutoLogInFetching.current = false;

        if (
          Object.keys(privateRoutes)
            .map((key) => {
              return privateRoutes[key as keyof typeof privateRoutes];
            })
            .some((route): boolean => {
              return pathname?.includes(route) ?? false;
            })
        ) {
          return;
        }

        return navigateIntl(routes.dashboard, i18n.language, navigate);
      }

      const errors = safeLogInSuccessResponse.issues.map(
        (
          issue:
            | BooleanIssue
            | LiteralIssue
            | UnionIssue<LiteralIssue>
            | StringIssue
            | MinLengthIssue<string, 1>
            | MinLengthIssue<string, 8>
            | EmailIssue<string>
            | NumberIssue
            | ObjectIssue
        ): string => {
          return `${
            Array.isArray(issue.path)
              ? issue.path
                  .map((p) => {
                    return `${p.key}`;
                  })
                  .join('.')
              : ''
          } ${issue.type}: ${issue.message}`;
        }
      );

      console.error(errors);

      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else if (typeof error === 'string') {
        console.error(error);
      } else {
        console.error(JSON.stringify(error));
      }

      isAutoLogInFetching.current = false;
    } finally {
      // When starting the application `isFetching` equals `true`
      dispatch(updateAutoLoginFinished());

      isAutoLogInFetching.current = false;
    }
  }, [dispatch, i18n.language, isAutoLoginTriggered, navigate, pathname]);

  useEffect((): void => {
    if (!isLoggedIn || !isAutoLoginTriggered) {
      autoLogIn();
    }
  }, [isLoggedIn, autoLogIn, isAutoLoginTriggered]);

  return null;
}

export const AutoLogIn: ComponentType<Props> = memo<Props>(F_AutoLogIn);
