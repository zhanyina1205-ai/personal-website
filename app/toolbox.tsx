type Tool = {
  id: string;
  title: string;
  description: string;
  href: string | null;
};

// Add each tool's title, description and public URL here when it is ready.
const tools: Tool[] = [
  { id: "01", title: "小工具 01", description: "第一份好用，正在准备中。", href: null },
  { id: "02", title: "小工具 02", description: "留一点位置，给新的灵感。", href: null },
  { id: "03", title: "小工具 03", description: "更多小帮手，慢慢收集。", href: null },
];

function ToolArtwork({ index }: { index: number }) {
  return <div className={`tool-artwork tool-artwork-${index}`} aria-hidden="true">
    <div className="tool-mini-window"><div className="tool-window-bar"><i/><i/><i/><span>YINA’S TOOLBOX</span></div>
      <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {index === 0 ? <><path d="m100 18 9 29 30 10-30 10-9 29-10-29-29-10 29-10Z"/><path d="m146 75 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z"/><path d="M44 31h17m-8-8v16M40 93l13-5M148 28l9-8"/><circle cx="64" cy="75" r="3"/></> : index === 1 ? <><rect x="66" y="23" width="61" height="75" rx="3" transform="rotate(-9 96 60)"/><path d="m85 44 24-4M87 55l24-4M90 66l14-2M131 72l11 11 19-24"/><path d="m43 39 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/></> : <><rect x="58" y="32" width="52" height="61" rx="4" transform="rotate(-10 84 62)"/><rect x="91" y="23" width="52" height="61" rx="4" transform="rotate(9 117 53)"/><path d="m110 44 5 6 10-12M108 62l18 3M50 23l-8-7M155 78l9 7M158 47h10"/></>}
      </svg>
    </div><span className="tool-artwork-number">0{index + 1}</span>
  </div>;
}

export function Toolbox() {
  return <section className="toolbox-section section-pad" id="tools" aria-labelledby="tools-title">
    <div className="section-kicker"><span>04 / MY LITTLE TOOLBOX</span><span>小工具 · 持续更新中</span></div>
    <div className="toolbox-heading"><div><h2 className="display-title" id="tools-title">我的小工具<span>MAKE ROOM FOR IDEAS</span></h2><p>把好用的小工具，放进我的创作口袋。<br/>让灵感更轻松地变成作品。</p></div><span className="toolbox-script" aria-hidden="true">Little helpers.<span>✳</span></span></div>
    <div className="toolbox-shelf"><div className="toolbox-shelf-label"><span>收藏一些小小的好用。</span><span>THE USEFUL LITTLE THINGS</span></div>
      <div className="toolbox-grid">{tools.map((tool, index) => {
        const contents = <><div className="tool-card-meta"><span>TOOL / {tool.id}</span><span className="tool-status">{tool.href ? "可以使用" : "即将上线"}</span></div><ToolArtwork index={index}/><div className="tool-card-copy"><h3>{tool.title}</h3><p>{tool.description}</p></div><div className="tool-card-bottom"><span>{tool.href ? "打开小工具" : "COMING SOON"}</span><span aria-hidden="true">{tool.href ? "↗" : "✧"}</span></div></>;
        return tool.href ? <a className="tool-card" key={tool.id} href={tool.href} target="_blank" rel="noopener noreferrer">{contents}</a> : <article className="tool-card" key={tool.id}>{contents}</article>;
      })}</div>
      <div className="toolbox-footnote"><span>留一点好奇，等下一次更新。</span><span aria-hidden="true">with a little help & a lot of ideas.</span></div>
    </div>
  </section>;
}
