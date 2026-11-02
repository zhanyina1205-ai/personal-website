import { DocumentMedia } from "./document-media";

const source = "https://mcn7qru2e05g.feishu.cn/docx/YL4fdfN1oo4EowxKLo1cYe0Gnod";
const regions = [{ name: "广东", value: 15.7 }, { name: "福建", value: 10.3 }, { name: "浙江", value: 7.0 }, { name: "江苏", value: 6.6 }, { name: "四川", value: 5.9 }];
const milestones = [
  { date: "2023.02—05", title: "先开始，再找到自己", text: "从宿舍穿衣镜前试水，把艺术生身份、平价单品和个人风格放进内容。", label: "4 篇试水笔记" },
  { date: "2023.06—09", title: "让单套长成合集", text: "固定更新；把被问得多的单品，按品类、季节整理成可照着买的合集。", label: "首篇万赞 · 吊带合集" },
  { date: "2023.10—2024.08", title: "把有效的方法持续做", text: "接近日更，跟着季节做系列。单套展示风格，合集提供完整搭配参考。", label: "305 篇内容 · 月均约 28 篇" },
  { date: "2024.10 →", title: "从个人创作，走向 IP", text: "带着四万粉账号的经验进入 MCN 实习，后来继续探索姐系通勤与视频内容。", label: "个人经验 → IP 内容实践" },
];

export function YenaiAudience() {
  return <section className="yenai-audience dossier fx-reveal" id="yenai-audience" aria-labelledby="yenai-audience-title">
    <span className="dossier-tab" aria-hidden="true"><b>FILE 03 · A</b>我的受众</span>
    <span className="punch-holes" aria-hidden="true"><i/><i/><i/></span>
    <div className="yenai-section-meta"><span>YENAI / AUDIENCE NOTES</span><span>01 / 我的受众</span></div>
    <header className="yenai-audience-heading"><div><p className="yenai-script" aria-hidden="true">For her.</p><h4 id="yenai-audience-title">我的穿搭，<br/><span className="marker">是分享给谁的？</span></h4></div><div className="yenai-position"><span>从评论里，认识屏幕另一端的她</span><p>以女大学生为核心，<br/>想穿出风格，也在意预算的年轻女生。</p><div><span>平价好买</span><span>整套可参考</span><span>日常能穿</span></div></div></header>
    <div className="yenai-audience-body">
      <div className="yenai-portrait-data">
        <div className="yenai-gender"><div className="yenai-gender-ring" role="img" aria-label="已标性别的 50 位评论者中，46 位为女性，占 92%"><div><b>92<small>%</small></b><span>样本中女性</span></div></div><p>46 / 50 位已标性别的评论者</p></div>
        <div className="yenai-age"><span>年龄线索 / 小样本</span><strong>19—26<small>岁</small></strong><p>15 位已标年龄的评论者<br/>年龄中位数为 22 岁</p><div className="yenai-age-track" aria-hidden="true"><i/><i/></div><div className="yenai-age-legend"><span>19—22 岁 · 8 人</span><span>23—26 岁 · 7 人</span></div></div>
      </div>
      <div className="yenai-regions"><div className="yenai-chart-heading"><h5>她们从哪里来</h5><span>评论 IP 属地 TOP 5</span></div><div className="yenai-region-axis" aria-hidden="true"><span>0</span><span>10%</span><span>20%</span></div><ol>{regions.map(region => <li key={region.name}><span>{region.name}</span><div><i style={{ width: `${region.value / 20 * 100}%` }}/></div><b>{region.value.toFixed(1)}<small>%</small></b></li>)}</ol><p>广东、福建更集中，其次是浙江、江苏与四川。</p></div>
    </div>
    <div className="yenai-needs"><div className="fx-curl"><span>她们最常问</span><h5>“在哪里买？”<small>347 条</small></h5><p>封面标店名与价格，减少找同款的步骤。</p></div><div className="fx-curl"><span>她们还想知道</span><h5>“怎么搭？”<small>246 条</small></h5><p>把鞋、包、配饰一起展示，给到完整造型。</p></div><blockquote>“关注她了<br/>以后这就是我的大学衣服”<cite>— 评论区的一句话</cite></blockquote></div>
    <p className="yenai-data-caption">互动用户样本 ≠ 全部粉丝画像 · 资料采集于 2026.11.01</p>
    <details className="yenai-source"><summary>查看数据口径与资料 ↗</summary><p>画像归纳自 3,604 条粉丝评论与 66 个成功读取的评论者主页；性别仅统计已标注的 50 人，年龄仅统计已标注的 15 人。地域占比以评论条数为分母，并非去重用户或后台粉丝地域分布。需求来自起号、爆发期 2,299 条评论的关键词归类，可多选。未获取后台完整粉丝画像，以上只描述参与互动的样本。</p><a href={source} target="_blank" rel="noopener noreferrer">阅读账号复盘资料 ↗</a></details>
  </section>;
}

export function YenaiOriginStory() {
  return <section className="yenai-origin dossier dossier--pink fx-reveal" id="yenai-origin" aria-labelledby="yenai-origin-title">
    <span className="dossier-tab" aria-hidden="true"><b>FILE 03 · B</b>从零起号</span>
    <span className="punch-holes" aria-hidden="true"><i/><i/><i/></span>
    <div className="yenai-section-meta"><span>YENAI / STARTED FROM MY ROOM</span><span>02 / 从零起号</span></div>
    <div className="yenai-origin-top"><div className="yenai-origin-copy"><p className="yenai-script" aria-hidden="true">My first account.</p><h4 id="yenai-origin-title">从一面宿舍穿衣镜，<br/>到被更多人看见。</h4><div className="yenai-growth"><span>0</span><i aria-hidden="true">↗</i><span>4<small>万粉</small></span></div><p>2023 年大三开始做穿搭号。<br/>从选题、出镜到拍摄剪辑、商务对接，独立完成。</p><span className="yenai-growth-date">截至 2024.10 进入 MCN 实习时</span></div>
      <div className="yenai-story-photos"><figure><DocumentMedia src="/yenai-story/price-outfit.jpg" alt="早期价格型穿搭笔记：37元内搭与皮裤，封面附商品卡"/><figcaption><span>01 / 单套测款</span>把价格和同款放在眼前</figcaption></figure><figure><DocumentMedia src="/yenai-story/first-collection.jpg" alt="2023年8月发布的九件平价吊带合集封面"/><figcaption><span>02 / 合集沉淀</span>第一篇万赞，来自吊带合集</figcaption></figure><span className="yenai-photo-note" aria-hidden="true">One look, then a collection.</span></div>
    </div>
    <ol className="yenai-timeline">{milestones.map((item, i) => <li key={item.date}><div className="yenai-time-number"><span>0{i + 1}</span><time>{item.date}</time></div><h5>{item.title}</h5><p>{item.text}</p><span className="yenai-time-label">{item.label}</span></li>)}</ol>
    <div className="yenai-origin-bottom"><p>我留下的方法：<b>先让人记住我，再让穿搭对她有用。</b></p><a href="#selected-notes">看我的代表内容 ↗</a></div>
    <p className="yenai-origin-source">时间线依据账号复盘资料；“万赞”指该笔记在 2026.11.01 采集时的累计点赞，非发布当日数据。<a href={source} target="_blank" rel="noopener noreferrer">资料来源 ↗</a></p>
  </section>;
}
