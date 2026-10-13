import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("GitHub Pages exports the biography and every referenced local asset", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>詹依娜 · 个人作品集<\/title>/);
  assert.match(html, /广州美术学院/);
  assert.match(html, /是亮亮/);
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const assets = new Set([...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(match => match[1]));
  assert.ok(assets.size >= 6, "Photos, styles and hydration scripts must be exported");
  for (const asset of assets) {
    assert.ok(asset.startsWith(`${prefix}/`), `Incorrect Pages path: ${asset}`);
    const localPath = asset.slice(prefix.length).split("?")[0];
    await access(new URL(`../dist/client${localPath}`, import.meta.url));
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(target), `Missing navigation target: ${target}`);
  }
});
