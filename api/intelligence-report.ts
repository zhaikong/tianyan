/**
 * Intelligence Report Generation API
 * Uses MiniMax API to generate professional intelligence reports
 */

export const config = {
  runtime: 'nodejs',
};

const MINIMAX_API_URL = 'https://api.minimax.io/anthropic/v1/messages';
const MODEL = 'abab6.5s-chat';

function convertToMarkdown(data: any, llmContent: string): string {
  const date = new Date(data.timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let markdown = `# ${data.title}\n\n`;
  markdown += `**生成时间**: ${date}\n`;
  markdown += `**报告类型**: ${data.type === 'daily' ? '每日简报' : data.type === 'topic' ? '专题报告' : '态势评估'}\n`;
  if (data.topic) {
    markdown += `**专题**: ${data.topic}\n`;
  }
  markdown += `\n---\n\n`;

  // Add LLM-generated content
  markdown += llmContent;

  // Add data sources section
  markdown += `\n---\n\n## 数据来源\n\n`;
  const sources = new Set<string>();
  data.sections?.forEach((section: any) => {
    section.items?.forEach((item: any) => {
      if (item.source) {
        sources.add(item.source);
      }
    });
  });
  sources.forEach(source => {
    markdown += `- ${source}\n`;
  });

  return markdown;
}

export default async function handler(request: Request): Promise<Response> {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: 'MINIMAX_API_KEY not configured',
      fallback: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { type, topic } = body;

    if (!type || !['daily', 'topic', 'assessment'].includes(type)) {
      return new Response(JSON.stringify({ error: 'Invalid report type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch report data
    let reportData: any;

    try {
      const dataResponse = await fetch('/api/report-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, topic })
      });

      if (dataResponse.ok) {
        reportData = await dataResponse.json();
      } else {
        throw new Error('Data API failed');
      }
    } catch (e) {
      console.warn('[IntelligenceReport] Data API not available, using fallback');
      reportData = {
        timestamp: new Date().toISOString(),
        type,
        topic,
        title: type === 'daily' ? '全球情报每日简报' :
               type === 'topic' ? `${topic || '专题'}分析报告` :
               '全球战略态势评估',
        sections: [
          {
            title: '数据收集中',
            items: [{
              title: '系统正在收集数据',
              content: '请稍候，报告数据正在获取中...',
              source: 'System',
              timestamp: new Date().toISOString()
            }]
          }
        ]
      };
    }

    // Build prompt for MiniMax
    const dateContext = `Current date: ${new Date().toISOString().split('T')[0]}`;

    // Convert report data to a structured format for the LLM
    const sectionsText = reportData.sections?.map((section: any) => {
      const itemsText = section.items?.slice(0, 10).map((item: any) =>
        `- ${item.title}: ${item.content?.substring(0, 150)}${item.location ? ` [${item.location}]` : ''} (${item.source})`
      ).join('\n') || '';

      let sectionStr = `## ${section.title}\n`;
      if (section.metrics) {
        sectionStr += `Metrics: ${JSON.stringify(section.metrics)}\n`;
      }
      sectionStr += itemsText;
      return sectionStr;
    }).join('\n\n') || '';

    let systemPrompt: string;
    let userPrompt: string;

    if (type === 'daily') {
      systemPrompt = `${dateContext}

You are a professional intelligence analyst. Generate a daily intelligence briefing based on the provided data.
Requirements:
- Write in formal intelligence report style
- Lead with the most important developments
- Focus on actionable insights and significant events
- Group related events and provide context
- Highlight any emerging threats or opportunities
- Use professional intelligence terminology
- Keep the report concise but comprehensive
- Format the output as a professional intelligence brief`;

      userPrompt = `Generate a daily intelligence brief from the following data:

${sectionsText}

Please provide a structured daily intelligence brief with:
1. Executive Summary (2-3 sentences)
2. Key Developments (most important events)
3. Regional Analysis
4. Threat Assessment
5. Recommended Attention Areas`;
    } else if (type === 'topic') {
      systemPrompt = `${dateContext}

You are a professional intelligence analyst. Generate a topic-specific analysis report based on the provided data.
Requirements:
- Write in formal analytical style
- Provide deep analysis of the topic
- Include relevant context and background
- Identify trends and patterns
- Provide assessment and implications
- Use professional terminology
- Focus on the specific topic requested`;

      userPrompt = `Generate a topic analysis report on: ${topic || 'General Intelligence'}

From the following data:

${sectionsText}

Please provide:
1. Overview
2. Current Situation
3. Key Developments
4. Risk Factors
5. Trend Analysis
6. Recommendations`;
    } else {
      systemPrompt = `${dateContext}

You are a senior strategic intelligence analyst. Generate a strategic situation assessment based on the provided data.
Requirements:
- Write in formal strategic assessment style
- Evaluate threat levels across regions
- Identify military deployment patterns
- Assess escalation risks
- Provide strategic recommendations
- Use military and strategic terminology
- Be objective and evidence-based`;

      userPrompt = `Generate a strategic situation assessment from the following data:

${sectionsText}

Please provide:
1. Executive Assessment
2. Theater-by-Theater Analysis
3. Threat Level Evaluation
4. Military Deployment Changes
5. Risk Trends
6. Strategic Conclusions`;
    }

    // Call MiniMax API
    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 4000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[IntelligenceReport] MiniMax API error:', response.status, errorText);

      // Return raw data if AI fails
      return new Response(JSON.stringify({
        jsonData: reportData,
        markdown: convertToMarkdown(reportData, '## AI生成报告暂时不可用\n\n请查看下方原始数据。'),
        error: 'AI generation failed',
        fallback: true
      }), {
        status: response.status === 429 ? 429 : 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const llmContent = data.choices?.[0]?.message?.content?.[0]?.text?.trim();

    if (!llmContent) {
      return new Response(JSON.stringify({
        jsonData: reportData,
        markdown: convertToMarkdown(reportData, '## AI生成报告为空\n\n请查看下方原始数据。'),
        error: 'Empty AI response'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert to markdown
    const markdown = convertToMarkdown(reportData, llmContent);

    return new Response(JSON.stringify({
      jsonData: reportData,
      markdown,
      model: MODEL,
      provider: 'minimax',
      cached: false,
      tokens: data.usage?.total_tokens || 0,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=600',
      },
    });

  } catch (error) {
    console.error('[IntelligenceReport] Error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
