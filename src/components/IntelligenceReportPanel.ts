import { Panel } from './Panel';
import { i18n } from '@/i18n';
import type { ReportData } from '@/services/report-generator';

export class IntelligenceReportPanel extends Panel {
  private currentType: 'daily' | 'topic' | 'assessment' = 'daily';
  private currentTopic = '';
  private reportData: ReportData | null = null;
  private markdownContent = '';
  private isGenerating = false;

  private reportTypeSelect: HTMLSelectElement | null = null;
  private topicSelect: HTMLSelectElement | null = null;
  private reportContent: HTMLElement | null = null;
  private loadingIndicator: HTMLElement | null = null;

  private static readonly TOPICS = [
    { id: 'military', name: '军事动态', nameEn: 'Military' },
    { id: 'conflict', name: '冲突局势', nameEn: 'Conflicts' },
    { id: 'economy', name: '经济形势', nameEn: 'Economy' },
    { id: 'tech', name: '科技发展', nameEn: 'Technology' },
    { id: 'disaster', name: '自然灾害', nameEn: 'Disasters' },
  ];

  constructor() {
    super({
      id: 'intelligence-report',
      title: i18n.t('Intelligence Report'),
      showCount: false,
      className: 'intelligence-report-panel',
      infoTooltip: `
        <strong>智能情报报告</strong>
        <br>• 每日简报：全球情报摘要
        <br>• 专题报告：特定主题深度分析
        <br>• 态势评估：战略形势评估
        <br>由 MiniMax 大模型生成专业报告
      `,
    });

    this.renderControls();
    this.renderContent();
  }

