# Lumière — 跨境蜡烛香薰网站

唯美响应式展示网站，支持手机/电脑自适应，**无需自建服务器**，可全球访问。

## 技术方案

| 需求 | 方案 |
|------|------|
| 无服务器 | 静态站点部署到 **Cloudflare Pages** 或 **Vercel**（免费，全球 CDN） |
| 国外访问 | CDN 边缘节点自动加速，无需备案 |
| 图片管理 | **Supabase** 免费版（数据库 + 图片存储 + 登录） |
| 响应式 | Tailwind CSS 移动端优先布局 |
| 双语 | 中/英一键切换 |

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173 查看首页，http://localhost:5173/admin 进入管理后台。

未配置 Supabase 时，网站使用 Unsplash 默认图片正常展示；管理功能需完成下方配置。

## 配置 Supabase（图片管理）

1. 前往 [supabase.com](https://supabase.com) 注册并创建免费项目
2. 在 **SQL Editor** 中运行 `supabase/schema.sql`
3. 在 **Authentication → Users** 中创建管理员账号（邮箱 + 密码）
4. 复制 `.env.example` 为 `.env`，填入 Project Settings 中的 URL 和 anon key
5. 重启 `npm run dev`，访问 `/admin` 用管理员账号登录

管理后台功能：
- 上传/替换首页大图、画廊、关于我们图片
- 管理产品（名称、价格、图片、显示/隐藏）
- 修改即时生效，全球用户可见

## 部署（免费，无服务器）

### 方案 A：Cloudflare Pages（推荐，全球加速）

1. 将代码推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create project
3. 连接 GitHub 仓库，构建设置：
   - Build command: `npm run build`
   - Build output: `dist`
4. 在 Environment variables 中添加 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
5. 部署完成后获得 `xxx.pages.dev` 域名，可绑定自定义域名

### 方案 B：Vercel

1. 推送代码到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入项目
3. 添加同样的环境变量
4. 自动部署

## 项目结构

```
src/
├── components/     # 页面组件（Header, Hero, Gallery, Products...）
├── pages/          # Home 首页 / Admin 管理后台
├── lib/supabase.ts # 数据与图片 API
├── data/defaults.ts# 默认图片与产品数据
public/             # 静态资源
supabase/schema.sql # 数据库初始化
```

## 图片说明

默认图片来自 [Unsplash](https://unsplash.com)（免费可商用）。上线后建议通过管理后台上传自有产品图。
