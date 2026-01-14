import reactConfig from '@starter/vitest/react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  reactConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      exclude: ['node_modules'],
    },
  }),
)
