/**
 * Centralized API Service for ManganAI Platform
 * Production version:
 *
 * Vercel → FastAPI/Render → Database / Trained ML Models
 *
 * IMPORTANT:
 * No mock/demo fallback is used.
 */

const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

const LOCAL_API_URL = 'http://127.0.0.1:8001';
const PRODUCTION_API_URL = 'https://ps9-backend.onrender.com';

const DEFAULT_BASE_URL = isLocalHost
  ? LOCAL_API_URL
  : (import.meta.env?.VITE_API_BASE_URL || PRODUCTION_API_URL);

export function getBaseUrl() {
  // Only allow localStorage override during local development.
  if (isLocalHost) {
    const saved = localStorage.getItem('manganai_backend_url');

    if (saved) {
      return saved.replace(/\/$/, '');
    }

    return LOCAL_API_URL;
  }

  // Production ALWAYS uses Vercel environment variable
  // or the Render backend.
  return DEFAULT_BASE_URL.replace(/\/$/, '');
}

export function setBaseUrl(url) {
  if (!isLocalHost) {
    console.warn('[API] Backend URL override is disabled in production.');
    return;
  }

  localStorage.setItem(
    'manganai_backend_url',
    url.replace(/\/$/, '')
  );
}

/**
 * Generic API request
 */
async function safeFetch(endpoint, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  const url = `${getBaseUrl()}${endpoint}`;

  try {
    console.log(`[API] ${options.method || 'GET'} ${url}`);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    if (!response.ok) {
      let detail = '';

      try {
        const errorData = await response.json();
        detail =
          errorData.detail ||
          errorData.message ||
          JSON.stringify(errorData);
      } catch {
        detail = await response.text().catch(() => '');
      }

      throw new Error(
        `Backend error ${response.status}: ${detail || response.statusText}`
      );
    }

    return await response.json();

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        `Backend request timed out after ${timeoutMs / 1000}s`
      );
    }

    throw error;

  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 1. Backend health check
 */
export async function getSystemStatus() {
  const baseUrl = getBaseUrl();

  try {
    let response;

    // Try /health first
    try {
      response = await safeFetch('/health', {}, 5000);
    } catch {
      // Some versions of main.py expose health at "/"
      response = await safeFetch('/', {}, 5000);
    }

    return {
      online: true,
      mode: 'ONLINE',
      message: `FastAPI Backend Connected (${response.engine || 'Active'})`,
      backendUrl: baseUrl,
      version: response.version || '1.0.0'
    };

  } catch (error) {
    console.error('[API] Backend health check failed:', error);

    return {
      online: false,
      mode: 'OFFLINE',
      message: error.message || 'FastAPI Backend Unavailable',
      backendUrl: baseUrl,
      version: 'unknown'
    };
  }
}

/**
 * 2. Get mines
 */
export async function getMines() {
  return await safeFetch('/api/mines');
}

/**
 * 3. Dashboard
 */
export async function getDashboard(
  mineId = 'BALAGHAT-01'
) {
  return await safeFetch(
    `/api/dashboard?mine_id=${encodeURIComponent(mineId)}`
  );
}

/**
 * 4. Exploration zones
 */
export async function getExplorationZones() {
  return await safeFetch('/api/exploration/zones');
}

/**
 * 5. Single exploration zone
 */
export async function getExplorationZone(zoneId) {
  return await safeFetch(
    `/api/exploration/zones/${encodeURIComponent(zoneId)}`
  );
}

/**
 * 6. ML Reserve Prediction
 */
export async function predictReserve(inputs) {
  const normalizedInputs = {
    ...inputs,

    latitude: Number(
      inputs.latitude ?? inputs.lat ?? 21.8710
    ),

    longitude: Number(
      inputs.longitude ?? inputs.lon ?? 80.1830
    ),

    lat: Number(
      inputs.latitude ?? inputs.lat ?? 21.8710
    ),

    lon: Number(
      inputs.longitude ?? inputs.lon ?? 80.1830
    )
  };

  return await safeFetch(
    '/api/ml/predict-reserve',
    {
      method: 'POST',
      body: JSON.stringify(normalizedInputs)
    },
    15000
  );
}

