import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
const STATIC = resolve(here, '../static');

const svg = readFileSync(resolve(STATIC, 'og-default.svg'), 'utf8');

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true, defaultFontFamily: 'Georgia' },
  background: '#f4efe6'
})
  .render()
  .asPng();

writeFileSync(resolve(STATIC, 'og-default.png'), png);
console.log(`og-default.png written (${png.length} bytes)`);
