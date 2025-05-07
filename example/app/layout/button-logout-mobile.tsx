import {
  memo,
  useRef,
  type JSX,
  useCallback,
  type ComponentType,
  type MouseEventHandler,
} from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { routes } from 'app/routes.ts';

import { uuidV7 } from 'utils/uuidv7.ts';
import { storage } from 'utils/storage.ts';

import { LoginOutlineIcon } from 'svg/login-outline.tsx';

import * as AuthService from 'services/auth.ts';

import { navigateIntl } from 'library/intl/navigate.ts';

import {
  fetchFailure,
  fetchRequest,
  fetchSuccess,
  logOut as authLogOut,
} from 'state/reducers/forms.ts';
import { logOut as profileLogOut } from 'state/reducers/profile.ts';
import {
  type ReduxState,
  useAppDispatch,
  useAppSelector,
} from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { Path } from 'state/reducers/forms/types.ts';

type Props = {
  onSelect: () => void;
  iconClassName: string;
  buttonClassName: string;
  buttonLabel: IntlMessageId;
};

type SelectorProps = {
  disabled: boolean;
  isLoggedIn: boolean;
};

const path: Path = ['logIn'] as const;

function selector(state: ReduxState): SelectorProps {
  return {
    disabled: state.forms.logIn.isFetching,
    isLoggedIn: state.profile.isLoggedIn,
  };
}

function F_ButtonLogout({
  onSelect,
  buttonLabel,
  iconClassName,
  buttonClassName,
}: Props): JSX.Element {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { disabled, isLoggedIn } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const interactionIdRef = useRef<string>(uuidV7());

  const onClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(async () => {
    if (!isLoggedIn) {
      return;
    }

    dispatch(fetchRequest({ path }));

    try {
      const visitorId = storage.getItem('visitorId') ?? '';

      await AuthService.logOut(visitorId, interactionIdRef.current)
        .then((): void => {
          dispatch(authLogOut());

          dispatch(profileLogOut());

          dispatch(fetchSuccess({ path }));

          navigateIntl(routes.home, i18n.language, navigate);

          return;
        })
        .catch((error: unknown): void => {
          if (error instanceof Error) {
            console.error(error.message);
          } else if (typeof error === 'string') {
            console.error(error);
          } else {
            console.error(JSON.stringify(error));
          }
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else if (typeof error === 'string') {
        console.error(error);
      } else {
        console.error(JSON.stringify(error));
      }

      if (error instanceof Error) {
        dispatch(
          fetchFailure({
            path,
            errors: [error.message],
          })
        );
      } else if (typeof error === 'string') {
        dispatch(
          fetchFailure({
            path,
            errors: [error],
          })
        );
      } else {
        dispatch(
          fetchFailure({
            path,
            errors: [JSON.stringify(error)],
          })
        );
      }
    }

    onSelect();
  }, [dispatch, i18n.language, isLoggedIn, navigate, onSelect]);

  return (
    <button
      aria-hidden={!isLoggedIn}
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
      type='button'
    >
      <div role='img' aria-hidden className={iconClassName}>
        <LoginOutlineIcon />
      </div>

      {t(buttonLabel)}
    </button>
  );
}

export const ButtonLogout: ComponentType<Props> = memo<Props>(F_ButtonLogout);
