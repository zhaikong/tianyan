/**
 * Translation data for World Monitor
 * Supports English and Chinese (Simplified)
 */

export interface Translations {
  // Common UI
  loading: string;
  'failed to load': string;
  new: string;
  live: string;
  cached: string;
  unavailable: string;
  'show methodology info': string;
  'drag to resize': string;
  'double-click to reset': string;

  // Panel titles & Map layer names (统一键名，避免重复)
  'Live News': string;
  'Live Intelligence': string;
  Insights: string;
  'Strategic Posture': string;
  'Strategic Risk': string;
  'Country Instability': string;
  'Infrastructure Cascade': string;
  Conflicts: string;
  Protests: string;
  'Natural Events': string;
  'Economic Data': string;
  Markets: string;
  Crypto: string;
  Commodities: string;
  'Commodities / VIX': string;
  Predictions: string;
  'Military Flights': string;
  'Military Vessels': string;
  'AIS Ships': string;
  'Internet Outages': string;
  Earthquakes: string;
  'Weather Alerts': string;
  'Climate Anomalies': string;
  'Population Exposure': string;
  Displacement: string;
  'ETF Flows': string;
  'Stablecoin Markets': string;
  'Macro Signals': string;
  'Tech Events': string;
  'GDALT Intel': string;
  'Tech Hubs': string;
  'Geo Hubs': string;
  'Satellite Fires': string;
  Regulation: string;
  'Desktop Configuration': string;
  Hotspots: string;
  Bases: string;
  Nuclear: string;
  Irradiators: string;
  Pipelines: string;
  Cables: string;
  Datacenters: string;
  Waterways: string;
  Sanctions: string;
  Military: string;
  AIS: string;
  Outages: string;
  Natural: string;
  Weather: string;
  Climate: string;
  'UCDP Events': string;
  'Tech HQs': string;
  'AI Labs': string;
  'Startup Hubs': string;
  Investors: string;
  Acquisitions: string;
  'Conf Tech': string;
  'Gaming Hubs': string;
  'Launch Sites': string;

  // 额外面板名称
  'Global Map': string;
  'AI Insights': string;
  'AI Strategic Posture': string;
  'Strategic Risk Overview': string;
  'Intel Feed': string;
  'World News': string;
  'World / Geopolitical': string;
  'Technology / AI': string;
  'Financial News': string;
  'Government / Policy': string;
  'Middle East': string;
  'Middle East / MENA': string;
  'Africa': string;
  'Latin America': string;
  'Asia-Pacific': string;
  'Energy & Resources': string;
  'Government': string;
  'Think Tanks': string;
  'Financial': string;
  'Technology': string;
  'Sector Heatmap': string;
  'AI/ML': string;
  'AI / ML': string;
  'Layoffs Tracker': string;
  'My Monitors': string;
  'Market Radar': string;
  'Stablecoins': string;
  'UNHCR Displacement': string;
  'BTC ETF Tracker': string;
  'Economic Indicators': string;
  'Tech Headlines': string;
  'Startups & VC': string;
  'VC Insights': string;
  'VC Insights & Essays': string;
  'Global Startup News': string;
  'Unicorn Tracker': string;
  'Accelerators': string;
  'Accelerators & Demo Days': string;
  'Cybersecurity': string;
  'AI Policy': string;
  'AI Regulation Dashboard': string;
  'Hardware': string;
  'Cloud Infrastructure': string;
  'Developer Community': string;
  'GitHub Trending': string;
  'IPO & SPAC': string;
  'Funding & VC': string;
  'Product Hunt': string;
  'Service Status': string;
  'Tech Readiness': string;
  'AI Policy & Regulation': string;
  'Semiconductors & Hardware': string;
  'Cloud & Infrastructure': string;

  // Map controls
  'Zoom In': string;
  'Zoom Out': string;
  'Reset View': string;
  'Layer Guide': string;
  Legend: string;

