import { assetPath } from "./asset-path";

const petalPath = "M250 68 C294 7 353 19 344 91 C418 58 458 107 404 157 C476 180 465 242 393 244 C443 312 393 350 334 305 C327 380 264 387 244 320 C194 381 139 347 163 282 C86 300 66 238 133 207 C61 170 83 108 157 127 C130 53 192 28 225 88 Z";

function HeartRecord() {
  return <svg className="heart-record" viewBox="0 0 320 300" aria-hidden="true">
    <defs><clipPath id="record-heart"><path d="M160 280 C126 244 20 172 18 95 C15 4 113 -8 160 61 C211 -9 310 8 302 102 C296 175 196 246 160 280Z"/></clipPath><radialGradient id="vinyl-pink"><stop stopColor="#ebc3cf"/><stop offset=".48" stopColor="#c58c9e"/><stop offset="1" stopColor="#e8becb"/></radialGradient></defs>
    <g clipPath="url(#record-heart)"><rect width="320" height="300" fill="url(#vinyl-pink)"/>{[62,69,77,89,103,116,129,145,159,174].map(r=><circle key={r} cx="161" cy="151" r={r} fill="none" stroke="#b0798c" strokeWidth="1" opacity=".26"/>)}<circle cx="161" cy="151" r="39" fill="#dfafbE" stroke="#b9889b"/><circle cx="161" cy="151" r="8" fill="#827071"/><path d="M29 31L289 247M64 2L313 202" stroke="#fff" strokeWidth="17" opacity=".12"/></g>
    <path d="M160 280 C126 244 20 172 18 95 C15 4 113 -8 160 61 C211 -9 310 8 302 102 C296 175 196 246 160 280Z" fill="none" stroke="#aa7989" strokeWidth="1.5"/>
  </svg>;
}

function LaceNote() {
  return <div className="lace-note"><svg viewBox="0 0 430 310" aria-hidden="true">
    <ellipse cx="215" cy="155" rx="182" ry="125" fill="#f8eee9"/>
    <g fill="none" stroke="#fffaf4" strokeWidth="1.7">{Array.from({length:44},(_,i)=>{const a=i*Math.PI*2/44;const x=215+174*Math.cos(a),y=155+119*Math.sin(a);return <g key={i} transform={`translate(${x} ${y}) rotate(${i*360/44+90})`}><ellipse rx="11" ry="23"/><ellipse rx="5" ry="18"/><path d="M-11 0L11 0M-8 -14L8 14M8 -14L-8 14"/><circle cy="-25" r="3"/><circle cy="25" r="3"/></g>;})}<ellipse cx="215" cy="155" rx="150" ry="98" strokeWidth="3"/><ellipse cx="215" cy="155" rx="155" ry="103" strokeDasharray="2 5"/></g>
    <ellipse cx="215" cy="155" rx="146" ry="93" fill="#f7e5e7" stroke="#d3a8b4" strokeWidth=".8"/>
  </svg><div className="lace-note-copy"><p>詹依娜</p><span>个人作品集</span><small>商务对接 / 选品搭配 / 拍摄剪辑</small></div></div>;
}

export function HeroCollage() {
  return <section className="hero scrapbook-hero" aria-labelledby="hero-title">
    <div className="hero-label"><span>PERSONAL PORTFOLIO</span><span>CONTENT / STYLE / IP</span></div>
    <h1 id="hero-title">Portfolio<span className="sr-only"> · 詹依娜的个人作品集</span></h1>
    <div className="scrapbook-stage">
      <div className="scrapbook-paper" aria-hidden="true"><span>YINA / PERSONAL COLLECTION</span></div>
      <HeartRecord/>
      <div className="keepsake-ticket" aria-hidden="true"><span>PERSONAL COLLECTION / 01</span><p>Style &amp; story</p><span className="ticket-stitch">✦ · · · · · · · · · · · · ✦</span></div>
      <LaceNote/>
      <figure className="portrait-card collage-portrait">
        <svg className="portrait-mask-defs" width="0" height="0" aria-hidden="true"><defs><clipPath id="portrait-petal-mask" clipPathUnits="objectBoundingBox"><path d={petalPath} transform="scale(.002 .0025)"/></clipPath></defs></svg>
        <div className="portrait-window"><img src={assetPath("/new-document/portrait-vintage.png")} alt="詹依娜的复古黑白人像" width={1254} height={1254} fetchPriority="high"/><svg viewBox="0 0 500 400" preserveAspectRatio="none" aria-hidden="true"><path d={petalPath} fill="none" stroke="#edc3d0" strokeWidth="2.5"/></svg></div>
        <figcaption>Zhan YIna</figcaption>
        <span className="collage-frame-corner" aria-hidden="true">✦</span>
      </figure>
      <div className="mini-photo" aria-hidden="true"><img src={assetPath("/new-document/portrait-vintage.png")} alt="" width={1254} height={1254}/><span>little moments</span></div>
      <div className="education-stamp"><span className="stamp-top">GZFA · DESIGN</span><span className="stamp-heart" aria-hidden="true">♡</span><p>广州美术学院</p><span>产品设计专业</span></div>
    </div>
    <div className="hero-footer"><span>ZHAN YINA<br/><small>广东 · 深圳</small></span><a href="#about" className="scroll-prompt">EXPLORE MY STORY <span>↓</span></a><span>2026<br/><small>PORTFOLIO</small></span></div>
  </section>;
}
