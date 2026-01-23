# Turborepo Starter

A starter kit for building a monorepo with Turborepo and pnpm.

## Packages

- `apps/*`: Monorepo applications.
  - `/storybook/`: A Storybook instance for developing and showcasing components from the `ui` package.
  - `/web/`: A Next.js application.
- `config/*`: Packages containing shared configurations for ESLint, TypeScript, and Vitest.
- `packages/*`: Shared packages used across applications.
  - `/ui/`: A shared UI component library using React and Tailwind CSS.

## Getting Started

1. (optional) Rename the package namespace from `@starter` to your desired namespace in all files.
2. Install dependencies by running `pnpm install` in the root directory.
3. Start developing by running `pnpm dev` to launch the Next.js app, Storybook, and UI package.
