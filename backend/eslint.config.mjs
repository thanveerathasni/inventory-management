import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  js.configs.recommended,
  prettier,

  {
    files: ['src/**/*.ts'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'commonjs',

      globals: {
        ...globals.node,

        // Remove Fetch API globals that conflict with Express types
        Request: 'off',
        Response: 'off',
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': importSort,
      'unused-imports': unusedImports,
    },

    rules: {
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'unused-imports/no-unused-imports': 'error',

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-redeclare': 'off',
    },
  },
];