export default {
  '*.{js,jsx,mjs,cjs,ts,tsx}': (files) => [`oxlint --fix ${files.join(' ')}`, `prettier --write ${files.join(' ')}`],
  '*.{json,md,yaml,yml,css}': ['prettier --write'],
}
