# 詹依娜 · 个人作品集

黑色背景、浅粉色粗体标题、奶油纸页档案夹和实体回形针的个人作品集。首屏和整体版式依据用户最新提供的两张参考图重做。

## 内容来源

个人资料、实际职责及五张图片来自新版飞书文档：https://my.feishu.cn/wiki/O6kZwoRPLiphBykwHiKcOgbTnld

本次通过文档公开页面完整读取；CLI 读取被平台数据安全策略拦截。采集的正文与图片保存在忽略的 work/new-doc-* 文件中。页面使用的图片位于 public/new-document/。

按用户 2026.10.14 的补充，IP 项目部分还使用其制作的报告：https://zhanyina1205-ai.github.io/liangliang-ip-report/ 。提取账号定位、四个账号的数据快照和用户的调研判断，区分账号背景与个人职责、个人成果，不将历史增长或报价计为个人业绩。

不引用旧个人说明书或旧生活相册。新版文档中空白的工作经历、个人技能标题不补写虚构信息；能力展示仅从文档明确写出的实际工作与创作流程提炼。

## 页面内容

- 档案夹首屏与新文档提供的个人拍立得
- 基本信息、教育背景与个人标签
- 是亮亮 / 涂芷靓：PR 商务对接、选品搭配与剪辑，附代表作品和原图预览
- 椰奶没喝饱_：风格变化、主页截图、五条代表内容与账号入口
- 摇滚椰奶冻：独立经营流程、一年销售五千单以上与销售额十万元以上
- 从选题到发布的五步创作流程
- 新文档所附主页截图中提供的联系邮箱

个人账号粉丝与获赞收藏数按新文档所附截图呈现，不声称实时数据。

## 开发和验证

pnpm dev 启动本地预览。pnpm build 构建 Sites Worker。pnpm test 验证渲染、内部导航、素材完整性及新增报告口径。

app/page.tsx 管理文案，app/globals.css 管理版式，app/document-media.tsx 提供原图放大、Esc 关闭和焦点恢复。保留 .openai/hosting.json 的 Sites 身份与现有公开权限。

旧相册组件与原图保留在历史源码中，本版不引用。

## GitHub Pages 兼容

源码仓库：https://github.com/zhanyina1205-ai/personal-website

静态导出使用 NEXT_PUBLIC_BASE_PATH=/personal-website pnpm build:pages，再执行同样环境变量下的 pnpm test:pages。GitHub Pages 地址：https://zhanyina1205-ai.github.io/personal-website/ 。推送 main 后，GitHub Actions 自动构建、检查并发布。

Sites 版本仍可访问：https://zhan-yina.zhanyina1205.chatgpt.site 。

## 人像照片调整

2026.10.14 按用户要求，将文档中的个人拍立得裁成近景人像，去掉原照片里的边框、字样和桌面背景，采用偏黑白的暖灰复古胶片色调。使用内置 image_gen 编辑，最终素材为 public/new-document/portrait-vintage.png；原图仍保留。首屏与个人介绍中的同一照片同步引用新素材。

## 是亮亮项目版式

2026.10.14 依据用户提供的黑白人物／粉色装订笔记本海报参考，仅调整个人网站中的 IP 项目部分。三张 IP 原图均来自重新读取的个人飞书文档，主视觉使用 CSS 黑白显示、装订圈、星形和 SVG 细线花纹。三张完整照片直接展示并支持点击查看彩色原图；保持实际职责、报告数据与来源说明。首屏档案夹不变。

2026.10.14 统一 IP 装订页背景为作品集原有浅粉色（--pink / #f3c4cf），纸边和细线使用现有米色、灰玫瑰色。IP 照片采用保留颜色的低饱和暖调 CSS；放大仍显示原图。首屏及个人介绍人像改用 public/new-document/portrait-warm-vintage.png，使用内置 image_gen 以原有裁切人像为目标、原始彩照为颜色参考，恢复自然暖肤色与柔和唇色，保留人物与构图。
