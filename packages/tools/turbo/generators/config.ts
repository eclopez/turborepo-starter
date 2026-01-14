import type { PlopTypes } from '@turbo/gen'
import { createPackageGenerator } from './package'

/**
 * Registers all generators.
 * @param {PlopTypes.NodePlopAPI} plop - The Plop API instance.
 */
function generator(plop: PlopTypes.NodePlopAPI): void {
  createPackageGenerator(plop)
}

export default generator
