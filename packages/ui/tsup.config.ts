import { defineConfig } from 'tsup'

const isWatch = process.argv.includes('--watch')

const config = defineConfig({
  clean: !isWatch,
  dts: true,
  entry: {
    index: 'src/index.ts',
    'styles/theme': 'src/styles/theme.css',
    'styles/ui': 'src/styles/ui.css',
  },
  external: ['react', 'react-dom'],
  format: ['esm'],
  sourcemap: true,
  // Copy theme.css without processing
  onSuccess: 'cp src/styles/theme.css dist/styles/theme.css',
  ...(isWatch && {
    watch: ['src'],
  }),
})

export default config
