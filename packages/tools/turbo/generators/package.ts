/* eslint-disable no-console */
import type { PlopTypes } from '@turbo/gen'
import { execSync } from 'node:child_process'

interface PackageAnswers {
  name: string
  scope: string
  react: boolean
}

function createPackageGenerator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('package', {
    description: 'Create a new package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the package name (without the `@starter/` prefix)?",
      },
      {
        type: 'list',
        name: 'scope',
        message: "What's the package scope?",
        default: 'packages',
        choices: [
          { name: 'config', value: 'config' },
          { name: 'packages', value: 'packages' },
        ],
      },
      {
        type: 'confirm',
        name: 'react',
        message: 'Will this package use React?',
        default: true,
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ scope }}/{{ name }}/package.json',
        templateFile: '../templates/package/package.json.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ scope }}/{{ name }}/tsconfig.json',
        templateFile: '../templates/package/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ scope }}/{{ name }}/vitest.config.ts',
        templateFile: '../templates/package/vitest.config.ts.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ scope }}/{{ name }}/eslint.config.mjs',
        templateFile: '../templates/package/eslint.config.mjs.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ scope }}/{{ name }}/src/index.ts',
        template: '',
        skipIfExists: true,
      },
      async (answers) => {
        const { name, scope } = answers as PackageAnswers
        const cwd = process.cwd()
        console.log('Linting package.json...')
        execSync('pnpm manypkg fix', { stdio: 'inherit', cwd })
        console.log('Fixing prettier issues...')
        execSync(`pnpm prettier --write ${scope}/${name}/** --list-different`)
        console.log('Installing dependencies (this may take a moment)...')
        execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit', cwd })
        console.log('Linting remaining files...')
        execSync('pnpm lint -- --fix', { stdio: 'inherit' })

        return 'Package successfully created!'
      },
    ],
  })
}

export { createPackageGenerator }
