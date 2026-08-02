import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIconData, iconToSVG } from '@iconify/utils';

const iconsPath = fileURLToPath(new URL('../icons.json', import.meta.url));
const outDir = fileURLToPath(new URL('../d3f', import.meta.url));

const iconSet = JSON.parse(readFileSync(iconsPath, 'utf8'));

mkdirSync(outDir, { recursive: true });

let count = 0;

for (const name of Object.keys(iconSet.icons)) {
  const iconData = getIconData(iconSet, name);
  const { attributes, body } = iconToSVG(iconData, { height: 24, width: 24 });
  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${body}</svg>\n`;
  writeFileSync(join(outDir, `${name}.svg`), svg);
  count += 1;
}

console.log(`d3f-iconify: SVGs generated in d3f/ — ${count} icon(s).`);
