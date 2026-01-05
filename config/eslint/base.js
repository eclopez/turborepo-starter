import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      'no-only-tests': noOnlyTests,
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'no-only-tests/no-only-tests': 'error',
    },
  },
]
