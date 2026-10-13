import type { Metadata } from "next";
import "./globals.css";
import { assetPath } from "./asset-path";

export const metadata: Metadata = {
  icons: { icon: assetPath("/favicon.svg") },
  title: "詹依娜 · IP 助理作品集",
  description: "詹依娜的个人作品集：IP 穿搭账号商务对接、选品搭配和剪辑经历，个人穿搭账号「椰奶没喝饱_」以及饰品店铺「摇滚椰奶冻」。内容来自新版个人文档。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
