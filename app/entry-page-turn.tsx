"use client";

import { useEffect } from "react";

export function EntryPageTurn() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const sheet = hero?.querySelector<HTMLElement>(".front-sheet");
    const about = document.getElementById("about");
    const opener = hero?.querySelector<HTMLAnchorElement>(".scroll-prompt");
    if (!hero || !sheet || !about || !opener) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listeners = new AbortController();
    const timers = new Set<number>();
    let disposed = false;
    let cancelled = false;
    let prepared = false;
    let started = false;
    let running = false;
    let autoScrolling = false;
    let scrollFrame = 0;
    let previousScrollBehavior: string | undefined;

    function later(callback: () => void, delay: number) {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
      return timer;
    }

    function restore() {
      for (const timer of timers) window.clearTimeout(timer);
      timers.clear();
      window.cancelAnimationFrame(scrollFrame);
      delete hero!.dataset.entryState;
      if (previousScrollBehavior !== undefined) {
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        previousScrollBehavior = undefined;
      }
      running = false;
      autoScrolling = false;
    }

    function cancel() {
      cancelled = true;
      restore();
    }

    function scrollToAbout() {
      if (disposed || cancelled) return;
      const from = window.scrollY;
      const to = Math.max(0, about!.getBoundingClientRect().top + from - 24);
      const startTime = performance.now();
      previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      autoScrolling = true;
      function frame(now: number) {
        if (disposed || cancelled) return;
        const progress = Math.min(1, (now - startTime) / 950);
        const eased = progress < 0.5
          ? 4 * progress ** 3
          : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: from + (to - from) * eased, behavior: "auto" });
        if (progress < 1) scrollFrame = window.requestAnimationFrame(frame);
        else {
          restore();
          window.history.replaceState(window.history.state, "", "#about");
        }
      }
      scrollFrame = window.requestAnimationFrame(frame);
    }

    function turnPage() {
      if (disposed || running || document.hidden || motionPreference.matches) return;
      restore();
      cancelled = false;
      started = true;
      running = true;
      hero!.dataset.entryState = "turning";
      later(scrollToAbout, 1250);
    }

    function queueIntro() {
      if (disposed || started || cancelled || document.hidden || motionPreference.matches) return;
      if ((window.location.hash && window.location.hash !== "#top") || window.scrollY > 32) return;
      later(() => {
        if (window.scrollY <= 32 && (!window.location.hash || window.location.hash === "#top")) turnPage();
      }, 850);
    }

    opener.addEventListener("click", event => {
      if (motionPreference.matches || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      turnPage();
    }, { signal: listeners.signal });
    window.addEventListener("wheel", cancel, { passive: true, signal: listeners.signal });
    window.addEventListener("touchstart", cancel, { passive: true, signal: listeners.signal });
    window.addEventListener("pointerdown", event => {
      if (!(event.target instanceof Element) || !opener.contains(event.target)) cancel();
    }, { passive: true, signal: listeners.signal });
    window.addEventListener("scroll", () => {
      if (!autoScrolling && window.scrollY > 32) cancel();
    }, { passive: true, signal: listeners.signal });
    window.addEventListener("keydown", event => {
      if (["Escape", "Tab", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) cancel();
    }, { signal: listeners.signal });
    document.addEventListener("click", event => {
      if (event.target instanceof Element && event.target.closest("a") !== opener && event.target.closest("a")) cancel();
    }, { signal: listeners.signal });
    window.addEventListener("hashchange", cancel, { signal: listeners.signal });
    motionPreference.addEventListener("change", cancel, { signal: listeners.signal });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && running) cancel();
      else if (!document.hidden && prepared) queueIntro();
    }, { signal: listeners.signal });

    const image = sheet.querySelector<HTMLImageElement>("img");
    // Let the cover photo appear before starting; slow assets never hold up entry.
    Promise.race([
      Promise.all([image?.decode().catch(() => {}), document.fonts.ready]),
      new Promise<void>(resolve => later(resolve, 1600)),
    ]).then(() => {
      if (disposed) return;
      prepared = true;
      queueIntro();
    });

    return () => {
      disposed = true;
      listeners.abort();
      restore();
    };
  }, []);

  return null;
}
