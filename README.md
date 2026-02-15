# 天眼 (TianYan)

**AI驱动的实时全球态势感知与情报分析平台** — 整合实时新闻、市场数据、军事追踪、基础设施监测和地缘政治数据的统一态势感知界面。

[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 为什么选择天眼？

| 问题 | 解决方案 |
|------|----------|
| 新闻分散在 100+ 个来源 | **统一仪表板** 整合 100+ 精选新闻源 |
| 缺少地理空间背景 | **交互式地图** 支持 25+ 可切换数据层 |
| 信息过载 | **AI综合分析** 带焦点检测 |
| 加密货币/宏观信号噪音 | **7信号市场雷达** 复合买入/卖出判断 |
| 昂贵 OSINT 工具 ($$$) | **免费** 无需付费 API 即可使用核心功能 |
| 静态新闻源 | **实时更新** 支持实时数据流 |
| 仅 Web 端 | **原生桌面应用** (Tauri) + 可安装 PWA 离线地图支持 |
| 平面 2D 地图 | **3D WebGL 地球** deck.gl 渲染 29+ 可切换数据层 |

---

## 关键特性

### 交互式 3D 地球
- **WebGL 加速渲染** — deck.gl + MapLibre GL JS 实现 60fps 流畅性能
- **29+ 数据层** — 冲突、军事基地、核设施、海底光缆、管道、卫星火灾检测、抗议、自然灾害、数据中心、人口流离、气候异常等
- **智能聚合** — Supercluster 在低缩放级别聚合标记，缩放时展开
- **渐进式信息披露** — 详细层（基地、核设施、数据中心）仅在缩入时显示
- **标签去冲突** — 重叠标签（如多个 BREAKING 徽章）自动按优先级抑制
- **8 个区域预设** — 全球、美洲、欧洲、中东、亚洲、非洲、大洋洲、拉美
- **时间过滤** — 1h、6h、24h、48h、7d 事件窗口
- **URL 状态分享** — 地图中心、缩放、活动层和时间范围编码到 URL 可分享视图 (`?view=mena&zoom=4&layers=conflicts,bases`)

### AI 驱动的情报分析
- **世界简报** — LLM 综合主要全球发展摘要（MiniMax M2.5，Redis 缓存）
- **混合威胁分类** — 即时关键词分类器 + 异步 LLM 覆盖
- **焦点检测** — 关联新闻、军事活动、抗议、中断和市场的实体
- **国家不稳定性指数** — 20 个受监测国家的实时稳定性评分
- **战略态势评估** — 综合所有情报模块的风险评分

### 实时数据层

#### 地缘政治
- 活跃冲突区域带升级追踪 (UCDP + ACLED)
- 情报热点带新闻相关性
- 社会动荡事件（双源：ACLED 抗议 + GDELT 地理事件，Haversine 去重）
- 三源自然灾害（USGS M4.5+ 地震、GDACS 警报、NASA EONET 事件）
- 制裁政权
- 天气预警和严重状况

#### 军事与战略
- 220+ 个军事基地，来自 9 个运营商
- 实时军机追踪 (ADS-B)
- 海军舰船监测 (AIS)
- 核设施与伽马辐照器
- APT 网络威胁行为体归因
- 发射场与太空港

#### 基础设施
- 海底光缆带登陆点
- 石油与天然气管道
- AI 数据中心（111 个主要集群）
- 网络中断（Cloudflare Radar）
- 关键矿物沉积
- NASA FIRMS 卫星火灾检测 (VIIRS 热点)

### 市场与加密货币情报
- **7 信号宏观雷达** 复合买入/卖出判断
- BTC 点 ETF 资金流追踪（IBIT、FBTC、GBTC 等 8 个）
- 稳定币挂钩健康监测（USDT、USDC、DAI、FDUSD、USDe）
- 恐惧与贪婪指数带 30 天历史
- 比特币技术趋势（SMA50、SMA200、VWAP、Mayer 倍数）
- JPY 流动性信号、QQQ/XLP 宏观制度、BTC 挖率
- 内联 SVG 火花线和圆环图可视化趋势

---

## 实时新闻与视频
- **100+ RSS 源** 覆盖地缘政治、国防、能源、科技 — 域名允许列表代理防止 CORS 问题
- **8 个直播流** — Bloomberg、Sky News、Al Jazeera、Euronews、DW、France24、CNBC、Al Arabiya — 自动直播检测每 5 分钟抓取 YouTube 频道页面找活跃流
- **桌面嵌入桥接** — YouTube 的 IFrame API 限制原生 webview 中的播放（error 153）。仪表板检测此并透明通过云托管嵌入代理与双向消息传递（播放/暂停/静音/取消静音/loadVideo）
- **空闲感知播放** — 视频播放器在 5 分钟不活动后暂停并从 DOM 移除，用户返回时恢复。标签可见性变化也会暂停/恢复流
- **自定义监测面板** — 为任意主题创建基于关键词的警报，颜色编码持久化存储
- **实体提取** — 自动链接国家、领导人、组织
- **虚拟滚动** — 新闻面板仅渲染可见 DOM 元素，处理数千项无浏览器延迟

---

## 故事分享与社交导出
- **可分享情报故事** — 生成国家级情报简报带 CII 评分、威胁数量、战区态势和相关预测市场
- **多平台导出** — Twitter/X、LinkedIn、WhatsApp、Telegram、Reddit 和 Facebook 的自定义格式化分享
- **深度链接** — 每个故事生成唯一 URL (`/story?c=<country>&t=<type>`) 带动态 Open Graph 元标签的丰富社交预览
- **基于 Canvas 的图像生成** — 故事渲染为 PNG 图像用于视觉分享，带 QR 码链接回实时仪表板

---

## 桌面版与变体

### 完整版 (tianyan.app)
**全球地缘政治与安全态势感知平台**

聚焦：全球军事、冲突、基础设施、地缘政治

### 科技版 (tech.tianyan.app)
**全球科技与创新态势感知平台**

聚焦：初创公司、AI/ML、云、网络安全

---

## 技术架构

| 类别 | 技术栈 |
|------|---------|
| **前端** | TypeScript、Vite、deck.gl (WebGL 3D 地球)、MapLibre GL、vite-plugin-pwa (Service Worker + Manifest) |
| **桌面** | Tauri 2 (Rust) 带 Node.js 侧边车、OS 钥匙环集成（keyring crate）、原生 TLS (reqwest) |
| **AI/ML** | MiniMax M2.5（主）、Groq（备用）、OpenRouter（次备用）、Transformers.js（浏览器侧 T5） |
| **缓存** | Redis (Upstash) — 3 层缓存带内存 + Redis + 上游、跨用户 AI 去重 |
| **地缘政治 API** | OpenSky、GDELT、ACLED、UCDP、HAPI、USGS、GDACS、NASA EONET、NASA FIRMS、Polymarket、Cloudflare Radar |
| **市场 API** | Yahoo Finance（股票、外汇、加密货币）、CoinGecko（稳定币）、mempool.space（BTC 挖率）、alternative.me（恐慌与贪婪） |
| **经济 API** | FRED（美联储）、EIA（能源）、Finnhub（股票报价） |
| **部署** | Vercel Edge Functions (45+ 端点) + Railway (中继) + Tauri（桌面） + PWA（可安装） |
| **数据** | 100+ RSS 源、ADS-B 转发器、AIS 海事数据、VIIRS 卫星图像、8 个直播流 |

---

## 文档

完整文档包括算法、数据源和系统架构：

**[docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)**

关键章节：
- [信号情报](./docs/DOCUMENTATION.md#signal-intelligence)
- [国家不稳定性指数](./docs/DOCUMENTATION.md#country-instability-index-cii)
- [军事追踪](./docs/DOCUMENTATION.md#military-tracking)
- [基础设施分析](./docs/DOCUMENTATION.md#infrastructure-cascade-analysis)
- [API 依赖](./docs/DOCUMENTATION.md#api-dependencies)
- [系统架构](./docs/DOCUMENTATION.md#system-architecture)

---

## 许可证

**专有软件** — 详见 [LICENSE](LICENSE)

本软件及其源代码为专有软件。未经所有者明确书面许可，禁止任何形式的使用、复制、修改、合并、发布、分发、授权出售或销售本软件的副本。

---

## 技术支持

如需技术支持或商业合作，请联系：
**contact@tianyan.app**

---

<p align="center">
  <a href="https://tianyan.app"><strong>在线演示</strong></a> &nbsp;·&nbsp;
  <a href="https://tech.tianyan.app"><strong>科技版演示</strong></a>
</p>
