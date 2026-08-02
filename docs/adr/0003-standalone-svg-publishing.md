# 3. Publish standalone SVGs alongside icons.json

Date: 2026-07-17

## Status

Accepted

## Context

`icons.json` (Iconify icon-set JSON) is already served from `main` via
jsDelivr for tools that load whole icon packs (e.g. mermaid's
`registerIconPacks()`). Some consumers instead want a single-icon URL, the
way `api.iconify.design/<prefix>/<name>.svg` works — e.g. mermaid's
`@{img: "..."}` node syntax already used with `mdi` icons in
`test/diagrams/*.md`. We don't run an Iconify API instance, and the repo has
no gh-pages deploy (only `.github/workflows/validate.yml`).

## Decision

- [x] Generate one standalone `.svg` file per icon from `icons.json` via a
  build script (`scripts/build-svgs.mjs`), written to `d3f/<name>.svg` —
  `d3f` matches the icon-set prefix, mirroring the `<prefix>/<name>.svg`
  layout of `api.iconify.design`.
- [x] Serve them straight from the `main` branch via jsDelivr's `gh` mode
  (`cdn.jsdelivr.net/gh/ioggstream/d3fend-icons@main/d3f/<name>.svg`), the
  same mechanism already used for `icons.json`. No gh-pages, no separate
  deploy step.
- [x] Add a `build:all` npm script that runs `build`, `build:svgs`, and
  `build:diagrams` in order, as a single entrypoint.

## Consequences

Pros:

- Drop-in single-icon URLs for any consumer, no Iconify API needed.
- No new infrastructure (no gh-pages, no CI deploy job).

Cons:

- Generated SVGs must be committed and kept in sync with `icons.json`
  (no CI step enforces this yet).
