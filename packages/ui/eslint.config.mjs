// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import react from '@starter/eslint/react.js'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.mjs'],
  },
  ...react,
]
