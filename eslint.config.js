import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import rootConfig from '../../eslint.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...rootConfig,
  {
    files: ['**/*.{ts,js}', './**.{ts,js}'],
    languageOptions: {
      ecmaVersion: 2024,
      parserOptions: {
        sourceType: 'module',
        project: `${__dirname}/tsconfig.json`,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'n/hashbang': 'off',
      'n/no-missing-import': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,js}', '**/__tests__/**/*.{ts,js}'],
    languageOptions: {
      parserOptions: {
        project: `${__dirname}/tsconfig.test.json`,
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...Object.fromEntries(
          [
            'describe',
            'test',
            'it',
            'expect',
            'vi',
            'beforeEach',
            'afterEach',
            'beforeAll',
            'afterAll',
          ].map((key) => [key, 'readonly'])
        ),
      },
    },
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },
];
