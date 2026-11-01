import { assetPath } from "./asset-path";

const tools = [
  { id: "01", kind: "wardrobe", title: "穿搭手记", english: "Dress up your day.", description: "把喜欢的衣服，装进自己的灵感衣橱。", tags: "衣橱管理 / 穿搭灵感 / 拍摄计划", image: "/toolbox-visuals/outfit-cart.png", alt: "粉色购物车里散落出黑粉条纹上衣、短裙和袜子", href: "https://zhanyina1205-ai.github.io/outfit-notes/#closet", cta: "打开我的衣橱" },
  { id: "02", kind: "puppy", title: "爪爪日记", english: "Little paws, big love.", description: "喂好每一餐，也记住毛孩子的小日常。", tags: "喂食记录 / 鲜食备餐 / 成长日常", image: "/toolbox-visuals/paw-puppy.png", alt: "穿着黑粉条纹毛衣、戴粉色蝴蝶结的拼布小狗", href: "https://zhanyina1205-ai.github.io/paw-diary/", cta: "翻开爪爪日记" },
];

export function Toolbox() {
  return <section className="toolbox-section tools-playground" id="tools" aria-labelledby="tools-title">
    <h2 className="sr-only" id="tools-title">我的小工具</h2>
    <div className="tools-playground-intro"><p>给灵感一个衣橱，给日常一点陪伴。</p><span>点一下，把喜欢的生活打开 ↗</span></div>
    <div className="tool-portals">{tools.map(tool => <a className={`tool-portal tool-portal-${tool.kind}`} key={tool.id} href={tool.href} target="_blank" rel="noopener noreferrer" aria-label={`${tool.title}：${tool.cta}（新窗口）`}>
      <div className="tool-portal-top"><span>0{Number(tool.id)} / {tool.kind === "wardrobe" ? "FOR MY WARDROBE" : "FOR MY LITTLE ONES"}</span><span aria-hidden="true">✳</span></div>
      <div className="tool-portal-art"><span className="tool-portal-script" aria-hidden="true">{tool.english}</span><img src={assetPath(tool.image)} alt={tool.alt} width={1280} height={1280}/></div>
      <div className="tool-portal-caption"><div><h3>{tool.title}</h3><p>{tool.description}</p></div><span className="tool-portal-arrow" aria-hidden="true">↗</span></div>
      <div className="tool-portal-bottom"><span>{tool.tags}</span><span>{tool.cta} ↗</span></div>
    </a>)}</div>
    <div className="tools-playground-footer"><span>MADE FOR THE LITTLE THINGS</span><p>从自己的生活出发，做一点好用的小东西。</p></div>
  </section>;
}
