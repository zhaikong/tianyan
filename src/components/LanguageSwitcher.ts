/**
 * Language Switcher Component
 * Provides a dropdown for switching between languages
 */

import { i18n, type Language } from '@/i18n';

export class LanguageSwitcher {
  private element: HTMLElement;
  private currentLang: Language;

  constructor() {
    this.currentLang = i18n.getLanguage();
    this.element = this.create();

    // Listen for language changes from other components
    i18n.onChange((lang) => {
      this.currentLang = lang;
      this.updateUI();
    });
  }

  private create(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'language-switcher';

    const select = document.createElement('select');
    select.className = 'language-select';

    // Add language options
    const languages = i18n.getSupportedLanguages();
    languages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang;
      option.textContent = lang === 'en' ? 'English' : '中文';
      if (lang === this.currentLang) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      const newLang = target.value as Language;
      this.setLanguage(newLang);
    });

    container.appendChild(select);
    return container;
  }

  private setLanguage(lang: Language): void {
    i18n.setLanguage(lang);
    // Reload the page to apply all translations
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  private updateUI(): void {
    const select = this.element.querySelector('.language-select') as HTMLSelectElement;
    if (select) {
      select.value = this.currentLang;
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
