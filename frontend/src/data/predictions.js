/**
 * ML Shortfall & Reserve Prediction Models (Client-Side Simulation & Normalization)
 * Matches backend ML feature expectations when FastAPI is running or offline.
 */

export function calculateMLShortfallPrediction(inputs) {
  const {
    rainfall = 42,
    soil_moisture = 61,
    temperature = 31,
    equipment_downtime = 14,
    equipment_availability = 84,
    equipment_utilization = 78,
    maintenance_hours = 6,
    haulage_truck_count = 27,
    drilling_delay = 2,
    blast_delay = 1,
    production_target = 10000,
  } = inputs;

  // Baseline ideal efficiency
  let efficiency = 1.0;

  // Equipment impact (heaviest weighting)
  // Target availability is ~92%. Every 1% below reduces production ~0.4%
  const availDeficit = Math.max(0, 92 - equipment_availability);
  efficiency -= (availDeficit * 0.0055);

  // Downtime impact: 14 hrs normal baseline downtime across fleet
  const excessDowntime = Math.max(0, equipment_downtime - 6);
  efficiency -= (excessDowntime * 0.006);

  // Weather impact: Rainfall > 20mm and Soil Moisture > 50% slows down haulage & extraction
  if (rainfall > 15) {
    efficiency -= ((rainfall - 15) * 0.002);
  }
  if (soil_moisture > 50) {
    efficiency -= ((soil_moisture - 50) * 0.0015);
  }

  // Haulage truck impact: Target 28 trucks
  const truckDeficit = Math.max(0, 28 - haulage_truck_count);
  efficiency -= (truckDeficit * 0.015);

  // Operational delay impacts
  efficiency -= (drilling_delay * 0.012);
  efficiency -= (blast_delay * 0.015);

  // Utilization factor
  const utilFactor = Math.min(1.0, equipment_utilization / 85);
  efficiency *= (0.85 + 0.15 * utilFactor);

  // Clamp efficiency between 0.40 and 1.05
  efficiency = Math.max(0.40, Math.min(1.05, efficiency));

  // Compute metrics
  const target = Number(production_target) || 10000;
  const predicted_production = Math.round(target * efficiency);
  const expected_shortfall = Math.max(0, target - predicted_production);
  const shortfall_percentage = Number(((expected_shortfall / target) * 100).toFixed(1));

  // Determine Risk Level
  let risk_level = "LOW";
  if (shortfall_percentage >= 15) {
    risk_level = "CRITICAL";
  } else if (shortfall_percentage >= 10) {
    risk_level = "HIGH";
  } else if (shortfall_percentage >= 5) {
    risk_level = "MEDIUM";
  }

  // Model Confidence score (slightly declines with extreme anomalous conditions)
  let confidence = 92;
  if (rainfall > 60 || equipment_downtime > 25) confidence -= 5;
  if (blast_delay > 4) confidence -= 3;
  confidence = Math.max(76, confidence);

  // Calculate contributing conditions / operational factor breakdown
  const factors = [
    {
      factor: "Equipment Downtime",
      value: `${equipment_downtime} hrs`,
      impactScore: Math.min(45, Math.round(excessDowntime * 2.5 + 10)),
      severity: excessDowntime > 8 ? "HIGH" : excessDowntime > 3 ? "MEDIUM" : "LOW",
      category: "Equipment"
    },
    {
      factor: "Weather (Rainfall)",
      value: `${rainfall} mm`,
      impactScore: Math.min(35, Math.round(rainfall * 0.45)),
      severity: rainfall > 40 ? "HIGH" : rainfall > 20 ? "MEDIUM" : "NORMAL",
      category: "Environment"
    },
    {
      factor: "Equipment Availability",
      value: `${equipment_availability}%`,
      impactScore: Math.min(30, Math.round(availDeficit * 1.8 + 8)),
      severity: equipment_availability < 80 ? "HIGH" : equipment_availability < 88 ? "MEDIUM" : "LOW",
      category: "Equipment"
    },
    {
      factor: "Soil Moisture",
      value: `${soil_moisture}%`,
      impactScore: Math.min(25, Math.round(soil_moisture * 0.2)),
      severity: soil_moisture > 65 ? "HIGH" : soil_moisture > 50 ? "MEDIUM" : "LOW",
      category: "Environment"
    },
    {
      factor: "Haulage Truck Count",
      value: `${haulage_truck_count} units`,
      impactScore: Math.min(25, Math.round(truckDeficit * 4.5 + 4)),
      severity: haulage_truck_count < 24 ? "HIGH" : haulage_truck_count < 27 ? "MEDIUM" : "LOW",
      category: "Fleet"
    },
    {
      factor: "Drilling Delay",
      value: `${drilling_delay} hrs`,
      impactScore: Math.min(20, Math.round(drilling_delay * 3.5)),
      severity: drilling_delay > 3 ? "HIGH" : drilling_delay > 1 ? "MEDIUM" : "LOW",
      category: "Operations"
    },
    {
      factor: "Blast Delay",
      value: `${blast_delay} hrs`,
      impactScore: Math.min(20, Math.round(blast_delay * 4.0)),
      severity: blast_delay > 2 ? "HIGH" : blast_delay > 0.5 ? "MEDIUM" : "LOW",
      category: "Operations"
    },
    {
      factor: "Maintenance Hours",
      value: `${maintenance_hours} hrs`,
      impactScore: Math.min(15, Math.round(maintenance_hours * 1.8)),
      severity: maintenance_hours > 8 ? "MEDIUM" : "LOW",
      category: "Equipment"
    },
    {
      factor: "Temperature",
      value: `${temperature}°C`,
      impactScore: 3,
      severity: temperature > 42 ? "HIGH" : "NORMAL",
      category: "Environment"
    }
  ].sort((a, b) => b.impactScore - a.impactScore);

  return {
    predicted_production,
    expected_shortfall,
    shortfall_percentage,
    risk_level,
    confidence,
    contributing_factors: factors,
    timestamp: new Date().toISOString()
  };
}

export function calculateMLReservePrediction(inputs) {
  const {
    latitude = 21.872,
    longitude = 80.203,
    elevation = 340,
    geological_strata = "Gondite series",
    rainfall = 38,
    soil_moisture = 58,
    ndvi = 0.42,
    land_surface_temperature = 29.4
  } = inputs;

  // Normalized scoring based on geological and satellite indicators
  let score = 75;

  // High elevation in Gondite belts favors mineralization
  if (elevation > 300) score += 5;
  
  // Moderate NDVI (0.3 - 0.5) typical of mineralized lateritic scrub cover
  if (ndvi >= 0.3 && ndvi <= 0.5) score += 6;
  else score -= 4;

  // Thermal anomaly check
  if (land_surface_temperature >= 28 && land_surface_temperature <= 34) score += 4;

  const reserve_probability = Math.min(96, Math.max(45, Math.round(score)));
  const estimated_reserve = Number(((reserve_probability / 100) * 3.2 + 0.5).toFixed(1)); // MT
  const predicted_grade = Number((28.0 + (reserve_probability - 50) * 0.32).toFixed(1)); // % Mn
  const confidence = Math.min(95, Math.max(78, reserve_probability + 4));

  return {
    reserve_probability,
    estimated_reserve,
    predicted_grade,
    confidence,
    strata: geological_strata,
    coordinates: [Number(latitude), Number(longitude)],
    timestamp: new Date().toISOString()
  };
}