  // Search
  'Search news, pipelines, bases, markets...': string;
  'Search companies, AI labs, startups, events...': string;
  'News • Hotspots • Conflicts • Bases • Pipelines • Cables • Datacenters': string;
  'HQs • Companies • AI Labs • Startups • Accelerators • Events': string;

  // Status and badges
  'DEFCON Level': string;
  'Intel Status': string;
  'Data Status': string;
  'Monitored Locations': string;
  'Tension Rising': string;

  // Country Intel
  'Country Intelligence': string;
  'Share story': string;
  'Instability Index': string;
  'Signals Detected': string;
  'Recent Headlines': string;
  'AI Brief': string;
  'No AI service available': string;
  'Stock Index': string;
  'Prediction Markets': string;
  Unrest: string;
  Conflict: string;
  Security: string;
  Information: string;
  'Failed to load country data': string;
  'Close': string;

  // Panel messages
  'No data available': string;
  'No news available': string;
  'No instability signals detected': string;
  'Data still loading': string;
  'Items': string;
  'Sources': string;
  'Last updated': string;
  'Error loading data': string;
  'Press key to search': string;

  // Time filters
  '24h': string;
  '48h': string;
  '7d': string;
  '30d': string;
  All: string;

  // Settings
  Settings: string;
  'API Configuration': string;
  'API Keys': string;
  'Add API Key': string;
  'Save Settings': string;
  'Settings saved': string;
  'Clear Settings': string;
  'Desktop Runtime': string;

  // Export
  Export: string;
  'Export Data': string;
  'Export all data as JSON': string;

  // Language
  Language: string;
  English: string;
  Chinese: string;

  // Mobile warning
  'Mobile View': string;
  'Mobile device detected': string;
  'For best experience': string;
  'Some features may be limited': string;
  'Continue to app': string;

  // Panel error messages (新增)
  'Failed to calculate CII': string;
  'Failed to build dependency graph': string;
  'No active geopolitical hubs': string;
  'Failed to cluster news': string;
  'Failed to load sector data': string;
  'Failed to load commodities': string;
  'Failed to load intelligence feed': string;
  'Failed to load predictions': string;
  'Failed to calculate risk overview': string;
  'Failed to load tech readiness data': string;
  'No active tech hubs': string;
  'No significant anomalies detected': string;
  'ETF data temporarily unavailable': string;
  'No events in this category': string;
  'more events not shown': string;
  'Waiting for news data': string;
  'No breaking stories yet': string;
  'Analysis failed': string;
  'Generating summary': string;
  'Could not generate summary': string;
  'Summary failed': string;
  'No exposure data available': string;
  'Stablecoin data unavailable': string;
  'No fire data available': string;
  'Failed to load market data': string;
  'Failed to load crypto data': string;

  // Satellite fires panel
  'Region': string;
  'Fires': string;
  'High': string;
  'FRP': string;
  'Total': string;

  // Insights panel
  'BREAKING & CONFIRMED': string;
  'WORLD BRIEF': string;
  'TECH BRIEF': string;
  'ML DETECTED': string;
  'GEOGRAPHIC CONVERGENCE': string;
  'FOCAL POINTS': string;
  'Progress': string;
  'Articles': string;

  // Verification checklist
  'Information Verification Checklist': string;
  'Based on Bellingcat\'s OSH Framework': string;
  'Verification Notes': string;
  'No notes added': string;
  'Add verification note': string;
  'Add': string;
  'Reset Checklist': string;
  'VERIFIED': string;
  'LIKELY AUTHENTIC': string;
  'UNCERTAIN': string;
  'UNRELIABLE': string;
  'Recent timestamp confirmed': string;
  'Location verified': string;
  'Primary source identified': string;
  'Cross-referenced with other sources': string;
  'No AI generation artifacts': string;
  'Not recycled/old footage': string;
  'Metadata verified': string;
  'Context established': string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Common UI
    loading: 'Loading',
    'failed to load': 'Failed to load data',
    new: 'new',
    live: 'LIVE',
    cached: 'CACHED',
    unavailable: 'UNAVAILABLE',
    'show methodology info': 'Show methodology info',
    'drag to resize': 'Drag to resize (double-click to reset)',
    'double-click to reset': 'Double-click to reset',

