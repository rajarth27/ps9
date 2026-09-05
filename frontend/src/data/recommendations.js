export const RECOMMENDATION_TYPES = [
  "All Recommendations",
  "Equipment Redeployment",
  "Maintenance Scheduling",
  "Mine Schedule Adjustment",
  "Blasting Optimization",
  "Drilling Schedule Adjustment",
  "Haulage Fleet Allocation",
  "Weather Preparation",
  "Stockpile Management",
  "Production Prioritization"
];

export const AI_RECOMMENDATIONS = [
  {
    id: "REC-001",
    priority: "HIGH",
    category: "Equipment Redeployment",
    title: "Redeploy High-Availability Excavator EX-021 to Underground Stope B4",
    expectedShortfallMitigation: "320 T / day recovery",
    expectedRecoveryTonnes: 320,
    confidence: 92,
    detectedConditions: [
      "Equipment downtime: HIGH (EX-017 down 6.5 hrs in Stope B4)",
      "Equipment availability: LOW (84% vs 90% target)",
      "Haulage trucks: 24/30 active on lower decline",
      "Rainfall: HIGH (42 mm)",
      "Blast delay: 2.5 hrs cumulative"
    ],
    recommendedActions: [
      "Reposition Tata Hitachi EX1200 (EX-021) from secondary face to Stope B4 immediately.",
      "Assign 4 high-clearance Scania tippers to create continuous haul loop from Level -380m.",
      "Dispatch specialized hydraulic service squad to expediting cylinder replacement on EX-017."
    ],
    operationalImpact: "Recovers approx 320 T/day of high-grade manganese ore, reducing net daily shortfall from 700 T to 380 T.",
    status: "Pending Action",
    createdTime: "10 mins ago"
  },
  {
    id: "REC-002",
    priority: "HIGH",
    category: "Weather Preparation",
    title: "Activate Deep Sump Submersible Pumps & Apply Crushed Dolomite to Haul Ramp",
    expectedShortfallMitigation: "180 T / day throughput protection",
    expectedRecoveryTonnes: 180,
    confidence: 88,
    detectedConditions: [
      "Rainfall: 42 mm recorded; additional 35 mm forecast tomorrow",
      "Soil moisture: 61% (Bench pore pressure elevated)",
      "Truck cycle time: +3.2 min due to ramp slip"
    ],
    recommendedActions: [
      "Deploy auxiliary high-head dewatering pump set #4 in South Sump to maintain haul road clearance.",
      "Spread 40 tonnes of dry crushed dolomite fines on Switchback Curve 4 to restore dumper traction.",
      "Enforce mandatory 25 km/h speed governor on wet gradient descends."
    ],
    operationalImpact: "Prevents further cycle-time inflation and stabilizes haul road throughput against ongoing monsoon precipitation.",
    status: "In Progress",
    createdTime: "25 mins ago"
  },
  {
    id: "REC-003",
    priority: "HIGH",
    category: "Haulage Fleet Allocation",
    title: "Reallocate Haulage Fleet: Shift 3 Trucks to North Highwall Bench 3",
    expectedShortfallMitigation: "150 T / day cycle boost",
    expectedRecoveryTonnes: 150,
    confidence: 91,
    detectedConditions: [
      "Haulage trucks available: 28 / 30",
      "Queue time at Drift C: 4.8 min average",
      "Bench 3 loader idle time: 14% due to truck deficit"
    ],
    recommendedActions: [
      "Reroute TR-012, TR-015, and TR-022 from low-grade waste dump circuit to Bench 3 ore circuit.",
      "Synchronize automated dispatch transponders to alternate between Bench 3 and Level -380m."
    ],
    operationalImpact: "Eliminates loader wait times and boosts highwall ore extraction rate.",
    status: "Pending Action",
    createdTime: "40 mins ago"
  },
  {
    id: "REC-004",
    priority: "MEDIUM",
    category: "Blasting Optimization",
    title: "Reschedule Production Blasting to Shift Changeover Window (17:45 IST)",
    expectedShortfallMitigation: "90 T / day avoidance",
    expectedRecoveryTonnes: 90,
    confidence: 86,
    detectedConditions: [
      "Blast delay: 1.0 hr current",
      "Drilling delay: 2.0 hrs in Block 7",
      "Underground ventilation clear time: 45 min"
    ],
    recommendedActions: [
      "Defer Stope 8 electronic detonation until 17:45 shift turnover to prevent mid-shift operator evacuation.",
      "Complete stem tamping in Block 7 using non-cohesive aggregate to prevent borehole water desensitization."
    ],
    operationalImpact: "Saves 45 minutes of productive haulage uptime during prime daylight mining hours.",
    status: "Scheduled",
    createdTime: "1 hour ago"
  },
  {
    id: "REC-005",
    priority: "MEDIUM",
    category: "Maintenance Scheduling",
    title: "Expedite Jaw Crusher CR-002 Mantle Liner Replacement Before Night Shift",
    expectedShortfallMitigation: "210 T / night shift capacity",
    expectedRecoveryTonnes: 210,
    confidence: 89,
    detectedConditions: [
      "Crusher CR-002 currently at 45% availability (liner overhaul)",
      "Run-of-Mine (ROM) surface stockpile at 82% surge bin capacity",
      "Maintenance hours logged: 3.5 hrs"
    ],
    recommendedActions: [
      "Reinforce mechanical fitters crew with 2 technicians from Central Machine Shop.",
      "Conduct cold-run calibration test by 17:30 IST to prepare for evening production peak."
    ],
    operationalImpact: "Restores 100% crushing throughput before night shift haulage arrival.",
    status: "In Progress",
    createdTime: "1.5 hours ago"
  },
  {
    id: "REC-006",
    priority: "LOW",
    category: "Stockpile Management",
    title: "Blend High-Silica Stockpile S3 with Zone M18 Premium Run-of-Mine",
    expectedShortfallMitigation: "Grade consistency optimization",
    expectedRecoveryTonnes: 0,
    confidence: 94,
    detectedConditions: [
      "Stockpile S3 grade: 28.5% Mn / 11.2% SiO2",
      "Customer specification requirement: >36.0% Mn / <8.0% SiO2"
    ],
    recommendedActions: [
      "Blend in 60:40 ratio with incoming Braunite ore from Zone M18 to achieve standard 37.8% Mn dispatch grade.",
      "Utilize front-end loader LD-008 for selective bench reclaiming."
    ],
    operationalImpact: "Guarantees shipment quality compliance without penalizing contractual billing rates.",
    status: "Pending Action",
    createdTime: "2 hours ago"
  }
];
