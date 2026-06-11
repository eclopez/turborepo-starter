import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: getAbsolutePath('@storybook/react-vite'),
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': resolve(__dirname, '../../../packages/ui/src'),
        },
      },
      build: {
        ...config.build,
        // Increase chunk size warning limit to silence storybook's warning
        chunkSizeWarningLimit: 1500,
      },
    }
  },
}
export default config
