import { configureStore } from '@reduxjs/toolkit';
import {
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  useDispatch,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  useSelector,
  type TypedUseSelectorHook
} from 'react-redux';

import { reducer } from 'state/reducers/index.ts';
import { VITE_ENV } from 'app/env.ts';

export const store = configureStore({
  reducer,
  devTools: VITE_ENV === 'local'
});

type AppDispatch = typeof store.dispatch

// type GetState = typeof store.getState

export type ReduxState = ReturnType<typeof store.getState>
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;
