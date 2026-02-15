/**
 * Runtime Configuration for Desktop App
 * Handles feature toggles and API secrets
 */

import { isDesktopRuntime } from './runtime';
import { invokeTauri } from './tauri-bridge';

export type RuntimeSecretKey =
  | 'GROQ_API_KEY'
  | 'OPENROUTER_API_KEY'
  | 'MINIMAX_API_KEY'
  | 'FRED_API_KEY'
  | 'EIA_API_KEY'
  | 'CLOUDFLARE_API_TOKEN'
  | 'ACLED_ACCESS_TOKEN'
  | 'WINGBITS_API_KEY'
  | 'AIS_API_KEY'
  | 'OPENSKY_RELAY_URL'
  | 'OPENSKY_CLIENT_ID'
  | 'OPENSKY_CLIENT_SECRET';

export type RuntimeFeatureId =
  | 'aiGroq'
  | 'aiOpenRouter'
  | 'aiMiniMax'
  | 'economicFred'
  | 'energyEia'
  | 'internetOutages'
  | 'acledConflicts'
  | 'wingbitsEnrichment'
  | 'aisRelay'
  | 'openskyRelay'
  | 'openskyClientId'
  | 'openskyClientSecret';

export interface RuntimeFeatureDefinition {
  id: RuntimeFeatureId;
  name: string;
  description: string;
  requiredSecrets: RuntimeSecretKey[];
  fallback: string;
}

export interface RuntimeSecretState {
  value: string;
  source: 'env' | 'vault' | 'missing';
}

export interface RuntimeConfig {
  featureToggles: Record<RuntimeFeatureId, boolean>;
  secrets: Partial<Record<RuntimeSecretKey, RuntimeSecretState>>;
}

const TOGGLES_STORAGE_KEY = 'worldmonitor-runtime-feature-toggles';

const DEFAULT_FEATURE_TOGGLES: Record<RuntimeFeatureId, boolean> = {
  aiGroq: true,
  aiOpenRouter: true,
  aiMiniMax: true,
  economicFred: true,
  energyEia: true,
  internetOutages: true,
  acledConflicts: true,
  wingbitsEnrichment: true,
  aisRelay: true,
  openskyRelay: true,
  openskyClientId: false,
  openskyClientSecret: false,
};

const SIGNUP_URLS: Partial<Record<RuntimeSecretKey, string>> = {
  GROQ_API_KEY: 'https://console.groq.com/keys',
  OPENROUTER_API_KEY: 'https://openrouter.ai/settings/keys',
  MINIMAX_API_KEY: 'https://api.minimax.io/anthropic',
  FRED_API_KEY: 'https://fred.stlouisfed.org/docs/api/api_key.html',
  EIA_API_KEY: 'https://www.eia.gov/opendata/register.php',
  CLOUDFLARE_API_TOKEN: 'https://dash.cloudflare.com/profile/api-tokens',
  ACLED_ACCESS_TOKEN: 'https://developer.acleddata.com/',
  WINGBITS_API_KEY: 'https://wingbits.com/register',
  AIS_API_KEY: 'https://stream.ais-stream.io/authenticate',
  OPENSKY_RELAY_URL: 'https://opensky-network.org/api/recovery/tokens',
  OPENSKY_CLIENT_ID: 'https://opensky-network.org/login?view=registration',
  OPENSKY_CLIENT_SECRET: 'https://opensky-network.org/login?view=registration',
};

