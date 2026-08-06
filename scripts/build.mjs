import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getIconData, validateIconSet } from '@iconify/utils';

const iconsPath = fileURLToPath(new URL('../icons.json', import.meta.url));

const { default: mapping } = await import('../icon-mapping.js');

const sourceSets = new Map();

function loadSourceSet(sourcePrefix) {
  if (!sourceSets.has(sourcePrefix)) {
    const setPath = import.meta.resolve(`@iconify-json/${sourcePrefix}/icons.json`);
    sourceSets.set(sourcePrefix, JSON.parse(readFileSync(fileURLToPath(setPath), 'utf8')));
  }
  return sourceSets.get(sourcePrefix);
}

const SET_WIDTH = 24;
const SET_HEIGHT = 24;

const icons = {};

for (const [d3fendName, iconId] of Object.entries(mapping)) {
  const [sourcePrefix, sourceName] = iconId.split(':');
  if (!sourcePrefix || !sourceName) {
    throw new Error(`Invalid icon id "${iconId}" for "${d3fendName}", expected "<prefix>:<name>"`);
  }

  const sourceSet = loadSourceSet(sourcePrefix);
  const iconData = getIconData(sourceSet, sourceName);
  if (!iconData) {
    throw new Error(`Icon "${sourceName}" not found in "${sourcePrefix}" icon set (mapped from "${d3fendName}")`);
  }

  // Drop width/height when they match the set-level default to keep icons.json minimal.
  if (iconData.width === SET_WIDTH) delete iconData.width;
  if (iconData.height === SET_HEIGHT) delete iconData.height;

  icons[d3fendName] = iconData;
}

const data = {
  prefix: 'd3f',
  width: SET_WIDTH,
  height: SET_HEIGHT,
  icons,
};

const result = validateIconSet(data);

for (const name of Object.keys(result.icons)) {
  // D3FEND local names are CamelCase and may contain hyphens (Multi-factorAuthentication).
  if (!/^[A-Za-z][A-Za-z0-9-]*$/.test(name)) {
    throw new Error(`Icon name "${name}" is not a valid D3FEND local name`);
  }
}

writeFileSync(iconsPath, JSON.stringify(data, null, 2) + '\n');

console.log(`d3f-iconify: icons.json generated — ${Object.keys(result.icons).length} icon(s).`);
