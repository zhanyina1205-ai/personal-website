import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import test from 'node:test';
const routes=['/','/about/','/liangliang/','/accounts/','/montirivers/','/tools/'];
test('all six Pages routes export with valid base-prefixed links, anchors and local assets',async()=>{
 const prefix=process.env.NEXT_PUBLIC_BASE_PATH||'';
 const pages=new Map();
 for(const route of routes)pages.set(route,await readFile(new URL(`../dist/client${route}index.html`,import.meta.url),'utf8'));
 for(const [route,html] of pages){
  assert.match(html,/<h1\b/);
  for(const [,href]of html.matchAll(/\bhref="([/#][^"]*)"/g)){
   const url=new URL(href,`https://example.com${prefix}${route}`);
   assert.ok(url.pathname.startsWith(`${prefix}/`),`Wrong prefix ${href}`);
   const local=url.pathname.slice(prefix.length);
   if(pages.has(local)){
    if(url.hash)assert.ok(pages.get(local).includes(`id="${url.hash.slice(1)}"`),`Missing anchor ${href}`);
   }else await access(new URL(`../dist/client${local}`,import.meta.url));
  }
  for(const [,src]of html.matchAll(/\bsrc="(\/[^"?]+)"/g)){
   assert.ok(src.startsWith(`${prefix}/`),`Wrong asset prefix ${src}`);
   await access(new URL(`../dist/client${src.slice(prefix.length)}`,import.meta.url));
  }
 }
 assert.equal([...pages.get('/').matchAll(/class="deck-card /g)].length,6);
});
