import type { Metadata } from "next";
import "./globals.css";
import "./ip-notebook.css";
import { assetPath } from "./asset-path";

export const metadata: Metadata = {
  icons: { icon: assetPath("/favicon.svg") },
  title: "詹依娜 · 个人作品集",
  description: "詹依娜的个人作品集：IP 穿搭账号商务对接、选品搭配和剪辑经历，个人穿搭账号「椰奶没喝饱_」以及饰品店铺「摇滚椰奶冻」。内容来自新版个人文档。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head><style>{`@font-face{font-family:NotebookScript;src:url(${assetPath("/fonts/script.woff2")}) format("woff2");font-style:normal;font-weight:400;font-display:swap}@font-face{font-family:IPTitleSerif;src:url(${assetPath("/fonts/ip-title-light.ttf")}) format("truetype");font-style:normal;font-weight:300;font-display:swap;unicode-range:U+662F,U+4EAE}`}</style></head>
      <body>{children}</body>
    </html>
  );
}
