"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import { assetPath } from "./asset-path";
import { dogPhotos } from "./photo-data";
import type { Photo } from "./photo-data";

export function PhotoGallery({ photos = dogPhotos, label = "小狗生活相册" }: { photos?: Photo[]; label?: string }) {
  const [cursor, setCursor] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const galleryId = useId();
  const isOpen = active !== null;
  const page = Math.floor(cursor / pageSize);
  const pageCount = Math.ceil(photos.length / pageSize);
  const first = page * pageSize;
  const last = Math.min(first + pageSize, photos.length);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width:680px)");
    const update = () => setPageSize(narrow.matches ? 1 : 3);
    update();
    narrow.addEventListener("change", update);
    return () => narrow.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog.close(); };
  }, [isOpen]);

  function turnPage(next: number) {
    setCursor(Math.max(0, Math.min(next, pageCount - 1)) * pageSize);
  }
  function open(index: number, button: HTMLButtonElement) {
    openerRef.current = button;
    setActive(index);
  }
  function close() {
    dialogRef.current?.close();
    setActive(null);
    openerRef.current?.focus();
  }
  function turnPhoto(direction: number) {
    setActive(index => index === null ? null : (index + direction + photos.length) % photos.length);
  }
  function keyboard(event: KeyboardEvent<HTMLElement>, modal: boolean) {
    if (event.altKey || event.ctrlKey || event.metaKey || (!modal && isOpen)) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      if (modal) turnPhoto(direction);
      else turnPage(page + direction);
    }
    if (!modal && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      turnPage(event.key === "Home" ? 0 : pageCount - 1);
    }
  }
  function startSwipe(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchRef.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
  }
  function finishSwipe(event: TouchEvent<HTMLElement>, modal: boolean) {
    const start = touchRef.current;
    touchRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const direction = dx < 0 ? 1 : -1;
    if (modal) turnPhoto(direction);
    else turnPage(page + direction);
  }

  return <>
    <div className="album" role="region" aria-label={`${label}翻页浏览`} aria-roledescription="分页相册" tabIndex={0} onKeyDown={event => keyboard(event, false)}>
      <div className="album-heading"><span>{label}</span><span>{photos.length} 张照片</span></div>
      <div className="photo-gallery" id={galleryId} onTouchStart={startSwipe} onTouchEnd={event => finishSwipe(event, false)}>
        {photos.map((photo, index) => <button type="button" className={`photo-card photo-${index % 3}`} key={photo.src}
          hidden={index < first || index >= last} onClick={event => open(index, event.currentTarget)} aria-label={`放大照片：${photo.caption}`}>
          <span className="tape" aria-hidden="true" />
          <img src={assetPath(photo.src)} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
          <span className="photo-caption">{photo.caption}<small>{photo.note}</small></span>
          <span className="photo-expand" aria-hidden="true">＋</span>
        </button>)}
      </div>
      <div className="album-controls">
        <button type="button" className="album-turn" onClick={() => turnPage(page - 1)} disabled={page === 0} aria-label={`${label}上一页`} aria-controls={galleryId}>上一页</button>
        <div className="album-pages" role="group" aria-label={`${label}页码`}>
          {Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} onClick={() => turnPage(index)} aria-label={`${label}第 ${index + 1} 页`} aria-current={index === page ? "page" : undefined} aria-controls={galleryId}>{index + 1}</button>)}
        </div>
        <button type="button" className="album-turn" onClick={() => turnPage(page + 1)} disabled={page === pageCount - 1} aria-label={`${label}下一页`} aria-controls={galleryId}>下一页</button>
      </div>
      <p className="album-status" role="status">第 {page + 1} / {pageCount} 页 · 照片 {first + 1}–{last} / {photos.length}</p>
      <div className="album-thumbnails" role="group" aria-label={`${label}全部照片`}>
        {photos.map((photo, index) => <button type="button" key={photo.src} onClick={event => open(index, event.currentTarget)} aria-label={`查看第 ${index + 1} 张：${photo.caption}`} className={index >= first && index < last ? "thumbnail-visible" : undefined}>
          <img src={assetPath(photo.src)} alt="" width={photo.width} height={photo.height} loading="lazy" />
          <span>{index + 1}</span>
        </button>)}
      </div>
      <p className="album-instructions">点开照片看大图 · 左右方向键翻页 · 手机左右滑动</p>
    </div>
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Native modal dialog handles keyboard navigation and backdrop dismissal. */}
    <dialog ref={dialogRef} className="photo-dialog" aria-label={label}
      onCancel={event => { event.preventDefault(); close(); }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={event => keyboard(event, true)} onTouchStart={startSwipe} onTouchEnd={event => finishSwipe(event, true)}>
      {active !== null && <div className="lightbox-content">
        <button type="button" className="lightbox-close" onClick={close} aria-label="关闭相册">×</button>
        <img src={assetPath(photos[active].src)} alt={photos[active].alt} width={photos[active].width} height={photos[active].height} />
        <div className="lightbox-controls">
          <button type="button" onClick={() => turnPhoto(-1)} aria-label="上一张照片">上一张</button>
          <p aria-live="polite">{photos[active].caption}<span>{active + 1} / {photos.length}</span></p>
          <button type="button" onClick={() => turnPhoto(1)} aria-label="下一张照片">下一张</button>
        </div>
      </div>}
    </dialog>
  </>;
}
