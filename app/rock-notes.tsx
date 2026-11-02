"use client";

import { useRef, type CSSProperties } from "react";
import { assetPath } from "./asset-path";
import { useFxInView } from "./scrapbook-fx";

const notes = [
  { key: "8MASvhj1rwe", title: "十字架项链搭小吊带也太辣啦🥵", likes: 1397, saves: 510, comments: 25, type: "normal" },
  { key: "9o7eUt8huJA", title: "好爱黑色系 🖤 叠戴十字架甜酷又百搭", likes: 1260, saves: 443, comments: 14, type: "normal" },
  { key: "AmVnXFs8V9C", title: "欧米加…十字架项链🖤也太百搭了吧‼️", likes: 1128, saves: 343, comments: 7, type: "normal" },
  { key: "4L9nKEzqfIU", title: "欧米加…叠戴十字架项链也泰酷辣🥵", likes: 751, saves: 228, comments: 12, type: "video" },
] as const;

const flow = [
  { step: "选品 + 供应链", text: "参考热门款，对接供应链，确定主推的十字架项链系列。" },
  { step: "定价 + 上架", text: "核算成本定价，完成商品上架与店铺运营。" },
  { step: "拍摄带货内容", text: "围绕辣妹甜酷风，上身实拍项链的叠戴与搭配。" },
  { step: "剪辑 + 发布", text: "剪映完成带货笔记，发布到小红书并引导下单。" },
];

const maxLikes = Math.max(...notes.map(n => n.likes));
const maxSaves = Math.max(...notes.map(n => n.saves));
const totalLikes = notes.reduce((s, n) => s + n.likes, 0);
const totalSaves = notes.reduce((s, n) => s + n.saves, 0);

export function RockNotes() {
  const section = useRef<HTMLElement>(null);
  useFxInView(section);
  return <section className="rock-notes" id="rock-notes" ref={section} aria-labelledby="rock-notes-title">
    <div className="rock-notes-head fx-reveal">
      <div>
        <p className="eyebrow">带货内容 / HIGH-CONVERSION NOTES</p>
        <h4 id="rock-notes-title">四篇高转化带货笔记</h4>
        <p className="rock-notes-tag"><span>朋克辣妹甜酷风</span><span>上身实拍</span><span>拍摄剪辑一人包</span></p>
      </div>
      <dl className="rock-agg">
        <div><dt>四篇合计 · 点赞</dt><dd>{totalLikes.toLocaleString()}</dd></div>
        <div><dt>四篇合计 · 收藏</dt><dd>{totalSaves.toLocaleString()}</dd></div>
      </dl>
    </div>

    <div className="rock-note-grid fx-reveal">{notes.map((note, i) => <a className="rock-note-card" key={note.key} href={`https://xhslink.cn/o/${note.key}`} target="_blank" rel="noopener noreferrer" aria-label={`在小红书打开：${note.title}`}>
      <div className="rock-note-cover film-perf"><img src={assetPath(`/rock-notes/${note.key}.webp`)} alt={note.title} width={1080} height={1440} loading="lazy"/><span className="grain grain--soft" aria-hidden="true"/><span className="rock-note-sheen" aria-hidden="true"/>{i === 0 && <span className="tape tape--pink" aria-hidden="true" style={{top:-8,left:14,transform:'rotate(-6deg)'}}/>}{i === 1 && <span className="rock-note-sticker" aria-hidden="true"/>}<span className="rock-note-rank fx-ink fx-stamp-in" style={{ "--fx-delay": `${i * 0.12}s` } as CSSProperties} aria-hidden="true">No.{i + 1}</span>{note.type === "video" && <span className="rock-note-video glass-chip" aria-label="视频笔记">▶</span>}<span className="rock-note-open" aria-hidden="true">↗</span></div>
      <div className="rock-note-body">
        <h5 title={note.title}>{note.title}</h5>
        <div className="rock-note-bars">
          <div><span>赞 <b>{note.likes.toLocaleString()}</b></span><i><em style={{ width: `${note.likes / maxLikes * 100}%` }}/></i></div>
          <div><span>藏 <b>{note.saves.toLocaleString()}</b></span><i className="save"><em style={{ width: `${note.saves / maxSaves * 100}%` }}/></i></div>
        </div>
        <span className="rock-note-comments">评论 {note.comments}</span>
      </div>
    </a>)}</div>

    <div className="rock-flow fx-reveal">
      <div className="rock-receipt">
        <span className="rock-flow-label">我的带货工作流 / 一人独立完成</span>
        <ol>{flow.map((f, i) => <li key={f.step}><span className="rock-flow-step">0{i + 1}</span><b>{f.step}</b><p>{f.text}</p>{i < flow.length - 1 && <span className="rock-flow-arrow" aria-hidden="true">→</span>}</li>)}</ol>
      </div>
    </div>

    <p className="source-note rock-note-source">互动数据采集于 2026.11.02，非实时，为笔记累计值；封面与数据来自对应小红书笔记。</p>
  </section>;
}
