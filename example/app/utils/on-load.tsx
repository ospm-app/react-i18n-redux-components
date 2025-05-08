import { type ComponentType, type ReactNode, memo, useEffect } from 'react';

import { storage } from 'utils/storage';

import { toggleDarkMode } from 'state/reducers/app';
import { type ReduxState, useAppDispatch, useAppSelector } from 'state/store';

type Props = {
  children: ReactNode;
};

function selector(state: ReduxState): boolean {
  return state.app.isDarkMode;
}

function F_OnLoad({ children }: Props): ReactNode {
  const isDarkMode = useAppSelector<boolean>(selector);

  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      storage.setItem('isDarkMode', 'true');

      if (isDarkMode === false) {
        dispatch(toggleDarkMode());
      }
    }
  }); // Run only once

  return children;
}

export const OnLoad: ComponentType<Props> = memo<Props>(F_OnLoad);
