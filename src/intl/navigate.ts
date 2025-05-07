import type { NavigateFunction, NavigateOptions } from 'react-router-dom';

import { VITE_DEFAULT_LOCALE } from 'app/env.ts';

import type { Routes } from 'app/routes.ts';

export function navigateIntl(
  to: Routes,
  locale: string,
  navigate: NavigateFunction,
  options?: NavigateOptions | undefined
): void {
  navigate(
    (VITE_DEFAULT_LOCALE === locale ? `/${to}` : `/${locale}/${to}`).replace(
      /\/\//g,
      '/'
    ),
    options
  );
}
