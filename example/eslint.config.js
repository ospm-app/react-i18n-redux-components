import babelParser from '@babel/eslint-parser';
import babelPresetEnv from '@babel/preset-env';
import cypressPlugin from 'eslint-plugin-cypress';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import optimizeRegexPlugin from 'eslint-plugin-optimize-regex';
import oxlintPlugin from 'eslint-plugin-oxlint';
import promisePlugin from 'eslint-plugin-promise';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPerfPlugin from 'eslint-plugin-react-perf';
import reactReduxPlugin from 'eslint-plugin-react-redux';
import reactPlugin from 'eslint-plugin-react';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import json from 'eslint-plugin-json';
import pluginESx from 'eslint-plugin-es-x';
import i18next from 'eslint-plugin-i18next';
import reactCompiler from 'eslint-plugin-react-compiler';
import nodePlugin from 'eslint-plugin-n';
import css from "@eslint/css";
import { tailwindSyntax } from "@eslint/css/syntax";

const commonRules = {
  "n/no-missing-import": "off",
  "n/no-extraneous-import": "off",
  indent: 'off',
  'multiline-ternary': 'off',
  'func-call-spacing': 'off',
  'operator-linebreak': 'off',
  'space-before-function-paren': 'off',
  semi: ['error', 'always'],
  'comma-dangle': 'off',
  'dot-notation': 'off',
  'react/no-unknown-property': 'off',
  'react/react-in-jsx-scope': 'off',
  'default-case-last': 'off',
  'no-undef': 'off',
  'no-use-before-define': 'off',
  'react/prop-types': 'off',
  'sort-imports': 'off',
  camelcase: 'off',
  'no-useless-return': 'off',
  'sort-requires/sort-requires': 'off',
  'no-console': ['error', { allow: ['warn', 'error', 'info', 'table'] }],
  'no-unused-vars': 'off',
  'no-restricted-globals': [
    'error',
    {
      name: 'name',
      message: 'Use local parameter instead.',
    },
    {
      name: 'event',
      message: 'Use local parameter instead.',
    },
    {
      name: 'fdescribe',
      message: 'Do not commit fdescribe. Use describe instead.',
    },
  ],
  'react-redux/prefer-separate-component-file': 'off',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'optimize-regex/optimize-regex': 'warn',
  'es-x/no-async-iteration': 'error',
  'es-x/no-malformed-template-literals': 'error',
  'es-x/no-regexp-lookbehind-assertions': 'error',
  'es-x/no-regexp-named-capture-groups': 'error',
  'es-x/no-regexp-s-flag': 'error',
  'es-x/no-regexp-unicode-property-escapes': 'error',
};

const jsConfig = {
  files: ['**/*.{js,jsx,mjs}'],
  plugins: {
    'es-x': pluginESx,
    import: importPlugin,
  },
  languageOptions: {
    ecmaVersion: 2024,
    parser: babelParser,
    parserOptions: {
      sourceType: 'module',
      requireConfigFile: false,
      babelOptions: {
        babelrc: false,
        configFile: false,
        plugins: ['@babel/plugin-syntax-import-assertions'],
        presets: [[babelPresetEnv]],
      },
    },
  },
  rules: {
    ...commonRules,
    semi: ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};

const tsConfig = {
  files: ['**/*.{ts,tsx,mts}'],
  plugins: {
    '@typescript-eslint': typescript,
    import: importPlugin,
    'es-x': pluginESx,
  },
  languageOptions: {
    ecmaVersion: 2024,
    parser: tsParser,
    parserOptions: {
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.json',
      createDefaultProgram: true,
    },
  },
  rules: {
    ...commonRules,
    ...typescript.configs.recommended.rules,
    'no-shadow': 'off',
    'total-functions/no-unsafe-readonly-mutable-assignment': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true },
    ],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, typedefs: false },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        name: 'react-redux',
        importNames: ['useSelector', 'useDispatch'],
        message:
          'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
      },
    ],
  },
};

const jsonConfig = {
  files: ['**/*.json'],
  plugins: { json },
  processor: 'json/json',
  rules: {
    'json/*': ['error', { allowComments: true }],
  },
};

const cssConfig = {
  files: ["**/*.css"],
  plugins: {
      css,
  },
  language: "css/css",
  languageOptions: {
    customSyntax: tailwindSyntax,
    tolerant: true,
  },
  ...css.configs.recommended,
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['**/node_modules/**', '.cache/', 'bundled/', 'build/', 'dist/'],
  },
  i18next.configs['flat/recommended'],
  ...tailwindPlugin.configs['flat/recommended'],
  reactCompiler.configs.recommended,
  nodePlugin.configs['flat/recommended-script'],
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts}'],
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react-hooks': reactHooksPlugin,
      'react-perf': reactPerfPlugin,
      'react-redux': reactReduxPlugin,
      'optimize-regex': optimizeRegexPlugin,
      promise: promisePlugin,
      cypress: cypressPlugin,
      oxlint: oxlintPlugin,
      tailwindcss: tailwindPlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        __PATH_PREFIX__: true,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
      tailwindcss: {
        callees: ['classnames'],
        config: 'tailwind.config.ts',
        cssFiles: ['**/*.css'],
        whitelist: ['classnames'],
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'error',
      'tailwindcss/no-contradicting-classname': 'error',
    },
  },
  cssConfig,
  jsConfig,
  tsConfig,
  jsonConfig,
];