    // Panel titles
    'Live News': 'Live News',
    'Live Intelligence': 'Live Intelligence',
    Insights: 'Insights',
    'Strategic Posture': 'Strategic Posture',
    'Strategic Risk': 'Strategic Risk',
    'Country Instability': 'Country Instability',
    'Infrastructure Cascade': 'Infrastructure Cascade',
    Conflicts: 'Conflicts',
    Protests: 'Protests',
    'Natural Events': 'Natural Events',
    'Economic Data': 'Economic Data',
    Markets: 'Markets',
    Crypto: 'Crypto',
    Commodities: 'Commodities',
    'Commodities / VIX': 'Commodities / VIX',
    Predictions: 'Predictions',
    'Military Flights': 'Military Flights',
    'Military Vessels': 'Military Vessels',
    'AIS Ships': 'AIS Ships',
    'Internet Outages': 'Internet Outages',
    Earthquakes: 'Earthquakes',
    'Weather Alerts': 'Weather Alerts',
    'Climate Anomalies': 'Climate Anomalies',
    'Population Exposure': 'Population Exposure',
    Displacement: 'Displacement',
    'ETF Flows': 'ETF Flows',
    'Stablecoin Markets': 'Stablecoin Markets',
    'Macro Signals': 'Macro Signals',
    'Tech Events': 'Tech Events',
    'GDALT Intel': 'GDELT Intel',
    'Tech Hubs': 'Tech Hubs',
    'Geo Hubs': 'Geo Hubs',
    'Satellite Fires': 'Satellite Fires',
    Regulation: 'Regulation',
    'Desktop Configuration': 'Desktop Configuration',

    // Map layer names
    Hotspots: 'Hotspots',
    Bases: 'Bases',
    Nuclear: 'Nuclear',
    Irradiators: 'Irradiators',
    Pipelines: 'Pipelines',
    Cables: 'Cables',
    Datacenters: 'Datacenters',
    Waterways: 'Waterways',
    Sanctions: 'Sanctions',
    Military: 'Military',
    AIS: 'AIS',
    Outages: 'Outages',
    Natural: 'Natural',
    Weather: 'Weather',
    Climate: 'Climate',
    'UCDP Events': 'UCDP Events',
    'Tech HQs': 'Tech HQs',
    'AI Labs': 'AI Labs',
    'Startup Hubs': 'Startup Hubs',
    Investors: 'Investors',
    Acquisitions: 'Acquisitions',
    'Conf Tech': 'Conf Tech',
    'Gaming Hubs': 'Gaming Hubs',
    'Launch Sites': 'Launch Sites',

