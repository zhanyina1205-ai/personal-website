"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
// tape: which top corner of the print gets a strip of washi (opposite the paperclip);
// index cards are held by the clip alone. print "dim": white-ground image, toned down.
type Look = {
  paper: "char" | "wine" | "graphite" | "black" | "umber" | "plum";
  tilt: number; itemTilt: number; tab: "start" | "center" | "end";
  clip: "silver" | "pink" | "ink"; clipX: string;
  tape?: { tone: "pink" | "rose" | "cream"; corner: "tl" | "tr" };
  stamp: string; stampShape: "rect" | "round"; stampRot: number; ink: string;
  focus?: string; sticker?: string; print?: "dim";
};

const looks: Record<string, Look> = {
  about: { paper: "char", tilt: -1.2, itemTilt: 1.4, tab: "start", clip: "silver", clipX: "16%", tape: { tone: "pink", corner: "tr" }, stamp: "PROFILE", stampShape: "rect", stampRot: -7, ink: "0 0", focus: "center 16%" },
  liangliang: { paper: "wine", tilt: 0.8, itemTilt: -1.5, tab: "center", clip: "ink", clipX: "72%", tape: { tone: "cream", corner: "tl" }, stamp: "IP CASE", stampShape: "round", stampRot: 10, ink: "-38px -21px", focus: "center 30%" },
  yenai: { paper: "graphite", tilt: -0.5, itemTilt: 1, tab: "end", clip: "pink", clipX: "20%", tape: { tone: "rose", corner: "tr" }, stamp: "SELF-MADE", stampShape: "rect", stampRot: 6, ink: "-64px -47px", focus: "center 40%", print: "dim" },
  rock: { paper: "black", tilt: 1.3, itemTilt: -1.2, tab: "start", clip: "silver", clipX: "68%", tape: { tone: "pink", corner: "tl" }, stamp: "ROCK ON", stampShape: "round", stampRot: -11, ink: "-17px -83px", focus: "center 34%" },
  montirivers: { paper: "umber", tilt: -0.9, itemTilt: 1.6, tab: "center", clip: "ink", clipX: "58%", stamp: "BRAND", stampShape: "rect", stampRot: 7, ink: "-91px -12px", sticker: "/stickers/st-mountain-ring.webp" },
  tools: { paper: "plum", tilt: 1.1, itemTilt: -1.3, tab: "end", clip: "silver", clipX: "62%", stamp: "HANDY", stampShape: "round", stampRot: -8, ink: "-52px -66px", sticker: "/stickers/st-hanger.webp" },
};

function Paperclip() {
  // Two strokes of the same wire: the body, then a thin specular line nudged up-left.
  const d = "M7 15V41a3.5 3.5 0 0 0 7 0V8a5 5 0 0 0-10 0V45a6.5 6.5 0 0 0 13 0V17";
  return <svg className="deck-clip" viewBox="0 0 20 56" aria-hidden="true" focusable="false">
    <path className="deck-clip-wire" d={d}/>
    <path className="deck-clip-shine" d={d}/>
  </svg>;
}

function Arrow({ direction }: { direction: -1 | 1 }) {
  return <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    {direction < 0 ? <path d="M16 10H4.5M9 5 4 10l5 5"/> : <path d="M4 10h11.5M11 5l5 5-5 5"/>}
  </svg>;
}

const pad2 = (value: number) => String(value).padStart(2, "0");

