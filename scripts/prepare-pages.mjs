import { copyFile, mkdir, access } from 'node:fs/promises';
// GitHub Pages serves directory URLs; retain the original HTML for framework assets.
for (const route of ['about', 'liangliang', 'accounts', 'montirivers', 'tools']) {
  const source = new URL(`../dist/client/${route}.html`, import.meta.url);
  const directory = new URL(`../dist/client/${route}/`, import.meta.url);
  await access(source);
  await mkdir(directory, { recursive: true });
  await copyFile(source, new URL('index.html', directory));
}
