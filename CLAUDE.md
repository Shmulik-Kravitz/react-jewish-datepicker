# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Yarn 4 monorepo containing a React Jewish date picker component. Converts between Gregorian and Hebrew calendars, supports Hebrew/English, single/range selection, holiday/Shabbat filtering, and inline display.

## Commands

```bash
# Build all packages (order-aware: core -> react -> example)
yarn build

# Run all tests with coverage
yarn test

# Dev server (any workspace). Each workspace's own `start` script picks the right
# harness: the example builds src/index.tsx, the libraries build their app/index.tsx.
# Don't call g:start / g:start-app directly — the wrong one for a workspace fails.
# Output goes to <workspace>/config/static/, which is tracked, so running the dev
# server shows up in git status.
cd packages/<workspace> && yarn start

# Dev build with watch (any workspace)
cd packages/<workspace> && yarn g:dev

# Build single workspace
cd packages/<workspace> && yarn g:build

# Test single workspace
cd packages/<workspace> && yarn g:test

# Increment patch version across all workspaces
yarn inc-version
```

## Architecture

Three workspace packages with this dependency chain:

```
example -> reactJewishDatePicker -> jewishDatesCore
```

- **jewishDatesCore** (`packages/jewishDatesCore/`): Pure JS library for Gregorian-Hebrew date conversion, holiday calculation, Shabbat detection. Uses `jewish-date` and `dayjs`. No React dependency.
- **reactJewishDatePicker** (`packages/reactJewishDatePicker/`): React component library. Key components: `ReactJewishDatePicker` (dropdown picker), `Month` (inline calendar). Props defined in `src/interfaces.ts`, main component in `src/reactJewishDatePicker.tsx`.
- **example** (`packages/example/`): Vite-based demo site. Each example has a live demo in `src/examples/examples.tsx` paired with a code snippet string in `src/code/code.ts`. Build output copies to root `docs/` for GitHub Pages.

## Build System

- **esbuild** via shared scripts in `config/` (build.ts, buildApp.ts, start.ts, startApp.ts)
- Each workspace outputs: CJS (`dist/index.js`), ESM (`dist/mjs/index.js`), declarations (`lib/`)
- TypeScript declarations emitted separately via `tsc-prog`

## Testing

- **Vitest** with jsdom environment, shared config at `config/vitest.config.ts`
- Tests in `src/__tests__/` directories within each workspace
- Uses `@testing-library/react` and `@testing-library/jest-dom`
- Globals enabled (no imports needed for describe/it/expect)

## Adding Examples

When adding a new feature to the datepicker, update the example app:
1. Add code snippet string to `packages/example/src/code/code.ts`
2. Add the example section in `packages/example/src/examples/examples.tsx` (both the `ExampleLinkList` entry and the rendered `<ReactJewishDatePickerExample>`)
3. If the feature needs a new prop passed through, update `ReactJewishDatePickerExampleProps` in `packages/example/src/reactJewishDatePickerExample/ReactJewishDatePickerExample.tsx`

## CI/CD

GitHub Actions (`.github/workflows/ci.js.yml`): builds + tests on all branches. On master, auto-increments patch version, tags, and publishes to npm.
