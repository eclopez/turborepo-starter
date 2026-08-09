import { defineConfig } from 'tsdown'

const config = defineConfig({
  // Copy theme.css without processing
  copy: [{ from: 'src/styles/theme.css', to: 'dist/styles' }],
  css: {
    fileName: 'styles/ui.css',
    transformer: 'postcss',
  },
  dts: true,
  entry: {
    index: 'src/index.ts',
    'styles/ui': 'src/styles/ui.css',
  },
  fixedExtension: false,
  format: ['esm'],
  plugins: [
    {
      name: 'strip-dts-sourcemap-comment',
      // Declaration maps are unavailable while the TypeScript 7 API is experimental, but
      // `sourcemap` still adds a reference to them
      // TODO: Remove once tsdown emits declaration maps with TypeScript 7
      generateBundle(_options, bundle) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === 'chunk' && chunk.fileName.endsWith('.d.ts')) {
            chunk.code = chunk.code.replace(/\n?\/\/# sourceMappingURL=.+$/, '')
          }
        }
      },
    },
  ],
  sourcemap: true,
})

export default config
