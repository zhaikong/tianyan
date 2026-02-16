/**
 * Intelligence Report Data Generator
 * Collects various intelligence data for report generation
 */

import { fetchGdeltArticles } from './gdelt-intel';
import { fetchConflictEvents } from './conflicts';
import { fetchClimateAnomalies } from './climate';
import { fetchEarthquakes } from './earthquakes';
import { fetchNaturalEvents } from './eonet';
import { fetchMilitaryFlights } from './military-flights';
import { fetchMilitaryVessels } from './military-vessels';
import { fetchFredData } from './fred';
import { fetchCrypto } from './markets';
import { fetchArxivPapers } from './arxiv';
import { fetchGitHubTrending } from './github-trending';
import { fetchUcdpEvents } from './ucdp-events';
import { fetchCachedRiskScores } from './cached-risk-scores';

export type ReportType = 'daily' | 'topic' | 'assessment';

export interface ReportItem {
  title: string;
  content: string;
  source: string;
  timestamp: string;
  location?: string;
  category?: string;
}

export interface ReportSection {
  title: string;
  items: ReportItem[];
  metrics?: Record<string, number | string>;
}

export interface ReportData {
  timestamp: string;
  type: ReportType;
  topic?: string;
  title: string;
  sections: ReportSection[];
  summary?: string;
}

/**
 * Fetch daily brief data - comprehensive overview of all intelligence
 */
