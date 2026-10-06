import { Doodle } from "./doodles";
import { PhotoGallery } from "./photo-gallery";
import { assetPath } from "./asset-path";

const feishuUrl = "https://my.feishu.cn/wiki/WfEOwMIK4ilHUQk7PpucZVjRnlc?from=from_copylink";
const experiences = [
  { no: "01", kind: "camera" as const, title: "把喜欢，拍成日常", en: "CONTENT & CREATION", role: "小红书穿搭博主", text: "从内容构思到拍摄、剪辑，再到服装商务对接，独立完成账号的每一个环节。", tags: "内容策划 / 图文视频 / 视觉表达" },
  { no: "02", kind: "jewel" as const, title: "让小小饰品，闪闪发光", en: "MY LITTLE BUSINESS", role: "小红书饰品店铺店主", text: "选品、对接供应链、定价、上架、运营与客服，把一家小店从想法变成日常。", tags: "审美选品 / 电商运营 / 从 0 到 1" },
  { no: "03", kind: "shirt" as const, title: "找到属于你的风格", en: "STYLE & CONNECTION", role: "穿搭风格定位主播", text: "搭建直播间，帮助粉丝找到适合自己的穿搭风格。在交流里，发现每个人的美。", tags: "穿搭定位 / 直播分享 / 真诚沟通" },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">跳到主要内容</a>
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="椰奶的小站，返回首页"><span className="brand-flower" aria-hidden="true">✿</span><span>椰奶<span className="brand-en">YINA&apos;S LITTLE WORLD</span></span></a>
        <nav aria-label="主导航"><a href="#about">关于椰奶</a><a href="#experience">我的经历</a><a href="#life">生活碎片</a><a className="nav-contact" href="#hello">打个招呼 <span aria-hidden="true">↗</span></a></nav>
      </header>
      <main id="main-content">
        <section className="hero checker-blue" aria-labelledby="hero-title">
          <div className="hero-note">a little soft, a little curious.</div>
          <div className="sticker sticker-coconut"><Doodle kind="coconut" /><span>just be me ♡</span></div>
          <div className="sticker sticker-flower"><Doodle kind="flower" /></div>
          <div className="sticker sticker-camera"><Doodle kind="camera" /></div>
          <div className="sticker sticker-dogs"><Doodle kind="dogs" /><span>my happy place</span></div>
          <div className="hero-copy">
            <p className="eyebrow">HELLO, WELCOME TO MY LITTLE WORLD</p>
            <h1 id="hero-title">你好呀，我是<span className="name">詹依娜<span className="name-spark" aria-hidden="true">✳</span></span></h1>
            <p className="hero-alias">也可以叫我 <span>椰奶</span> <span aria-hidden="true">♡</span></p>
            <p className="hero-description">用一点审美、一点好奇心，<br />把平凡日子，过成喜欢的样子。</p>
            <a className="pill-button" href="#about">来认识一下我 <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-location"><span aria-hidden="true">✳</span> BASED IN SHENZHEN · MADE WITH LOVE</p>
          <span className="hero-bottom-flower" aria-hidden="true">✿</span>
        </section>
        <section className="about section-cream" id="about" aria-labelledby="about-title">
          <div className="section-intro"><p className="eyebrow">A LITTLE BIT ABOUT ME</p><h2 id="about-title">慢慢认识，也会<span className="pink-underline">很有趣。</span></h2><p>慢热是我的开场，真诚是我的底色。</p></div>
          <div className="about-layout">
            <div className="portrait-wrap"><div className="tape tape-portrait" /><figure className="polaroid"><img src={assetPath("/images/yina-and-dog.jpg")} width="1280" height="960" alt="詹依娜抱着她的小狗" loading="lazy" /><figcaption>me & my little sunshine ♡</figcaption></figure><span className="portrait-label">nice to meet you!</span><span className="portrait-flower" aria-hidden="true">✿</span></div>
            <div className="about-copy"><p className="handwritten">Hi, I&apos;m Yina!</p><h3>设计出身，<br />生活里的美好收集者。</h3><p>我是来自深圳的詹依娜，毕业于<span className="emphasis">广州美术学院</span>，学习的是<span className="emphasis">产品设计</span>。对我来说，审美不只在作品里，也藏在穿搭、一件小饰品和生活的细节里。</p><p>我有一点慢热、内向，心思细腻，也热心善良。刚认识时可能安静一些，熟悉之后，就会慢慢打开话匣子。</p><div className="personal-tags"><span>INFP · 理想主义</span><span>手工 & 绘画爱好者</span><span>两只小狗的全职铲屎官</span></div><a className="text-link" href={feishuUrl} target="_blank" rel="noopener noreferrer">翻翻我的个人说明书 <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
        <section className="experience checker-pink" id="experience" aria-labelledby="experience-title">
          <div className="section-intro"><p className="eyebrow">THINGS I&apos;VE PUT MY HEART INTO</p><h2 id="experience-title">把喜欢的事，<br />一点点变成<span className="cream-underline">自己的经历。</span></h2><p>从视觉创作到经营小店，每一次尝试都算数。</p></div>
          <div className="experience-grid">{experiences.map(item => <article className={`experience-card card-${item.kind}`} key={item.no}><div className="tape" /><div className="card-art"><span className="art-number">{item.no}</span><Doodle kind={item.kind} /><span className="art-caption">{item.en}</span></div><div className="card-copy"><p className="card-role">{item.role}</p><h3>{item.title}</h3><p>{item.text}</p><span className="card-tags">{item.tags}</span></div></article>)}</div>
          <p className="experience-extra">也曾在潮牌女装店、黄金奢侈品品牌做销售，<br className="mobile-break" />在与人相处的过程中，练习观察、倾听与表达。</p>
          <div className="skill-strip"><span>审美与视觉创作</span><span aria-hidden="true">✳</span><span>新媒体素材拍摄</span><span aria-hidden="true">✳</span><span>把想法认真落地</span></div>
        </section>
        <section className="life" id="life" aria-labelledby="life-title"><div className="section-intro"><p className="eyebrow">LITTLE PAWS, BIG LOVE</p><h2 id="life-title">我的日子，有<span className="pink-underline">两份毛茸茸。</span></h2><p>“我非常爱我的小狗，她们填满了我平淡的生活。”</p><span className="life-handwritten">a few of my favorite moments ↓</span></div><PhotoGallery /><p className="gallery-hint">点开照片，看看我的小小快乐 <span aria-hidden="true">♡</span></p></section>
        <section className="hello section-cream" id="hello" aria-labelledby="hello-title"><div className="hello-art" aria-hidden="true"><Doodle kind="coconut" /><span>let&apos;s say hello!</span></div><div className="hello-copy"><p className="eyebrow">GOOD THINGS START WITH A HELLO</p><h2 id="hello-title">很高兴，<br />在这里<span className="pink-underline">遇见你。</span></h2><p>如果你也喜欢设计、穿搭、手作，或者小狗，<br />那我们已经有了一个很好的聊天开场。</p><a className="pill-button" href={feishuUrl} target="_blank" rel="noopener noreferrer">更多关于椰奶 <span aria-hidden="true">↗</span></a></div><span className="hello-heart" aria-hidden="true">♡</span></section>
      </main>
      <footer className="site-footer"><a className="footer-brand" href="#top">椰奶<span>YINA&apos;S LITTLE WORLD</span></a><p>保持柔软，保持好奇。<br /><span>© 2026 詹依娜 · Made with a little love ♡</span></p><a className="back-to-top" href="#top">回到顶部 <span aria-hidden="true">↑</span></a></footer>
    </div>
    <p className="outside-note">a little corner of the internet, all my own.</p>
  </>;
}
