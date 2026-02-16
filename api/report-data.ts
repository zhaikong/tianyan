/**
 * Report Data API
 * Provides data for intelligence reports
 * Uses nodejs runtime to avoid edge function limitations
 */

export const config = {
  runtime: 'nodejs',
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
    const now = new Date().toISOString();

    // Fetch data from various endpoints in parallel
    const endpoints = [
      fetch('/api/military-flights').then(r => r.ok ? r.json() : { flights: [] }).catch(() => ({ flights: [] })),
      fetch('/api/military-vessels').then(r => r.ok ? r.json() : { vessels: [] }).catch(() => ({ vessels: [] })),
      fetch('/api/ucdp-events').then(r => r.ok ? r.json() : { data: [] }).catch(() => ({ data: [] })),
      fetch('/api/conflicts').then(r => r.ok ? r.json() : { events: [] }).catch(() => ({ events: [] })),
      fetch('/api/risk-scores').then(r => r.ok ? r.json() : { cii: [] }).catch(() => ({ cii: [] })),
      fetch('/api/earthquakes').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch('/api/eonet').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch('/api/climate-anomalies').then(r => r.ok ? r.json() : { anomalies: [] }).catch(() => ({ anomalies: [] })),
      fetch('/api/fred-data').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch('/api/coingecko').then(r => r.ok ? r.json() : []).catch(() => []),
    ];

    const [militaryFlights, militaryVessels, ucdpEvents, conflicts, riskScores, earthquakes, eonet, climateAnomalies, fredData, cryptoData] = await Promise.allSettled(endpoints);

    const sections: any[] = [];

    // Military Activity Section
    const militaryItems: any[] = [];
    if (militaryFlights.status === 'fulfilled' && militaryFlights.value?.flights) {
      militaryFlights.value.flights.slice(0, 10).forEach((flight: any) => {
        militaryItems.push({
          title: `${flight.callsign || 'Unknown'} - ${flight.originCountry || 'Unknown'}`,
          content: `Type: ${flight.type || 'Unknown'}`,
          source: 'ADS-B Military',
          timestamp: flight.lastSeen || now,
          location: flight.originCountry,
          category: 'Military Flight'
        });
      });
    }
    if (militaryVessels.status === 'fulfilled' && militaryVessels.value?.vessels) {
      militaryVessels.value.vessels.slice(0, 10).forEach((vessel: any) => {
        militaryItems.push({
          title: vessel.name || 'Unknown Vessel',
          content: `Type: ${vessel.type || 'Unknown'}. Flag: ${vessel.flag || 'Unknown'}`,
          source: 'AIS Military',
          timestamp: vessel.lastSeen || now,
          location: vessel.flag,
          category: 'Military Vessel'
        });
      });
    }
    if (militaryItems.length > 0) {
      sections.push({
        title: 'Military Activity',
        items: militaryItems,
        metrics: { totalActivities: militaryItems.length }
      });
    }

    // Conflict Section
    const conflictItems: any[] = [];
    if (ucdpEvents.status === 'fulfilled' && ucdpEvents.value?.data) {
      ucdpEvents.value.data.slice(0, 10).forEach((event: any) => {
        conflictItems.push({
          title: event.conflictName || 'Conflict Event',
          content: `Deaths: ${event.deaths || 0}. Type: ${event.type || 'Unknown'}`,
          source: 'UCDP',
          timestamp: event.date || now,
          location: event.location?.country || 'Unknown',
          category: 'Conflict'
        });
      });
    }
    if (conflictItems.length > 0) {
      sections.push({
        title: 'Conflicts & Geopolitical',
        items: conflictItems,
        metrics: { totalEvents: conflictItems.length }
      });
    }

    // Economic Section
    const economicItems: any[] = [];
    if (fredData.status === 'fulfilled' && fredData.value) {
      (fredData.value as any[]).slice(0, 5).forEach((series: any) => {
        economicItems.push({
          title: series.name || 'Economic Indicator',
          content: `Value: ${series.value || 'N/A'}`,
          source: 'FRED',
          timestamp: series.date || now,
          category: 'Macro'
        });
      });
    }
    if (cryptoData.status === 'fulfilled' && cryptoData.value) {
      (cryptoData.value as any[]).slice(0, 5).forEach((crypto: any) => {
        economicItems.push({
          title: `${crypto.name} (${crypto.symbol})`,
          content: `Price: $${crypto.price?.toLocaleString() || 'N/A'}`,
          source: 'Crypto Markets',
          timestamp: now,
          category: 'Crypto'
        });
      });
    }
    if (economicItems.length > 0) {
      sections.push({
        title: 'Economic Signals',
        items: economicItems,
        metrics: { indicators: economicItems.length }
      });
    }

    // Disaster Section
    const disasterItems: any[] = [];
    if (earthquakes.status === 'fulfilled' && earthquakes.value) {
      (earthquakes.value as any[]).filter((e: any) => (e.magnitude || 0) >= 4).slice(0, 5).forEach((quake: any) => {
        disasterItems.push({
          title: `M${quake.magnitude} Earthquake`,
          content: `Location: ${quake.place || 'Unknown'}`,
          source: 'USGS',
          timestamp: quake.time?.toISOString?.() || now,
          location: quake.place,
          category: 'Earthquake'
        });
      });
    }
    if (eonet.status === 'fulfilled' && eonet.value) {
      (eonet.value as any[]).slice(0, 5).forEach((event: any) => {
        disasterItems.push({
          title: event.title || 'Natural Event',
          content: `Category: ${event.category || 'Unknown'}. Status: ${event.status || 'Unknown'}`,
          source: 'EONET',
          timestamp: event.date || now,
          category: 'Natural Event'
        });
      });
    }
    if (climateAnomalies.status === 'fulfilled' && climateAnomalies.value?.anomalies) {
      climateAnomalies.value.anomalies.slice(0, 5).forEach((anomaly: any) => {
        disasterItems.push({
          title: anomaly.type || 'Climate Anomaly',
          content: `Severity: ${anomaly.severity || 'Unknown'}`,
          source: 'Climate Monitoring',
          timestamp: anomaly.date || now,
          location: anomaly.location,
          category: 'Climate'
        });
      });
    }
    if (disasterItems.length > 0) {
      sections.push({
        title: 'Natural Disasters',
        items: disasterItems,
        metrics: { totalEvents: disasterItems.length }
      });
    }

    // Risk Section
    const riskItems: any[] = [];
    if (riskScores.status === 'fulfilled' && riskScores.value?.cii) {
      riskScores.value.cii.slice(0, 10).forEach((country: any) => {
        riskItems.push({
          title: country.code,
          content: `Score: ${country.score}, Level: ${country.level || 'Unknown'}`,
          source: 'Country Instability Index',
          timestamp: country.lastUpdated || now,
          category: 'Risk'
        });
      });
    }
    if (riskItems.length > 0) {
      sections.push({
        title: 'Country Risk Assessment',
        items: riskItems,
        metrics: { countriesTracked: riskItems.length }
      });
    }

    const reportData = {
      timestamp: now,
      type: type || 'daily',
      topic,
      title: type === 'daily' ? '全球情报每日简报' :
             type === 'topic' ? `${topic || '专题'}分析报告` :
             '全球战略态势评估',
      sections
    };

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
