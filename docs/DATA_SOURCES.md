# 天眼 (TianYan) 数据源清单

**完整的数据来源列表** - 包含免费获取方式和使用说明

---

## 一、新闻与RSS源 (100+ 免费RSS)

### 国际通讯社 (Tier 1)
| 数据源 | 获取方式 | 免费说明 |
|--------|---------|----------|
| **Reuters** | `https://www.reuters.com/rss` | 完全免费RSS |
| **AP News** | `https://news.google.com/rss/search?q=site:apnews.com` | 通过Google RSS免费 |
| **AFP** | Google RSS聚合 | 免费获取 |
| **Bloomberg** | Google RSS聚合 | 免费获取 |

### 主流媒体 (Tier 2)
| 数据源 | 获取方式 | 免费说明 |
|--------|---------|----------|
| **BBC World** | `https://feeds.bbci.co.uk/news/world/rss.xml` | 完全免费 |
| **NPR News** | `https://feeds.npr.org/1001/rss.xml` | 完全免费 |
| **CNN World** | `http://rss.cnn.com/rss/cnn_world.rss` | 完全免费 |
| **Al Jazeera** | `https://www.aljazeera.com/xml/rss/all.xml` | 完全免费 |
| **The Guardian** | `https://www.theguardian.com/world/rss` | 完全免费 |
| **Fox News** | Google RSS聚合 | 免费获取 |

### 政府与国际组织 (Tier 1)
| 数据源 | 获取方式 | 免费说明 |
|--------|---------|----------|
| **White House** | Google RSS (`site:whitehouse.gov`) | 免费公开 |
| **Pentagon** | Google RSS (`site:defense.gov`) | 免费公开 |
| **UN News** | `https://news.un.org/feed/subscribe/en/news/all/rss.xml` | 完全免费 |
| **CISA** | `https://www.cisa.gov/cybersecurity-advisories/all.xml` | 免费公开 |
| **Federal Reserve** | `https://www.federalreserve.gov/feeds/press_all.xml` | 免费公开 |
| **SEC** | `https://www.sec.gov/news/pressreleases/rss` | 免费公开 |
| **CDC/FEMA/DHS** | Google RSS聚合 | 免费公开 |

### 科技媒体
| 数据源 | 获取方式 | 免费说明 |
|--------|---------|----------|
| **Hacker News** | `https://hnrss.org/frontpage` | 完全免费 |
| **Ars Technica** | `https://feeds.arstechnica.com/arstechnica/technology-lab` | 完全免费 |
| **MIT Tech Review** | `https://www.technologyreview.com/feed/` | 完全免费 |
| **The Verge** | `https://www.theverge.com/rss/index.xml` | 完全免费 |
| **TechCrunch** | Google RSS聚合 | 免费获取 |

---

## 二、军事与安全数据

### OpenSky Network (军机数据)
```
API: https://opensky-network.org/api/states/all
参数: lamin, lomin, lamax, lomax
免费: ✅ 完全免费开源API
数据: 实时全球航班跟踪
```

### ACLED (冲突事件)
```
需要: ACLED_API_KEY (免费申请)
API: https://api.acleddata.com/
免费: ✅ 学术免费注册
数据: 非洲政治暴力事件
```

### UCDP (冲突事件)
```
需要: UCDP_API_KEY (免费申请)
API: https://ucdpapi.pcr.uu.se/
免费: ✅ 学术免费
数据: 全球武装冲突数据库
```

### GDAL (自然灾害)
```
需要: GDAL_API_KEY (免费申请)
API: https://www.gdal.org/
免费: ✅ 免费注册
数据: 全球灾害预警协调
```

---

## 三、市场与金融数据

### CoinGecko (加密货币)
```javascript
// 完全免费API
API: https://api.coingecko.com/api/v3/
数据:
  - /simple/price (价格)
  - /coins/markets (市场)
  - 支持 vs_currencies=usd,eur,gbp,jpy,cny
免费: ✅ 无需注册，公共API
限制: 建议缓存(120秒TTL)
```

### Yahoo Finance (股票)
```
API: 直接RSS或抓取
免费: ✅ 完全免费
数据: 全球股票市场数据
```

### Polymarket (预测市场)
```javascript
// 完全免费
API: https://gamma-api.polymarket.com/
数据:
  - /markets (预测市场)
  - /events (事件)
免费: ✅ 公开gamma API
注意: Cloudflare可能阻止服务器端请求
```

### FRED (经济数据)
```
需要: FRED_API_KEY (免费申请)
API: https://api.stlouisfed.org/fred/
免费: ✅ 圣路易斯联储免费API
数据: 美国经济数据
```

---

## 四、地球科学与灾害

### USGS Earthquakes (地震)
```javascript
// 完全免费，无需API密钥
API: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson
数据: 过去24小时4.5+级地震
免费: ✅ 美国地质调查局公开数据
TTL: 300秒
```

### UNHCR (难民数据)
```
需要: UNHCR API访问
API: Google RSS聚合
免费: ✅ 联合国难民署公开数据
数据: 全球人口流离情况
```

### NOAA Weather (天气)
```
需要: NOAA API Key (免费)
API: https://www.weather.gov/
免费: ✅ 美国国家气象局免费
数据: 天气预警
```

### Climate Anomalies (气候异常)
```
需要: 定制API
API: 项目专用endpoint
免费: ✅ 基于公开数据
数据: 全球气候异常监测
```

