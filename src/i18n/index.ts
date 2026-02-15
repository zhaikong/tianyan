/**
 * i18n (Internationalization) system for World Monitor
 * Provides translation functionality and language switching
 */

import type { Translations, Language } from './translations';
import {
  translations,
  supportedLanguages,
  LANGUAGE_STORAGE_KEY,
  DEFAULT_LANGUAGE,
} from './translations';

type TranslationKey = keyof Translations;

class I18n {
  private currentLanguage: Language = DEFAULT_LANGUAGE;
  private listeners: Array<(lang: Language) => void> = [];

  constructor() {
    this.loadSavedLanguage();
  }

  /**
   * Initialize the i18n system
   */
  init(): void {
    this.loadSavedLanguage();
    this.applyLanguageToDocument();
  }

  /**
   * Get the current language
   */
  getLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Set the current language
   */
  setLanguage(lang: Language): void {
    if (!supportedLanguages.includes(lang)) {
      console.warn(`[i18n] Unsupported language: ${lang}`);
      return;
    }

    if (this.currentLanguage === lang) return;

    this.currentLanguage = lang;
    this.saveLanguage(lang);
    this.applyLanguageToDocument();
    this.notifyListeners();
  }

  /**
   * Get a translated string by key
   * Supports template strings with simple placeholder replacement
   * @example t('Press key to search', { key: 'Ctrl+K' })
   */
  t(key: TranslationKey, params?: Record<string, string | number>): string {
    const translation = translations[this.currentLanguage][key];

    if (!translation) {
      console.warn(`[i18n] Missing translation for key: ${key}`);
      return key;
    }

    if (params) {
      return this.replacePlaceholders(translation, params);
    }

    return translation;
  }

  /**
   * Check if a translation key exists
   */
  has(key: TranslationKey): boolean {
    return key in translations[this.currentLanguage];
  }

  /**
   * Subscribe to language changes
   */
  onChange(callback: (lang: Language) => void): () => void {
    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): Language[] {
    return [...supportedLanguages];
  }

  /**
   * Load saved language from localStorage
   */
  private loadSavedLanguage(): void {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && supportedLanguages.includes(saved as Language)) {
        this.currentLanguage = saved as Language;
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'zh' && supportedLanguages.includes('zh')) {
          this.currentLanguage = 'zh';
        }
      }
    } catch {
      // Use default if localStorage is not available
      this.currentLanguage = DEFAULT_LANGUAGE;
    }
  }

  /**
   * Save language to localStorage
   */
  private saveLanguage(lang: Language): void {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      console.warn('[i18n] Failed to save language to localStorage');
    }
  }

  /**
   * Apply language to document
   */
  private applyLanguageToDocument(): void {
    document.documentElement.lang = this.currentLanguage;

    // Update document title if needed
    const title = document.querySelector('title');
    if (title && this.currentLanguage === 'zh') {
      title.textContent = 'World Monitor - 全球态势与AI洞察';
    }
  }

  /**
   * Notify all listeners of language change
   */
  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.currentLanguage);
    }
  }

  /**
   * Replace placeholders in translation string
   * Supports {key} syntax
   */
  private replacePlaceholders(str: string, params: Record<string, string | number>): string {
    return str.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key]?.toString() ?? match;
    });
  }
}

// Create singleton instance
export const i18n = new I18n();

// Export convenience function
export const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
  return i18n.t(key, params);
};

export type { TranslationKey, Language };
export { supportedLanguages, translations, Translations };
