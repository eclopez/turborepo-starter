import { defineConfig } from 'tsdown'

const config = defineConfig({
  // Never wipe dist/: `tsdown --watch` starts alongside `next dev`, and a wipe under a live dev server
  // leaves web resolving `@…/ui/styles/*` to a missing file, which Turbopack caches as a 500 until the
  // CSS is touched. Builds overwrite in place; `pnpm clean` wipes dist for a from-scratch build.
  clean: false,
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
