// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { default: library } = require('@starter/eslint/library.js')

module.exports = [
  {
    ignores: ['node_modules/**', 'eslint.config.cjs'],
  },
  ...library,
]