    // 额外面板名称
    'Global Map': 'Global Map',
    'AI Insights': 'AI Insights',
    'AI Strategic Posture': 'AI Strategic Posture',
    'Strategic Risk Overview': 'Strategic Risk Overview',
    'Intel Feed': 'Intel Feed',
    'World News': 'World News',
    'World / Geopolitical': 'World / Geopolitical',
    'Technology / AI': 'Technology / AI',
    'Financial News': 'Financial News',
    'Government / Policy': 'Government / Policy',
    'Middle East': 'Middle East',
    'Middle East / MENA': 'Middle East / MENA',
    'Africa': 'Africa',
    'Latin America': 'Latin America',
    'Asia-Pacific': 'Asia-Pacific',
    'Energy & Resources': 'Energy & Resources',
    'Government': 'Government',
    'Think Tanks': 'Think Tanks',
    'Financial': 'Financial',
    'Technology': 'Technology',
    'Sector Heatmap': 'Sector Heatmap',
    'AI/ML': 'AI/ML',
    'AI / ML': 'AI / ML',
    'Layoffs Tracker': 'Layoffs Tracker',
    'My Monitors': 'My Monitors',
    'Market Radar': 'Market Radar',
    'Stablecoins': 'Stablecoins',
    'UNHCR Displacement': 'UNHCR Displacement',
    'BTC ETF Tracker': 'BTC ETF Tracker',
    'Economic Indicators': 'Economic Indicators',
    'Tech Headlines': 'Tech Headlines',
    'Startups & VC': 'Startups & VC',
    'VC Insights': 'VC Insights',
    'VC Insights & Essays': 'VC Insights & Essays',
    'Global Startup News': 'Global Startup News',
    'Unicorn Tracker': 'Unicorn Tracker',
    'Accelerators': 'Accelerators',
    'Accelerators & Demo Days': 'Accelerators & Demo Days',
    'Cybersecurity': 'Cybersecurity',
    'AI Policy': 'AI Policy',
    'AI Policy & Regulation': 'AI Policy & Regulation',
    'AI Regulation Dashboard': 'AI Regulation Dashboard',
    'Hardware': 'Hardware',
    'Semiconductors & Hardware': 'Semiconductors & Hardware',
    'Cloud Infrastructure': 'Cloud Infrastructure',
    'Cloud & Infrastructure': 'Cloud & Infrastructure',
    'Developer Community': 'Developer Community',
    'GitHub Trending': 'GitHub Trending',
    'IPO & SPAC': 'IPO & SPAC',
    'Funding & VC': 'Funding & VC',
    'Product Hunt': 'Product Hunt',
    'Service Status': 'Service Status',
    'Tech Readiness': 'Tech Readiness',

    // Map controls
    'Zoom In': 'Zoom In',
    'Zoom Out': 'Zoom Out',
    'Reset View': 'Reset View',
    'Layer Guide': 'Layer Guide',
    Legend: 'LEGEND',

    // Search
    'Search news, pipelines, bases, markets...': 'Search news, pipelines, bases, markets...',
    'Search companies, AI labs, startups, events...': 'Search companies, AI labs, startups, events...',
    'News • Hotspots • Conflicts • Bases • Pipelines • Cables • Datacenters': 'News • Hotspots • Conflicts • Bases • Pipelines • Cables • Datacenters',
    'HQs • Companies • AI Labs • Startups • Accelerators • Events': 'HQs • Companies • AI Labs • Startups • Accelerators • Events',

    // Status and badges
    'DEFCON Level': 'DEFCON Level',
    'Intel Status': 'Intel Status',
    'Data Status': 'Data Status',
    'Monitored Locations': 'Monitored Locations',
    'Tension Rising': 'Tension Rising',

    // Country Intel
    'Country Intelligence': 'Country Intelligence',
    'Share story': 'Share story',
    'Instability Index': 'Instability Index',
    'Signals Detected': 'Signals Detected',
    'Recent Headlines': 'Recent Headlines',
    'AI Brief': 'AI Brief',
    'No AI service available': 'No AI service available. Configure GROQ_API_KEY in Settings for full briefs.',
    'Stock Index': 'Stock Index',
    'Prediction Markets': 'Prediction Markets',
    Unrest: 'Unrest',
    Conflict: 'Conflict',
    Security: 'Security',
    Information: 'Information',
    'Failed to load country data': 'Failed to load country data',
    'Close': 'Close',

    // Panel messages
    'No data available': 'No data available',
    'No news available': 'No news available',
    'No instability signals detected': 'No instability signals detected',
    'Data still loading': 'Data still loading',
    Items: 'items',
    Sources: 'sources',
    'Last updated': 'Last updated',
    'Error loading data': 'Error loading data',
    'Press key to search': 'Press {key} to search',

    // Time filters
    '24h': '24h',
    '48h': '48h',
    '7d': '7d',
    '30d': '30d',
    All: 'All',

