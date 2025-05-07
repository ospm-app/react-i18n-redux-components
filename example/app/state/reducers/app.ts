import { createSlice } from '@reduxjs/toolkit';

import { storage } from 'utils/storage.ts';

type AppState = {
  isAutoLoginTriggered: boolean
  isAutoLoginFinished: boolean
  isDarkMode: boolean
  isInitialized: boolean
  isMobileMenuOpen: boolean
}

const initialState: Readonly<AppState> = {
  isAutoLoginTriggered: false,
  isAutoLoginFinished: false,
  isInitialized: false,
  isMobileMenuOpen: false,
  isDarkMode: storage.getItem('isDarkMode') === 'true'
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMobileMenu(state: AppState): void {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleDarkMode(state: AppState): void {
      state.isDarkMode = !state.isDarkMode;
    },
    triggerAutoLogin(state: AppState): void {
      state.isAutoLoginTriggered = true;
    },
    updateAutoLoginFinished(state: AppState): void {
      state.isAutoLoginFinished = true;
    }
  }
});

export const {
  toggleMobileMenu,
  toggleDarkMode,
  triggerAutoLogin,
  updateAutoLoginFinished
} = appSlice.actions;

export const reducer = appSlice.reducer;
