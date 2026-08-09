# Turborepo Starter

A starter kit for building a monorepo with Turborepo and pnpm.

## Packages

- `apps/*`: Monorepo applications.
  - `/storybook/`: A Storybook instance for developing and showcasing components from the `ui` package.
  - `/web/`: A Next.js application.
- `config/*`: Packages containing shared configurations for TypeScript and Vitest.
- `packages/*`: Shared packages used across applications.
  - `/ui/`: A shared UI component library using React and Tailwind CSS.

## Getting Started

1. (optional) Rename the package namespace from `@starter` to your desired namespace in all files.
2. Install dependencies by running `pnpm install` in the root directory.
3. Start developing by running `pnpm dev` to launch the Next.js app, Storybook, and UI package.

## Generating packages and components

1. Run `pnpm gen` to be guided through the process of generating a new component in the `ui` package, the `web` app, or generating an entirely new package.

## Linting

[oxlint](https://oxc.rs/docs/guide/usage/linter.html) lints the entire repo in a single pass from one root config (`.oxlintrc.json`). There are no per-package lint configs or scripts.

- `pnpm lint` — lint the repo
- `pnpm lint:fix` — lint the repo and apply fixes

Both run through Turborepo so that `@starter/ui` is built first. This is not just for caching: linting is type-aware (via `oxlint-tsgolint`, powered by typescript-go), and type-aware rules resolve `@starter/ui` types from its `dist/` output. Without that build, cross-package imports silently degrade to `any` and the results are wrong rather than merely incomplete.

React Hooks rules are provided by `eslint-plugin-react-hooks`, loaded as an oxlint JS plugin so the full React Compiler ruleset is available. It requires no `@typescript-eslint` packages.

### Storybook rules

`eslint-plugin-storybook` is deliberately not installed — it depends on `@typescript-eslint/utils`, which pulls the TypeScript-coupled toolchain this setup avoids. Projects that write story files by hand may want it anyway, particularly for `await-interactions`. To opt in, add the plugin with `pnpm add -Dw eslint-plugin-storybook`, register it under `jsPlugins`, and enable its rules in an override scoped to story files:

```jsonc
{
  "files": ["**/*.stories.{ts,tsx}"],
  "rules": {
    "storybook/await-interactions": "error",
    "storybook/default-exports": "error",
    "storybook/story-exports": "error",
    "storybook/no-renderer-packages": "error",
  },
}
```

Note that `no-renderer-packages` flags the generated story template's `@storybook/react` import; either move `@storybook/react-vite` into `packages/ui` or disable that rule.
