// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import * as importPlugin from 'eslint-plugin-import';
import * as noRelativeImports from 'eslint-plugin-no-relative-import-paths';

export default [{
  ignores: [
    'eslint.config.ts',
    'dist/**',
    'vite.config.ts',
    'vitest.config.ts',
    'vitest.setup.ts',
    'rollup.config.mjs',
  ],
}, {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
    },
    ecmaVersion: 'latest',
  },
  plugins: {
    '@typescript-eslint': tseslint,
    import: importPlugin,
    'no-relative-import-paths': noRelativeImports,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    ...prettier.rules,
    ...(importPlugin.configs?.recommended?.rules ?? {}),
    ...(importPlugin.configs?.typescript?.rules ?? {}),
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/default': 'off',
  },
  settings: {
    'import/parsers': {'@typescript-eslint/parser': ['.ts', '.tsx']},
    'import/resolver': {
      typescript: {},
    },
  },
}, ...storybook.configs["flat/recommended"]];
