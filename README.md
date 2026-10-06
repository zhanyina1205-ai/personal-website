# 椰奶的小站 · 詹依娜

一个以奶油色、粉蓝与粉红棋盘格、手绘贴纸和拍立得照片呈现的个人网站。内容根据詹依娜的飞书「个人说明书」整理。

## 页面内容

- 欢迎首页与个人介绍
- 穿搭内容创作、饰品小店和直播经历
- 真实小狗照片相册，支持放大、左右切换、方向键与 Esc 关闭
- 飞书个人说明书入口

## 本地运行

需要 Node.js 22.13.0 或更高版本，使用 pnpm 管理依赖。

```sh
pnpm install
pnpm dev
pnpm build
pnpm test
```

`app/page.tsx` 管理文案和页面结构，`app/globals.css` 管理视觉样式，`app/doodles.tsx` 包含矢量插画，`app/photo-gallery.tsx` 管理相册交互。照片位于 `public/images/`。

`.openai/hosting.json` 保留当前 Sites 项目身份。发布沿用该项目的现有访问权限。

## GitHub Pages

源码仓库：https://github.com/zhanyina1205-ai/personal-website

网站地址：https://zhanyina1205-ai.github.io/personal-website/

仓库 Settings → Pages → Source 选择 **GitHub Actions**。每次推送到 `main`，工作流会检查代码、构建静态网页、校验图片和样式路径，然后自动发布。

本地构建 GitHub 版本：

```sh
NEXT_PUBLIC_BASE_PATH=/personal-website pnpm build:pages
NEXT_PUBLIC_BASE_PATH=/personal-website pnpm test:pages
```

发布目录为 `dist/client`，包含预先生成的 HTML、样式、脚本和照片。GitHub Pages 无需运行服务器。
