# Changelog

All notable changes to the packages published from this repository:

- **[react-jewish-datepicker](https://www.npmjs.com/package/react-jewish-datepicker)** — the React component
- **[jewish-dates-core](https://www.npmjs.com/package/jewish-dates-core)** — the framework-free date/holiday layer it is built on

Both packages share a single version number and are released together, so
`react-jewish-datepicker@3.0.1` always depends on `jewish-dates-core@3.0.1`.

This project follows [Semantic Versioning](https://semver.org/). Entries are
tagged **[picker]** or **[core]** to show which package they affect.

Full prop and helper documentation lives in the
[README](https://github.com/Shmulik-Kravitz/react-jewish-datepicker#readme) and
on the [demo site](https://react-jewish-datepicker.js.org/).

---

## 3.0.2 — 2026-08-24

### Fixed

- **[picker]** The month/year header no longer overflows the calendar when the
  labels are long. The header grid and the two selects may now shrink
  (`minmax(0, …)` in place of `1fr`) instead of pushing past the edge, and the
  selects size to their content rather than each claiming half the row.
- **[picker]** The month and year labels are centred against the navigation
  arrows — vertically (`align-items: center`, previously `start`) and, within
  each select, horizontally (`text-align-last: center`, previously the
  browser's start-aligned default).
- **[picker]** The weekday headings line up with the day columns beneath them.
  The weekday row now carries the same `gap` and horizontal padding as the day
  grid, replacing the per-cell margin that had the two grids on different
  tracks.
- **[picker]** Mobile: focusing the month or year select no longer makes iOS
  Safari zoom the page and shift the calendar. The selects are set to 16px,
  the threshold below which Safari zooms on focus.
- **[picker]** Mobile: the sliding-months header centres its labels like the
  standard header does. Its arrow columns were pinned at 36px by a more
  specific rule while the arrows themselves grew to the 44px touch target,
  which pushed the labels off-centre.

### Changed

- **[core] [picker]** `dayjs` bumped to `^1.11.23` and `jewish-date` to
  `^2.0.29`.
- **[core] [picker]** This changelog now ships inside both npm tarballs, and
  each README links to it.
- **[core] [picker]** The README badge row was repaired. The CI badge named a
  workflow that no longer exists and rendered broken, so it now points at the
  current workflow; the bundlephobia size badge, which had also stopped
  resolving, was dropped; and the license, downloads, and stars badges link to
  their sources instead of sitting there unclickable.

### Internal

- The release workflow creates a GitHub release for every tag, using this
  file's section for the released version as the release notes, and stamps the
  resolved version onto the `Unreleased` heading before committing.
- Vitest configuration moved from `config/vitest/` to `config/`, and the build
  toolchain was bumped (esbuild, vite, vitest, jsdom, type packages).
- Each release also carries both packed tarballs as GitHub release assets,
  renamed per package so the two don't collide under one `package.tgz`.
- The shared Vitest setup file is loaded again. The config it moved next to
  registered only `@testing-library/jest-dom`, which left the
  `window.matchMedia` stub that setup file defines unused under jsdom.
- The `config/` build and dev scripts run as ESM: `import.meta.dirname` in place
  of `__dirname`, explicit `.ts` extensions on relative imports, and
  `esbuild-node-externals` on 2.0.
- The demo site's badges carry alt text, and its CI badge was repointed
  alongside the READMEs'.
- `dev.md`, a stray note on running a local Verdaccio registry, was removed.

## 3.0.1 — 2026-07-28

### Added

- **[picker] `showHolidays` prop** (default `false`). Marks yom tov, chol
  hamoed, rosh chodesh, chanukah, purim and fasts with a dot and class names,
  and adds the holiday name to the day's tooltip and accessible name. Opt-in
  because it costs a holiday lookup per cell; the result is memoized per month.
- **[picker] `showShabbat` prop** (default `true`). Tints Shabbat and tags
  Friday with `isErevShabbat`. This is a day-of-week check with no holiday
  lookup, so leaving it on is free. Pass `showShabbat={false}` to restore the
  pre-3.0.1 appearance.
- **[picker] `isIsrael` prop** (default `true`). Selects the Israeli rather than
  the diaspora holiday calendar. Only affects `showHolidays` — for example,
  16 Tishri is chol hamoed in Israel and yom tov outside it.
- **[core] Holiday and Shabbat API** in the new `holidays` module, re-exported
  from the package root:
  - `getHolidayInfo(date, isIsrael?, isHebrew?)` — holiday summary for a
    `Date` or a `BasicJewishDate`.
  - `getHolidayNames(info)` — holiday names, already localized (English or
    Hebrew) by the `isHebrew` argument given to `getHolidayInfo`.
  - `getTzomInfo(info)` — the fast on that day and whether it was `advanced`,
    `postponed`, or fell on its own date (`shift: null`).
  - `getHolidayClassNames(info)` and `getShabbatClassNames(date)` — the CSS
    class lists the picker applies. Shabbat is deliberately kept out of the
    holiday list so the two can be toggled independently without either
    emitting a class the other already did.
  - `isShabbatDay(date)` and `isErevShabbatDay(date)`.
  - Types `JewishHolidayInfo` and `JewishTzomInfo`.

### Changed

- **[core]** Added a dependency on `jewish-holidays@^2.0.1`. It is wrapped so
  that its `isChutzLaaretz` and language-code conventions never leak out: this
  package continues to take `isIsrael` and `isHebrew` everywhere.

### Fixed

- **[core]** `getGregDate` now returns midnight local time. It previously
  carried the current clock time onto the result, so the same Jewish date
  converted to a different `Date` on every call.

---

## 3.0.0 — 2026-07-27

Major release: a redesigned, keyboard-accessible, mobile-aware picker.

### Breaking

- **[picker] A closed picker no longer renders its calendar.** The month grid
  and the ~230-option year select are mounted only once the picker is first
  opened (6,859 → 3,475 DOM nodes on the demo page). Tests that query a closed
  picker for day cells must open it first.
- **[picker] `canSelect` is now enforced.** Days rejected by `canSelect` were
  previously styled as disabled but still clickable. If you relied on that
  bug — for example using `canSelect` purely for styling — move the styling to
  `customizeDayStyle`.
- **[core] Type refinements** that can surface as compile errors under
  `strict`: `JewishMonthInfo.selectedDay` is now `JewishDay | null | undefined`,
  and `IdText.id` is `JewishMonthType` rather than `string`.
- **[core]** The argument to `getHolidays(isIsrael?)` is now optional.

### Added

- **[picker] `slidingMonths` prop.** Two months side by side with a horizontal
  slide animation, collapsing to a single month at ≤600px.
- **[picker] `dateDisplay` prop** — `"jewish"` (default), `"gregorian"` or
  `"both"`. Controls both the day cells and the trigger text; `"both"` stacks
  the Jewish numeral over the Gregorian day. The default preserves existing
  behavior, and `isHebrew` continues to select Hebrew numerals and RTL layout.
- **[picker] Full keyboard operation.** Enter/Space opens, arrow keys move
  between days, Home/End jump to the ends, Escape closes and restores focus to
  the trigger. The calendar uses a roving tabindex, so it costs one tab stop
  rather than 42.
- **[picker] ARIA support** — a labelled listbox grid, `aria-selected`,
  `aria-disabled` and `aria-current` on days, `aria-expanded`/`aria-haspopup`
  on the trigger, and localized labels on the month arrows.
- **[picker] Mobile bottom sheet** at ≤600px, with a slide-up animation, a
  backdrop, and 40px+ touch targets.
- **[picker] Today indicator** — an `isToday` class on the current date.

### Changed

- **[picker] Redesigned appearance**: layered shadows, a fade-and-scale open
  animation, higher-contrast range highlighting, and a reworked navigation bar.
  If you have overridden the bundled CSS, review your overrides.
- **[picker]** React 19 is supported. The `use-onclickoutside` dependency was
  replaced with an internal hook using native `mousedown`/`touchstart`
  listeners, fixing click-outside handling under React 19.

### Fixed

- **[picker]** `slidingMonths` opened on the wrong month, hiding the selected
  date.
- **[picker]** Closed calendars stayed in the tab order and in the
  accessibility tree.
- **[picker]** Adjacent-month days and navigation chevrons failed WCAG contrast
  (2.56:1 → 4.76:1).
- **[picker]** Missing focus indicators on the trigger, arrows, selects and day
  cells.

---

## 2.0.22 — 2025-06-04

### Added

- **[picker] `Month` component** is now exported alongside
  `ReactJewishDatePicker`, for embedding an always-visible inline calendar.

## 2.0.21 — 2025-03-16

### Added

- **[picker] `customizeDayStyle` prop** — `(day: BasicJewishDay) => string`,
  returning an extra class name for a day cell.

## 2.0.14 — 2024-10-02

### Changed

- **[core]** Additional types are exported from the package root.
- Migrated to the `react-jsx` JSX transform; upgraded Yarn and all
  dependencies.

## 2.0.x maintenance releases

The remaining 2.0.x releases were dependency and security bumps, CI and
publishing fixes, and documentation updates, published automatically on every
push to `master`. They contain no API changes.

## 2.0.0 — 2023-01-01

### Breaking

- **[core]** Replaced `hebcal` with [`jewish-date`](https://www.npmjs.com/package/jewish-date)
  as the conversion engine. Month naming and some edge-case results changed
  accordingly.
- Build output moved from Rollup to esbuild, now shipping CommonJS
  (`dist/index.js`), ESM (`dist/mjs/index.js`) and type declarations (`lib/`).

### Fixed

- **[picker]** The `value` prop was ignored when it changed after the
  component's first render.

---

## 1.2.1 — 2022-02-03

### Fixed

- Range selection in the documentation site.

## 1.2.0 — 2022-02-03

### Added

- **[picker] `className` prop** for styling the picker's root element.
- **[picker]** Clicking outside the picker closes it, and opening and closing
  are animated.
- React 17, npm 7 and Yarn 3 support.

## 1.0.2 — 2020-09-18

### Added

- **[core] `jewish-dates-core` was extracted** into its own package, so the
  conversion, holiday and Shabbat helpers can be used without React.
- **[picker] `value` prop**, accepting either a `Date` or a `BasicJewishDate`.

## 1.0.0 — 2020-09

First stable release.

---

## 0.2.0 — 2020-08-28

### Added

- Right-to-left layout for Hebrew.

### Fixed

- Adar I is now labelled simply "Adar" in non-leap years.
- Saturday's Hebrew abbreviation corrected from ז to ש.
- A missing day in 30-day months whose first day falls on Saturday.

## 0.1.0 — 2020-08

Initial release: single and range selection, Hebrew and English, and the
`canSelect` prop for restricting selectable days.
