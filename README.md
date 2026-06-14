# KCHub 官网 🦞

Kang + Chen 家庭数字中枢 · 官方网站

> 域名：https://kchub.cn

## 站点结构

| 页面 | 路径 | 说明 |
|------|------|------|
| Home | `/` | 品牌门面 · 核心能力概览 |
| Vision | `/vision` | 愿景与场景 |
| Capabilities | `/capabilities` | 产品能力详解 |
| Architecture | `/architecture` | 技术架构与流程 |
| Roadmap | `/roadmap` | 项目路线图 |
| About | `/about` | 关于 Kang & Chen |
| Contact | `/contact` | 联系与留言 |

## 技术栈

- **Astro 5** — 内容型官网
- **Tailwind CSS 4** — 样式
- **TypeScript** — 类型安全
- **@astrojs/sitemap** — SEO 站点地图

## 设计调性

- **色系**：暖米白 / 浅米 / 暖桃橘 / 淡樱粉
- **字体**：Inter + 霞鹜文楷
- **氛围**：亚麻质感 · 像翻开一本家庭手账

## 本地开发

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # 输出到 dist/
npm run preview      # 预览构建结果
```

## 部署

Cloudflare Pages 静态托管，详见 [DEPLOY.md](./DEPLOY.md)。

## 目录结构

```
kchub-site/
├── public/                  # 静态资源（favicon、og 图）
├── src/
│   ├── components/          # Astro 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CapabilityCard.astro
│   │   ├── Section.astro
│   │   └── ...
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/               # 路由（文件即路由）
│   ├── styles/
│   │   └── global.css       # Tailwind v4 + 设计 token
│   └── consts.ts            # 全局常量
├── astro.config.mjs
├── tailwind.config.mjs      # Tailwind v4 主题（在 global.css 中配置）
├── tsconfig.json
└── package.json
```

---

> 由 🦞 龙虾 协助维护 · 2026-06-14
