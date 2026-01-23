/* eslint-disable no-console */
import type { PlopTypes } from '@turbo/gen'
import { execSync } from 'node:child_process'

interface ComponentAnswers {
  location: string
  name: string
  scope: string
  react: boolean
}

function createComponentGenerator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'list',
        name: 'location',
        message: 'Where would you like to create the component?',
        default: 'ui',
        choices: [
          { name: 'ui', value: 'ui' },
          { name: 'web', value: 'web' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: "What's the component's name (PascalCase, e.g. DataGrid)?",
        validate: (input: string) => {
          if (input.includes('.')) {
            return 'file name cannot include an extension'
          }

          if (input.includes(' ')) {
            return 'file name cannot include spaces'
          }

          if (!input) {
            return 'file name is required'
          }

          return true
        },
      },
      {
        type: 'list',
        name: 'scope',
        message: "What's the component's scope?",
        default: 'atoms',
        choices: [
          { name: 'atom', value: 'atoms' },
          { name: 'molecule', value: 'molecules' },
          { name: 'organism', value: 'organisms' },
        ],
        when: (answers) => answers.location === 'ui',
      },
    ],
    actions: (answers) => {
      const { location } = answers as ComponentAnswers
      const actions: PlopTypes.ActionType[] = []

      if (location === 'ui') {
        actions.push(
          {
            type: 'add',
            path: '{{ turbo.paths.root }}/packages/ui/src/components/{{ scope }}/{{ pascalCase name }}/{{ pascalCase name }}.tsx',
            templateFile: '../templates/component/component.tsx.hbs',
          },
          {
            type: 'add',
            path: '{{ turbo.paths.root }}/packages/ui/src/components/{{ scope }}/{{ pascalCase name }}/{{ pascalCase name }}.test.tsx',
            templateFile: '../templates/component/component.test.tsx.hbs',
          },
          {
            type: 'add',
            path: '{{ turbo.paths.root }}/packages/ui/src/components/{{ scope }}/{{ pascalCase name }}/index.ts',
            templateFile: '../templates/component/index.ts.hbs',
          },
          {
            type: 'add',
            path: '{{ turbo.paths.root }}/packages/ui/src/components/{{ scope }}/{{ pascalCase name }}/{{ pascalCase name }}.stories.tsx',
            templateFile: '../templates/component/component.stories.tsx.hbs',
          },
          {
            type: 'modify',
            path: '{{ turbo.paths.root }}/packages/ui/src/components/{{ scope }}/index.ts',
            transform: (content: string, answers) => {
              const { name } = answers as ComponentAnswers
              const newExport = `export * from './${name}'`

              const lines = content
                .trim()
                .split('\n')
                .filter((line) => line.trim())
              lines.push(newExport)
              lines.sort()

              return lines.join('\n') + '\n'
            },
          },
        )
        actions.push(async (answers) => {
          const { name, scope } = answers as ComponentAnswers
          const cwd = process.cwd()
          console.log('Linting package.json...')
          execSync('pnpm manypkg fix', { stdio: 'inherit', cwd })
          console.log('Fixing prettier issues...')
          execSync(`pnpm prettier --write "packages/ui/src/components/${scope}/${name}/**" --list-different`, { cwd })
          console.log('Linting remaining files...')
          execSync('pnpm lint -- --fix', { stdio: 'inherit', cwd })

          return 'Component successfully created!'
        })
      } else if (location === 'web') {
        actions.push(
          {
            type: 'add',
            path: '{{ turbo.paths.root }}/apps/web/src/components/{{ pascalCase name }}/{{ pascalCase name }}.tsx',
            templateFile: '../templates/component/component.tsx.hbs',
          },
          {
            type: 'add',
            path: '{{ turbo.paths.root }}/apps/web/src/components/{{ pascalCase name }}/{{ pascalCase name }}.test.tsx',
            templateFile: '../templates/component/component.test.tsx.hbs',
          },
          {
            type: 'add',
            path: '{{ turbo.paths.root }}/apps/web/src/components/{{ pascalCase name }}/index.ts',
            templateFile: '../templates/component/index.ts.hbs',
          },
        )
        actions.push(async (answers) => {
          const { name } = answers as ComponentAnswers
          const cwd = process.cwd()
          console.log('Linting package.json...')
          execSync('pnpm manypkg fix', { stdio: 'inherit', cwd })
          console.log('Fixing prettier issues...')
          execSync(`pnpm prettier --write "apps/web/src/components/${name}/**" --list-different`, { cwd })
          console.log('Linting remaining files...')
          execSync('pnpm lint -- --fix', { stdio: 'inherit', cwd })

          return 'Component successfully created!'
        })
      }

      return actions
    },
  })
}

export { createComponentGenerator }
