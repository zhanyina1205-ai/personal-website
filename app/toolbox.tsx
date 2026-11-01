import { assetPath } from "./asset-path";

type Tool = {
  id: string;
  title: string;
  description: string;
  href: string | null;
};

// Add each tool's title, description and public URL here when it is ready.
const tools: Tool[] = [
  { id: "01", title: "穿搭手记", description: "收集穿搭灵感，管理衣橱、选题与拍摄。", href: "https://zhanyina1205-ai.github.io/outfit-notes/#closet" },
  { id: "02", title: "爪爪日记", description: "记录喂食、鲜食备餐与成长日常，陪毛孩子慢慢长大。", href: "https://zhanyina1205-ai.github.io/paw-diary/" },
  { id: "03", title: "小工具 03", description: "更多小帮手，慢慢收集。", href: null },
];

// Die-cut stickers laid on each polaroid; the line sketch stays underneath as a chalk draft.
const toolStickers = ["st-hanger", "st-paw-diary", "st-starburst"];
const toolTapes = ["", "tape--cream", "tape--rose"];

function ToolArtwork({ index, soon }: { index: number; soon: boolean }) {
  return <div className={`tool-artwork tool-artwork-${index}`} aria-hidden="true">
    <span className="tool-sketch-tab">SKETCH</span>
    <svg viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {index === 0
        ? <><path d="M86 52c0-9 5-16 14-16s14 6 14 13c0 6-4 10-10 12"/><path d="M100 61 40 103a4 4 0 0 0 2 7h116a4 4 0 0 0 2-7l-60-42Z"/><path d="M63 24c6 6 6 14 0 20M137 22c-6 6-6 14 0 20"/></>
        : index === 1
          ? <><ellipse cx="100" cy="98" rx="30" ry="25"/><ellipse cx="60" cy="72" rx="11" ry="15"/><ellipse cx="86" cy="54" rx="11" ry="16"/><ellipse cx="114" cy="54" rx="11" ry="16"/><ellipse cx="140" cy="72" rx="11" ry="15"/></>
          : <><path d="M100 40c3 14 11 22 26 26-13 4-21 12-25 26-4-14-12-22-26-25 14-5 22-13 25-27Z"/><path d="M46 36l-6-6M160 36l6-6M44 92l-7 5M164 92l7 5"/></>}
    </svg>
    <img className="tool-sticker" src={assetPath(`/stickers/${toolStickers[index % toolStickers.length]}.webp`)} alt="" loading="lazy" decoding="async"/>
    <span className="tool-artwork-number">0{index + 1}</span>
    {soon && <span className="tool-soon-stamp fx-ink">COMING SOON</span>}
  </div>;
}

export function Toolbox() {
  return <section className="toolbox-section section-pad" id="tools" aria-labelledby="tools-title">
    <div className="section-kicker"><span>04 / MY LITTLE TOOLBOX</span><span>小工具 · 持续更新中</span></div>
    <div className="toolbox-heading"><div><h2 className="display-title" id="tools-title">我的小工具<span>MAKE ROOM FOR IDEAS</span></h2><p>为创作和生活，做一点好用的小东西。<br/>收好灵感，也记下日常。</p></div><span className="toolbox-script" aria-hidden="true">Little helpers.<span>✳</span></span></div>
    <div className="toolbox-shelf dossier dossier--manila">
      <span className="dossier-tab" aria-hidden="true"><b>FILE 06</b>小工具</span>
      <img className="toolbox-bow" src={assetPath("/stickers/st-bow.webp")} alt="" aria-hidden="true" loading="lazy" decoding="async"/>
      <div className="toolbox-shelf-label"><span>收藏一些小小的好用。</span><span>THE USEFUL LITTLE THINGS</span></div>
      <div className="toolbox-grid">{tools.map((tool, index) => {
        const contents = <>
          <span className={`tape ${toolTapes[index % toolTapes.length]}`} aria-hidden="true"/>
          <div className="tool-card-meta"><span>TOOL / {tool.id}</span><span className={`stamp ${tool.href ? "" : "stamp--ink"}`}>{tool.href ? "在用中" : "筹备中"}</span></div>
          <ToolArtwork index={index} soon={!tool.href}/>
          <div className="tool-card-copy"><h3>{tool.title}</h3><p>{tool.description}</p></div>
          <div className="tool-card-bottom"><span>{tool.href ? "打开小工具" : "COMING SOON"}</span><span aria-hidden="true">{tool.href ? "↗" : "✧"}</span></div>
        </>;
        return tool.href
          ? <a className="tool-card fx-curl" key={tool.id} href={tool.href} target="_blank" rel="noopener noreferrer">{contents}</a>
          : <article className="tool-card is-soon" key={tool.id}>{contents}</article>;
      })}</div>
      <div className="toolbox-footnote"><span>留一点好奇，等下一次更新。</span><span aria-hidden="true">with a little help &amp; a lot of ideas.</span></div>
    </div>
  </section>;
}
