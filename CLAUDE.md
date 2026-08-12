# Yeelds frontend — coding standards

Consolidated standards; a review rejects code that breaks them.

## Repository shape

pnpm workspaces + Turborepo, four packages:

| Package             | Name               | What it is                                                       |
| ------------------- | ------------------ | ---------------------------------------------------------------- |
| `packages/sdk`      | `@yeelds/sdk`      | Typed client for the Yeelds API. ESM-only Vite build, zero deps. |
| `packages/ui`       | `@yeelds/ui`       | Design system: theme and shared React components.                |
| `packages/registry` | `@yeelds/registry` | Yeelds registry for chains and protocols.                        |
| `packages/frontend` | `frontend`         | The Next.js App Router app. Private.                             |

Run everything from the root (`pnpm lint`/`format`/`build` →
`turbo run <task>`). `packages/frontend` depends on the `dist` output of `sdk`,
`ui`, and `registry`, so never run `next build` directly on a clean tree.

### Dependencies & env vars

- Shared deps go in `pnpm-workspace.yaml`'s `catalog:` block and are referenced
  as `"catalog:"`, never a literal version. Workspace deps are always
  `"workspace:*"`.
- Caret (`^`) by default; pin exactly where minor bumps break builds (`next`,
  `eslint-config-next` — keep in lockstep). Library packages declare
  consumer-owned deps as `peerDependency`, mirrored in `devDependencies`, marked
  `external` in Vite config — all three agree.
- Every `NEXT_PUBLIC_*` var must be added to `packages/frontend/turbo.json`'s
  `build.env` array or Turbo serves a stale cached build. Server-only secrets
  skip the stale-cache concern but follow the same rule. Either way, a new var
  touches four places: `src/commons/env.ts`, `.env.example`, `turbo.json`, and
  this list. `YEELDS_API_TOKEN` is the first server-only one — see
  `src/commons/server.ts` below.

## Naming

- **Directories: kebab-case, always** (`hot-pick-card`). **One component per
  directory, exported from `index.tsx`**; import the directory
  (`from "@/src/components/hot-pick-card"`). Sibling/variant components live in
  the same directory (`grade-popover/{index.tsx, axis-chip.tsx}`), sharing its
  `styles.module.css` — always that name, never `index.module.css` or
  `<component>.module.css`.
- **Hooks are the only camelCase filenames** (`hooks/useOpportunities.ts`).
  Multiple implementations become a kebab-case directory with an `index.ts`
  dispatcher and camelCase members. Everything else — utils, types, commons,
  assets, context — is kebab-case.
- Constants are `UPPER_SNAKE_CASE`, shared ones in `src/commons/index.ts` or
  colocated at file top. Numeric separators: `50_000`, not `50000`.

## Components

```tsx
export function ChainDot({ chain, size = 24, className }: ChainDotProps) {
  return <span className={classNames("root", styles.root, className)} />;
}
```

- **`export function Name()`** — function declaration, named export. Never
  `export const Name = () => {}` or `React.FC`. **`export default`** only where
  Next.js requires it (`app/**/page.tsx`, `layout.tsx`, `error.tsx`,
  `not-found.tsx`, `opengraph-image.tsx`, `src/i18n/request.ts`) — nowhere else.
- **Props are a local `interface <Component>Props`** immediately above the
  component, destructured with inline defaults; export only if needed elsewhere.
  For DOM-attribute forwarding, intersect rather than extend:
  `BaseProps & Omit<HTMLAttributes<HTMLDivElement>, keyof BaseProps>`.
  `forwardRef` only where a consumer needs the ref.
- **Icons are components, not elements**
  (`icon: FunctionComponent<SVGProps<SVGSVGElement>>`, rendered
  `<Icon className={styles.icon} />`). **`className` is always the last prop**,
  immediately before children/`>`.
- **Handlers are local functions named `handleOn<Event>`** (`handleOnClose`);
  `useCallback` only when identity is passed down or feeds a dependency array.
  **`"use client"` only where a client feature is used** — push the boundary as
  deep as it will go.
- **`import styles from "./styles.module.css"` is the last import**, after a
  blank line, no exceptions. Early returns without braces are preferred:
  `if (!grade) return null;`. Comments are bare minimum, explain _why_ not what,
  `TODO:`/`FIXME:` prefixed (`FIXME` with an upstream issue link).
- **`classnames`, imported as `classNames`** — no `clsx`, `cn()`,
  `tailwind-merge`, or CVA. Conditional classes use the object form, literal
  class name first as a stable debugging hook, then the module class:
  `classNames("root", styles.root, className, { [styles.active]: active })`.
  Variants/sizes are selected by indexing the styles object (`styles[variant]`),
  not a lookup map. Multiple slots take an object:
  `className?: { root?: string; icon?: string; label?: string }`.

## Styling

