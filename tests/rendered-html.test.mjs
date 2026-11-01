import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import test from 'node:test';
const routes=['/','/about/','/liangliang/','/accounts/','/montirivers/','/tools/'];
const cache=new Map();
async function render(path='/') {
 if(cache.has(path))return cache.get(path);
 const {default:worker}=await import('../dist/server/index.js');
 const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
 assert.equal(response.status,200,path);assert.match(response.headers.get('content-type')??'',/^text\/html/);
 const html=await response.text();cache.set(path,html);return html;
}
test('homepage is a cover and five module entries, without loading the full cases',async()=>{
 const html=await render();assert.match(html,/<html[^>]*lang="zh-CN"/);assert.match(html,/<title>詹依娜 · 个人作品集<\/title>/);assert.match(html,/id="hero-title"/);
 assert.equal([...html.matchAll(/class="directory-card /g)].length,5);
 for(const route of routes.slice(1))assert.ok(html.includes(`href="${route}"`),route);
 for(const id of ['ip-selected-work','yenai-audience','rock-account','montirivers-work'])assert.ok(!html.includes(`id="${id}"`));
 assert.doesNotMatch(html,/Building your site|codex-preview/);
});
test('every detail route renders directly, with working local navigation and assets',async()=>{
 const rendered=new Map(await Promise.all(routes.map(async path=>[path,await render(path)])));
 for(const [path,html] of rendered){
  assert.equal([...html.matchAll(/<h1\b/g)].length,1,`${path}: one page heading`);
  if(path!=='/') {assert.match(html,/返回作品目录/);assert.doesNotMatch(html,/class="yenai-intro/);}
  for(const [,href] of html.matchAll(/\bhref="([/#][^"]*)"/g)){
   const url=new URL(href,`http://localhost${path}`);if(/\.[a-z0-9]+$/i.test(url.pathname))continue;const dest=rendered.get(url.pathname);assert.ok(dest,`Unknown route ${href} on ${path}`);
   if(url.hash)assert.ok(dest.includes(`id="${url.hash.slice(1)}"`),`Missing target ${href} on ${path}`);
  }
  for(const [,src]of html.matchAll(/\bsrc="(\/[^"?]+)"/g))if(!src.startsWith('/assets/')&&!src.startsWith('/_next/'))await access(new URL(`../public${src}`,import.meta.url));
 }
});
test('biography and workflow remain together',async()=>{const html=await render('/about/');assert.match(html,/广州美术学院/);assert.match(html,/两只小狗/);assert.match(html,/我的创作流程/);});
test('IP detail retains three notes, analysis and sample limits',async()=>{
 const html=await render('/liangliang/');assert.match(html,/PR 商务对接/);assert.match(html,/账号定位与矩阵/);assert.match(html,/不代表个人增长业绩/);
 for(const link of ['ArOm8KApisP','96U8Z07PzB6','2E90B2pkV5X'])assert.ok(html.includes(`https://xhslink.cn/o/${link}`));
 assert.equal([...html.matchAll(/class="ip-work-note"/g)].length,3);assert.match(html,/不代表完整粉丝地域/);assert.ok(html.indexOf('id="ip-breakdown"')>html.indexOf('id="ip-selected-work"'));
});
test('both personal accounts retain original notes, origin story and data caveats',async()=>{
 const html=await render('/accounts/');assert.match(html,/互动用户样本 ≠ 全部粉丝画像/);assert.match(html,/15 位已标年龄的评论者/);assert.match(html,/2024.10 进入 MCN 实习时/);assert.match(html,/51,667/);
 assert.equal([...html.matchAll(/class="note-card"/g)].length,5);assert.equal([...html.matchAll(/class="rock-note-card"/g)].length,4);assert.match(html,/id="lookbook"/);assert.match(html,/摇滚椰奶冻/);
});
test('brand detail and tools keep all real destinations',async()=>{
 const html=await render('/montirivers/');assert.equal([...html.matchAll(/class="monti-note"/g)].length,3);assert.match(html,/12,037/);assert.match(html,/1,643/);assert.match(html,/非已验证的成交漏斗/);assert.match(html,/Laura/);
 const tools=await render('/tools/');assert.ok(tools.includes('https://zhanyina1205-ai.github.io/outfit-notes/#closet'));assert.ok(tools.includes('https://zhanyina1205-ai.github.io/paw-diary/'));
});
