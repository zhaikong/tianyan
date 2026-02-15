# 天眼 (World Monitor) 部署指南

## 项目简介

天眼是一个基于 Tauri + Vite + TypeScript 的全球态势感知与情报分析平台，提供实时新闻、军事动态、市场数据、地缘政治分析等功能。

### 技术栈

- **前端**: TypeScript, Vite, deck.gl, maplibre-gl
- **桌面端**: Tauri (Rust)
- **后端API**: Vercel Edge Functions
- **数据源**: GDELT, Polymarket, RSS feeds, ACLED, 等

---

## 本地开发启动流程

### 1. 环境要求

- Node.js 18+
- npm 或 yarn

### 2. 安装依赖

```bash
cd worldmonitor-main
npm install
```

### 3. 启动开发服务器

```bash
# 完整版 (默认)
npm run dev

# 技术版
npm run dev:tech
```

启动后访问 http://localhost:3000 (或显示的其他端口)

### 4. 构建生产版本

```bash
# 构建完整版
npm run build

# 构建技术版
npm run build:tech

# 预览构建结果
npm run preview
```

---

## Vercel 部署指南

### 方式一: 通过 Vercel CLI 部署

1. **安装 Vercel CLI**

```bash
npm i -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

3. **部署项目**

```bash
# 在项目根目录执行
vercel

# 或者指定项目名称
vercel --prod
```

### 方式二: 通过 GitHub 部署

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "New Project"
4. 选择 GitHub 仓库
5. 配置构建选项:
   - Framework Preset: Vite
   - Build Command: `npm run build` 或 `npm run build:full`
   - Output Directory: `dist`
6. 点击 "Deploy"

### 环境变量配置

在 Vercel 项目设置中添加以下可选环境变量:

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_VARIANT` | 站点变体 | `full` 或 `tech` |
| `FINNHUB_API_KEY` | Finnhub API密钥 (股票数据) | |
| `GROQ_API_KEY` | Groq API密钥 (AI摘要) | |
| `MINIMAX_API_KEY` | MiniMax API密钥 (中文AI摘要) | |
| `OPENROUTER_API_KEY` | OpenRouter API密钥 | |
| `ACLED_API_KEY` | ACLED冲突数据API密钥 | |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis缓存 | |

---

## 1G 内存 GIA 服务器部署

### 内存评估

**1G 内存运行建议**:

| 部署方式 | 内存需求 | 1G服务器可行性 |
|----------|----------|----------------|
| Vercel 部署 (纯前端) | ~200MB | ✅ 完全可行 |
| Docker 自部署 | ~800MB-1GB | ⚠️ 勉强可行 |
| 完整桌面应用 | 需要桌面环境 | ❌ 不可行 |

### 推荐方案

#### 方案 A: Vercel 部署 (推荐)

最简单、成本最低的方案:

1. 免费版 Vercel 每月 100GB 流量
2. 前端静态资源部署，无需服务器维护
3. API 函数自动扩展

#### 方案 B: Docker 轻量部署

如果必须在自有服务器部署:

```dockerfile
# 使用轻量nginx镜像
FROM nginx:alpine

# 复制构建产物
COPY dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

内存占用: ~300-500MB

#### 方案 C: 1G 服务器 + Docker Compose

```yaml
version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./dist:/usr/share/nginx/html:ro
    deploy:
      resources:
        limits:
          memory: 512M

  # 可选: API反向代理 (如果需要)
  api:
    image: nginx:alpine
    # ... 配置API代理
```

---

## 已知限制

### 1. 网络访问限制

部分数据源需要特殊网络环境:

- **GDELT**: api.gdeltproject.org (国外)
- **Polymarket**: gamma-api.polymarket.com (需要代理)
- **YouTube**: 部分功能需要代理

**解决方案**:
- 使用 Vercel 部署 (Vercel 服务器在海外)
- 或配置代理/VPN

### 2. API 密钥需求

部分功能需要申请 API 密钥:

| 功能 | 密钥 | 必要性 |
|------|------|--------|
| 股票数据 | Finnhub | 可选 |
| AI 摘要 | Groq/MiniMax | 可选 |
| 冲突数据 | ACLED | 可选 |
| Redis 缓存 | Upstash | 可选 |

### 3. 桌面版功能

完整功能需要 Tauri 桌面客户端，包含:
- 本地 API 服务器 (RSS 代理等)
- 系统托盘
- 桌面通知

---

## 快速故障排除

### 问题: 端口被占用

```bash
# 查找占用端口的进程
lsof -i :3000

# 或者使用其他端口
npm run dev -- --port 3001
```

### 问题: 构建失败

```bash
# 清理缓存后重试
rm -rf node_modules/.vite
npm run build
```

### 问题: API 请求失败

1. 检查浏览器控制台错误信息
2. 确认网络可以访问目标 API
3. 检查环境变量配置

---

## 相关文档

- [项目原版仓库](https://github.com/koala73/worldmonitor)
- [Vercel 文档](https://vercel.com/docs)
- [Tauri 文档](https://tauri.app/)

---

*最后更新: 2026-02-15*
