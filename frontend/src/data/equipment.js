export const EQUIPMENT_SUMMARY = {
  totalEquipment: 64,
  active: 51,
  maintenance: 8,
  down: 5,
  averageAvailability: 84.2, // %
  averageUtilization: 78.4,  // %
  totalDowntimeHours: 14.2,  // hrs today
  maintenanceHours: 6.5      // hrs today
};

export const EQUIPMENT_TYPES = [
  "All Types",
  "Excavators",
  "Dumpers",
  "Drills",
  "Loaders",
  "Haulage Trucks",
  "Crushers"
];

export const EQUIPMENT_LIST = [
  {
    id: "EX-017",
    type: "Excavators",
    model: "Komatsu PC1250SP Hydraulic Shovel",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "DOWN",
    availability: 0,
    utilization: 0,
    downtimeHours: 6.5,
    maintenanceHours: 4.0,
    lastMaintenance: "2026-08-18",
    location: "Underground Stope B4 (Level -380m)",
    productionImpactTonnes: -450,
    aiRecommendation: "Critical hydraulic cylinder leak detected. Fast-track seal kit dispatch from Central Nagpur Stores. Redeploy EX-021 to face B4 to recover 320 T/day."
  },
  {
    id: "EX-021",
    type: "Excavators",
    model: "Tata Hitachi EX1200-6",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "ACTIVE",
    availability: 96,
    utilization: 82,
    downtimeHours: 0.5,
    maintenanceHours: 0,
    lastMaintenance: "2026-08-29",
    location: "North Highwall Face 3",
    productionImpactTonnes: 520,
    aiRecommendation: "EX-021 has high availability (96%) and can potentially be redeployed to compensate for EX-017 downtime."
  },
  {
    id: "DR-104",
    type: "Drills",
    model: "Atlas Copco Boomer 282 Twin-Boom",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "WARNING",
    availability: 78,
    utilization: 64,
    downtimeHours: 2.0,
    maintenanceHours: 1.5,
    lastMaintenance: "2026-08-22",
    location: "Drift C West Heading",
    productionImpactTonnes: -180,
    aiRecommendation: "Rod feed pressure fluctuating. Water pressure regulator requires descaling during shift changeover."
  },
  {
    id: "LD-008",
    type: "Loaders",
    model: "Caterpillar R1700 Underground LHD",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "ACTIVE",
    availability: 91,
    utilization: 87,
    downtimeHours: 0.8,
    maintenanceHours: 0,
    lastMaintenance: "2026-08-25",
    location: "Ore Transfer Pass 7",
    productionImpactTonnes: 380,
    aiRecommendation: "Operating within optimal parameters. Tire tread depth at 62%, schedule inspection in 14 shifts."
  },
  {
    id: "CR-002",
    type: "Crushers",
    model: "Metso Nordberg C130 Primary Jaw Crusher",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "MAINTENANCE",
    availability: 45,
    utilization: 38,
    downtimeHours: 3.5,
    maintenanceHours: 3.5,
    lastMaintenance: "2026-09-05",
    location: "Surface Processing Complex",
    productionImpactTonnes: -320,
    aiRecommendation: "Scheduled mantle liner replacement in progress (75% completed). Estimated completion at 18:30 IST."
  },
  {
    id: "DM-302",
    type: "Dumpers",
    model: "BEML BH60M Heavy Mining Dumper",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "ACTIVE",
    availability: 88,
    utilization: 81,
    downtimeHours: 1.2,
    maintenanceHours: 0,
    lastMaintenance: "2026-08-27",
    location: "In-Pit Ramp Circuit #2",
    productionImpactTonnes: 260,
    aiRecommendation: "Retarder temperature elevated during heavy grade ascents. Recommend reducing payload by 4% until ambient temps cool."
  },
  {
    id: "TR-014",
    type: "Haulage Trucks",
    model: "Scania G460 Heavy Mining Tipper",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "ACTIVE",
    availability: 94,
    utilization: 89,
    downtimeHours: 0.4,
    maintenanceHours: 0,
    lastMaintenance: "2026-08-30",
    location: "Sub-level decline haul route",
    productionImpactTonnes: 290,
    aiRecommendation: "Optimized cycle time of 18.2 min/trip. Ideal candidate for increased trip cadence."
  },
  {
    id: "TR-019",
    type: "Haulage Trucks",
    model: "Scania G460 Heavy Mining Tipper",
    mineId: "BALAGHAT-01",
    mineName: "Balaghat Mine",
    status: "MAINTENANCE",
    availability: 50,
    utilization: 42,
    downtimeHours: 2.5,
    maintenanceHours: 2.0,
    lastMaintenance: "2026-09-05",
    location: "Central Fleet Workshop Bay 3",
    productionImpactTonnes: -140,
    aiRecommendation: "Rear axle differential fluid replacement underway. Return to duty expected at 17:00 IST."
  }
];
