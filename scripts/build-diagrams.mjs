import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const diagramsDir = fileURLToPath(new URL('../test/diagrams/', import.meta.url));
const template = readFileSync(`${diagramsDir}template.html`, 'utf8');

const mdFiles = readdirSync(diagramsDir).filter((file) => file.endsWith('.md'));

for (const file of mdFiles) {
  const md = readFileSync(diagramsDir + file, 'utf8');
  const match = md.match(/```mermaid\n([\s\S]*?)```/);
  if (!match) {
    throw new Error(`No mermaid code block found in ${file}`);
  }

  const name = file.replace(/\.md$/, '');
  const html = template
    .replaceAll('{{NAME}}', name)
    .replace('{{DIAGRAM}}', match[1].trimEnd());

  writeFileSync(`${diagramsDir}${name}.html`, html);
  console.log(`d3f-iconify: wrote test/diagrams/${name}.html`);
}
