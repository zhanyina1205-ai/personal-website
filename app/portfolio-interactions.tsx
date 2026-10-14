"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { id: "about", label: "关于我" },
  { id: "projects", label: "我的作品" },
  { id: "workflow", label: "创作流程" },
  { id: "contact", label: "联系我" },
];

export function PortfolioInteractions() {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const listeners = new AbortController();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sections = chapters.map(chapter => document.getElementById(chapter.id));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header nav a,.folder-tabs a"));
    const originalCurrent = navLinks.map(link => link.getAttribute("aria-current"));
    const animations = new Set<Animation>();
    let scrollFrame = 0;
    let lastChapter: string | undefined;

    function updateReading() {
      scrollFrame = 0;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.round(Math.min(1, Math.max(0, window.scrollY / maximum)) * 100) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.45);
      let current = "";
      const readingLine = Math.min(180, window.innerHeight * 0.25);
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= readingLine) current = chapters[index].id;
      });
      // The last section can be shorter than a viewport, so its anchor stops at the page end.
      if (maximum > 0 && maximum - window.scrollY <= 4) current = chapters[chapters.length - 1].id;
      if (current !== lastChapter) {
        lastChapter = current;
        setActive(current);
        navLinks.forEach(link => {
          const selected = link.hash === `#${current || (link.closest(".folder-tabs") ? "about" : "")}`;
          if (selected) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }
    function queueReadingUpdate() {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateReading);
    }
    window.addEventListener("scroll", queueReadingUpdate, { passive: true, signal: listeners.signal });
    window.addEventListener("resize", queueReadingUpdate, { passive: true, signal: listeners.signal });
    updateReading();

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(
      ".section-kicker,.display-title,.about-grid,.ip-notebook-case,.ip-positioning,.ip-account-matrix article,.ip-selected-work,.ip-review-grid article,.own-project-copy,.account-collage-wrap,.lookbook,.notes-heading,.note-card-grid>a,.shop-project,.workflow-list article,.support-intro,.support-cards article,.contact-layout,.footer-line",
    ));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (preference.matches) return;
        const element = entry.target as HTMLElement;
        const siblings = Array.from(element.parentElement?.children || []);
        const staggered = element.matches(".ip-account-matrix article,.ip-review-grid article,.note-card-grid>a,.workflow-list article,.support-cards article");
        const animation = element.animate([
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], {
          duration: 620,
          delay: staggered ? Math.min(siblings.indexOf(element), 4) * 65 : 0,
          easing: "cubic-bezier(.2,.75,.25,1)",
          fill: "backwards",
        });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      // Deep links remain readable immediately; new sections reveal as they enter.
      if (rect.bottom > 0 && rect.top < window.innerHeight * 0.95) return;
      observer.observe(element);
    });

    const tiltElements = Array.from(document.querySelectorAll<HTMLElement>(".about-portrait,.phone-frame,.notebook-inset"));
    tiltElements.forEach(element => {
      element.addEventListener("pointermove", event => {
        if (preference.matches || !finePointer.matches) return;
        const rect = element.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
        element.style.setProperty("--tilt-x", `${-y * 3}deg`);
        element.style.setProperty("--tilt-y", `${x * 3}deg`);
      }, { passive: true, signal: listeners.signal });
      element.addEventListener("pointerleave", () => {
        element.style.removeProperty("--tilt-x");
        element.style.removeProperty("--tilt-y");
      }, { signal: listeners.signal });
    });
    preference.addEventListener("change", () => {
      animations.forEach(animation => animation.cancel());
      animations.clear();
      tiltElements.forEach(element => {
        element.style.removeProperty("--tilt-x");
        element.style.removeProperty("--tilt-y");
      });
    }, { signal: listeners.signal });

    return () => {
      listeners.abort();
      window.cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      tiltElements.forEach(element => {
        element.style.removeProperty("--tilt-x");
        element.style.removeProperty("--tilt-y");
      });
      navLinks.forEach((link, index) => {
        const original = originalCurrent[index];
        if (original) link.setAttribute("aria-current", original);
        else link.removeAttribute("aria-current");
      });
    };
  }, []);

  return <>
    <div className="reading-progress" role="progressbar" aria-label="网页阅读进度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ transform: `scaleX(${progress / 100})` }}/></div>
    <nav className="reading-dock" aria-label="栏目快捷导航" hidden={!visible}>
      {chapters.map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id} aria-current={active === chapter.id ? "location" : undefined}><span aria-hidden="true">0{index + 1}</span>{chapter.label}</a>)}
      <a className="reading-back-top" href="#top" aria-label="返回顶部" title={`阅读进度 ${progress}% · 返回顶部`} onClick={() => document.querySelector<HTMLAnchorElement>(".wordmark")?.focus({ preventScroll: true })}>↑</a>
    </nav>
  </>;
}

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);
  async function copy() {
    window.clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      resetTimer.current = window.setTimeout(() => setStatus("idle"), 2400);
    } catch {
      setStatus("failed");
    }
  }
  return <div className="copy-email-row"><button className="copy-email" type="button" onClick={copy}><span aria-hidden="true">⧉</span><span aria-live="polite">{status === "copied" ? "已复制 ✓" : "复制邮箱"}</span></button>{status === "failed" && <span className="copy-email-note" role="status">请长按上方邮箱复制。</span>}</div>;
}
