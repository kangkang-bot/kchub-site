# KCHub 官网部署指南 🚀

> 目标：把 `~/code/kchub-site/` 部署到 **kchub.cn** 域名，外部可访问。

## 架构总览

```
git push  ──▶  GitHub  ──▶  Cloudflare Pages (CDN)  ──▶  kchub.cn
                                  │
                                  ├── 自动 build (npm run build)
                                  ├── 自动部署到全球边缘节点
                                  └── 自动签发 HTTPS
```

**为什么选 Cloudflare Pages？**
- 免费、CDN 全球加速、HTTPS 自动、零配置自定义域名
- 静态站部署最快路径（与 Astro 完美配合）
- 后续可加 Workers / D1 / R2 扩展评论存储

---

## 前置准备（Boss 需要提供的）

| 事项 | 说明 | 状态 |
|------|------|------|
| 1. 域名 kchub.cn 的注册商账号 | 需要把 NS 改到 Cloudflare | ⏳ 待办 |
| 2. Cloudflare 账号（免费） | https://dash.cloudflare.com/sign-up | ⏳ 待办 |
| 3. GitHub 仓库 | 我建好后 push 上去 | 🔧 准备中 |

> ⚠️ **关于 cn 域名备案**：
> - 严格意义上，cn 域名使用国内服务器需要 ICP 备案
> - 但走 Cloudflare 国际节点（境外访问）不需要备案
> - 国内访问可能略慢，但功能完全正常
> - 如果之后想在国内加速，再走腾讯云 / 阿里云备案

---

## 部署步骤（约 20 分钟）

### Step 1 · 把代码推到 GitHub

```bash
cd ~/code/kchub-site
git init   # 我已经准备好了 .gitignore
git add .
git commit -m "feat: kchub.cn 官网 v0.1"
```

然后在 GitHub 上建一个空仓库（名字建议 `kchub-site`），
把本地仓库 push 上去：
```bash
git remote add origin https://github.com/<your-username>/kchub-site.git
git branch -M main
git push -u origin main
```

### Step 2 · 在 Cloudflare Pages 接 GitHub

1. 登录 https://dash.cloudflare.com/
2. 左侧栏 → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选 `kchub-site` 仓库 → **Begin setup**
4. 填写构建设置：
   - **Project name**: `kchub-site`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: _(留空)_
5. 点 **Save and Deploy** → Cloudflare 自动 build + 部署
6. 第一次部署完成后，会得到一个 `*.kchub-site.pages.dev` 的临时域名，先访问看效果

### Step 3 · 把 kchub.cn 绑到 Cloudflare

**3.1 把域名的 NS 改到 Cloudflare**

1. Cloudflare 控制台 → 左侧 **Add a site** → 输入 `kchub.cn`
2. 选 Free plan → Continue
3. Cloudflare 会扫描现有 DNS 记录，确认后给你 **两个 NS 地址**（形如 `xxx.ns.cloudflare.com`）
4. 登录域名注册商（阿里云 / 腾讯云 / 其它）→ 域名管理 → 修改 DNS 服务器
5. 把上一步的两个 NS 地址填进去 → 保存
6. **等待 0-24 小时** NS 生效（一般几分钟到几小时）

**3.2 在 Cloudflare 配置 DNS 解析**

NS 生效后回到 Cloudflare 的 kchub.cn 域名控制台：
- **DNS** → **Records** → 添加记录：
  - 类型 `CNAME` · 名称 `@` · 目标 `kchub-site.pages.dev` · 代理 (Proxied 橙色云朵) ✅
  - 类型 `CNAME` · 名称 `www` · 目标 `kchub-site.pages.dev` · 代理 ✅
- **SSL/TLS** → 模式选 **Full**（默认是 Flexible，但 Full 更安全）

**3.3 在 Cloudflare Pages 绑定自定义域名**

1. Cloudflare 控制台 → **Workers & Pages** → 选 `kchub-site` 项目
2. **Custom domains** → **Set up a custom domain** → 输入 `kchub.cn`
3. 等待 SSL 证书签发（通常 1-5 分钟）
4. 同样可以加 `www.kchub.cn` 重定向到主域

### Step 4 · 验证

打开浏览器访问：
- ✅ https://kchub.cn
- ✅ https://www.kchub.cn （自动 301 到主域）
- ✅ 7 个子页面：kchub.cn/vision · /capabilities · /architecture · /roadmap · /about · /contact

> 全球 CDN 加速：国内访问走 Cloudflare 香港/日本节点，速度通常 100-300ms。

---

## 后续自动部署

部署完成后，每次 push 到 `main` 分支，Cloudflare Pages 会自动：
- 拉代码 → npm install → npm run build → 部署到 CDN
- 一般 1-2 分钟内生效
- 支持 **Preview deployments**（PR 自动生成预览链接）

---

## 后续功能扩展点

| 需求 | 方案 |
|------|------|
| 评论 + 修复按钮（接 KCHub Agent） | Cloudflare Workers + D1（SQLite） |
| 留言板接收 | Cloudflare Workers → 邮件转发 / 飞书 webhook |
| 调研报告静态托管 | 同一 Cloudflare Pages 部署，把 HTML 放到 `public/reports/` |
| 多人协作（Kang + Chen） | Cloudflare Access 加登录门 |

---

## 应急回滚

Cloudflare Pages 保留所有历史部署版本：
- **Workers & Pages** → `kchub-site` → **Deployments** → 任意历史版本点 **Rollback**

---

> 文档版本：2026-06-14 · 维护人：🦞 龙虾