    // Settings
    Settings: 'Settings',
    'API Configuration': 'API Configuration',
    'API Keys': 'API Keys',
    'Add API Key': 'Add API Key',
    'Save Settings': 'Save Settings',
    'Settings saved': 'Settings saved',
    'Clear Settings': 'Clear Settings',
    'Desktop Runtime': 'Desktop Runtime',

    // Export
    Export: 'Export',
    'Export Data': 'Export Data',
    'Export all data as JSON': 'Export all data as JSON',

    // Language
    Language: 'Language',
    English: 'English',
    Chinese: '中文',

    // Mobile warning
    'Mobile View': 'Mobile View',
    'Mobile device detected': 'Mobile device detected',
    'For best experience': 'For best experience, use a desktop browser.',
    'Some features may be limited': 'Some features may be limited on mobile.',
    'Continue to app': 'Continue to app',

    // Panel error messages
    'Failed to calculate CII': 'Failed to calculate CII',
    'Failed to build dependency graph': 'Failed to build dependency graph',
    'No active geopolitical hubs': 'No active geopolitical hubs',
    'Failed to cluster news': 'Failed to cluster news',
    'Failed to load sector data': 'Failed to load sector data',
    'Failed to load commodities': 'Failed to load commodities',
    'Failed to load intelligence feed': 'Failed to load intelligence feed',
    'Failed to load predictions': 'Failed to load predictions',
    'Failed to calculate risk overview': 'Failed to calculate risk overview',
    'Failed to load tech readiness data': 'Failed to load tech readiness data',
    'No active tech hubs': 'No active tech hubs',
    'No significant anomalies detected': 'No significant anomalies detected',
    'ETF data temporarily unavailable': 'ETF data temporarily unavailable',
    'No events in this category': 'No events in this category',
    'more events not shown': 'more events not shown',
    'Waiting for news data': 'Waiting for news data...',
    'No breaking stories yet': 'No breaking stories yet',
    'Analysis failed': 'Analysis failed - retrying...',
    'Generating summary': 'Generating summary...',
    'Could not generate summary': 'Could not generate summary',
    'Summary failed': 'Summary failed',
    'No exposure data available': 'No exposure data available',
    'Stablecoin data unavailable': 'Stablecoin data unavailable',
    'No fire data available': 'No fire data available',
    'Failed to load market data': 'Failed to load market data',
    'Failed to load crypto data': 'Failed to load crypto data',

    // Satellite fires panel
    'Region': 'Region',
    'Fires': 'Fires',
    'High': 'High',
    'FRP': 'FRP',
    'Total': 'Total',

    // Insights panel
    'BREAKING & CONFIRMED': 'BREAKING & CONFIRMED',
    'WORLD BRIEF': 'WORLD BRIEF',
    'TECH BRIEF': 'TECH BRIEF',
    'ML DETECTED': 'ML DETECTED',
    'GEOGRAPHIC CONVERGENCE': 'GEOGRAPHIC CONVERGENCE',
    'FOCAL POINTS': 'FOCAL POINTS',
    'Progress': 'Progress',
    'Articles': 'Articles',