export const RUNTIME_FEATURES: RuntimeFeatureDefinition[] = [
  {
    id: 'aiGroq',
    name: 'Groq summarization',
    description: 'Primary fast LLM provider used for AI summary generation',
    requiredSecrets: ['GROQ_API_KEY'],
    fallback: 'Falls back to OpenRouter, then local browser model',
  },
  {
    id: 'aiOpenRouter',
    name: 'OpenRouter summarization',
    description: 'Secondary LLM provider for AI summary generation',
    requiredSecrets: ['OPENROUTER_API_KEY'],
    fallback: 'Falls back to local browser model',
  },
  {
    id: 'aiMiniMax',
    name: 'MiniMax M2.5 summarization',
    description: 'MiniMax M2.5 model via Anthropic-compatible API for AI summary generation',
    requiredSecrets: ['MINIMAX_API_KEY'],
    fallback: 'Falls back to Groq',
  },
  {
    id: 'economicFred',
    name: 'FRED Economic indicators',
    description: 'Macroeconomic indicators from Federal Reserve Economic Data',
    requiredSecrets: ['FRED_API_KEY'],
    fallback: 'Economic panel remains available with non-FRED metrics',
  },
  {
    id: 'energyEia',
    name: 'EIA oil analytics',
    description: 'US Energy Information Administration oil metrics',
    requiredSecrets: ['EIA_API_KEY'],
    fallback: 'Oil analytics cards show disabled state',
  },
  {
    id: 'internetOutages',
    name: 'Cloudflare outage radar',
    description: 'Internet outage detection from Cloudflare Radar annotations API',
    requiredSecrets: ['CLOUDFLARE_API_TOKEN'],
    fallback: 'Outage layer is disabled and map continues with other feeds',
  },
  {
    id: 'acledConflicts',
    name: 'ACLED conflicts & protests',
    description: 'Armed Conflict Location & Event Data',
    requiredSecrets: ['ACLED_ACCESS_TOKEN'],
    fallback: 'Conflicts/protests overlays show disabled state',
  },
  {
    id: 'wingbitsEnrichment',
    name: 'Wingbits military aircraft enrichment',
    description: 'Military flight operator/aircraft metadata from Wingbits relay',
    requiredSecrets: ['WINGBITS_API_KEY'],
    fallback: 'Flight map renders with heuristic-only classification',
  },
  {
    id: 'aisRelay',
    name: 'AIS vessel relay',
    description: 'Live vessel tracking from AIS stream via relay endpoint',
    requiredSecrets: ['AIS_API_KEY', 'WS_RELAY_URL'],
    fallback: 'AIS layer is disabled',
  },
  {
    id: 'openskyRelay',
    name: 'OpenSky military flights',
    description: 'OpenSky Network military flight API',
    requiredSecrets: ['OPENSKY_RELAY_URL'],
    fallback: 'Flight map renders with ADS-B exchange data only',
  },
  {
    id: 'openskyClientId',
    name: 'OpenSky OAuth client ID',
    description: 'OpenSky Network OAuth client credentials',
    requiredSecrets: ['OPENSKY_CLIENT_ID'],
    fallback: 'Cannot authenticate with OpenSky API',
  },
  {
    id: 'openskyClientSecret',
    name: 'OpenSky OAuth client secret',
    description: 'OpenSky Network OAuth client credentials',
    requiredSecrets: ['OPENSKY_CLIENT_SECRET'],
    fallback: 'Cannot authenticate with OpenSky API',
  },
];

const runtimeConfig: RuntimeConfig = {
  featureToggles: readStoredToggles(),
  secrets: {},
};

const listeners = new Set<() => void>();

function readStoredToggles(): Record<RuntimeFeatureId, boolean> {
  try {
    const stored = localStorage.getItem(TOGGLES_STORAGE_KEY);
    if (!stored) return { ...DEFAULT_FEATURE_TOGGLES };
    const parsed = JSON.parse(stored) as Partial<Record<RuntimeFeatureId, boolean>>;
    return { ...DEFAULT_FEATURE_TOGGLES, ...parsed };
  } catch {
    return { ...DEFAULT_FEATURE_TOGGLES };
  }
}

export function subscribeRuntimeConfig(listener: (config: RuntimeConfig) => void): () => void {
  listener(runtimeConfig);
  return () => listeners.delete(listener);
}

function notifyConfigChanged(): void {
  for (const listener of listeners) listener(runtimeConfig);
}

export function readEnvSecret(key: RuntimeSecretKey): string {
  const envKey: Record<RuntimeSecretKey, string> = {
    GROQ_API_KEY: 'GROQ_API_KEY',
    OPENROUTER_API_KEY: 'OPENROUTER_API_KEY',
    MINIMAX_API_KEY: 'MINIMAX_API_KEY',
    FRED_API_KEY: 'FRED_API_KEY',
    EIA_API_KEY: 'EIA_API_KEY',
    CLOUDFLARE_API_TOKEN: 'CLOUDFLARE_API_TOKEN',
    ACLED_ACCESS_TOKEN: 'ACLED_ACCESS_TOKEN',
    WINGBITS_API_KEY: 'WINGBITS_API_KEY',
    AIS_API_KEY: 'AIS_API_KEY',
    OPENSKY_RELAY_URL: 'WS_RELAY_URL',
    OPENSKY_CLIENT_ID: 'VITE_OPENSKY_CLIENT_ID',
    OPENSKY_CLIENT_SECRET: 'VITE_OPENSKY_CLIENT_SECRET',
  };
  const envValue = (import.meta as { env?: Record<string, unknown> }).env?.[envKey[key]];
  return typeof envValue === 'string' ? envValue.trim() : '';
}

