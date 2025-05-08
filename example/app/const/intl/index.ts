import type * as LocaleSource from 'const/intl/en.json';

import { VITE_ENV } from 'app/env.ts';

type LanguageOption = {
  value: Locale
  label: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const locales =
  VITE_ENV === 'production'
    ? (['en', 'ru'] as const)
    : ([
        'te',
        'en',
        'ru'
        // 'ja-JP',
        /* 'fr', 'he', 'es', 'zh', 'de', 'ar' */
      ] as const);

export type Locale = (typeof locales)[number]

// function isAvailableLocale(locale: string): locale is Locale {
//   return locales.includes(locale)
// }

export const languageOptions: ReadonlyArray<LanguageOption> =
  VITE_ENV === 'production'
    ? [
        { value: 'en', label: 'English' },
        // { value: 'ja-JP', label: '日本' },
        // { value: 'te', label: 'Test' },
        // { value: 'fr', label: 'Français' },
        // { value: 'he', label: 'עברית' },
        { value: 'ru', label: 'Русский' }
        // { value: 'es', label: 'Español' },
        // { value: 'zh', label: '中文' },
        // { value: 'de', label: 'Deutsche' },
        // { value: 'ar', label: 'عربى' },
      ]
    : ([
        { value: 'en', label: 'English' },
        // { value: 'ja-JP', label: '日本' },
        { value: 'te', label: 'Test' },
        // { value: 'fr', label: 'Français' },
        // { value: 'he', label: 'עברית' },
        { value: 'ru', label: 'Русский' }
        // { value: 'es', label: 'Español' },
        // { value: 'zh', label: '中文' },
        // { value: 'de', label: 'Deutsche' },
        // { value: 'ar', label: 'عربى' },
      ] as const);

type LocaleMessages = typeof LocaleSource

export type IntlMessageId = keyof LocaleMessages
