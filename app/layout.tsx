import type { Metadata } from "next";
import "./globals.css";
import { assetPath } from "./asset-path";

export const metadata: Metadata = {
  icons: { icon: assetPath("/favicon.svg") },
  title: "椰奶的小站 · 詹依娜 Zhan Yina",
  description: "你好，我是詹依娜，也可以叫我椰奶。来自深圳，毕业于广州美术学院产品设计专业。在这里认识我的穿搭账号「椰奶没喝饱」、饰品品牌「摇滚椰奶冻」，还有旅行、手作与两份毛茸茸的日常。",
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
