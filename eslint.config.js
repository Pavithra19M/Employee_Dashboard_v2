import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        document: 'readonly',
        window: 'readonly'
      }
    },
    plugins: {
      react,
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-uses-vars': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  prettierConfig
];