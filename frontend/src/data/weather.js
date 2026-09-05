export const CURRENT_WEATHER = {
  rainfall: 42,           // mm
  soilMoisture: 61,       // %
  temperature: 31,        // °C
  ndvi: 0.44,             // 0.0 to 1.0 (Normalized Difference Vegetation Index)
  lstTempC: 33.2,         // Land Surface Temperature °C
  humidity: 78,           // %
  windSpeedKmh: 14.5,     // km/h
  atmosphericPressureHpa: 1008, // hPa
  cloudCover: 72,         // %
  dataStatus: "DEMO SATELLITE DERIVED (Sentinel-2 + GPM IMERG Simulated)",
  lastSatellitePass: "2026-09-05 06:42 UTC",
  mineId: "BALAGHAT-01"
};

export const WEATHER_FORECAST = [
  { day: "Today", date: "Sep 05", rainfall: 42, soilMoisture: 61, temp: 31, risk: "MEDIUM", condition: "Heavy Showers" },
  { day: "Tomorrow", date: "Sep 06", rainfall: 35, soilMoisture: 64, temp: 30, risk: "MEDIUM", condition: "Scattered Rain" },
  { day: "Sunday", date: "Sep 07", rainfall: 18, soilMoisture: 58, temp: 32, risk: "LOW", condition: "Partly Cloudy" },
  { day: "Monday", date: "Sep 08", rainfall: 54, soilMoisture: 69, temp: 29, risk: "HIGH", condition: "Thunderstorms" },
  { day: "Tuesday", date: "Sep 09", rainfall: 48, soilMoisture: 72, temp: 28, risk: "HIGH", condition: "Continuous Rain" }
];

export const ENVIRONMENTAL_IMPACTS = [
  {
    parameter: "Rainfall (42 mm)",
    status: "Elevated",
    level: "warning",
    observation: "Recorded rainfall exceeds the normal dry season baseline of <15 mm.",
    operationalConsideration: "High rainfall is frequently associated with increased haul road slipperiness, reduced haulage cycle speeds, and increased sump pump pumping demand in deep bench levels."
  },
  {
    parameter: "Soil Moisture (61%)",
    status: "High Saturation",
    level: "warning",
    observation: "Bench topsoil and overburden formations exhibit high moisture saturation.",
    operationalConsideration: "Elevated pore water pressure can degrade highwall crest stability and impede heavy dumper traction on inclined ramps."
  },
  {
    parameter: "Temperature (31°C)",
    status: "Nominal",
    level: "normal",
    observation: "Surface ambient temperature remains within standard operating thresholds.",
    operationalConsideration: "Cooling air induction for underground ventilation shafts remains efficient with negligible thermal stress on equipment engines."
  },
  {
    parameter: "NDVI Index (0.44)",
    status: "Stable Canopy",
    level: "normal",
    observation: "Vegetation greenness index around lease periphery indicates stable buffer zones.",
    operationalConsideration: "No anomalous vegetation dieback detected; runoff buffers are operating as per environmental mitigation protocols."
  },
  {
    parameter: "Land Surface Temperature (33.2°C)",
    status: "Thermal Scan Normal",
    level: "normal",
    observation: "Thermal infrared satellite scan shows expected surface emission characteristics.",
    operationalConsideration: "No spontaneous coal/shale seam combustion hot-spots observed along exposed waste dumps."
  }
];

export const SATELLITE_LAYERS = [
  { id: "rainfall", name: "GPM Rainfall Accumulation", unit: "mm", color: "#38bdf8", legend: ["0 mm", "25 mm", "50+ mm"] },
  { id: "soil_moisture", name: "SMAP Soil Moisture Index", unit: "%", color: "#0284c7", legend: ["20%", "50%", "80%+"] },
  { id: "ndvi", name: "Sentinel-2 NDVI Vegetation", unit: "index", color: "#10b981", legend: ["0.1 Bare", "0.4 Moderate", "0.8 Dense"] },
  { id: "lst", name: "Landsat-9 Thermal LST", unit: "°C", color: "#f59e0b", legend: ["22°C", "32°C", "42°C+"] },
  { id: "reserve_prob", name: "ManganAI Reserve Heatmap", unit: "prob %", color: "#8b5cf6", legend: ["<40%", "65%", "85%+"] }
];