/**
 * 7. Production summary
 */
export async function getProduction(
  mineId = 'BALAGHAT-01'
) {
  return await safeFetch(
    `/api/production?mine_id=${encodeURIComponent(mineId)}`
  );
}

/**
 * 8. Production trends
 */
export async function getProductionTrends(
  timeframe = '7d'
) {
  return await safeFetch(
    `/api/production/trends?timeframe=${encodeURIComponent(timeframe)}`
  );
}

/**
 * 9. REAL ML Production Shortfall Prediction
 *
 * IMPORTANT:
 * There is NO local/demo prediction here.
 *
 * Whatever the backend returns comes from
 * the FastAPI ML pipeline.
 */
export async function predictShortfall(payload) {

  const normalizedPayload = {
    ...payload,

    mine_id:
      payload.mine_id || 'BALAGHAT-01',

    date:
      payload.date ||
      new Date().toISOString().split('T')[0],

    production_target: Number(
      payload.production_target ??
      payload.target_production ??
      payload.productionTarget ??
      10000
    ),

    rainfall: Number(
      payload.rainfall ??
      payload.rainfall_mm ??
      0
    ),

    soil_moisture: Number(
      payload.soil_moisture ??
      payload.soilMoisture ??
      0
    ),

    temperature: Number(
      payload.temperature ?? 0
    ),

    equipment_availability: Number(
      payload.equipment_availability ??
      payload.equipmentAvailability ??
      0
    ),

    equipment_downtime: Number(
      payload.equipment_downtime ??
      payload.equipmentDowntime ??
      0
    ),

    equipment_utilization: Number(
      payload.equipment_utilization ??
      payload.equipmentUtilization ??
      0
    ),

    maintenance_hours: Number(
      payload.maintenance_hours ??
      payload.maintenanceHours ??
      0
    ),

    haulage_truck_count: Number(
      payload.haulage_truck_count ??
      payload.truck_count ??
      payload.haulageTruckCount ??
      0
    ),

    drilling_delay: Number(
      payload.drilling_delay ??
      payload.drillingDelay ??
      0
    ),

    blast_delay: Number(
      payload.blast_delay ??
      payload.blastDelay ??
      0
    )
  };

  console.log(
    '[ML] Sending REAL shortfall prediction request:',
    normalizedPayload
  );

  const result = await safeFetch(
    '/api/ml/predict-shortfall',
    {
      method: 'POST',
      body: JSON.stringify(normalizedPayload)
    },
    20000
  );

  console.log(
    '[ML] REAL shortfall prediction response:',
    result
  );

  return result;
}

/**
 * 10. Equipment
 */
export async function getEquipment(
  mineId = 'BALAGHAT-01'
) {
  return await safeFetch(
    `/api/equipment?mine_id=${encodeURIComponent(mineId)}`
  );
}

/**
 * 11. Haulage
 */
export async function getHaulageData(
  mineId = 'BALAGHAT-01'
) {
  return await safeFetch(
    `/api/haulage?mine_id=${encodeURIComponent(mineId)}`
  );
}

/**
 * 12. Weather
 */
export async function getWeather(
  mineId = 'BALAGHAT-01'
) {
  return await safeFetch(
    `/api/weather?mine_id=${encodeURIComponent(mineId)}`
  );
}

/**
 * 13. Risk
 */
export async function getRisk(
  mineId = 'BALAGHAT-01'
) {
  return await safeFetch(
    `/api/risk?mine_id=${encodeURIComponent(mineId)}`
  );
}

/**
 * 14. Recommendations
 */
export async function getRecommendations(
  mineId = 'BALAGHAT-01'
) {
  return await safeFetch(
    `/api/recommendations?mine_id=${encodeURIComponent(mineId)}`
  );
}