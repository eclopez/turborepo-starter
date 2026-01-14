import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from './base.ts'

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./setupTests.ts'],
      css: true,
    },
  }),
)
