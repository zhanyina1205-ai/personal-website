import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders Yina's biography and main sections without the starter placeholder", async () => {
  const html = await render();
  assert.match(html, /<html[^>]*lang="zh-CN"/);
  assert.match(html, /<title>椰奶的小站 · 詹依娜 Zhan Yina<\/title>/);
  assert.match(html, /广州美术学院/);
  assert.match(html, /小红书饰品店铺店主/);
  assert.match(html, /两只小狗的全职铲屎官/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/);
});

test("internal navigation resolves and published photos exist", async () => {
  const html = await render();
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(target), `Missing navigation target: ${target}`);
  }
  const sources = new Set([...html.matchAll(/\bsrc="(\/images\/[^"?]+)"/g)].map(match => match[1]));
  assert.ok(sources.size >= 4, "The portrait and all three dog photos must render");
  for (const source of sources) await access(new URL(`../public${source}`, import.meta.url));
});
