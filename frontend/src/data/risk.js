export const RISK_OVERVIEW = {
  score: 62,              // 0 - 100
  level: "MEDIUM",        // LOW, MEDIUM, HIGH, CRITICAL
  targetProduction: 10000,
  predictedProduction: 9300,
  expectedShortfall: 700,
  confidence: 89,
  mineId: "BALAGHAT-01",
  evaluationTimestamp: "2026-09-05 14:30 IST",
  summary: "Moderate operational shortfall driven primarily by unscheduled excavator hydraulic downtime and rain-softened haul ramp traction."
};

export const RISK_CONTRIBUTORS = [
  {
    name: "Equipment Downtime",
    value: "14 hrs",
    riskPoints: 22,
    severity: "HIGH",
    category: "Equipment",
    description: "EX-017 hydraulic failure in Stope B4 (6.5 hrs) is the single largest production loss driver."
  },
  {
    name: "Rainfall Accumulation",
    value: "42 mm",
    riskPoints: 16,
    severity: "HIGH",
    category: "Weather",
    description: "Surface precipitation degrades deep pit haul road traction and mandates slower tram speeds."
  },
  {
    name: "Equipment Availability",
    value: "84%",
    riskPoints: 12,
    severity: "MEDIUM",
    category: "Equipment",
    description: "Fleet availability currently 6 points below the operational target threshold of 90%."
  },
  {
    name: "Soil Moisture Index",
    value: "61%",
    riskPoints: 10,
    severity: "MEDIUM",
    category: "Weather",
    description: "High saturation increases overburden sloughing risks along temporary loading benches."
  },
  {
    name: "Drilling Delay",
    value: "2.0 hrs",
    riskPoints: 7,
    severity: "MEDIUM",
    category: "Operations",
    description: "Twin-boom drill rig rod change delay deferred blast-hole completion in Block 7."
  },
  {
    name: "Maintenance Hours",
    value: "6.0 hrs",
    riskPoints: 6,
    severity: "MEDIUM",
    category: "Equipment",
    description: "Concurrent preventative maintenance on crusher mantle and tipper gearboxes."
  },
  {
    name: "Blast Delay",
    value: "1.0 hr",
    riskPoints: 5,
    severity: "LOW",
    category: "Operations",
    description: "Extended post-blast noxious gas clearance and bench safety verification."
  },
  {
    name: "Haulage Truck Count",
    value: "27 / 30",
    riskPoints: 4,
    severity: "LOW",
    category: "Fleet",
    description: "3 trucks temporarily unallocated; buffer capacity is constrained but active."
  },
  {
    name: "Ambient Temperature",
    value: "31°C",
    riskPoints: 1,
    severity: "NORMAL",
    category: "Environment",
    description: "Thermal conditions remain within standard mining specifications."
  }
];

export const SEVEN_DAY_RISK_FORECAST = [
  {
    day: "Today (Fri)",
    date: "Sep 05",
    riskLevel: "MEDIUM",
    riskScore: 62,
    target: 10000,
    predictedProduction: 9300,
    expectedShortfall: 700,
    shortfallPct: 7.0,
    primaryConcern: "Excavator downtime + Haul road mud"
  },
  {
    day: "Saturday",
    date: "Sep 06",
    riskLevel: "MEDIUM",
    riskScore: 56,
    target: 10000,
    predictedProduction: 9450,
    expectedShortfall: 550,
    shortfallPct: 5.5,
    primaryConcern: "Residual wetness & crusher maintenance return"
  },
  {
    day: "Sunday",
    date: "Sep 07",
    riskLevel: "LOW",
    riskScore: 28,
    target: 10000,
    predictedProduction: 9780,
    expectedShortfall: 220,
    shortfallPct: 2.2,
    primaryConcern: "Dry surface conditions; peak fleet availability"
  },
  {
    day: "Monday",
    date: "Sep 08",
    riskLevel: "HIGH",
    riskScore: 78,
    target: 10000,
    predictedProduction: 8750,
    expectedShortfall: 1250,
    shortfallPct: 12.5,
    primaryConcern: "Forecast heavy monsoon squall (54mm rain)"
  },
  {
    day: "Tuesday",
    date: "Sep 09",
    riskLevel: "HIGH",
    riskScore: 82,
    target: 10000,
    predictedProduction: 8600,
    expectedShortfall: 1400,
    shortfallPct: 14.0,
    primaryConcern: "Saturated bench slopes & scheduled drill overhaul"
  },
  {
    day: "Wednesday",
    date: "Sep 10",
    riskLevel: "MEDIUM",
    riskScore: 48,
    target: 10000,
    predictedProduction: 9500,
    expectedShortfall: 500,
    shortfallPct: 5.0,
    primaryConcern: "Drainage recovery in progress; normal blasting"
  },
  {
    day: "Thursday",
    date: "Sep 11",
    riskLevel: "LOW",
    riskScore: 24,
    target: 10000,
    predictedProduction: 9850,
    expectedShortfall: 150,
    shortfallPct: 1.5,
    primaryConcern: "Optimal mining window across all sectors"
  }
];
