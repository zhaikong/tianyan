/**
 * Country Intelligence Brief Endpoint
 * Generates AI-powered country situation briefs using MiniMax or Groq
 * Redis cached (2h TTL) for cross-user deduplication
 */

import { getCachedJson, setCachedJson, hashString } from './_upstash-cache.js';

export const config = {
  runtime: 'edge',
};

// Support both MiniMax and Groq
const MINIMAX_API_URL = 'https://api.minimax.io/anthropic/v1/messages';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MINIMAX_MODEL = 'abab6.5s-chat'; // MiniMax M2.5 model
const GROQ_MODEL = 'llama-3.1-8b-instant'; // Groq fallback
const CACHE_TTL_SECONDS = 7200; // 2 hours
const CACHE_VERSION = 'ci-v3'; // Increment to invalidate old caches

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check for MiniMax API key first, fall back to Groq
  const minimaxKey = process.env.MINIMAX_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  if (!minimaxKey && !groqKey) {
    return new Response(JSON.stringify({ brief: null, fallback: true, skipped: true, reason: 'No AI API key configured (MINIMAX_API_KEY or GROQ_API_KEY)' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Prefer MiniMax if available
  const useMiniMax = !!minimaxKey;
  const apiKey = useMiniMax ? minimaxKey : groqKey;
  const apiUrl = useMiniMax ? MINIMAX_API_URL : GROQ_API_URL;
  const model = useMiniMax ? MINIMAX_MODEL : GROQ_MODEL;
  const provider = useMiniMax ? 'minimax' : 'groq';

  try {
    const { country, code, context } = await request.json();

    if (!country || !code) {
      return new Response(JSON.stringify({ error: 'Country and code required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Cache key includes country code + context hash (context changes as data updates)
    const contextHash = context ? hashString(JSON.stringify(context)) : 'no-ctx';
    const cacheKey = `${CACHE_VERSION}:${code}:${contextHash}`;

    const cached = await getCachedJson(cacheKey);
    if (cached && typeof cached === 'object' && cached.brief) {
      console.log('[CountryIntel] Cache hit:', code);
      return new Response(JSON.stringify({ ...cached, cached: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600' },
      });
    }

    // Build data context section
    const dataLines = [];
    if (context?.score != null) {
      const changeStr = context.change24h ? ` (${context.change24h > 0 ? '+' : ''}${context.change24h} in 24h)` : '';
      dataLines.push(`Instability Index: ${context.score}/100 (${context.level || 'unknown'}) — trend: ${context.trend || 'unknown'}${changeStr}`);
    }
    if (context?.components) {
      const c = context.components;
      dataLines.push(`Score Components: Unrest ${c.unrest ?? '?'}/100, Security ${c.security ?? '?'}/100, Information ${c.information ?? '?'}/100`);
    }
    if (context?.protests != null) dataLines.push(`Active protests in/near country (7d): ${context.protests}`);
    if (context?.militaryFlights != null) dataLines.push(`Military aircraft detected in/near country: ${context.militaryFlights}`);
    if (context?.militaryVessels != null) dataLines.push(`Military vessels detected in/near country: ${context.militaryVessels}`);
    if (context?.outages != null) dataLines.push(`Internet outages: ${context.outages}`);
    if (context?.earthquakes != null) dataLines.push(`Recent earthquakes: ${context.earthquakes}`);
    if (context?.stockIndex) dataLines.push(`Stock Index: ${context.stockIndex}`);
    if (context?.convergenceScore != null) {
      dataLines.push(`Signal convergence score: ${context.convergenceScore}/100 (multiple signal types detected: ${(context.signalTypes || []).join(', ')})`);
    }
    if (context?.regionalConvergence?.length > 0) {
      dataLines.push(`\nRegional convergence alerts:`);
      context.regionalConvergence.forEach(r => dataLines.push(`- ${r}`));
    }
    if (context?.headlines?.length > 0) {
      dataLines.push(`\nRecent headlines mentioning ${country} (${context.headlines.length} found):`);
      context.headlines.slice(0, 15).forEach((h, i) => dataLines.push(`${i + 1}. ${h}`));
    }

    const dataSection = dataLines.length > 0
      ? `\n\nCURRENT SENSOR DATA:\n${dataLines.join('\n')}`
      : '\nNo real-time sensor data available for this country.';

    const dateStr = new Date().toISOString().split('T')[0];

    const systemPrompt = `You are a senior intelligence analyst providing comprehensive country situation briefs. Current date: ${dateStr}.

Write a thorough, data-driven intelligence brief for the requested country. Structure:

1. **Current Situation** — What is happening right now. Reference specific data: instability scores, protest counts, military presence, outages. Explain what numbers mean in context.
2. **Military & Security Posture** — Analyze military activity in/near country. What forces are present? What does positioning suggest? What are foreign nations doing in this theater?
3. **Key Risk Factors** — What drives instability or stability. Connect dots between different signals (protests + outages = potential crackdown? military buildup + diplomatic tensions = escalation risk?). Reference specific headlines.
4. **Regional Context** — How does this country's situation affect or relate to its neighbors and broader region? Reference any convergence alerts.
5. **Outlook & Watch Items** — What to monitor in near term. Be specific about indicators that would signal escalation or de-escalation.

Rules:
- Be specific and analytical. Reference data provided (scores, counts, headlines).
- If data shows low activity, say so — don't manufacture threats.
- Connect signals: explain what combinations of data points suggest.
- 5-6 paragraphs, 300-400 words.
- No speculation beyond what data supports.
- Use plain language, no jargon.
- If military assets are 0, don't speculate about military presence — say monitoring shows no current activity.`;

    const userPrompt = `Country: ${country} (${code})${dataSection}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: useMiniMax ? 1500 : 900,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[CountryIntel] ${provider.toUpperCase()} API error:`, response.status, errText);
      return new Response(JSON.stringify({ error: 'AI service unavailable', fallback: true }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const brief = data.choices?.[0]?.message?.content?.[0]?.text?.trim();

    if (!brief) {
      return new Response(JSON.stringify({ error: 'Empty response', fallback: true }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = {
      brief,
      country,
      code,
      model,
      generatedAt: new Date().toISOString(),
    };

    if (brief) {
      await setCachedJson(cacheKey, result, CACHE_TTL_SECONDS);
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600' },
    });
  } catch (err) {
    console.error('[CountryIntel] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
