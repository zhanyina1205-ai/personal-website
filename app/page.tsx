import { assetPath } from "./asset-path";
import { DocumentMedia } from "./document-media";
import { Lookbook } from "./lookbook";
import { AccountCollage } from "./account-collage";
import { IpCaseContext } from "./ip-case-context";
import { IpNotebook } from "./ip-notebook";
import { PortfolioInteractions, CopyEmail } from "./portfolio-interactions";

const documentUrl="https://my.feishu.cn/wiki/O6kZwoRPLiphBykwHiKcOgbTnld?from=from_copylink";
const noteLinks=["https://xhslink.cn/o/5K2l3IjfczA","https://xhslink.cn/o/304rUVT5FUg","https://xhslink.cn/o/AMX4gDLpkzf","https://xhslink.cn/o/2rejZlqDkbz","https://xhslink.cn/o/6ozW7w8dYis"];
const workflow=[{title:"选题",text:"找热门笔记作为参考依据。"},{title:"选品搭配",text:"参考热门单品，搭配成自己的风格。"},{title:"拍摄",text:"对镜拍、支架前置拍、户外拍。"},{title:"修图剪辑",text:"使用剪映、Remotion 完成内容制作。"},{title:"发布",text:"发布到小红书、抖音。"}];

export default function Home(){return <>
 <PortfolioInteractions/>
 <a className="skip-link" href="#main">跳到主要内容</a>
 <div className="site-canvas" id="top">
  <header className="site-header"><a href="#top" className="wordmark">詹依娜<span>YINA ZHAN</span></a><nav aria-label="主导航"><a href="#about">关于我</a><a href="#projects">我的作品</a><a href="#workflow">创作流程</a><a href="#contact" className="contact-pill">联系我 ↗</a></nav></header>
  <main id="main">
   <section className="hero" aria-labelledby="hero-title">
    <div className="hero-label"><span>PERSONAL PORTFOLIO</span><span>CONTENT / STYLE / IP</span></div>
    <h1 id="hero-title">Portfolio<span className="sr-only"> · 詹依娜的个人作品集</span></h1>
    <div className="paper-stack">
     <div className="paper-layer paper-back-one" aria-hidden="true"/><div className="paper-layer paper-back-two" aria-hidden="true"/>
     <div className="front-sheet"><div className="paper-holes" aria-hidden="true"><i/><i/><i/></div><span className="sheet-index">YINA / PERSONAL FILE 001</span>
      <figure className="portrait-card"><span className="paperclip" aria-hidden="true"/><img src={assetPath("/new-document/portrait-warm-vintage.png")} alt="詹依娜的复古暖色人像" width={1080} height={1080} fetchPriority="high"/><figcaption>詹依娜 <span>也可以叫我椰奶</span></figcaption></figure>
      <div className="sheet-copy"><p>Zhan YIna</p><span>广州美术学院 · 产品设计专业<br/>个人作品集</span><div className="sheet-rule"/><small>商务对接 / 选品搭配 / 拍摄剪辑</small></div>
     </div>
    </div>
    <div className="hero-footer"><span>ZHAN YINA<br/><small>广东 · 深圳</small></span><a href="#about" className="scroll-prompt">OPEN MY FILE <span>↓</span></a><span>2026<br/><small>PORTFOLIO</small></span></div>
   </section>

   <section className="about-file" id="about" aria-labelledby="about-title">
    <div className="folder-tabs"><a href="#about" aria-current="location">关于我 <span>01</span></a><a href="#projects">我的作品 <span>02</span></a><a href="#workflow">创作流程 <span>03</span></a></div>
    <div className="folder-body"><div className="file-heading"><span>ABOUT ME</span><span>个人档案 / 01</span></div><div className="about-grid"><figure className="about-portrait"><span className="binder-clip" aria-hidden="true"/><DocumentMedia src="/new-document/about-portrait-dog.jpg" alt="詹依娜与小狗的复古暖色合照" className="about-photo"/><figcaption>HI, I&apos;M YINA.<span className="about-photo-hint">点开看原图 ↗</span></figcaption></figure><div className="about-copy"><p className="eyebrow">你好，欢迎认识我。</p><h2 id="about-title">詹依娜<span>椰奶 / YINA</span></h2><dl className="personal-facts"><div><dt>年龄</dt><dd>23 岁</dd></div><div><dt>籍贯</dt><dd>广东深圳</dd></div><div><dt>教育背景</dt><dd>广州美术学院<br/><span>产品设计专业</span></dd></div></dl><div className="personal-tags"><span>INFP</span><span>手工绘画爱好者</span><span>两只小狗的全职铲屎官</span></div><p className="about-summary">有 IP 穿搭账号的商务对接、选品搭配与剪辑经历，<br className="desktop-break"/>也独立经营自己的穿搭账号与饰品店铺。</p><a className="underlined-link" href={documentUrl} target="_blank" rel="noopener noreferrer">阅读我的个人文档 ↗</a></div></div></div>
   </section>

   <section className="projects section-pad" id="projects" aria-labelledby="projects-title">
    <div className="section-kicker"><span>02 / SELECTED WORK</span><span>IP 项目 · 个人账号</span></div><h2 id="projects-title" className="display-title">我的作品<span>SELECTED WORK</span></h2>
    <IpNotebook/>
    <IpCaseContext/>


    <article className="own-project"><div className="own-project-copy"><p className="eyebrow">02 / MY OWN ACCOUNT</p><h3>椰奶没喝饱_<span>小红书穿搭账号</span></h3><div className="style-journey"><div><span>学生时期</span><h4>美式甜心辣妹</h4><p>以学生党人设为主。</p></div><span className="journey-arrow" aria-hidden="true">↘</span><div><span>毕业之后</span><h4>姐系通勤感</h4><p>面向刚步入社会的女生，提升穿衣质感。</p></div></div><dl className="account-stats"><div><dt>粉丝</dt><dd>5.2<span>万</span></dd></div><div><dt>获赞与收藏</dt><dd>92.4<span>万</span></dd></div></dl><p className="source-note">以上为新文档所附主页截图中的数据。</p><a className="pink-button" href="https://xhslink.cn/o/ArBwd7GjccM" target="_blank" rel="noopener noreferrer">打开我的穿搭账号 <span>↗</span></a></div><AccountCollage/></article>
    <Lookbook/>
    <div className="notes-heading"><h4>五条代表内容</h4><span>从原作品，了解我的风格 ↗</span></div><div className="note-links">{noteLinks.map((href,index)=><a href={href} target="_blank" rel="noopener noreferrer" key={href}><span className="note-index">0{index+1}</span><span>穿搭内容<span>小红书笔记</span></span><span className="note-arrow" aria-hidden="true">↗</span></a>)}</div>

    <article className="shop-project"><div><p className="eyebrow">03 / MY LITTLE BUSINESS</p><h3>摇滚椰奶冻<span>朋克、辣妹风格的平价项链店铺</span></h3><p>从选品、供应链对接、定价、上架和运营，到带货笔记的拍摄剪辑，均由我独立完成。</p><a className="underlined-link" href="https://xhslink.cn/o/7fHIjh5lHki" target="_blank" rel="noopener noreferrer">逛逛我的饰品店铺 ↗</a></div><div className="shop-stats"><div><b>5,000<span>+</span></b><span>一年累计销售 / 单</span></div><div><b>10<span>万+</span></b><span>销售额 / 元</span></div></div></article>
   </section>

   <section className="workflow-section section-pad" id="workflow" aria-labelledby="workflow-title"><div className="section-kicker"><span>03 / HOW I WORK</span><span>从选题，到发布</span></div><h2 className="display-title" id="workflow-title">我的创作流程<span>THE PROCESS</span></h2><div className="workflow-list">{workflow.map((item,index)=><article key={item.title}><span className="step-number">0{index+1}/</span><h3>{item.title}</h3><p>{item.text}</p>{index<workflow.length-1&&<span className="step-arrow" aria-hidden="true">→</span>}</article>)}</div><div className="support-grid"><div className="support-intro"><p>从品牌合作到个人创作，<br/>这些是我实际做过的工作。</p><a href="#projects">回看我的项目 <span>↗</span></a></div><div className="support-cards"><article><span>1/</span><h3>商务对接</h3><p>IP 穿搭账号<br/>PR 合作沟通</p></article><article><span>2/</span><h3>选品搭配</h3><p>服装与饰品<br/>选品、风格搭配</p></article><article><span>3/</span><h3>拍摄剪辑</h3><p>多种拍摄方式<br/>剪映 / Remotion</p></article><article><span>4/</span><h3>独立经营</h3><p>个人账号与店铺<br/>供应链、定价、上架</p></article></div></div></section>

   <section className="contact section-pad" id="contact" aria-labelledby="contact-title"><div className="section-kicker"><span>04 / SAY HELLO</span><span>期待与你交流</span></div><div className="contact-layout"><div><h2 id="contact-title">下一次，<br/>一起做点好内容。</h2><a className="email-link" href="mailto:1106731983@qq.com">1106731983@qq.com <span>↗</span></a><CopyEmail email="1106731983@qq.com"/></div><div className="contact-mark" aria-hidden="true"><span>Y</span><span>✦</span></div></div><div className="footer-line"><a href="#top">詹依娜 / YINA ZHAN</a><p>© 2026 · 个人作品集</p><a href="#top">回到顶部 ↑</a></div></section>
  </main>
 </div>
</>;}
