import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { ignores: ['dist', 'webpack*', 'src/assets'] },
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx}', '**/*.{ts,tsx}', '**/*.{mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
];
