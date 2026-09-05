/**
 * Centralized API Service for ManganAI Platform
 * Connects to FastAPI backend at http://127.0.0.1:8000
 * Gracefully falls back to realistic mock datasets when FastAPI is unavailable.
 */

import { MOIL_MINES } from '../data/mines';
import { EXPLORATION_ZONES } from '../data/exploration';
import { CURRENT_CONDITIONS, OPERATIONAL_FACTOR_INDICATORS, PRODUCTION_HISTORY } from '../data/production';
import { EQUIPMENT_SUMMARY, EQUIPMENT_LIST } from '../data/equipment';
import { HAULAGE_SUMMARY, HAULAGE_AVAILABILITY_TREND, HAULAGE_ROUTE_METRICS } from '../data/haulage';
import { CURRENT_WEATHER, WEATHER_FORECAST, ENVIRONMENTAL_IMPACTS, SATELLITE_LAYERS } from '../data/weather';
import { RISK_OVERVIEW, RISK_CONTRIBUTORS, SEVEN_DAY_RISK_FORECAST } from '../data/risk';
import { AI_RECOMMENDATIONS } from '../data/recommendations';
import { calculateMLShortfallPrediction, calculateMLReservePrediction } from '../data/predictions';


const DEFAULT_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'https://ps9-backend.onrender.com';
export function getBaseUrl() {
  return localStorage.getItem('manganai_backend_url') || DEFAULT_BASE_URL;
}

export function setBaseUrl(url) {
  localStorage.setItem('manganai_backend_url', url);
}

// Simulated network delay helper for realistic UI responsiveness
const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

// Safe fetch wrapper with timeout
async function safeFetch(endpoint, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${getBaseUrl()}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/**
 * 1. Health check & System Status
 * Automatically tests primary URL and alternative ports (8000, 8001).
 */
export async function getSystemStatus() {
  const candidateUrls = [
    getBaseUrl(),
    'https://ps9-backend.onrender.com',
    'http://127.0.0.1:8001',
    'http://127.0.0.1:8000'
  ];
  const uniqueUrls = [...new Set(candidateUrls)];

  for (const url of uniqueUrls) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`${url}/health`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'healthy') {
          // If a different port answered, adopt it
          if (url !== getBaseUrl() && !localStorage.getItem('manganai_backend_url')) {
            setBaseUrl(url);
          }
          return {
            online: true,
            mode: 'ONLINE',
            message: `FastAPI Backend Connected (${data.engine || 'Active'})`,
            backendUrl: url,
            version: data.version || '1.0.0'
          };
        }
      }
    } catch {
      // Continue checking next candidate
    }
  }

  return {
    online: false,
    mode: 'DEMO',
    message: 'Running in High-Fidelity Demo Mode (FastAPI Offline)',
    backendUrl: getBaseUrl(),
    version: '1.0.0-mock'
  };
}

/**
 * 2. Get list of all MOIL mines
 */
export async function getMines() {
  try {
    return await safeFetch('/api/mines');
  } catch {
    await delay(150);
    return MOIL_MINES;
  }
}

/**
 * 3. Get comprehensive dashboard payload for a specific mine
 */
export async function getDashboard(mineId = 'BALAGHAT-01') {
  try {
    return await safeFetch(`/api/dashboard?mine_id=${mineId}`);
  } catch {
    await delay(200);
    const mine = MOIL_MINES.find(m => m.id === mineId) || MOIL_MINES[0];
    return {
      mine,
      kpis: {
        estimatedReserveMT: mine.reserveMT,
        todayProductionTonnes: mine.currentProduction,
        predictedProductionTonnes: mine.predictedProduction,
        expectedShortfallTonnes: mine.expectedShortfall,
        shortfallPercentage: mine.shortfallPct,
        overallRisk: mine.riskLevel,
        confidence: mine.confidence
      },
      currentConditions: CURRENT_CONDITIONS,
      factors: OPERATIONAL_FACTOR_INDICATORS,
      history: PRODUCTION_HISTORY['7d'],
      shortfallForecast: {
        expectedShortfall: mine.expectedShortfall,
        risk: mine.riskLevel,
        confidence: mine.confidence,
        concerns: ["Equipment downtime (EX-017)", "Monsoon rainfall runoff", "Blast fume clearance delay"]
      }
    };
  }
}