Tailwind CSS 4, CSS-first config — no `tailwind.config.*`. All tokens live in
`packages/frontend/src/app.css`. **Classes are written in CSS modules, not JSX**
— no long Tailwind strings in components, and **no inline `style={{}}`** for
anything a class can express (reserved for genuinely computed values: a pixel
size from a prop, a portal's `top`/`left`).

```css
@reference "../../app.css";

.root {
  @apply relative flex items-center gap-3 rounded-2xl p-4;
  @apply surface-primary stroke-divider border;
}
```

- **Every `.module.css` opens with `@reference` to `app.css`** or `@apply`
  fails. **Class names are camelCase** (`titleWrapper`) — never kebab.
- **Modifiers are separate single-word classes combined by compound selectors**
  (`.root.active`) — never BEM-style compound names.
- A rule body is normally a single `@apply`; raw CSS, custom properties, and
  keyframes are the escape hatch, not the default. **No `composes:`** — reuse
  goes through the `@utility` layer.
- **Tokens go in `@theme`; semantic roles get an `@utility`; components consume
  the utility, not the raw color.** A hardcoded hex is a bug. Dark-only theme;
  if light mode lands, use:
  `@variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` via
  `next-themes` with `attribute="data-theme"`, not a `.dark` class.

## TypeScript

`verbatimModuleSyntax: true` everywhere — type-only imports **must** be marked,
including inline in a value-import list
(`import { type ReactNode, useState } from "react"`). `strict`,
`isolatedModules`, `noUnusedLocals`; all packages extend `tsconfig.base.json`.
Alias `@/*` → `["./*", "./src/*"]`; write `@/src/...` for cross-area imports,
relative for siblings (`../chain-dot`).

## Data fetching

TanStack Query for all remote data, always through `@yeelds/sdk` — never a bare
`fetch` in a component. `@tanstack/eslint-plugin-query` is enabled.

```ts
export function useOpportunities({
  enabled = true,
  limit,
}: UseOpportunitiesParams = {}): UseOpportunitiesReturnValue {
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["opportunities", limit],
    queryFn: () => YEELDS_API_CLIENT.fetchOpportunities({ limit }),
    enabled,
  });
  return {
    loading: isPending,
    fetching: isFetching,
    opportunities: data || [],
  };
}
```

- Params: a **single destructured object** typed
  `interface UseXParams extends HookBaseParams` (`HookBaseParams` =
  `{ enabled?: boolean }` in `src/types/hooks.ts`), default `enabled = true`.
  `queryKey` is an inline array literal — a string tag, then every param
  affecting the result.
- `queryFn` wraps its body in `try`/`catch`, logs with `console.error`, and
  **rethrows**.
- **Return value is an explicitly typed object with domain-renamed flags**
  (`isPending → loading`, `isFetching → fetching`, `data → opportunities`) —
  never leak raw `data`/`isPending`. Shared client state is React Context in
  `src/context/`, with a `useX()` accessor that throws outside its provider — no
  Redux, no Zustand.

## i18n

`next-intl`. Every route lives under `src/app/[locale]/`.

- Messages: `messages/<locale>.json`, camelCase namespaces mirroring the feature
  (`explore`, `navigation`). Client: `const t = useTranslations("explore")` →
  `t("title")`. Server: `const t = await getTranslations()` from
  `next-intl/server`, plus `setRequestLocale(locale)` in the layout.
- **Keys are type-safe** via `global.d.ts` augmenting `AppConfig` with
  `Messages: typeof en` — a typo'd key is a compile error, keep it that way.
  **Navigation uses the wrappers from `@/src/i18n/routing`** (`Link`,
  `useRouter`, `usePathname`), not `next/link`/`next/navigation`, so the locale
  prefix is preserved (`useSearchParams` still comes from `next/navigation`). No
  user-facing string is hardcoded in a component.

## Env

All `process.env` access is centralized in `src/commons/env.ts`, exported as
typed `UPPER_SNAKE` consts, validated at module load:

```ts
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;
if (
  !ENVIRONMENT ||
  !(Object.values(Environment) as string[]).includes(ENVIRONMENT)
)
  throw new Error("A valid NEXT_PUBLIC_ENVIRONMENT env variable is needed");
```

A required var is cast to its real type (the throw below is what makes that cast
true); an optional var is typed `string | undefined` with no throw. **Never read
`process.env` anywhere else.** Deployment hostnames aren't env vars — they live
in `@yeelds/sdk`'s `SERVICE_URLS`, keyed by `Environment`.
`src/commons/index.ts` builds one client per environment and exports the
resolved `YEELDS_API_CLIENT`; hooks import it and never think about the
deployment.

**Server-only secrets**: a var with no `NEXT_PUBLIC_` prefix (e.g.
`YEELDS_API_TOKEN`) is read once in `env.ts` as **optional, non-throwing** —
`env.ts` is imported by client components too, and a throwing read there would
crash every browser load. The required check lives in `src/commons/server.ts`,
guarded with `import "server-only"` so an accidental client import fails the
build instead of shipping the secret. Only server-side code (e.g. a Route
Handler) imports from `server.ts`.

## Keeping docs in sync

Any change that alters something a doc file describes — package list, setup
steps, commands, engine/tool versions, env vars — updates that doc in the same
change. Docs of record: this file, `README.md`, `CONTRIBUTING.md`, and each
package's own `README.md`. A PR that changes the described behavior without
updating the doc is incomplete.
