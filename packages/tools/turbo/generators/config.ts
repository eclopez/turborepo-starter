import type { PlopTypes } from '@turbo/gen'
import { createComponentGenerator } from './component'
import { createPackageGenerator } from './package'

/**
 * Registers all generators.
 * @param {PlopTypes.NodePlopAPI} plop - The Plop API instance.
 */
function generator(plop: PlopTypes.NodePlopAPI): void {
  createComponentGenerator(plop)
  createPackageGenerator(plop)
}

export default generator
