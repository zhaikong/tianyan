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
  },
};

export type Language = keyof typeof translations;
export const supportedLanguages: Language[] = ['en', 'zh'];

export const LANGUAGE_STORAGE_KEY = 'worldmonitor-language';
export const DEFAULT_LANGUAGE: Language = 'en';
