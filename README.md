# d3f-iconify

Iconify icon set for D3FEND, with prefix `d3f`, for use in mermaid diagrams and
other Iconify-consuming tools.

Icon names match D3FEND resource local names exactly, so `d3f:DigitalArtifact`
in a mermaid diagram resolves to the icon named `DigitalArtifact` in this set.

## Current scope

Minimal validation slice — 3 icons. `icons.json` is generated (not
hand-edited) from [icon-mapping.json](icon-mapping.json), which maps each
D3FEND local name to a source icon from an installed
[Iconify](https://iconify.design) collection:

- `DigitalArtifact` — `mdi:file-document-outline`
- `DefensiveTechnique` — `mdi:shield-outline`
- `OffensiveTechnique` — `mdi:sword-cross`

All 3 are sourced from
[Material Design Icons](https://github.com/Templarian/MaterialDesign) (`mdi`,
Apache-2.0), pulled from the `@iconify-json/mdi` package.

### Regenerating icons.json

```sh
pnpm install
pnpm run build
```

`scripts/build.mjs` reads `icon-mapping.json`, resolves each `<prefix>:<name>`
against the corresponding `@iconify-json/<prefix>` package, and writes the
resulting icon bodies to `icons.json`. To add a class, add an entry to
`icon-mapping.json` (installing the matching `@iconify-json/<prefix>` package
first if it isn't already a devDependency) and rerun the build.

## Installation

This package is published on GitHub, not the npm registry. Install directly
from the repo with any npm-compatible package manager:

```sh
pnpm add github:ioggstream/d3fend-icons
# or
npm install github:ioggstream/d3fend-icons
```

## Usage with mermaid (bundled projects)

```js
import mermaid from 'mermaid';
import { icons } from 'd3f-iconify';

mermaid.registerIconPacks([{ name: 'd3f', icons }]);
```

## Usage via CDN (no install step)

For plain HTML pages or quick prototypes, load `icons.json` straight from
GitHub via the [jsDelivr GitHub CDN](https://www.jsdelivr.com/?docs=gh) —
no npm install, no bundler:

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

  const res = await fetch('https://cdn.jsdelivr.net/gh/ioggstream/d3fend-icons@main/icons.json');
  const icons = await res.json();

  mermaid.registerIconPacks([{ name: 'd3f', icons }]);
  mermaid.initialize({ startOnLoad: true });
</script>
```

Pin to a tagged release (e.g. `@v0.0.1`) instead of `@main` for reproducible
builds — jsDelivr caches tags and branches differently, and `@main` can
change underneath you.

## Validation

Open [test/local.html](test/local.html) (inlines `icons.json` directly) or
[test/remote.html](test/remote.html) (fetches it from jsDelivr) in a browser
to render a diagram using all 3 icons and confirm they resolve correctly.

## Development environment

This project has no local Node.js install assumed; use the devcontainer at
[.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) (built on
the official `mcr.microsoft.com/devcontainers/javascript-node` image) to get
a Node.js environment with Corepack-enabled pnpm for running scripts or a
static server for `test/validate.html`.

## Architecture Decision Records

See [docs/adr/](docs/adr/) for the design decisions behind this package.
