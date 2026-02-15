import { t } from '@/i18n';

const STORAGE_KEY = 'mobile-warning-dismissed';

export class MobileWarningModal {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'mobile-warning-overlay';
    this.element.innerHTML = `
      <div class="mobile-warning-modal">
        <div class="mobile-warning-header">
          <span class="mobile-warning-icon">📱</span>
          <span class="mobile-warning-title">${t('Mobile View')}</span>
        </div>
        <div class="mobile-warning-content">
          <p>${t('Mobile device detected')}</p>
          <p>${t('For best experience')}</p>
          <p>${t('Some features may be limited')}</p>
        </div>
        <div class="mobile-warning-footer">
          <label class="mobile-warning-remember">
            <input type="checkbox" id="mobileWarningRemember">
            <span>Don't show again</span>
          </label>
          <button class="mobile-warning-btn">${t('Continue to app')}</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.element);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.element.querySelector('.mobile-warning-btn')?.addEventListener('click', () => {
      this.dismiss();
    });

    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('mobile-warning-overlay')) {
        this.dismiss();
      }
    });
  }

  private dismiss(): void {
    const checkbox = this.element.querySelector('#mobileWarningRemember') as HTMLInputElement;
    if (checkbox?.checked) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    this.hide();
  }

  public show(): void {
    this.element.classList.add('active');
  }

  public hide(): void {
    this.element.classList.remove('active');
  }

  public static shouldShow(): boolean {
    // Check if already dismissed permanently
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      return false;
    }

    // Check if mobile device (screen width < 768px or touch-primary device)
    const isMobileWidth = window.innerWidth < 768;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    return isMobileWidth || isTouchDevice;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
