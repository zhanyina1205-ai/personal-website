# 詹依娜 · 内容与 IP 运营作品集

面向 IP 助理求职的个人作品集，以奶油纸色、粉色大字、黑色分区、手写字体和照片拼贴呈现。视觉依据用户提供的四张参考图制作。

## 页面内容

- 个人介绍与 IP 助理求职方向
- 核心案例：是亮亮 IP 项目复盘、穿搭账号「椰奶没喝饱」
- 可展开的代表作品、数据判断及饰品品牌「摇滚椰奶冻」经历
- 工作能力与个人介绍卡片
- 19 张个人照片，按穿搭旅行、手作和小狗分类；支持大图、左右切换、Esc 关闭及焦点恢复
- 完整 IP 项目报告和新版飞书个人说明书入口

## 内容来源

个人信息、穿搭账号及品牌数据沿用 `work/feishu-current.json` 中此前保存的个人说明书。新版飞书链接于本次制作时被接口数据安全策略拦截，未读取其最新内容。页面标明账号数据非实时数据。

IP 案例依据用户指定报告网站的本地源码与素材整理：`/Users/zhanyina/Documents/ChatGPT/自媒体定位/github-sites/liangliang-ip-report/docs/`。仅展示项目背景、作品观察与报告复盘；不把 IP 历史增长、粉丝规模及商业数据归为个人业绩。

## 本地运行

需要 Node.js 22.13.0 或更高版本，使用 pnpm 管理依赖。

```sh
pnpm install
pnpm dev
pnpm build
pnpm test
```

`app/page.tsx` 管理文案和页面结构，`app/globals.css` 管理视觉样式，`app/portfolio-gallery.tsx` 管理分类相册。照片位于 `public/images/`，本地字体位于 `public/fonts/`。旧相册组件仍保留在源码中，当前页面使用新的分类相册。

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
