# 2. Standalone Iconify icon package, not a VS Code extension

Date: 2026-07-09

## Status

Accepted

## Context

D3FEND ontology classes are referenced in mermaid diagrams as `d3f:ClassName`
(e.g. `d3f:Storage`). `vscode-d3fend-editor` currently resolves these to
icons borrowed from third-party Iconify packs (`mdi`, `logos`,
`material-symbols`, `carbon`) via a hand-maintained lookup table.

We considered building this as a feature of `vscode-d3fend-editor` itself,
or as a new VS Code extension. Instead we need a package that any
Iconify-consuming tool (mermaid, markdown renderers, the `iconify-icon` web
component, etc.) can load independently of VS Code, following mermaid's
documented `registerIconPacks()` contract
(https://mermaid.ai/open-source/config/icons.html), which expects data in
standard Iconify JSON format: `{ prefix, icons: { <name>: { body, width, height } } }`.

## Decision

- [x] Ship a standalone, framework-independent Iconify icon package (`d3f`
  prefix), not a VS Code extension.
- [x] Icon names inside the set match D3FEND resource local names verbatim
  (e.g. `DigitalArtifact`), so `d3f:DigitalArtifact` resolves directly with
  no case conversion or renaming.
- [x] Start with a minimal 3-icon validation slice (`DigitalArtifact`,
  `DefensiveTechnique`, `OffensiveTechnique`) plus a standalone HTML page
  that registers the pack with mermaid, before scaling to the full curated
  class list.

## Consequences

Pros:

- Reusable by any Iconify consumer, not tied to a specific VS Code
  extension's build.
- Matches mermaid's documented icon pack contract, so integration into
  `vscode-d3fend-editor` later is a drop-in registration change.

Cons:

- Requires a separate release/versioning lifecycle from
  `vscode-d3fend-editor`.
