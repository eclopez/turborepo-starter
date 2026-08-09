import reactConfig from '@starter/vitest/react'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  reactConfig,
  defineConfig({
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      exclude: ['node_modules', '.next'],
    },
  }),
)
