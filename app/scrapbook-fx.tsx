"use client";

// Tiny JS half of app/scrapbook-fx.css. No dependencies, all effects degrade to a
// still image without JS and switch off under prefers-reduced-motion.

import { useEffect, useRef, type HTMLAttributes, type RefObject } from "react";

const ENTRANCE_FX = ".fx-stamp-in,.fx-scribble,.fx-highlight";

/**
 * Plays .fx-stamp-in / .fx-scribble / .fx-highlight once when they scroll into view.
 * Pass a section ref to scope it, or nothing to cover the whole document.
 * Elements already on screen at mount stay static (no flash on load / deep links).
 */
export function useFxInView(rootRef?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root: ParentNode = rootRef?.current ?? document;
    const waiting = Array.from(root.querySelectorAll<Element>(ENTRANCE_FX))
      .filter(element => !element.hasAttribute("data-fx"))
      .filter(element => element.getBoundingClientRect().top > window.innerHeight * 0.9);
    if (!waiting.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-fx", "in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    waiting.forEach(element => {
      element.setAttribute("data-fx", "wait");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      // Never leave anything hidden if the effect is torn down (StrictMode / unmount).
      waiting.forEach(element => { if (element.getAttribute("data-fx") === "wait") element.removeAttribute("data-fx"); });
    };
  }, [rootRef]);
}

/** Mount once anywhere (e.g. in page.tsx) to drive every entrance fx on the page. */
export function FxInView() {
  useFxInView();
  return null;
}

/**
 * Makes a .fx-spotlight element's lamp follow the pointer (desktop, fine pointer only).
 * The element just needs className="fx-spotlight" and this ref.
 */
export function useSpotlight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;
    const controller = new AbortController();
    let frame = 0, x = 0, y = 0;
    const paint = () => {
      frame = 0;
      element.style.setProperty("--fx-x", `${x}px`);
      element.style.setProperty("--fx-y", `${y}px`);
    };
    element.addEventListener("pointermove", event => {
      const box = element.getBoundingClientRect();
      x = Math.round(event.clientX - box.left);
      y = Math.round(event.clientY - box.top);
      if (!frame) frame = requestAnimationFrame(paint);
    }, { passive: true, signal: controller.signal });
    element.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty("--fx-x");
      element.style.removeProperty("--fx-y");
    }, { signal: controller.signal });
    return () => { controller.abort(); cancelAnimationFrame(frame); };
  }, [ref]);
}

/** <div> with a pointer-following darkroom lamp. Extra props pass through. */
export function FxSpotlight({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useSpotlight(ref);
  return <div ref={ref} className={`fx-spotlight ${className}`.trim()} {...props}/>;
}

const SCRIBBLES = {
  underline: { viewBox: "0 0 300 20", d: "M4 11C58 6 132 3 296 8M22 16C96 11 190 11 268 14" },
  circle: { viewBox: "0 0 200 100", d: "M152 13C112 1 44 5 16 32C-6 56 28 93 101 95C172 97 201 70 191 42C182 17 140 7 92 9C70 10 52 14 38 21" },
  strike: { viewBox: "0 0 300 14", d: "M3 9C80 4 190 5 297 6" },
} as const;

/**
 * Hand-drawn pen mark. Put it inside <span className="fx-scribble-host">…words…</span>.
 * Decorative only (aria-hidden). Colour via CSS color / --fx-scribble-c on .fx-scribble.
 */
export function Scribble({ variant = "underline", className = "" }: { variant?: keyof typeof SCRIBBLES; className?: string }) {
  const mark = SCRIBBLES[variant];
  return <svg className={`fx-scribble fx-scribble--${variant} ${className}`.trim()} viewBox={mark.viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d={mark.d} pathLength={1}/>
  </svg>;
}