    // Verification checklist
    'Information Verification Checklist': 'Information Verification Checklist',
    'Based on Bellingcat\'s OSH Framework': 'Based on Bellingcat\'s OSH Framework',
    'Verification Notes': 'Verification Notes',
    'No notes added': 'No notes added',
    'Add verification note': 'Add verification note...',
    'Add': 'Add',
    'Reset Checklist': 'Reset Checklist',
    'VERIFIED': 'VERIFIED',
    'LIKELY AUTHENTIC': 'LIKELY AUTHENTIC',
    'UNCERTAIN': 'UNCERTAIN',
    'UNRELIABLE': 'UNRELIABLE',
    'Recent timestamp confirmed': 'Recent timestamp confirmed',
    'Location verified': 'Location verified',
    'Primary source identified': 'Primary source identified',
    'Cross-referenced with other sources': 'Cross-referenced with other sources',
    'No AI generation artifacts': 'No AI generation artifacts',
    'Not recycled/old footage': 'Not recycled/old footage',
    'Metadata verified': 'Metadata verified',
    'Context established': 'Context established',
  },

  zh: {
    // Common UI
    loading: '加载中',
    'failed to load': '数据加载失败',
    new: '新',
    live: '实时',
    cached: '已缓存',
    unavailable: '不可用',
    'show methodology info': '显示方法信息',
    'drag to resize': '拖动调整大小（双击重置）',
    'double-click to reset': '双击重置',

    // Panel titles
    'Live News': '实时新闻',
    'Live Intelligence': '实时情报',
    Insights: '洞察分析',
    'Strategic Posture': '战略态势',
    'Strategic Risk': '战略风险',
    'Country Instability': '国家不稳定性',
    'Infrastructure Cascade': '基础设施级联',
    Conflicts: '冲突',
    Protests: '抗议',
    'Natural Events': '自然灾害',
    'Economic Data': '经济数据',
    Markets: '市场',
    Crypto: '加密货币',
    Commodities: '大宗商品',
    'Commodities / VIX': '大宗商品 / VIX',
    Predictions: '预测市场',
    'Military Flights': '军机追踪',
    'Military Vessels': '军舰追踪',
    'AIS Ships': 'AIS 船舶',
    'Internet Outages': '网络中断',
    Earthquakes: '地震',
    'Weather Alerts': '天气预警',
    'Climate Anomalies': '气候异常',
    'Population Exposure': '人口影响',
    Displacement: '人口流离',
    'ETF Flows': 'ETF 资金流',
    'Stablecoin Markets': '稳定币市场',
    'Macro Signals': '宏观信号',
    'Tech Events': '科技事件',
    'GDALT Intel': 'GDELT 情报',
    'Tech Hubs': '科技中心',
    'Geo Hubs': '地理中心',
    'Satellite Fires': '卫星火灾',
    Regulation: '监管动态',
    'Desktop Configuration': '桌面配置',

    // Map layer names
    Hotspots: '热点地区',
    Bases: '军事基地',
    Nuclear: '核设施',
    Irradiators: '辐照装置',
    Pipelines: '管道',
    Cables: '海底光缆',
    Datacenters: '数据中心',
    Waterways: '航道',
    Sanctions: '制裁',
    Military: '军事',
    AIS: '船舶AIS',
    Outages: '网络中断',
    Natural: '自然灾害',
    Weather: '天气',
    Climate: '气候',
    'UCDP Events': 'UCDP 事件',
    'Tech HQs': '科技公司总部',
    'AI Labs': 'AI 实验室',
    'Startup Hubs': '创业生态',
    Investors: '投资者',
    Acquisitions: '并购',
    'Conf Tech': '会议科技',
    'Gaming Hubs': '游戏中心',
    'Launch Sites': '发射场',

    // 额外面板名称
    'Global Map': '全球地图',
    'AI Insights': 'AI 洞察',
    'AI Strategic Posture': 'AI 战略态势',
    'Strategic Risk Overview': '战略风险概览',
    'Intel Feed': '情报源',
    'World News': '世界新闻',
    'World / Geopolitical': '世界 / 地缘政治',
    'Technology / AI': '科技 / AI',
    'Financial News': '财经新闻',
    'Government / Policy': '政府 / 政策',
    'Middle East': '中东',
    'Middle East / MENA': '中东 / MENA',
    'Africa': '非洲',
    'Latin America': '拉美',
    'Asia-Pacific': '亚太',
    'Energy & Resources': '能源资源',
    'Government': '政府',
    'Think Tanks': '智库',
    'Financial': '金融',
    'Technology': '科技',
    'Sector Heatmap': '板块热图',
    'AI/ML': 'AI/机器学习',
    'AI / ML': 'AI / 机器学习',
    'Layoffs Tracker': '裁员追踪',
    'My Monitors': '我的监控',
    'Market Radar': '市场雷达',
    'Stablecoins': '稳定币',
    'UNHCR Displacement': '难民流离',
    'BTC ETF Tracker': 'BTC ETF 追踪',
    'Economic Indicators': '经济指标',
    'Tech Headlines': '科技头条',
    'Startups & VC': '创业与风投',
    'VC Insights': '风投洞察',
    'VC Insights & Essays': '风投洞察与文章',
    'Global Startup News': '全球创业新闻',
    'Unicorn Tracker': '独角兽追踪',
    'Accelerators': '加速器',
    'Accelerators & Demo Days': '加速器与演示日',
    'Cybersecurity': '网络安全',
    'AI Policy': 'AI 政策',
    'AI Policy & Regulation': 'AI 政策与监管',
    'AI Regulation Dashboard': 'AI 监管仪表盘',
    'Hardware': '硬件',
    'Semiconductors & Hardware': '半导体与硬件',
    'Cloud Infrastructure': '云基础设施',
    'Cloud & Infrastructure': '云与基础设施',
    'Developer Community': '开发者社区',
    'GitHub Trending': 'GitHub 热门',
    'IPO & SPAC': 'IPO 与 SPAC',
    'Funding & VC': '融资与风投',
    'Product Hunt': 'Product Hunt',
    'Service Status': '服务状态',
    'Tech Readiness': '科技就绪度',

    // Map controls
    'Zoom In': '放大',
    'Zoom Out': '缩小',
    'Reset View': '重置视图',
    'Layer Guide': '图层指南',
    Legend: '图例',

    // Search
    'Search news, pipelines, bases, markets...': '搜索新闻、管道、基地、市场...',
    'Search companies, AI labs, startups, events...': '搜索公司、AI 实验室、初创公司、事件...',
    'News • Hotspots • Conflicts • Bases • Pipelines • Cables • Datacenters': '新闻 • 热点 • 冲突 • 基地 • 管道 • 光缆 • 数据中心',
    'HQs • Companies • AI Labs • Startups • Accelerators • Events': '总部 • 公司 • AI 实验室 • 初创公司 • 加速器 • 事件',

    // Status and badges
    'DEFCON Level': '防御等级',
    'Intel Status': '情报状态',
    'Data Status': '数据状态',
    'Monitored Locations': '监控位置',
    'Tension Rising': '紧张局势升级',

    // Country Intel
    'Country Intelligence': '国家情报',
    'Share story': '分享报告',
    'Instability Index': '不稳定性指数',
    'Signals Detected': '检测到的信号',
    'Recent Headlines': '近期头条',
    'AI Brief': 'AI 简报',
    'No AI service available': '没有可用的 AI 服务。在设置中配置 GROQ_API_KEY 以获取完整简报。',
    'Stock Index': '股票指数',
    'Prediction Markets': '预测市场',
    Unrest: '动荡',
    Conflict: '冲突',
    Security: '安全',
    Information: '信息',
    'Failed to load country data': '加载国家数据失败',
    'Close': '关闭',

    // Panel messages
    'No data available': '无可用数据',
    'No news available': '暂无新闻',
    'No instability signals detected': '未检测到不稳定信号',
    'Data still loading': '数据正在加载',
    Items: '条',
    Sources: '个来源',
    'Last updated': '最后更新',
    'Error loading data': '加载数据出错',
    'Press key to search': '按 {key} 搜索',

    // Time filters
    '24h': '24小时',
    '48h': '48小时',
    '7d': '7天',
    '30d': '30天',
    All: '全部',

    // Settings
    Settings: '设置',
    'API Configuration': 'API 配置',
    'API Keys': 'API 密钥',
    'Add API Key': '添加 API 密钥',
    'Save Settings': '保存设置',
    'Settings saved': '设置已保存',
    'Clear Settings': '清除设置',
    'Desktop Runtime': '桌面运行时',

    // Export
    Export: '导出',
    'Export Data': '导出数据',
    'Export all data as JSON': '将所有数据导出为 JSON',

    // Language
    Language: '语言',
    English: 'English',
    Chinese: '中文',

    // Mobile warning
    'Mobile View': '移动版视图',
    'Mobile device detected': '检测到移动设备',
    'For best experience': '为获得最佳体验，请使用桌面浏览器。',
    'Some features may be limited': '移动设备上某些功能可能受限。',
    'Continue to app': '继续访问应用',

    // Panel error messages
    'Failed to calculate CII': '计算CII失败',
    'Failed to build dependency graph': '构建依赖图失败',
    'No active geopolitical hubs': '无活跃地缘政治中心',
    'Failed to cluster news': '新闻聚类失败',
    'Failed to load sector data': '加载板块数据失败',
    'Failed to load commodities': '加载大宗商品数据失败',
    'Failed to load intelligence feed': '加载情报源失败',
    'Failed to load predictions': '加载预测数据失败',
    'Failed to calculate risk overview': '计算风险概览失败',
    'Failed to load tech readiness data': '加载科技就绪度数据失败',
    'No active tech hubs': '无活跃科技中心',
    'No significant anomalies detected': '未检测到显著异常',
    'ETF data temporarily unavailable': 'ETF数据暂时不可用',
    'No events in this category': '该类别无事件',
    'more events not shown': '更多事件未显示',
    'Waiting for news data': '等待新闻数据...',
    'No breaking stories yet': '暂无突发新闻',
    'Analysis failed': '分析失败，正在重试...',
    'Generating summary': '正在生成摘要...',
    'Could not generate summary': '无法生成摘要',
    'Summary failed': '摘要生成失败',
    'No exposure data available': '无可用影响数据',
    'Stablecoin data unavailable': '稳定币数据不可用',
    'No fire data available': '无火灾数据',
    'Failed to load market data': '加载市场数据失败',
    'Failed to load crypto data': '加载加密货币数据失败',

    // Satellite fires panel
    'Region': '地区',
    'Fires': '火灾',
    'High': '高强度',
    'FRP': 'FRP',
    'Total': '总计',

    // Insights panel
    'BREAKING & CONFIRMED': '突发 & 已确认',
    'WORLD BRIEF': '世界简报',
    'TECH BRIEF': '科技简报',
    'ML DETECTED': 'ML 检测',
    'GEOGRAPHIC CONVERGENCE': '地理汇聚',
    'FOCAL POINTS': '焦点地区',
    'Progress': '进度',
    'Articles': '文章',

    // Verification checklist
    'Information Verification Checklist': '信息验证清单',
    'Based on Bellingcat\'s OSH Framework': '基于 Bellingcat 的 OSH 框架',
    'Verification Notes': '验证备注',
    'No notes added': '暂无备注',
    'Add verification note': '添加验证备注...',
    'Add': '添加',
    'Reset Checklist': '重置清单',
    'VERIFIED': '已验证',
    'LIKELY AUTHENTIC': '可能真实',
    'UNCERTAIN': '不确定',
    'UNRELIABLE': '不可靠',
    'Recent timestamp confirmed': '时间戳已确认',
    'Location verified': '地理位置已验证',
    'Primary source identified': '已识别主要来源',
    'Cross-referenced with other sources': '已与其他来源交叉验证',
    'No AI generation artifacts': '无AI生成痕迹',
    'Not recycled/old footage': '非回收/旧素材',
    'Metadata verified': '元数据已验证',
    'Context established': '上下文已建立',
  },
};

export type Language = keyof typeof translations;
export const supportedLanguages: Language[] = ['en', 'zh'];

export const LANGUAGE_STORAGE_KEY = 'tianyan-language';
export const DEFAULT_LANGUAGE: Language = 'zh';
