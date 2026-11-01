import { assetPath } from './asset-path';

export const modules = [
  {slug:'about',number:'01',title:'个人介绍',en:'A little about me',description:'从艺术与设计出发，走进内容创作。',tags:'关于我 / 创作流程',className:'directory-about'},
  {slug:'liangliang',number:'02',title:'服务的 IP · 是亮亮',en:'Create with her',description:'PR 商务对接、选品搭配与内容剪辑。',tags:'账号分析 / 代表内容 / 爆款拆解',className:'directory-ip'},
  {slug:'accounts',number:'03',title:'我的个人账号',en:'My own little world',description:'椰奶没喝饱 × 摇滚椰奶冻',tags:'穿搭分享 / 从零起号 / 饰品经营',className:'directory-accounts'},
  {slug:'montirivers',number:'04',title:'品牌 IP · 山河集',en:'A poem in gold',description:'参与初创品牌从 0 到 1 的内容建设。',tags:'品牌策略 / 内容运营 / 店员矩阵',className:'directory-brand'},
  {slug:'tools',number:'05',title:'我的小工具',en:'Little helpers',description:'把生活里的小需求，做成好用的小东西。',tags:'穿搭手记 / 爪爪日记',className:'directory-tools'},
];

function DirectoryArt({slug}:{slug:string}) {
  if(slug==='about')return <div className="directory-polaroid"><img src={assetPath('/new-document/about-portrait-dog.jpg')} alt="詹依娜与小狗" loading="lazy"/><span>Hi, I’m Yina.</span></div>;
  if(slug==='liangliang')return <><img className="directory-ip-photo" src={assetPath('/new-document/ip-cover.png')} alt="是亮亮的户外人像" loading="lazy"/><span className="directory-sticker">是亮亮</span></>;
  if(slug==='accounts')return <><div className="directory-account-photo"><img src={assetPath('/account-collage/black-top-pink-skirt.jpg')} alt="椰奶没喝饱的穿搭" loading="lazy"/><span>椰奶没喝饱_</span></div><div className="directory-account-photo"><img src={assetPath('/rock-account/note-2.jpg')} alt="摇滚椰奶冻的饰品搭配" loading="lazy"/><span>摇滚椰奶冻</span></div></>;
  if(slug==='montirivers')return <><img className="directory-brand-photo" src={assetPath('/montirivers/brand-1.jpg')} alt="山河集品牌形象" loading="lazy"/><span className="directory-brand-word">MontiRivers<small>山 河 集</small></span></>;
  return <><div className="directory-tool-illustration"><img src={assetPath('/toolbox-visuals/outfit-cart.png')} alt="粉色购物车与穿搭衣物" loading="lazy"/></div><div className="directory-tool-illustration"><img src={assetPath('/toolbox-visuals/paw-puppy.png')} alt="黑粉条纹毛衣的拼布小狗" loading="lazy"/></div></>;
}
export function ModuleDirectory(){return <section className="module-directory" id="modules" aria-labelledby="directory-title"><div className="directory-heading"><div><p>THE INDEX / 目录</p><h2 id="directory-title">从这里，认识我的创作。</h2></div><span>Five chapters.<small>点击卡片，打开完整内容 ↗</small></span></div><div className="directory-grid">{modules.map(m=><a href={assetPath(`/${m.slug}/`)} className={`directory-card ${m.className}`} key={m.slug}><div className="directory-card-top"><span>CHAPTER / {m.number}</span><span aria-hidden="true">↗</span></div><div className="directory-art"><DirectoryArt slug={m.slug}/></div><div className="directory-card-copy"><p>{m.en}</p><h3>{m.title}</h3><div className="directory-description">{m.description}</div><div className="directory-card-bottom"><span>{m.tags}</span><span aria-hidden="true">打开这一页 ↗</span></div></div></a>)}</div></section>;}