export function validateSecretValue(value: string): boolean {
  return value.trim().length >= 8;
}

export function getSecretState(key: RuntimeSecretKey): { present: boolean; valid: boolean; source: RuntimeSecretState['source']; value: string } {
  const state = runtimeConfig.secrets[key];
  const value = readEnvSecret(key);

  if (value && validateSecretValue(value)) {
    return { present: true, valid: true, source: 'env', value };
  }

  if (state?.value && validateSecretValue(state.value)) {
    return { present: true, valid: true, source: 'vault', value: state.value };
  }

  return { present: false, valid: false, source: 'missing', value: '' };
}

export function isFeatureEnabled(featureId: RuntimeFeatureId): boolean {
  if (!isDesktopRuntime()) return true;
  return runtimeConfig.featureToggles[featureId] !== false;
}

export function getRuntimeConfigSnapshot(): RuntimeConfig {
  return { ...runtimeConfig };
}

export function isFeatureAvailable(featureId: RuntimeFeatureId): boolean {
  if (!isFeatureEnabled(featureId)) return false;

  const feature = RUNTIME_FEATURES.find(f => f.id === featureId);
  if (!feature) return false;

  return feature.requiredSecrets.every(secretKey => {
    const state = getSecretState(secretKey);
    return state.present && state.valid;
  });
}

export function setFeatureToggle(featureId: RuntimeFeatureId, enabled: boolean): void {
  runtimeConfig.featureToggles[featureId] = enabled;
  localStorage.setItem(TOGGLES_STORAGE_KEY, JSON.stringify(runtimeConfig.featureToggles));
  notifyConfigChanged();
}

export async function setSecretValue(key: RuntimeSecretKey, value: string): Promise<void> {
  runtimeConfig.secrets[key] = { value, source: 'env' };
  notifyConfigChanged();

  if (!isDesktopRuntime()) {
    console.warn('[runtime-config] Ignoring secret write outside desktop runtime');
    return;
  }

  await invokeTauri<void>('set_secret', { key, value });
}

export async function deleteSecret(key: RuntimeSecretKey): Promise<void> {
  delete runtimeConfig.secrets[key];
  notifyConfigChanged();

  if (!isDesktopRuntime()) {
    console.warn('[runtime-config] Ignoring secret delete outside desktop runtime');
    return;
  }

  await invokeTauri<void>('delete_secret', { key });
}

export function isDesktopRuntime(): boolean {
  return (import.meta as { env?: Record<string, unknown> }).env?.VITE_DESKTOP_RUNTIME === '1';
}

export async function loadDesktopSecrets(): Promise<void> {
  if (!isDesktopRuntime()) return;

  try {
    const keys = await invokeTauri<RuntimeSecretKey[]>('list_supported_secret_keys');

    if (keys && Array.isArray(keys)) {
      for (const key of keys) {
        if (SIGNUP_URLS[key]) {
          const value = await invokeTauri<string>('get_secret', { key });
          if (value && validateSecretValue(value)) {
            runtimeConfig.secrets[key] = { value, source: 'vault' };
          }
        }
      }
    }

    notifyConfigChanged();
  } catch (error) {
    console.warn('[runtime-config] Failed to load desktop secrets from vault', error);
  }
}

export function getApiBaseUrl(): string {
  if (!isDesktopRuntime()) {
    return '';
  }
  const configuredBaseUrl = import.meta.env.VITE_TAURI_API_BASE_URL;
  if (configuredBaseUrl) {
    return normalizeBaseUrl(configuredBaseUrl);
  }
  const variant = import.meta.env.VITE_VARIANT || 'full';
  return DEFAULT_REMOTE_HOSTS[variant] ?? 'https://tianyan.app';
}

export function getRemoteApiBaseUrl(): string {
  const configuredRemoteBase = import.meta.env.VITE_TAURI_REMOTE_API_BASE_URL;
  if (configuredRemoteBase) {
    return normalizeBaseUrl(configuredRemoteBase);
  }
  const variant = import.meta.env.VITE_VARIANT || 'full';
  return DEFAULT_REMOTE_HOSTS[variant] ?? 'https://tianyan.app';
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/$/, '');
}

const DEFAULT_REMOTE_HOSTS: Record<string, string> = {
  full: 'https://tianyan.app',
  tech: 'https://tech.tianyan.app',
};
