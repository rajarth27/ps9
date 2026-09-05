export const HAULAGE_SUMMARY = {
  totalTrucks: 30,
  activeTrucks: 27,
  availableTrucks: 28,
  downTrucks: 2,
  standbyTrucks: 1,
  averageCycleTimeMin: 19.4,
  averagePayloadTonnes: 34.5,
  fleetAvailabilityPct: 93.3,
  fuelEfficiencyLitersPerHour: 22.8,
  mineId: "BALAGHAT-01"
};

export const HAULAGE_AVAILABILITY_TREND = [
  { shift: "Shift 1 (Aug 30)", available: 29, active: 28, down: 1, target: 28 },
  { shift: "Shift 2 (Aug 31)", available: 29, active: 27, down: 1, target: 28 },
  { shift: "Shift 1 (Sep 01)", available: 28, active: 26, down: 2, target: 28 },
  { shift: "Shift 2 (Sep 02)", available: 27, active: 25, down: 3, target: 28 },
  { shift: "Shift 1 (Sep 03)", available: 26, active: 24, down: 4, target: 28 },
  { shift: "Shift 2 (Sep 04)", available: 27, active: 26, down: 3, target: 28 },
  { shift: "Shift 1 (Sep 05)", available: 28, active: 27, down: 2, target: 28 }
];

export const HAULAGE_ROUTE_METRICS = [
  {
    route: "Deep Pit Level -380m to Primary Crusher",
    distanceKm: 3.4,
    assignedTrucks: 11,
    avgCycleTimeMin: 22.5,
    roadCondition: "Wet / Slipperiness Index 0.68",
    bottleneck: "Switchback Curve 4 grade deceleration"
  },
  {
    route: "North Highwall Bench 3 to Surface Stockpile B",
    distanceKm: 2.1,
    assignedTrucks: 9,
    avgCycleTimeMin: 15.2,
    roadCondition: "Good / Compacted Graded Gravel",
    bottleneck: "None - High throughput"
  },
  {
    route: "Drift C Extraction to Rail Head Loading Siding",
    distanceKm: 4.2,
    assignedTrucks: 7,
    avgCycleTimeMin: 24.0,
    roadCondition: "Moderate / Surface runoff near culvert",
    bottleneck: "Level crossing single-lane dispatch"
  }
];
