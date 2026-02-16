/**
 * Report Data API
 * Provides data for intelligence reports
 */

import { fetchDailyBriefData, fetchTopicReportData, fetchAssessmentData, type ReportData } from '@/services/report-generator';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, topic } = await request.json();

    let reportData: ReportData;

    if (type === 'daily') {
      reportData = await fetchDailyBriefData();
    } else if (type === 'topic') {
      reportData = await fetchTopicReportData(topic || 'General');
    } else if (type === 'assessment') {
      reportData = await fetchAssessmentData();
    } else {
      return new Response(JSON.stringify({ error: 'Invalid report type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(reportData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    });

  } catch (error) {
    console.error('[ReportData] Error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
