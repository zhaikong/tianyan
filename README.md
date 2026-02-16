# 天眼 (World Monitor)

**实时全球情报仪表板** — 融合AI的新闻聚合、地缘政治监控和基础设施追踪的统一态势感知界面。

[![GitHub stars](https://img.shields.io/github/stars/zhaikong/worldmonitor?style=social)](https://github.com/zhaikong/worldmonitor/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 为什么选择天眼？

| 问题 | 解决方案 |
|------|----------|
| 新闻分散在100+个来源 | **统一仪表板** 整合100+精选源 |
| 事件缺乏地理空间上下文 | **交互式地图** 25+可切换数据层 |
| 信息过载 | **AI综合简报** 焦点检测 |
| 加密货币/宏观信号噪音 | **7信号市场雷达** 综合买入/持有判断 |
| 昂贵的OSINT工具 ($$$) | **100%免费开源** |
| 静态新闻推送 | **实时更新** 含直播视频流 |
| 仅限网页版仪表板 | **原生桌面应用** (Tauri) + 可安装PWA支持离线地图 |
| 平面2D地图 | **3D WebGL地球** deck.gl渲染，29+可切换数据层 |

---

## 在线演示

| 版本 | 地址 | 专注领域 |
|------|------|----------|
| **天眼 (World Monitor)** | [worldmonitor.app](https://worldmonitor.app) | 地缘政治、军事、冲突、基础设施 |
| **科技版 (Tech Monitor)** | [tech.worldmonitor.app](https://tech.worldmonitor.app) | 初创公司、AI/ML、云、网络安全 |

两个版本共用一个代码库，点击即可切换。

---

## 核心功能

### 交互式3D地球
- **WebGL加速渲染** — deck.gl + MapLibre GL JS，60fps流畅性能，支持数千个并发标记
- **29+数据层** — 冲突、军事基地、核设施、海底光缆、管道、卫星火灾检测、抗议、自然灾害、数据中心、人口流离、气候异常等
- **智能聚合** — 低缩放时Supercluster聚合标记，放大时展开
- **渐进式显示** — 细节图层仅在放大时出现
- **8个区域预设** — 全球、美洲、欧洲、中东、亚洲、非洲、大洋洲、拉美
- **时间过滤** — 1小时、6小时、24小时、48小时、7天事件窗口

### AI驱动的情报
- **世界简报** — LLM综合全球重大发展摘要
- **混合威胁分类** — 即时关键词分类器 + 异步LLM覆盖
- **焦点检测** — 跨新闻、军事活动、抗议、断网和市场关联实体
- **国家不稳定指数** — 20个监控国家的实时稳定性评分
- **战略态势评估** — 综合所有情报模块的风险评分

### 实时数据层

#### 地缘政治
- 活跃冲突区（UCDP + ACLED）
- 情报热点（新闻关联）
- 社会动荡事件
- 自然灾害（USGS + GDACS + NASA EONET）
- 制裁动态
- 天气预警

#### 军事与战略
- 220+军事基地
- 实时军机追踪 (ADS-B)
- 军舰监控 (AIS)
- 核设施
- APT网络威胁归因
- 发射场

#### 基础设施
- 海底光缆
- 油气管道
- AI数据中心
- 网络中断
- 关键矿床
- NASA FIRMS卫星火灾检测

#### 市场与加密货币情报
- 7信号宏观雷达（含买入/持有判断）
- BTC现货ETF资金流追踪
- 稳定币挂钩健康监测
- 恐惧与贪婪指数
- 比特币技术趋势

### 新闻与直播
- **100+ RSS订阅** — 地缘政治、国防、能源、科技
- **8个直播视频流** — Bloomberg、Al Jazeera等
- **自定义监控** — 创建基于关键词的告警
- **实体提取** — 自动关联国家、领导人、组织

### 信号聚合与异常检测
- **多源信号融合** — 整合网络中断、军机、军舰、抗议、AIS中断、卫星火灾
- **时序基线异常检测** — Welford算法计算事件类型的统计基线
- **区域汇聚评分** — 多种信号类型在同一地理区域激增时识别汇聚区

### 故事分享
- **可分享情报故事** — 生成国家情报简报
- **多平台导出** — Twitter、LinkedIn、WhatsApp、Telegram等
- **Canvas图像生成** — 故事渲染为PNG图片分享

### 桌面应用 (Tauri)
- **macOS和Windows原生应用**
- **系统密钥链集成** — API密钥存储在系统凭证管理器
- **Token认证的sidecar** — 本地API处理器
- **云端回退** — 本地失败时透明切换到云部署

### 渐进式Web应用
- **可安装** — 可安装到桌面或移动设备
- **离线地图支持** — 使用CacheFirst策略缓存MapTiler瓦片
- **智能缓存策略** — API和RSS使用NetworkOnly，字体/图片/静态资源使用长期缓存

---

## 技术架构

| 类别 | 技术 |
|------|------|
| 前端 | TypeScript, Vite, deck.gl (WebGL 3D地球), MapLibre GL |
| 桌面端 | Tauri 2 (Rust) + Node.js sidecar |
| AI/ML | Groq, OpenRouter, Transformers.js |
| 缓存 | Redis (Upstash) — 3层缓存 |
| 部署 | Vercel Edge Functions + Tauri (桌面) + PWA |

---

## 快速开始

```bash
# 克隆并运行
git clone https://github.com/zhaikong/worldmonitor.git
cd worldmonitor
npm install
npm run dev       # 开发模式
```

访问 [http://localhost:3000](http://localhost:3000)

### 可选环境变量

```bash
cp .env.example .env.local
```

添加您的API密钥以获得完整功能。

---

## 自托管

### 方式1: 部署到Vercel（推荐）

```bash
npm install -g vercel
vercel          # 按照提示操作
```

### 方式2: Vercel CLI本地开发

```bash
npm install -g vercel
cp .env.example .env.local   # 添加您的API密钥
vercel dev                   # 启动在 http://localhost:3000
```

### 方式3: 仅静态前端

```bash
npm run dev    # Vite开发服务器 http://localhost:5173
```

---

## 文档

完整文档见 **[docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)**

---

## 贡献

欢迎贡献！请查看 [CONTRIBUTING](./docs/DOCUMENTATION.md#contributing) 了解指南。

---

## 许可证

MIT License — 见 [LICENSE](LICENSE)

---

## 支持

如果天眼对您有帮助：
- **Star** 本项目帮助更多人发现
- **分享** 给感兴趣的朋友
- **贡献** 代码、数据源或文档
- **报告问题** 帮助改进平台
