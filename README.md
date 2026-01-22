# Turborepo Starter

A starter kit for building a monorepo with Turborepo and pnpm.

## Packages

- `apps/*`: Monorepo applications.
  - `/storybook/`: A Storybook instance for developing and showcasing components from the `ui` package.
  - `/web/`: A Next.js application.
- `config/*`: Packages containing shared configurations for ESLint, TypeScript, and Vitest.
- `packages/*`: Shared packages used across applications.
  - `/ui/`: A shared UI component library using React and Tailwind CSS.