export function ModuleDeck() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [deck, setDeck] = useState({ index: 0, start: true, end: false });
  useSpotlight(sectionRef);
  useFxInView(sectionRef);

  // Scroll state -> counter, progress thumb, rail ticks, edge fades and button states.
  useEffect(() => {
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!track || !progress) return;
    const controller = new AbortController();
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".deck-card"));
      const max = Math.max(track.scrollWidth - track.clientWidth, 0);
      const left = Math.min(Math.max(track.scrollLeft, 0), max);
      progress.style.setProperty("--deck-p", (max ? left / max : 0).toFixed(4));
      progress.style.setProperty("--deck-vis", Math.min(track.clientWidth / track.scrollWidth, 1).toFixed(4));
      progress.querySelectorAll<HTMLElement>(".deck-tick").forEach((tick, i) => {
        const card = cards[i];
        if (card) tick.style.left = `${((card.offsetLeft + card.offsetWidth / 2) / track.scrollWidth * 100).toFixed(2)}%`;
      });
      const snapLine = left + (parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0);
      let index = 0;
      cards.forEach((card, i) => {
        if (Math.abs(card.offsetLeft - snapLine) < Math.abs(cards[index].offsetLeft - snapLine)) index = i;
      });
      const start = left <= 2;
      const end = left >= max - 2;
      setDeck(prev => prev.index === index && prev.start === start && prev.end === end ? prev : { index, start, end });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    track.addEventListener("scroll", schedule, { passive: true, signal: controller.signal });
    const resize = new ResizeObserver(schedule);
    resize.observe(track);
    update();

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

    return () => { controller.abort(); resize.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, []);

  // Folders slide in once when the deck first scrolls into view (skipped if already
  // on screen at mount, or under reduced motion — then they are simply there).
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (track.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    section.setAttribute("data-enter", "wait");
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      section.setAttribute("data-enter", "in");
      observer.disconnect();
    }, { rootMargin: "0px 0px -12% 0px" });
    observer.observe(track);
    return () => {
      observer.disconnect();
      if (section.getAttribute("data-enter") === "wait") section.removeAttribute("data-enter");
    };
  }, []);

  function nudge(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    if ((direction < 0 && deck.start) || (direction > 0 && deck.end)) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".deck-card"));
    const target = cards[Math.min(Math.max(deck.index + direction, 0), cards.length - 1)];
    if (!target) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = target.offsetLeft - (parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0);
    track.scrollTo({ left, behavior: calm ? "auto" : "smooth" });
  }

  const at = deck.start && deck.end ? "start end" : deck.start ? "start" : deck.end ? "end" : "mid";

  return <section className="module-deck fx-spotlight" ref={sectionRef} aria-labelledby="deck-title" data-at={at}>
    <div className="deck-head fx-reveal">
      <div>
        <p className="eyebrow">02 / 作品与模块</p>
        <h2 id="deck-title">点开每个模块，<br/><span className="fx-scribble-host">看具体的内容<Scribble variant="underline"/></span>。</h2>
      </div>
      <div className="deck-controls">
        <button type="button" onClick={() => nudge(-1)} aria-label="上一个模块" aria-controls="deck-track" aria-disabled={deck.start}><Arrow direction={-1}/></button>
        <button type="button" onClick={() => nudge(1)} aria-label="下一个模块" aria-controls="deck-track" aria-disabled={deck.end}><Arrow direction={1}/></button>
      </div>
    </div>

    <div className="deck-track" id="deck-track" ref={trackRef}>
      {modules.map((module, order) => {
        const look = looks[module.id];
        const style = {
          "--i": order,
          "--tilt": `${look.tilt}deg`,
          "--item-tilt": `${look.itemTilt}deg`,
          "--fx-pull-rot": `${(-look.itemTilt * 0.4).toFixed(2)}deg`,
          "--clip-x": look.clipX,
          "--stamp-rot": `${look.stampRot}deg`,
          "--ink-pos": look.ink,
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
          <div className="deck-folder">
            <span className="deck-tab"><b>{module.index}</b><span>{module.en}</span></span>
            <div className="deck-body">
              <span className={`deck-item fx-pull-item clip-${look.clip}`} aria-hidden="true">
                {module.img
                  ? <span className={`deck-photo${look.print ? ` print-${look.print}` : ""}`}><span className="deck-photo-frame">
                      <img src={assetPath(module.img)} alt="" width={640} height={800} loading="lazy"/>
                      <span className="grain grain--soft"/>
                    </span></span>
                  : <span className="deck-index fx-torn fx-torn--top">
                      <span className="deck-mono">{module.mono}</span>
                      {module.decor && <img className="deck-decor" src={assetPath(module.decor)} alt="" loading="lazy"/>}
                      {look.sticker && <img className="deck-sticker" src={assetPath(look.sticker)} alt="" width={512} height={512} loading="lazy"/>}
                    </span>}
                <Paperclip/>
                {look.tape && <span className={`tape tape--${look.tape.tone} deck-tape deck-tape--${look.tape.corner}`}/>}
              </span>
              <div className="deck-pocket">
                <h3>{module.name}</h3>
                <p>{module.tag}</p>
                <span className="deck-enter">进入 <i aria-hidden="true">↗</i></span>
              </div>
              <span className={`deck-stamp deck-stamp--${look.stampShape} fx-ink fx-stamp-in`} aria-hidden="true"><span>{look.stamp}</span></span>
            </div>
          </div>
        </a>;
      })}
    </div>

    <div className="deck-progress fx-reveal" ref={progressRef} aria-hidden="true">
      <span className="deck-count"><b>{pad2(deck.index + 1)}</b><i>/</i><span>{pad2(modules.length)}</span></span>
      <span className="deck-rail">
        {modules.map(module => <i key={module.id} className="deck-tick"/>)}
        <span className="deck-thumb"/>
      </span>
    </div>
  </section>;
}
