export const CURRENT_CONDITIONS = {
  rainfall: 42,            // mm
  soilMoisture: 61,        // %
  temperature: 31,         // °C
  equipmentAvailability: 84, // %
  equipmentDowntime: 14,   // hrs
  equipmentUtilization: 78, // %
  maintenanceHours: 6,     // hrs
  haulageTruckCount: 27,   // count (active out of 30)
  drillingDelay: 2.0,      // hrs
  blastDelay: 1.0,         // hrs
  productionTarget: 10000, // T (Tonnes)
  actualProduction: 9150,  // T
  predictedProduction: 9300, // T
  expectedShortfall: 700,  // T
  shortfallPercentage: 7.0, // %
  riskLevel: "MEDIUM",
  confidence: 89,
  date: "2026-09-05",
  mineId: "BALAGHAT-01"
};

export const OPERATIONAL_FACTOR_INDICATORS = [
  {
    factor: "Equipment Downtime",
    value: "14 hrs",
    impactScore: 28, // % impact on shortfall
    severity: "HIGH",
    detail: "Primary bottleneck: EX-017 hydraulic cylinder failure in Stope B4"
  },
  {
    factor: "Weather (Rainfall)",
    value: "42 mm",
    impactScore: 22,
    severity: "MEDIUM",
    detail: "Sub-surface haul road slipperiness reduced average truck speed by 35%"
  },
  {
    factor: "Equipment Availability",
    value: "84%",
    impactScore: 16,
    severity: "MEDIUM",
    detail: "Below target operational baseline of 90%"
  },
  {
    factor: "Soil Moisture",
    value: "61%",
    impactScore: 12,
    severity: "MEDIUM",
    detail: "High bench moisture caused minor slumping in secondary extraction face"
  },
  {
    factor: "Blast Delay",
    value: "1.0 hr",
    impactScore: 9,
    severity: "LOW",
    detail: "Fume clearance and seismograph safety check extended pre-shift clearance"
  },
  {
    factor: "Haulage Truck Count",
    value: "27 / 30",
    impactScore: 6,
    severity: "LOW",
    detail: "3 trucks undergoing preventative transmission fluid service"
  },
  {
    factor: "Drilling Delay",
    value: "2.0 hrs",
    impactScore: 4,
    severity: "LOW",
    detail: "Drill rod changeover and compressed air manifold pressure stabilization"
  },
  {
    factor: "Temperature",
    value: "31°C",
    impactScore: 3,
    severity: "NORMAL",
    detail: "Optimal thermal profile for underground ventilation fans"
  }
];

export const PRODUCTION_HISTORY = {
  "7d": [
    { date: "Aug 30", target: 10000, actual: 9850, predicted: 9800, shortfall: 150, rainfall: 8, availability: 92 },
    { date: "Aug 31", target: 10000, actual: 9620, predicted: 9650, shortfall: 380, rainfall: 14, availability: 89 },
    { date: "Sep 01", target: 10000, actual: 9400, predicted: 9450, shortfall: 600, rainfall: 28, availability: 86 },
    { date: "Sep 02", target: 10000, actual: 9280, predicted: 9320, shortfall: 720, rainfall: 35, availability: 85 },
    { date: "Sep 03", target: 10000, actual: 9100, predicted: 9180, shortfall: 900, rainfall: 52, availability: 81 },
    { date: "Sep 04", target: 10000, actual: 9120, predicted: 9210, shortfall: 880, rainfall: 48, availability: 82 },
    { date: "Sep 05", target: 10000, actual: 9150, predicted: 9300, shortfall: 700, rainfall: 42, availability: 84 }
  ],
  "30d": [
    { date: "Aug 07", target: 10000, actual: 9920, predicted: 9900, shortfall: 80 },
    { date: "Aug 10", target: 10000, actual: 9810, predicted: 9850, shortfall: 190 },
    { date: "Aug 13", target: 10000, actual: 9650, predicted: 9700, shortfall: 350 },
    { date: "Aug 16", target: 10000, actual: 9400, predicted: 9420, shortfall: 600 },
    { date: "Aug 19", target: 10000, actual: 9300, predicted: 9340, shortfall: 700 },
    { date: "Aug 22", target: 10000, actual: 9750, predicted: 9700, shortfall: 250 },
    { date: "Aug 25", target: 10000, actual: 9880, predicted: 9850, shortfall: 120 },
    { date: "Aug 28", target: 10000, actual: 9720, predicted: 9760, shortfall: 280 },
    { date: "Aug 31", target: 10000, actual: 9620, predicted: 9650, shortfall: 380 },
    { date: "Sep 03", target: 10000, actual: 9100, predicted: 9180, shortfall: 900 },
    { date: "Sep 05", target: 10000, actual: 9150, predicted: 9300, shortfall: 700 }
  ],
  "90d": [
    { date: "Jun W1", target: 70000, actual: 69200, predicted: 69000, shortfall: 800 },
    { date: "Jun W3", target: 70000, actual: 68500, predicted: 68700, shortfall: 1500 },
    { date: "Jul W1", target: 70000, actual: 66100, predicted: 66400, shortfall: 3900 },
    { date: "Jul W3", target: 70000, actual: 64200, predicted: 64800, shortfall: 5800 },
    { date: "Aug W1", target: 70000, actual: 67800, predicted: 67500, shortfall: 2200 },
    { date: "Aug W3", target: 70000, actual: 68200, predicted: 68100, shortfall: 1800 },
    { date: "Sep W1", target: 70000, actual: 64800, predicted: 65200, shortfall: 5200 }
  ]
};
