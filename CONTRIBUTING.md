# Contributing

This document provides detailed instructions on contributing to the Yeelds
project, which is built with Next.js and uses `pnpm` as the package manager.

## Setup

Requires Node `>=22 <26` and pnpm `11`.

```bash
pnpm install
cp packages/frontend/.env.example packages/frontend/.env.local
pnpm build
```

`packages/frontend` consumes the SDK's build output, so `pnpm build` (via Turbo)
must run once before the first `dev`.

## Commands

Run from the repository root:

| Command                      | What it does                                 |
| ---------------------------- | -------------------------------------------- |
| `pnpm build`                 | Builds every package in dependency order.    |
| `pnpm lint`                  | ESLint + Prettier check across all packages. |
| `pnpm format`                | ESLint `--fix` + Prettier `--write`.         |
| `pnpm --filter frontend dev` | Starts the Next.js dev server on `:3000`.    |

The app is served at `http://localhost:3000`, which redirects to `/en/explore`.