export async function fetchDailyBriefData(): Promise<ReportData> {
  const sections: ReportSection[] = [];
  const now = new Date().toISOString();

  // Fetch all data in parallel
  const [
    conflicts,
    climateAnomalies,
    earthquakes,
    naturalEvents,
    militaryFlights,
    militaryVessels,
    fredData,
    cryptoData,
    ucdpEvents,
    cachedRiskScores
  ] = await Promise.allSettled([
    fetchConflictEvents(),
    fetchClimateAnomalies(),
    fetchEarthquakes(),
    fetchNaturalEvents(),
    fetchMilitaryFlights(),
    fetchMilitaryVessels(),
    fetchFredData(),
    fetchCrypto(),
    fetchUcdpEvents(),
    fetchCachedRiskScores()
  ]);

  // Military Activity Section
  const militaryItems: ReportItem[] = [];

  if (militaryFlights.status === 'fulfilled' && militaryFlights.value) {
    const flights = militaryFlights.value.flights?.slice(0, 10) || [];
    flights.forEach((flight: any) => {
      militaryItems.push({
        title: `${flight.callsign || 'Unknown'} - ${flight.originCountry || 'Unknown'}`,
        content: `Type: ${flight.type || 'Unknown'}. ${flight.verticalSpeed ? `Vertical Speed: ${flight.verticalSpeed}` : ''}`,
        source: 'ADS-B Military',
        timestamp: flight.lastSeen || now,
        location: flight.originCountry,
        category: 'Military Flight'
      });
    });
  }

  if (militaryVessels.status === 'fulfilled' && militaryVessels.value) {
    const vessels = militaryVessels.value.vessels?.slice(0, 10) || [];
    vessels.forEach((vessel: any) => {
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

  // Conflict & Geopolitical Section
  const conflictItems: ReportItem[] = [];

  if (ucdpEvents.status === 'fulfilled' && ucdpEvents.value?.data) {
    const events = ucdpEvents.value.data.slice(0, 10);
    events.forEach((event: any) => {
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

  if (conflicts.status === 'fulfilled' && conflicts.value) {
    const conflictData = conflicts.value;
    conflictData.events?.slice(0, 5).forEach((event: any) => {
      conflictItems.push({
        title: event.country || 'Conflict',
        content: `Type: ${event.eventType || 'Unknown'}. Fatalities: ${event.fatalities || 0}`,
        source: 'ACLED',
        timestamp: event.eventDate || now,
        location: event.country,
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

  // Economic Indicators Section
  const economicItems: ReportItem[] = [];

  if (fredData.status === 'fulfilled' && fredData.value) {
    fredData.value.slice(0, 5).forEach((series: any) => {
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
    cryptoData.value.slice(0, 5).forEach((crypto: any) => {
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

  // Natural Disasters Section
  const disasterItems: ReportItem[] = [];

  if (earthquakes.status === 'fulfilled' && earthquakes.value) {
    earthquakes.value.filter((e: any) => (e.magnitude || 0) >= 4).slice(0, 5).forEach((quake: any) => {
      disasterItems.push({
        title: `M${quake.magnitude} Earthquake`,
        content: `Location: ${quake.place || 'Unknown'}`,
        source: 'USGS',
        timestamp: quake.time?.toISOString() || now,
        location: quake.place,
        category: 'Earthquake'
      });
    });
  }

  if (naturalEvents.status === 'fulfilled' && naturalEvents.value) {
    naturalEvents.value.slice(0, 5).forEach((event: any) => {
      disasterItems.push({
        title: event.title || 'Natural Event',
        content: `Category: ${event.category || 'Unknown'}. Status: ${event.status || 'Unknown'}`,
        source: 'EONET',
        timestamp: event.date?.toISOString() || now,
        location: event.geometry?.[0]?.coordinates ? `${event.geometry[0].coordinates[1]}, ${event.geometry[0].coordinates[0]}` : 'Unknown',
        category: 'Natural Event'
      });
    });
  }

  if (climateAnomalies.status === 'fulfilled' && climateAnomalies.value) {
    const anomalies = climateAnomalies.value.anomalies || [];
    anomalies.slice(0, 5).forEach((anomaly: any) => {
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

  // Country Risk Section
  const riskItems: ReportItem[] = [];

  if (cachedRiskScores.status === 'fulfilled' && cachedRiskScores.value?.cii) {
    const countries = cachedRiskScores.value.cii.slice(0, 10);
    countries.forEach((country: any) => {
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

  return {
    timestamp: now,
    type: 'daily',
    title: 'Global Intelligence Daily Brief',
    sections
  };
}

/**
 * Fetch topic-specific report data
 */
export async function fetchTopicReportData(topic: string): Promise<ReportData> {
  const sections: ReportSection[] = [];
  const now = new Date().toISOString();

  // Map common topics to data sources
  const topicLower = topic.toLowerCase();

  if (topicLower.includes('military') || topicLower.includes('军')) {
    const [flights, vessels] = await Promise.allSettled([
      fetchMilitaryFlights(),
      fetchMilitaryVessels()
    ]);

    const militaryItems: ReportItem[] = [];

    if (flights.status === 'fulfilled' && flights.value) {
      const flightsData = flights.value.flights || [];
      flightsData.slice(0, 10).forEach((flight: any) => {
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

    if (vessels.status === 'fulfilled' && vessels.value) {
      const vesselsData = vessels.value.vessels || [];
      vesselsData.slice(0, 10).forEach((vessel: any) => {
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

    sections.push({
      title: 'Military Activity',
      items: militaryItems,
      metrics: { totalActivities: militaryItems.length }
    });
  }

  if (topicLower.includes('conflict') || topicLower.includes('冲突') || topicLower.includes('war')) {
    const [conflicts, ucdpEvents] = await Promise.allSettled([
      fetchConflictEvents(),
      fetchUcdpEvents()
    ]);

    const conflictItems: ReportItem[] = [];

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

    if (conflicts.status === 'fulfilled' && conflicts.value) {
      const conflictData = conflicts.value;
      conflictData.events?.slice(0, 5).forEach((event: any) => {
        conflictItems.push({
          title: event.country || 'Conflict',
          content: `Type: ${event.eventType || 'Unknown'}. Fatalities: ${event.fatalities || 0}`,
          source: 'ACLED',
          timestamp: event.eventDate || now,
          location: event.country,
          category: 'Conflict'
        });
      });
    }

    sections.push({
      title: 'Conflict Events',
      items: conflictItems,
      metrics: { totalEvents: conflictItems.length }
    });
  }

  if (topicLower.includes('econom') || topicLower.includes('经济') || topicLower.includes('market')) {
    const [fredData, cryptoData] = await Promise.allSettled([
      fetchFredData(),
      fetchCrypto()
    ]);

    const economicItems: ReportItem[] = [];

    if (fredData.status === 'fulfilled' && fredData.value) {
      fredData.value.slice(0, 10).forEach((series: any) => {
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
      cryptoData.value.slice(0, 10).forEach((crypto: any) => {
        economicItems.push({
          title: `${crypto.name} (${crypto.symbol})`,
          content: `Price: $${crypto.price?.toLocaleString() || 'N/A'}`,
          source: 'Crypto Markets',
          timestamp: now,
          category: 'Crypto'
        });
      });
    }

    sections.push({
      title: 'Economic Indicators',
      items: economicItems,
      metrics: { indicators: economicItems.length }
    });
  }

  if (topicLower.includes('tech') || topicLower.includes('科技') || topicLower.includes('ai')) {
    const [papers, repos] = await Promise.allSettled([
      fetchArxivPapers('cs.AI', 10),
      fetchGitHubTrending('all', 'daily')
    ]);

    const techItems: ReportItem[] = [];

    if (papers.status === 'fulfilled' && papers.value) {
      papers.value.slice(0, 5).forEach((paper: any) => {
        techItems.push({
          title: paper.title || 'Research Paper',
          content: paper.summary?.substring(0, 200) || '',
          source: 'arXiv',
          timestamp: paper.published || now,
          category: 'Research'
        });
      });
    }

    if (repos.status === 'fulfilled' && repos.value) {
      repos.value.slice(0, 5).forEach((repo: any) => {
        techItems.push({
          title: repo.name || 'GitHub Repo',
          content: `${repo.description || ''} - Stars: ${repo.stars}`,
          source: 'GitHub',
          timestamp: now,
          category: 'Open Source'
        });
      });
    }

    sections.push({
      title: 'Technology Developments',
      items: techItems,
      metrics: { items: techItems.length }
    });
  }

  if (topicLower.includes('disaster') || topicLower.includes('灾难') || topicLower.includes('earthquake')) {
    const [earthquakes, naturalEvents, climateAnomalies] = await Promise.allSettled([
      fetchEarthquakes(),
      fetchNaturalEvents(),
      fetchClimateAnomalies()
    ]);

    const disasterItems: ReportItem[] = [];

    if (earthquakes.status === 'fulfilled' && earthquakes.value) {
      earthquakes.value.filter((e: any) => (e.magnitude || 0) >= 3).slice(0, 5).forEach((quake: any) => {
        disasterItems.push({
          title: `M${quake.magnitude} Earthquake`,
          content: `Location: ${quake.place || 'Unknown'}`,
          source: 'USGS',
          timestamp: quake.time?.toISOString() || now,
          location: quake.place,
          category: 'Earthquake'
        });
      });
    }

    if (naturalEvents.status === 'fulfilled' && naturalEvents.value) {
      naturalEvents.value.slice(0, 5).forEach((event: any) => {
        disasterItems.push({
          title: event.title || 'Natural Event',
          content: `Category: ${event.category || 'Unknown'}. Status: ${event.status || 'Unknown'}`,
          source: 'EONET',
          timestamp: event.date?.toISOString() || now,
          category: 'Natural Event'
        });
      });
    }

    if (climateAnomalies.status === 'fulfilled' && climateAnomalies.value) {
      const anomalies = climateAnomalies.value.anomalies || [];
      anomalies.slice(0, 5).forEach((anomaly: any) => {
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

    sections.push({
      title: 'Natural Disasters',
      items: disasterItems,
      metrics: { totalEvents: disasterItems.length }
    });
  }

  // Default: fetch general intelligence
  if (sections.length === 0) {
    const articles = await fetchGdeltArticles('technology', 20);
    const articleItems = articles.slice(0, 15).map((article: any) => ({
      title: article.title || 'Article',
      content: article.summary?.substring(0, 300) || article.content?.substring(0, 300) || '',
      source: article.source || 'News',
      timestamp: article.publishedDate || now,
      location: article.country,
      category: 'News'
    }));

    sections.push({
      title: 'Latest Intelligence',
      items: articleItems,
      metrics: { totalArticles: articleItems.length }
    });
  }

  return {
    timestamp: now,
    type: 'topic',
    topic,
    title: `${topic} Analysis Report`,
    sections
  };
}

/**
 * Fetch strategic assessment data
 */
export async function fetchAssessmentData(): Promise<ReportData> {
  const sections: ReportSection[] = [];
  const now = new Date().toISOString();

  const [
    conflicts,
    militaryFlights,
    militaryVessels,
    cachedRiskScores,
    ucdpEvents
  ] = await Promise.allSettled([
    fetchConflictEvents(),
    fetchMilitaryFlights(),
    fetchMilitaryVessels(),
    fetchCachedRiskScores(),
    fetchUcdpEvents()
  ]);

  // Theater Posture Assessment
  const theaterItems: ReportItem[] = [];

  if (militaryFlights.status === 'fulfilled' && militaryFlights.value) {
    const flights = militaryFlights.value.flights || [];
    const byCountry = new Map<string, number>();
    flights.forEach((flight: any) => {
      const country = flight.originCountry || 'Unknown';
      byCountry.set(country, (byCountry.get(country) || 0) + 1);
    });

    byCountry.forEach((count, country) => {
      theaterItems.push({
        title: country,
        content: `${count} military flights detected`,
        source: 'ADS-B Military',
        timestamp: now,
        location: country,
        category: 'Air Activity'
      });
    });
  }

  if (militaryVessels.status === 'fulfilled' && militaryVessels.value) {
    const vessels = militaryVessels.value.vessels || [];
    const byFlag = new Map<string, number>();
    vessels.forEach((vessel: any) => {
      const flag = vessel.flag || 'Unknown';
      byFlag.set(flag, (byFlag.get(flag) || 0) + 1);
    });

    byFlag.forEach((count, flag) => {
      theaterItems.push({
        title: flag,
        content: `${count} military vessels detected`,
        source: 'AIS Military',
        timestamp: now,
        location: flag,
        category: 'Naval Activity'
      });
    });
  }

  sections.push({
    title: 'Theater Posture',
    items: theaterItems,
    metrics: { totalActivities: theaterItems.length }
  });

  // Threat Assessment
  const threatItems: ReportItem[] = [];

  if (cachedRiskScores.status === 'fulfilled' && cachedRiskScores.value?.cii) {
    const highRisk = cachedRiskScores.value.cii
      .filter((c: any) => c.level === 'critical' || c.level === 'high')
      .slice(0, 10);

    highRisk.forEach((country: any) => {
      threatItems.push({
        title: country.code,
        content: `Risk Score: ${country.score}. Level: ${country.level || 'Unknown'}`,
        source: 'Country Instability Index',
        timestamp: country.lastUpdated || now,
        category: 'Risk'
      });
    });
  }

  if (ucdpEvents.status === 'fulfilled' && ucdpEvents.value?.data) {
    const recentHighFatality = ucdpEvents.value.data
      .filter((e: any) => (e.deaths || 0) >= 10)
      .slice(0, 5);

    recentHighFatality.forEach((event: any) => {
      threatItems.push({
        title: event.conflictName || 'Conflict',
        content: `Deaths: ${event.deaths || 0}. Location: ${event.location?.country || 'Unknown'}`,
        source: 'UCDP',
        timestamp: event.date || now,
        location: event.location?.country,
        category: 'Conflict'
      });
    });
  }

  sections.push({
    title: 'Threat Assessment',
    items: threatItems,
    metrics: { highRiskCount: threatItems.length }
  });

  // Military Deployment Changes
  const deploymentItems: ReportItem[] = [];

  if (conflicts.status === 'fulfilled' && conflicts.value) {
    const conflictData = conflicts.value;
    conflictData.events?.slice(0, 5).forEach((event: any) => {
      deploymentItems.push({
        title: event.country || 'Conflict',
        content: `Type: ${event.eventType || 'Unknown'}. Fatalities: ${event.fatalities || 0}`,
        source: 'ACLED',
        timestamp: event.eventDate || now,
        location: event.country,
        category: 'Conflict'
      });
    });
  }

  sections.push({
    title: 'Military Deployment Changes',
    items: deploymentItems,
    metrics: { hotspotsTracked: deploymentItems.length }
  });

  // Risk Trends
  const trendItems: ReportItem[] = [];

  if (ucdpEvents.status === 'fulfilled' && ucdpEvents.value?.data) {
    const eventTypes = new Map<string, number>();
    ucdpEvents.value.data.forEach((event: any) => {
      const type = event.type || 'Unknown';
      eventTypes.set(type, (eventTypes.get(type) || 0) + 1);
    });

    eventTypes.forEach((count, type) => {
      trendItems.push({
        title: type,
        content: `${count} events`,
        source: 'UCDP',
        timestamp: now,
        category: 'Trend'
      });
    });
  }

  sections.push({
    title: 'Risk Trends',
    items: trendItems,
    metrics: { eventTypes: trendItems.length }
  });

  return {
    timestamp: now,
    type: 'assessment',
    title: 'Global Strategic Situation Assessment',
    sections
  };
}
