"use client";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "./asset-path";
const photos = [
  { src: "/images/dogs-chair.jpg", alt: "两只小狗戴着蓝色和粉色围兜，坐在椅子上", caption: "今天也要一起可爱", note: "double the cuteness!" },
  { src: "/images/dogs-play.jpg", alt: "白色和棕色的小狗一起在家里玩耍", caption: "有她们在，日常就很甜", note: "my everyday sunshine" },
  { src: "/images/dogs-red.jpg", alt: "两只小狗穿着红色衣服，坐在柔软的狗窝里", caption: "我的两份小小幸福", note: "a home full of love ♡" },
];
export function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isOpen = active !== null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog.close(); };
  }, [isOpen]);
  function close() {
    const index = active;
    dialogRef.current?.close();
    setActive(null);
    if (index !== null) triggerRefs.current[index]?.focus();
  }
  return <>
    <div className="photo-gallery">{photos.map((photo, index) => <button className={`photo-card photo-${index}`} key={photo.src} onClick={() => setActive(index)} ref={node => { triggerRefs.current[index] = node; }} aria-label={`放大照片：${photo.caption}`}><span className="tape" aria-hidden="true" /><img src={assetPath(photo.src)} alt={photo.alt} width="960" height="1280" loading="lazy" /><span className="photo-caption">{photo.caption}<small>{photo.note}</small></span><span className="photo-expand" aria-hidden="true">↗</span></button>)}</div>
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Native showModal() dialog receives keyboard and backdrop events. */}
    <dialog ref={dialogRef} className="photo-dialog" aria-label="小狗生活相册" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if (event.key === "ArrowRight") setActive(index => index === null ? null : (index + 1) % photos.length); if (event.key === "ArrowLeft") setActive(index => index === null ? null : (index + photos.length - 1) % photos.length); }}>
      {active !== null && <div className="lightbox-content"><button className="lightbox-close" onClick={close} aria-label="关闭相册">×</button><img src={assetPath(photos[active].src)} alt={photos[active].alt} /><div className="lightbox-controls"><button onClick={() => setActive((active + photos.length - 1) % photos.length)} aria-label="上一张照片">←</button><p aria-live="polite">{photos[active].caption}<span>{active + 1} / {photos.length}</span></p><button onClick={() => setActive((active + 1) % photos.length)} aria-label="下一张照片">→</button></div></div>}
    </dialog>
  </>;
}
