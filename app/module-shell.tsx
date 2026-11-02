import { IntroReplayLink } from './intro-replay-link';
import type { ReactNode } from 'react';
import { assetPath } from './asset-path';
import { modules } from './module-directory';
import { PortfolioInteractions } from './portfolio-interactions';

export function PortfolioHeader({current}:{current?:string}){return <header className="portfolio-header"><a className="wordmark" href={assetPath('/#top')}>詹依娜<span>YINA ZHAN</span></a><nav aria-label="作品集模块" className="portfolio-nav">{modules.map(m=><a key={m.slug} href={assetPath(`/${m.slug}/`)} aria-current={current===m.slug?'page':undefined}>{m.slug==='liangliang'?'是亮亮':m.slug==='montirivers'?'山河集':m.title}</a>)}<IntroReplayLink/></nav><a className="header-index-link" href={assetPath('/#modules')}>{current?'← 返回目录':'作品目录 ↗'}</a></header>;}
export function ModuleShell({slug,children,chapters}:{slug:string,children:ReactNode,chapters:{id:string,label:string}[]}){
 const index=modules.findIndex(m=>m.slug===slug),m=modules[index],next=modules[(index+1)%modules.length];
 return <><PortfolioInteractions chapters={chapters}/><a className="skip-link" href="#main">跳到主要内容</a><div className={`site-canvas module-page module-${slug}`} id="top"><PortfolioHeader current={slug}/><main id="main"><header className="module-page-heading"><div><a href={assetPath('/#modules')}>作品目录</a><span>/ CHAPTER {m.number}</span></div><h1>{m.title}<span>{m.en}.</span></h1><nav aria-label="本页目录">{chapters.map(c=><a href={`#${c.id}`} key={c.id}>{c.label}<span>↓</span></a>)}</nav></header><div className="module-page-content">{children}</div><footer className="module-pagination"><a href={assetPath('/#modules')}><span>BACK TO INDEX</span><b>返回作品目录 <i>↖</i></b></a><a href={assetPath(`/${next.slug}/`)}><span>NEXT CHAPTER / {next.number}</span><b>{next.title} <i>↗</i></b></a></footer></main><div className="module-footer"><span>© 2026 · 詹依娜 / YINA ZHAN</span><a href="mailto:1106731983@qq.com">聊聊新的可能 ↗</a></div></div></>;
}
