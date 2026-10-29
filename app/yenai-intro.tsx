"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export function YenaiIntro() {
  const [visible, setVisible] = useState(true);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    // Chapter links open their destination directly; the intro belongs to the homepage.
    if ((location.hash && location.hash !== "#top") || matchMedia("(prefers-reduced-motion: reduce)").matches) setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = document.querySelector<HTMLElement>(".site-canvas");
    const previousInert = canvas?.inert ?? false;
    const previousOverflow = document.documentElement.style.overflow;
    if (canvas) canvas.inert = true;
    document.documentElement.style.overflow = "hidden";
    panel.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(() => setVisible(false), 3250);
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (preference.matches) setVisible(false); };
    preference.addEventListener("change", reduce);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", reduce);
      if (canvas) canvas.inert = previousInert;
      document.documentElement.style.overflow = previousOverflow;
      document.querySelector<HTMLAnchorElement>(".site-header .wordmark")?.focus({ preventScroll: true });
    };
  }, [visible]);

  if (!visible) return null;
  return <section ref={panel} className="yenai-intro" role="dialog" aria-modal="true" aria-label="YENAI 个人网站开屏" tabIndex={-1}
    onKeyDown={event => {
      if (event.key === "Escape") setVisible(false);
      if (event.key === "Tab") {
        event.preventDefault();
        panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    }}>
    <div className="yenai-intro-mark" aria-label="YENAI">
      {"YENAI".split("").map((letter, index) => <span key={index} aria-hidden="true" className="yenai-intro-letter" style={{ "--letter-index": index } as CSSProperties}>{letter}</span>)}
    </div>
    <button className="yenai-intro-skip" type="button" onClick={() => setVisible(false)}>跳过 <span aria-hidden="true">↗</span></button>
  </section>;
}
