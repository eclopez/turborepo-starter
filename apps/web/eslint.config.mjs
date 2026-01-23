// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import next from '@next/eslint-plugin-next'
import react from '@starter/eslint/react.js'

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'eslint.config.mjs', '.turbo/**'],
  },
  ...react,
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs['core-web-vitals'].rules,
    },
  },
]
