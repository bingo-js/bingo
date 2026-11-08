import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
import vitest from '@vitest/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import jsonc from 'eslint-plugin-jsonc';
import packageJson from 'eslint-plugin-package-json';
import perfectionist from 'eslint-plugin-perfectionist';
import * as regexp from 'eslint-plugin-regexp';
import yml from 'eslint-plugin-yml';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      '**/*.snap',
      '**/node_modules',
      'coverage',
      'packages/*/.astro',
      'packages/*/dist',
      'packages/*/lib',
      // Remove after https://github.com/bingo-js/bingo/issues/527
      'packages/*/bin/*.js',
      'packages/*/tsconfig.tsbuildinfo',
      'packages/site/src/content',
      'packages/site/src/env.d.ts',
      'pnpm-lock.yaml',
    ],
  },
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },
  {
    extends: [
      comments.recommended,
      js.configs.recommended,
      jsdoc.configs['flat/contents-typescript-error'],
      jsdoc.configs['flat/logical-typescript-error'],
      jsdoc.configs['flat/stylistic-typescript-error'],
      perfectionist.configs['recommended-natural'],
      regexp.configs['flat/recommended'],
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.config.{js,ts}'],
        },
      },
    },
    rules: {
      // These on-by-default rules work well for this repo if configured
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: 'only-allowed-literals' },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'all' }],
      'jsdoc/informative-docs': 'error',

      // These on-by-default rules cause too much friction for this repo
      'no-undef': 'off',

      // Stylistic concerns that don't interfere with Oxfmt
      'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'operator-assignment': 'error',
      'perfectionist/sort-imports': 'off',
    },
    settings: { perfectionist: { partitionByComment: true, type: 'natural' } },
  },
  {
    extends: [jsonc.configs['flat/recommended-with-json']],
    files: ['**/*.json'],
  },
  {
    extends: [packageJson.configs.recommended, packageJson.configs.stylistic],
    files: ['**/package.json'],
  },
  {
    extends: [markdown.configs.recommended],
    files: ['**/*.md'],
    ignores: ['CHANGELOG.md'],
    rules: {
      // https://github.com/eslint/markdown/issues/294
      'markdown/no-missing-label-refs': 'off',
    },
  },
  // Test only rules
  {
    extends: [vitest.configs.recommended],
    files: ['**/*.test.*'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'vitest/no-conditional-expect': 'off',
    },
    settings: { vitest: { typecheck: true } },
  },
  {
    extends: [yml.configs['flat/recommended'], yml.configs['flat/prettier']],
    files: ['**/*.{yml,yaml}'],
    rules: {
      'yml/file-extension': ['error', { extension: 'yml' }],
      'yml/sort-sequence-values': [
        'error',
        {
          order: { type: 'asc' },
          pathPattern: '^.*$',
        },
      ],
    },
  },
  {
    files: ['pnpm-workspace.yaml'],
    rules: {
      'yml/file-extension': 'off',
      'yml/sort-keys': ['error', { order: { type: 'asc' }, pathPattern: '^.*$' }],
    },
  },
);
