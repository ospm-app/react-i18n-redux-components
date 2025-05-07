import {
  memo,
  type JSX,
  useCallback,
  type ComponentType,
  type MouseEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ClientOnly } from 'remix-utils/client-only';

import { toggleDarkMode } from 'state/reducers/app.ts';
import {
  type ReduxState,
  useAppDispatch,
  useAppSelector,
} from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

import { MoonIcon } from 'svg/moon.tsx';
import { SunIcon } from 'svg/sun.tsx';

type Props = {
  iconClassName: string;
  buttonClassName: string;
  darkModeLabel: IntlMessageId;
  lightModeLabel: IntlMessageId;
};

function selector(state: ReduxState): boolean {
  return state.app.isDarkMode;
}

function F_DarkModeToggle({
  darkModeLabel,
  iconClassName,
  buttonClassName,
  lightModeLabel,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector<boolean>(selector);

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  return (
    <button type='button' className={buttonClassName} onClick={onClick}>
      <div className={iconClassName}>
        <ClientOnly fallback={null}>
          {(): JSX.Element => {
            return isDarkMode ? <MoonIcon /> : <SunIcon />;
          }}
        </ClientOnly>
      </div>

      <ClientOnly fallback={null}>
        {(): JSX.Element => {
          return <>{t(isDarkMode ? darkModeLabel : lightModeLabel)}</>;
        }}
      </ClientOnly>
    </button>
  );
}

export const DarkModeToggle: ComponentType<Props> =
  memo<Props>(F_DarkModeToggle);
