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
  assert.match(html, /<title>詹依娜 Yina Zhan · 内容与 IP 运营作品集<\/title>/);
  assert.match(html, /广州美术学院/);
  assert.match(html, /是亮亮/);
  assert.match(html, /椰奶没喝饱/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/);
});

test("internal navigation resolves and published photos exist", async () => {
  const html = await render();
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(target), `Missing navigation target: ${target}`);
  }
  const sources = new Set([...html.matchAll(/\bsrc="(\/images\/[^"?]+)"/g)].map(match => match[1]));
  assert.equal([...sources].filter(source => source.includes("/feishu-")).length, 19, "All 19 photographs from the personal document must render");
  for (const source of sources) await access(new URL(`../public${source}`, import.meta.url));
});