/**
 * 4. Get Exploration Zones
 */
export async function getExplorationZones() {
  try {
    return await safeFetch('/api/exploration/zones');
  } catch {
    await delay(200);
    return EXPLORATION_ZONES;
  }
}

/**
 * 5. Get details for a single exploration zone
 */
export async function getExplorationZone(zoneId) {
  try {
    return await safeFetch(`/api/exploration/zones/${zoneId}`);
  } catch {
    await delay(150);
    return EXPLORATION_ZONES.find(z => z.id === zoneId) || EXPLORATION_ZONES[0];
  }
}

/**
 * 6. ML Reserve Prediction
 */
export async function predictReserve(inputs) {
  try {
    return await safeFetch('/api/ml/predict-reserve', {
      method: 'POST',
      body: JSON.stringify(inputs)
    });
  } catch {
    await delay(700); // realistic inference calculation time
    return calculateMLReservePrediction(inputs);
  }
}

/**
 * 7. Get Production summary
 */
export async function getProduction(mineId = 'BALAGHAT-01') {
  try {
    return await safeFetch(`/api/production?mine_id=${mineId}`);
  } catch {
    await delay(150);
    return {
      conditions: CURRENT_CONDITIONS,
      factors: OPERATIONAL_FACTOR_INDICATORS
    };
  }
}

/**
 * 8. Get Production Trends (7d, 30d, 90d)
 */
export async function getProductionTrends(timeframe = '7d') {
  try {
    return await safeFetch(`/api/production/trends?timeframe=${timeframe}`);
  } catch {
    await delay(180);
    return PRODUCTION_HISTORY[timeframe] || PRODUCTION_HISTORY['7d'];
  }
}

/**
 * 9. ML Production Shortfall Prediction
 * Takes all 11 required input parameters.
 */
export async function predictShortfall(payload) {
  try {
    return await safeFetch('/api/ml/predict-shortfall', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  } catch {
    await delay(800); // "Analyzing Mining Conditions..."
    return calculateMLShortfallPrediction(payload);
  }
}

/**
 * 10. Get Equipment Fleet telemetry
 */
export async function getEquipment(mineId = 'BALAGHAT-01') {
  try {
    return await safeFetch(`/api/equipment?mine_id=${mineId}`);
  } catch {
    await delay(200);
    return {
      summary: EQUIPMENT_SUMMARY,
      equipment: EQUIPMENT_LIST
    };
  }
}

/**
 * 11. Get Haulage fleet monitoring data
 */
export async function getHaulageData(mineId = 'BALAGHAT-01') {
  try {
    return await safeFetch(`/api/haulage?mine_id=${mineId}`);
  } catch {
    await delay(180);
    return {
      summary: HAULAGE_SUMMARY,
      trends: HAULAGE_AVAILABILITY_TREND,
      routes: HAULAGE_ROUTE_METRICS
    };
  }
}

/**
 * 12. Get Space & Weather satellite data
 */
export async function getWeather(mineId = 'BALAGHAT-01') {
  try {
    return await safeFetch(`/api/weather?mine_id=${mineId}`);
  } catch {
    await delay(200);
    return {
      current: CURRENT_WEATHER,
      forecast: WEATHER_FORECAST,
      impacts: ENVIRONMENTAL_IMPACTS,
      layers: SATELLITE_LAYERS
    };
  }
}

/**
 * 13. Get Risk analysis and 7-day forecast
 */
export async function getRisk(mineId = 'BALAGHAT-01') {
  try {
    return await safeFetch(`/api/risk?mine_id=${mineId}`);
  } catch {
    await delay(200);
    return {
      overview: RISK_OVERVIEW,
      contributors: RISK_CONTRIBUTORS,
      forecast: SEVEN_DAY_RISK_FORECAST
    };
  }
}

/**
 * 14. Get AI Decision Support Recommendations
 */
export async function getRecommendations(mineId = 'BALAGHAT-01') {
  try {
    return await safeFetch(`/api/recommendations?mine_id=${mineId}`);
  } catch {
    await delay(200);
    return AI_RECOMMENDATIONS;
  }
}
