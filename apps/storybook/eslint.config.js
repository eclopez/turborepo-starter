// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// @ts-nocheck
import react from '@starter/eslint/react.js'
import reactRefresh from 'eslint-plugin-react-refresh'
import storybook from 'eslint-plugin-storybook'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'storybook-static/**'],
  },
  ...react.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  reactRefresh.configs.vite,
  ...storybook.configs['flat/recommended'],
]
