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
  assert.match(html, /<title>詹依娜 · 个人作品集<\/title>/);
  assert.match(html, /广州美术学院/);
  assert.match(html, /是亮亮/);
  assert.match(html, /椰奶没喝饱/);
  assert.match(html, /PR 商务对接/);
  assert.match(html, /账号定位与矩阵/);
  assert.match(html, /11\.9/);
  assert.match(html, /不代表个人增长业绩/);
  assert.match(html, /https:\/\/zhanyina1205-ai\.github\.io\/liangliang-ip-report\//);
  assert.doesNotMatch(html, /2,000万|\/images\/feishu-|生活与灵感|潮牌女装/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/);
});

test("internal navigation resolves and published photos exist", async () => {
  const html = await render();
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(target), `Missing navigation target: ${target}`);
  }
  const sources = new Set([...html.matchAll(/\bsrc="(\/new-document\/[^"?]+)"/g)].map(match => match[1]));
  assert.equal(sources.size, 6, "The portfolio uses the document images and the supplied About portrait");
  for (const source of sources) await access(new URL(`../public${source}`, import.meta.url));
});


test("IP cases keep three source-linked notes and distinguish comment samples from fans", async () => {
  const html = await render();
  for (const link of ["ArOm8KApisP", "96U8Z07PzB6", "2E90B2pkV5X"]) {
    assert.ok(html.includes(`https://xhslink.cn/o/${link}`));
  }
  assert.equal([...html.matchAll(/class="ip-work-note"/g)].length, 3);
  assert.match(html, /评论用户地域/);
  assert.match(html, /不代表完整粉丝地域/);
  assert.match(html, /2026.11.01/);
  assert.ok(html.indexOf('id="ip-breakdown"') > html.indexOf('id="ip-selected-work"'));
  const images = new Set([...html.matchAll(/src="(\/ip-case-study\/[^"?]+)"/g)].map(match => match[1]));
  assert.equal(images.size, 11);
  for (const source of images) await access(new URL(`../public${source}`, import.meta.url));
});

test("personal account research preserves sample limits and the original lookbook", async () => {
  const html = await render();
  const audience = html.indexOf('id="yenai-audience"');
  const origin = html.indexOf('id="yenai-origin"');
  const looks = html.indexOf('id="lookbook"');
  assert.ok(audience > html.indexOf('id="my-account"'));
  assert.ok(origin > audience && looks > origin);
  assert.match(html, /互动用户样本 ≠ 全部粉丝画像/);
  assert.match(html, /并非去重用户或后台粉丝地域分布/);
  assert.match(html, /15 位已标年龄的评论者/);
  assert.match(html, /2024.10 进入 MCN 实习时/);
  assert.match(html, /51,667/);
  assert.equal([...html.matchAll(/class="note-card"/g)].length, 5);
  for (const file of ['first-collection.jpg', 'price-outfit.jpg']) {
    await access(new URL(`../public/yenai-story/${file}`, import.meta.url));
  }
});
