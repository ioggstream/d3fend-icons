import { readFileSync } from 'node:fs';
import { validateIconSet } from '@iconify/utils';

const data = JSON.parse(readFileSync(new URL('../icons.json', import.meta.url), 'utf8'));

const result = validateIconSet(data);

if (data.prefix !== 'd3f') {
  throw new Error(`Expected prefix "d3f", got "${data.prefix}"`);
}

for (const name of Object.keys(result.icons)) {
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(name)) {
    throw new Error(`Icon name "${name}" is not a valid D3FEND local name`);
  }
}

console.log(`d3f-iconify: icons.json is valid — ${Object.keys(result.icons).length} icon(s).`);
