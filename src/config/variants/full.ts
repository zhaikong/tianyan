// Full geopolitical variant - tianyan.app
import type { PanelConfig, MapLayers } from '@/types';
import type { VariantConfig } from './base';

// Re-export base config
export * from './base';

// Geopolitical-specific exports
export * from '../feeds';
export * from '../geo';
export * from '../irradiators';
export * from '../pipelines';
export * from '../ports';
export * from '../military';
export * from '../entities';

// Panel configuration for geopolitical analysis
export const DEFAULT_PANELS: Record<string, PanelConfig> = {
  map: { name: '全球态势图', enabled: true, priority: 1 },
  'live-news': { name: '实时新闻', enabled: true, priority: 1 },
  intel: { name: '情报源', enabled: true, priority: 1 },
  'gdelt-intel': { name: '全球情报', enabled: true, priority: 1 },
  cii: { name: '国家不稳定性指数', enabled: true, priority: 1 },
  cascade: { name: '基础设施级联', enabled: true, priority: 1 },
  'strategic-risk': { name: '战略风险评估', enabled: true, priority: 1 },
  politics: { name: '全球新闻', enabled: true, priority: 1 },
  middleeast: { name: '中东地区', enabled: true, priority: 1 },
  africa: { name: '非洲', enabled: true, priority: 1 },
  latam: { name: '拉丁美洲', enabled: true, priority: 1 },
  asia: { name: '亚太地区', enabled: true, priority: 1 },
  energy: { name: '能源与资源', enabled: true, priority: 1 },
  gov: { name: '政府动态', enabled: true, priority: 1 },
  thinktanks: { name: '智库名单', enabled: true, priority: 1 },
  polymarket: { name: '预测市场', enabled: true, priority: 1 },
  commodities: { name: '大宗商品', enabled: true, priority: 1 },
  markets: { name: '全球市场', enabled: true, priority: 1 },
  economic: { name: '经济指标', enabled: true, priority: 1 },
  finance: { name: '金融', enabled: true, priority: 1 },
  tech: { name: '科技创新', enabled: true, priority: 2 },
  crypto: { name: '加密货币', enabled: true, priority: 2 },
  heatmap: { name: '热点分布', enabled: true, priority: 2 },
  ai: { name: 'AI/机器学习', enabled: true, priority: 2 },
  layoffs: { name: '裁员追踪', enabled: false, priority: 2 },
  'macro-signals': { name: '市场雷达', enabled: true, priority: 2 },
  'etf-flows': { name: '比特币ETF资金', enabled: true, priority: 2 },
  stablecoins: { name: '稳定币', enabled: true, priority: 2 },
  monitors: { name: '我的监测面板', enabled: true, priority: 2 },
};

// Map layers for geopolitical view
export const DEFAULT_MAP_LAYERS: MapLayers = {
  conflicts: true,
  bases: true,
  cables: false,
  pipelines: false,
  hotspots: true,
  ais: false,
  nuclear: true,
  irradiators: false,
  sanctions: true,
  weather: true,
  economic: true,
  waterways: true,
  outages: true,
  datacenters: false,
  protests: false,
  flights: false,
  military: false,
  natural: true,
  spaceports: false,
  minerals: false,
  fires: false,
  ucdpEvents: false,
  displacement: false,
  climate: false,
  // Tech layers (disabled in full variant)
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHqs: false,
  techEvents: false,
};

// Mobile-specific defaults for geopolitical
export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = {
  conflicts: true,
  bases: false,
  cables: false,
  pipelines: false,
  hotspots: true,
  ais: false,
  nuclear: false,
  irradiators: false,
  sanctions: true,
  weather: true,
  economic: false,
  waterways: false,
  outages: true,
  datacenters: false,
  protests: false,
  flights: false,
  military: false,
  natural: true,
  spaceports: false,
  minerals: false,
  fires: false,
  ucdpEvents: false,
  displacement: false,
  climate: false,
  // Tech layers (disabled in full variant)
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHqs: false,
  techEvents: false,
};

export const VARIANT_CONFIG: VariantConfig = {
  name: 'full',
  description: '全球地缘政治与安全态势感知平台',
  panels: DEFAULT_PANELS,
  mapLayers: DEFAULT_MAP_LAYERS,
  mobileMapLayers: MOBILE_DEFAULT_MAP_LAYERS,
};