### FIRMS (卫星火灾)
```
需要: FIRMS_API_KEY (NASA免费申请)
API: https://firms.modaps.eosdis.nasa.gov/
免费: ✅ NASA FIRMS免费API
数据: 全球卫星火灾探测
```

### Population Exposure (人口影响)
```
API: 项目专用endpoint
免费: ✅ 基于公开数据
数据: 灾害人口影响评估
```

---

## 五、科技与AI数据

### arXiv (AI论文)
```javascript
// 完全免费，无需API密钥
API: https://export.arxiv.org/api/query?
参数:
  - search_query (如: cat:cs.AI)
  - start=0
  - max_results=50
  - sortBy=submittedDate
免费: ✅ 康奈尔大学完全公开
数据: AI/ML最新研究论文
TTL: 3600秒
```

### GitHub Trending
```javascript
// 完全免费
RSS: https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml
免费: ✅ GitHub公开RSS
数据: 每日trending仓库
```

### Y Combinator (创业)
```
RSS: https://www.ycombinator.com/rss
免费: ✅ 完全免费
数据: 创业新闻和讨论
```

---

## 六、基础设施与网络

### Cloudflare Outages
```
需要: 定制数据源
免费: ✅ 基于公开状态页
数据: 全球网络中断
```

### FAA Status (航空)
```javascript
// 完全免费
API: https://nasstatus.faa.gov/api/airport-status-information
免费: ✅ 美国联邦航空局公开
数据: 机场状态信息
TTL: 60秒
```

---

## 七、需要API密钥但可免费获取

### MiniMax M2.5 (AI摘要)
```
获取方式: https://api.minimax.io/anthropic
用途: 新闻摘要、国家情报简报
免费: ✅ 你已购买
API Key: 在 .env.local 中配置 MINIMAX_API_KEY
```

### OpenRouter / Groq (AI总结)
```
获取方式:
  - Groq: https://console.groq.com/ (免费额度)
  - OpenRouter: https://openrouter.ai/keys (免费tier)
用途: 新闻摘要功能
免费: ✅ 额度可用
```

### Upstash Redis (缓存)
```
获取方式: https://upstash.com/ (免费tier)
用途: API响应缓存
免费: ✅ 10K commands/day
```

---

## 八、数据源分类汇总

| 类别 | 免费API数量 | 需要注册的免费API |
|------|--------------|-------------------|
| 新闻RSS | 100+ | 0 |
| 地震灾害 | 3 | 1 (FIRMS) |
| 市场金融 | 5 | 2 (FRED, CoinGecko可选) |
| 军事追踪 | 2 | 1 (Wingbits) |
| 冲突事件 | 2 | 2 (ACLED, UCDP) |
| 科技研究 | 2 | 0 |
| 政府数据 | 10+ | 0 |
| AI/ML | 1 | 0 (MiniMax已购) |

**总计**: 约130+ 个数据源，其中 **90%以上完全免费无需注册**。

---

## 九、环境变量配置说明

### 创建配置文件

项目根目录下的 `.env.example` 文件是配置模板。需要复制创建实际的配置文件：

```bash
# Windows (Git Bash)
cp .env.example .env.local

# 或手动复制
复制 .env.example 内容到 .env.local
```

### 重要配置项

#### AI 摘要功能（必需）
```bash
# MiniMax M2.5 (你已购买)
MINIMAX_API_KEY=你的密钥

# Groq API (备用，免费)
GROQ_API_KEY=

# OpenRouter (二级备用，免费)
OPENROUTER_API_KEY=
```

#### 缓存服务（推荐）
```bash
# Upstash Redis (推荐配置以获得更好性能)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

#### 市场数据
```bash
# Finnhub 股票报价（免费）
FINNHUB_API_KEY=

# FRED 经济数据（免费申请）
FRED_API_KEY=

# EIA 能源数据（免费申请）
EIA_API_KEY=
```

#### 军事追踪
```bash
# Wingbits 军机增强（免费注册）
WINGBITS_API_KEY=

# ACLED 冲突数据（学术免费）
ACLED_ACCESS_TOKEN=

# AISStream 船舶追踪
AISSTREAM_API_KEY=

# OpenSky OAuth2
OPENSKY_CLIENT_ID=
OPENSKY_CLIENT_SECRET=
```

#### 其他服务
```bash
# Cloudflare Radar
CLOUDFLARE_API_TOKEN=

# NASA FIRMS 火灾卫星
NASA_FIRMS_API_KEY=
```

---

## 十、快速开始指南

### 1. 创建配置文件
```bash
# 复制配置模板
cp .env.example .env.local

# 编辑 .env.local 添加你的 API Keys
# 至少需要 MINIMAX_API_KEY
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问应用
- 打开浏览器访问: `http://localhost:3000`

---

## 十一、故障排除

### API 密钥无效时
1. 检查 `.env.local` 文件是否存在
2. 确认 API Key 正确复制（无多余空格）
3. 重启开发服务器：`npm run dev`

### 数据不显示时
1. 打开浏览器开发者工具 (F12)
2. 查看网络请求是否成功
3. 确认 API 服务状态正常

### MiniMax API 测试
```bash
# 测试 API 是否可用
curl -X POST https://api.minimax.io/anthropic/v1/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"abab6.5s-chat","messages":[{"role":"user","content":"你好"}],"stream":false}'
```

---

## 技术支持

如需帮助，请联系：**contact@tianyan.app**
