"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { assetPath } from "./asset-path";
import { Scribble, useFxInView, useSpotlight } from "./scrapbook-fx";

type Module = {
  id: string; index: string; name: string; en: string; tag: string;
  img?: string; kind: "photo" | "brand" | "tools"; mono?: string; decor?: string;
};

const modules: Module[] = [
  { id: "about", index: "01", name: "基本信息", en: "ABOUT ME", tag: "23 · 广美产品设计 · 也叫椰奶", img: "/new-document/portrait-cover-clean.png", kind: "photo" },
  { id: "liangliang", index: "02", name: "是亮亮", en: "服务的 IP · @涂芷靓", tag: "穿搭 IP 账号分析与爆款拆解", img: "/ip-showcase/avatar.jpg", kind: "photo" },
  { id: "yenai", index: "03", name: "椰奶没喝饱", en: "我的穿搭账号", tag: "5.17 万粉 · 从零起号与受众分析", img: "/note-covers/avatar.jpg", kind: "photo" },
  { id: "rock", index: "04", name: "摇滚椰奶冻", en: "我的饰品店铺", tag: "平价项链 · 高转化带货笔记", img: "/rock-notes/8MASvhj1rwe.webp", kind: "photo" },
  { id: "montirivers", index: "05", name: "山河集", en: "服务的珠宝品牌", tag: "MontiRivers · 店员号矩阵运营", kind: "brand", mono: "SHJ", decor: "/decor/star-doodle.svg" },
  { id: "tools", index: "06", name: "小工具", en: "LITTLE HELPERS", tag: "穿搭衣橱 · 养宠日记", kind: "tools", mono: "✳", decor: "/decor/sparkle.svg" },
];

// Art direction per folder (decoration only — the module data above is the content).
type Look = {
  paper: "char" | "wine" | "graphite" | "black" | "umber" | "plum";
  tilt: number; itemTilt: number; tab: "start" | "center" | "end";
  clip: "silver" | "pink" | "ink"; clipX: string; tape: "pink" | "rose" | "cream";
  stamp: string; stampShape: "rect" | "round"; stampRot: number; focus?: string; sticker?: string;
};

const looks: Record<string, Look> = {
  about: { paper: "char", tilt: -1.2, itemTilt: 1.4, tab: "start", clip: "silver", clipX: "16%", tape: "pink", stamp: "PROFILE", stampShape: "rect", stampRot: -9, focus: "center 16%" },
  liangliang: { paper: "wine", tilt: 0.8, itemTilt: -1.5, tab: "center", clip: "ink", clipX: "72%", tape: "cream", stamp: "IP CASE", stampShape: "round", stampRot: 10, focus: "center 30%" },
  yenai: { paper: "graphite", tilt: -0.5, itemTilt: 1, tab: "end", clip: "pink", clipX: "20%", tape: "rose", stamp: "SELF-MADE", stampShape: "rect", stampRot: -6, focus: "center 40%" },
  rock: { paper: "black", tilt: 1.3, itemTilt: -1.2, tab: "start", clip: "silver", clipX: "68%", tape: "pink", stamp: "ROCK ON", stampShape: "round", stampRot: -11, focus: "center 34%" },
  montirivers: { paper: "umber", tilt: -0.9, itemTilt: 1.6, tab: "center", clip: "ink", clipX: "18%", tape: "cream", stamp: "BRAND", stampShape: "rect", stampRot: 7, sticker: "/stickers/st-mountain-ring.webp" },
  tools: { paper: "plum", tilt: 1.1, itemTilt: -1.3, tab: "end", clip: "silver", clipX: "70%", tape: "pink", stamp: "HANDY", stampShape: "round", stampRot: -8, sticker: "/stickers/st-hanger.webp" },
};

function Paperclip() {
  return <svg className="deck-clip" viewBox="0 0 20 56" aria-hidden="true" focusable="false">
    <path d="M7 15V41a3.5 3.5 0 0 0 7 0V8a5 5 0 0 0-10 0V45a6.5 6.5 0 0 0 13 0V17"/>
  </svg>;
}

export function ModuleDeck() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useSpotlight(sectionRef);
  useFxInView(sectionRef);

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
    const step = card ? card.offsetWidth + 22 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return <section className="module-deck fx-spotlight" ref={sectionRef} aria-labelledby="deck-title">
    <div className="deck-head">
      <div>
        <p className="eyebrow">02 / 作品与模块</p>
        <h2 id="deck-title">点开每个模块，<br/><span className="fx-scribble-host">看具体的内容<Scribble variant="underline"/></span>。</h2>
      </div>
      <div className="deck-controls" aria-hidden="true">
        <button type="button" onClick={() => nudge(-1)} aria-label="上一个模块">←</button>
        <button type="button" onClick={() => nudge(1)} aria-label="下一个模块">→</button>
      </div>
    </div>

    <div className="deck-track" ref={trackRef}>
      {modules.map((module, order) => {
        const look = looks[module.id];
        const style = {
          "--tilt": `${look.tilt}deg`,
          "--item-tilt": `${look.itemTilt}deg`,
          "--fx-pull-rot": `${(-look.itemTilt * 0.4).toFixed(2)}deg`,
          "--clip-x": look.clipX,
          "--stamp-rot": `${look.stampRot}deg`,
          "--fx-delay": `${0.25 + order * 0.09}s`,
          ...(look.focus ? { "--focus": look.focus } : {}),
        } as CSSProperties;
        return <a
          key={module.id}
          className={`deck-card fx-pull kind-${module.kind} paper-${look.paper} tab-${look.tab}`}
          href={`#${module.id}`}
          aria-label={`进入模块：${module.name}，${module.tag}`}
          style={style}
        >
          <span className="deck-tab"><b>{module.index}</b><span>{module.en}</span></span>
          <div className="deck-body">
            <span className={`deck-item fx-pull-item clip-${look.clip}`} aria-hidden="true">
              {module.img
                ? <span className="deck-photo"><span className="deck-photo-frame">
                    <img src={assetPath(module.img)} alt="" width={640} height={800} loading="lazy"/>
                    <span className="grain grain--soft"/>
                  </span></span>
                : <span className="deck-index fx-torn fx-torn--top">
                    <span className="deck-mono">{module.mono}</span>
                    {module.decor && <img className="deck-decor" src={assetPath(module.decor)} alt="" loading="lazy"/>}
                    {look.sticker && <img className="deck-sticker" src={assetPath(look.sticker)} alt="" width={512} height={512} loading="lazy"/>}
                  </span>}
              <Paperclip/>
            </span>
            <span className={`tape tape--${look.tape} deck-tape`} aria-hidden="true"/>
            <div className="deck-pocket">
              <h3>{module.name}</h3>
              <p>{module.tag}</p>
              <span className="deck-enter">进入 <i aria-hidden="true">↗</i></span>
            </div>
            <span className={`deck-stamp deck-stamp--${look.stampShape} fx-ink fx-stamp-in`} aria-hidden="true"><span>{look.stamp}</span></span>
          </div>
        </a>;
      })}
    </div>
  </section>;
}
