import {
  memo,
  useRef,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type ReactNode,
  useLayoutEffect,
  type ComponentType,
  type MouseEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from 'app/routes.ts';

import { noop } from 'utils/noop.ts';
import { isBrowser } from 'utils/is-browser.ts';

import { profileSetComplete } from 'state/reducers/profile.ts';

import { LinkIntl } from 'library/intl/link.tsx';

import { InfoIcon } from 'svg/info.tsx';

import {
  useAppDispatch,
  useAppSelector,
  type ReduxState,
} from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

import { text } from 'styles/styles.ts';
import { profileIncomplete } from 'styles/layout.ts';

function selector(state: ReduxState): boolean {
  return state.profile.isComplete;
}

type Props = {
  incompleteProfileMessage: IntlMessageId;
};

function F_ProfileIncomplete({ incompleteProfileMessage }: Props): JSX.Element {
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (typeof timeoutRef.current === 'number') {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [hidden, setHidden] = useState<boolean>(true);

  const onClick = useCallback<
    MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  >(() => {
    setHidden(true);

    if (isBrowser) {
      timeoutRef.current = window.setTimeout((): void => {
        dispatch(profileSetComplete(true));
      }, 500);
    } else {
      dispatch(profileSetComplete(true));
    }
  }, [dispatch]);

  const content = useMemo<ReactNode>(() => {
    return t(incompleteProfileMessage, {
      replace: {
        a(...chunks: Array<ReactNode>): Array<JSX.Element> {
          return [
            <LinkIntl
              key='link'
              to={routes.profile}
              className={text.linkClassName}
              onClick={onClick}
            >
              {chunks}
            </LinkIntl>,
          ];
        },
      },
    });
  }, [incompleteProfileMessage, t, onClick]);

  const isComplete = useAppSelector<boolean>(selector);

  useLayoutEffect((): (() => void) => {
    function show(): void {
      setHidden(false);
    }

    if (!isComplete) {
      if (isBrowser) {
        window.setTimeout(show, 0);
      } else {
        show();
      }

      return function cleanup(): void {
        setHidden((hidden: boolean): boolean => {
          dispatch(profileSetComplete(hidden));

          return hidden;
        });
      };
    }

    return noop;
  }, [isComplete, dispatch]);

  return (
    <div aria-hidden={hidden} className={profileIncomplete.sectionClassName}>
      <div className={profileIncomplete.infoClassName}>
        <div
          role='img'
          aria-hidden
          className={profileIncomplete.iconClassNames}
        >
          <InfoIcon />
        </div>
        <div className={text.paragraphSmallClassName}>{content}</div>
      </div>

      <button
        className={profileIncomplete.iconClassNames}
        onClick={onClick}
        type='button'
      >
        &times;
      </button>
    </div>
  );
}

export const ProfileIncomplete: ComponentType<Props> =
  memo<Props>(F_ProfileIncomplete);