  private renderControls(): void {
    const controls = document.createElement('div');
    controls.className = 'report-controls';

    // Report type selector
    const typeContainer = document.createElement('div');
    typeContainer.className = 'report-control-group';

    const typeLabel = document.createElement('label');
    typeLabel.textContent = i18n.t('Report Type');
    typeLabel.htmlFor = 'report-type-select';

    this.reportTypeSelect = document.createElement('select');
    this.reportTypeSelect.id = 'report-type-select';
    this.reportTypeSelect.className = 'report-select';

    const options = [
      { value: 'daily', label: i18n.t('Daily Brief') },
      { value: 'topic', label: i18n.t('Topic Report') },
      { value: 'assessment', label: i18n.t('Situation Assessment') },
    ];

    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      this.reportTypeSelect!.appendChild(option);
    });

    this.reportTypeSelect.addEventListener('change', () => {
      this.currentType = this.reportTypeSelect!.value as 'daily' | 'topic' | 'assessment';
      this.toggleTopicSelect();
    });

    typeContainer.appendChild(typeLabel);
    typeContainer.appendChild(this.reportTypeSelect);

    // Topic selector (for topic reports)
    const topicContainer = document.createElement('div');
    topicContainer.className = 'report-control-group topic-group';
    topicContainer.style.display = 'none';

    const topicLabel = document.createElement('label');
    topicLabel.textContent = i18n.t('Topic');
    topicLabel.htmlFor = 'report-topic-select';

    this.topicSelect = document.createElement('select');
    this.topicSelect.id = 'report-topic-select';
    this.topicSelect.className = 'report-select';

    IntelligenceReportPanel.TOPICS.forEach(topic => {
      const option = document.createElement('option');
      option.value = topic.id;
      option.textContent = i18n.getLanguage() === 'zh' ? topic.name : topic.nameEn;
      this.topicSelect!.appendChild(option);
    });

    this.topicSelect.addEventListener('change', () => {
      this.currentTopic = this.topicSelect!.value;
    });

    topicContainer.appendChild(topicLabel);
    topicContainer.appendChild(this.topicSelect);

    // Generate button
    const generateBtn = document.createElement('button');
    generateBtn.className = 'report-btn generate-btn';
    generateBtn.textContent = i18n.t('Generate Report');
    generateBtn.addEventListener('click', () => this.generateReport());

    // Download buttons
    const downloadContainer = document.createElement('div');
    downloadContainer.className = 'download-buttons';
    downloadContainer.style.display = 'none';

    const jsonBtn = document.createElement('button');
    jsonBtn.className = 'report-btn download-btn';
    jsonBtn.textContent = i18n.t('Download JSON');
    jsonBtn.addEventListener('click', () => this.downloadJSON());

    const mdBtn = document.createElement('button');
    mdBtn.className = 'report-btn download-btn';
    mdBtn.textContent = i18n.t('Download Markdown');
    mdBtn.addEventListener('click', () => this.downloadMarkdown());

    downloadContainer.appendChild(jsonBtn);
    downloadContainer.appendChild(mdBtn);

    controls.appendChild(typeContainer);
    controls.appendChild(topicContainer);
    controls.appendChild(generateBtn);
    controls.appendChild(downloadContainer);

    this.element.insertBefore(controls, this.content);

    // Store reference to topic container for toggling
    (this as any).topicContainer = topicContainer;
    (this as any).downloadContainer = downloadContainer;
  }

  private toggleTopicSelect(): void {
    const topicContainer = (this as any).topicContainer as HTMLElement;
    if (topicContainer) {
      topicContainer.style.display = this.currentType === 'topic' ? 'flex' : 'none';
    }
  }

  private renderContent(): void {
    this.reportContent = document.createElement('div');
    this.reportContent.className = 'report-content';

    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.className = 'report-loading';
    this.loadingIndicator.style.display = 'none';
    this.loadingIndicator.innerHTML = `
      <div class="loading-spinner"></div>
      <span>${i18n.t('Generating report...')}</span>
    `;

    this.reportContent.appendChild(this.loadingIndicator);
    this.content.appendChild(this.reportContent);
  }

  private async generateReport(): Promise<void> {
    if (this.isGenerating) return;

    this.isGenerating = true;
    const downloadContainer = (this as any).downloadContainer as HTMLElement;

    // Show loading
    this.loadingIndicator!.style.display = 'flex';
    this.reportContent!.querySelector('.report-body')?.remove();

    try {
      const response = await fetch('/api/intelligence-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: this.currentType,
          topic: this.currentType === 'topic' ? this.currentTopic : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      this.reportData = data.jsonData;
      this.markdownContent = data.markdown || '';

      this.renderReport();

      if (downloadContainer) {
        downloadContainer.style.display = 'flex';
      }
    } catch (error) {
      console.error('[IntelligenceReport] Error generating report:', error);
      this.displayError(error instanceof Error ? error.message : 'Failed to generate report');
    } finally {
      this.isGenerating = false;
      this.loadingIndicator!.style.display = 'none';
    }
  }

  private renderReport(): void {
    // Remove existing report body
    this.reportContent!.querySelector('.report-body')?.remove();

    const body = document.createElement('div');
    body.className = 'report-body';

    if (!this.markdownContent) {
      body.innerHTML = `<p class="no-data">${i18n.t('No data available')}</p>`;
      this.reportContent!.appendChild(body);
      return;
    }

    // Convert markdown-like content to HTML
    body.innerHTML = this.markdownContent
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Wrap in paragraphs
    body.innerHTML = `<p>${body.innerHTML}</p>`;

    // Clean up empty paragraphs
    body.innerHTML = body.innerHTML.replace(/<p>\s*<\/p>/g, '');
    body.innerHTML = body.innerHTML.replace(/<p>\s*<(h[1-3]|ul|ol|li|strong)>/g, '<$1>');
    body.innerHTML = body.innerHTML.replace(/<\/(h[1-3]|ul|ol|li|strong)>\s*<\/p>/g, '</$1>');

    this.reportContent!.appendChild(body);
  }

  private displayError(message: string): void {
    this.reportContent!.querySelector('.report-body')?.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'report-error';
    errorDiv.innerHTML = `
      <p>${i18n.t('Error')}: ${message}</p>
      <button class="report-btn" onclick="location.reload()">${i18n.t('Retry')}</button>
    `;

    const body = document.createElement('div');
    body.className = 'report-body';
    body.appendChild(errorDiv);
    this.reportContent!.appendChild(body);
  }

  private downloadJSON(): void {
    if (!this.reportData) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `intelligence-report-${this.currentType}-${timestamp}.json`;

    const blob = new Blob([JSON.stringify(this.reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private downloadMarkdown(): void {
    if (!this.markdownContent) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `intelligence-report-${this.currentType}-${timestamp}.md`;

    const blob = new Blob([this.markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
