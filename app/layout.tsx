import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "椰奶的小站 · 詹依娜 Zhan Yina",
  description: "你好，我是詹依娜，也可以叫我椰奶。来自深圳，毕业于广州美术学院产品设计专业。在这里认识我的创作、穿搭、小店经历，还有两份毛茸茸的日常。",
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
