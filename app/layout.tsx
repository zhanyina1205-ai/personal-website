import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "詹依娜 · Zhan Yina",
  description: "詹依娜的个人网站，收藏灵感、作品与生活片段。",
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
