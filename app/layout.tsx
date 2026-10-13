import type { Metadata } from "next";
import "./globals.css";
import { assetPath } from "./asset-path";

export const metadata: Metadata = {
  icons: { icon: assetPath("/favicon.svg") },
  title: "詹依娜 Yina Zhan · 内容与 IP 运营作品集",
  description: "詹依娜的个人作品集。广州美术学院产品设计背景，展示是亮亮 IP 项目复盘、独立运营的穿搭账号「椰奶没喝饱」、饰品品牌，以及生活中的视觉灵感。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body><style>{`@font-face{font-family:Editorial;src:url('${assetPath("/fonts/editorial.woff2")}') format('woff2');font-display:swap}@font-face{font-family:Signature;src:url('${assetPath("/fonts/script.woff2")}') format('woff2');font-display:swap}`}</style>{children}</body>
    </html>
  );
}
