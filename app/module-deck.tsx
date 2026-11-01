"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "./asset-path";

type Module = {
  id: string; index: string; name: string; en: string; tag: string;
  img?: string; kind: "photo" | "brand" | "tools"; mono?: string;
};

const modules: Module[] = [
  { id: "about", index: "01", name: "基本信息", en: "ABOUT ME", tag: "23 · 广美产品设计 · 也叫椰奶", img: "/new-document/portrait-cover-clean.png", kind: "photo" },
  { id: "liangliang", index: "02", name: "是亮亮", en: "服务的 IP · @涂芷靓", tag: "穿搭 IP 账号分析与爆款拆解", img: "/ip-showcase/avatar.jpg", kind: "photo" },
  { id: "yenai", index: "03", name: "椰奶没喝饱", en: "我的穿搭账号", tag: "5.17 万粉 · 从零起号与受众分析", img: "/note-covers/avatar.jpg", kind: "photo" },
  { id: "rock", index: "04", name: "摇滚椰奶冻", en: "我的饰品店铺", tag: "平价项链 · 高转化带货笔记", img: "/rock-notes/8MASvhj1rwe.webp", kind: "photo" },
  { id: "montirivers", index: "05", name: "山河集", en: "服务的珠宝品牌", tag: "MontiRivers · 店员号矩阵运营", kind: "brand", mono: "SHJ" },
  { id: "tools", index: "06", name: "小工具", en: "LITTLE HELPERS", tag: "穿搭衣橱 · 养宠日记", kind: "tools", mono: "✳" },
];

export function ModuleDeck() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const controller = new AbortController();
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    // On desktop, let a vertical trackpad / wheel gesture scroll the deck horizontally.
    track.addEventListener("wheel", event => {
      if (!fine.matches) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
      if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }, { passive: false, signal: controller.signal });

    return () => controller.abort();
  }, []);

  function nudge(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".deck-card");
    const step = card ? card.offsetWidth + 18 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return <section className="module-deck" aria-labelledby="deck-title">
    <div className="deck-head">
      <div>
        <p className="eyebrow">02 / 作品与模块</p>
        <h2 id="deck-title">点开每个模块，<br/>看具体的内容。</h2>
      </div>
      <div className="deck-controls" aria-hidden="true">
        <button type="button" onClick={() => nudge(-1)} aria-label="上一个模块">←</button>
        <button type="button" onClick={() => nudge(1)} aria-label="下一个模块">→</button>
      </div>
    </div>

    <div className="deck-track" ref={trackRef}>
      {modules.map(module => <a
        key={module.id}
        className={`deck-card kind-${module.kind}`}
        href={`#${module.id}`}
        aria-label={`进入模块：${module.name}，${module.tag}`}
      >
        <div className="deck-card-media" aria-hidden="true">
          {module.img
            ? <img src={assetPath(module.img)} alt="" width={640} height={800} loading="lazy"/>
            : <span className="deck-mono">{module.mono}</span>}
        </div>
        <span className="deck-card-top"><b>{module.index}</b><span>{module.en}</span></span>
        <div className="deck-card-foot">
          <h3>{module.name}</h3>
          <p>{module.tag}</p>
          <span className="deck-enter">进入 <i aria-hidden="true">↗</i></span>
        </div>
      </a>)}
    </div>
  </section>;
}
