from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ContributingFactor(BaseModel):
    factor: str
    value: str
    impactScore: int
    severity: str
    category: str

class ShortfallPredictionRequest(BaseModel):
    mine_id: Optional[str] = "BALAGHAT-01"
    date: Optional[str] = "2026-09-05"
    rainfall: float = Field(..., ge=0, description="Precipitation in mm")
    soil_moisture: float = Field(..., ge=0, description="Soil saturation (percentage or ratio 0-1)")
    temperature: float = Field(..., description="Ambient temperature in °C")
    equipment_availability: float = Field(..., ge=0, description="Equipment availability (percentage or ratio 0-1)")
    equipment_downtime: float = Field(..., ge=0, description="Downtime hours logged across equipment")
    equipment_utilization: Optional[float] = Field(80.0, ge=0, description="Equipment utilization percentage")
    maintenance_hours: float = Field(..., ge=0, description="Maintenance bay hours")
    haulage_truck_count: Optional[int] = Field(None, ge=0, description="Active haulage truck units")
    truck_count: Optional[int] = Field(None, ge=0, description="Active haulage truck units")
    drilling_delay: float = Field(..., ge=0, description="Drilling rig delay in hours")
    blast_delay: float = Field(..., ge=0, description="Blasting operation delay in hours")
    haulage_delay: Optional[float] = Field(0.5, ge=0, description="Haulage cycle delay in hours")
    production_target: Optional[float] = Field(None, gt=0, description="Daily production target in tonnes")
    target_production: Optional[float] = Field(None, gt=0, description="Daily production target in tonnes")

class ShortfallPredictionResponse(BaseModel):
    predicted_production: float
    expected_shortfall: float
    shortfall_percentage: float
    risk_level: str
    confidence: int
    contributing_factors: List[ContributingFactor]
    timestamp: str
    # Extended fields from ML script
    predicted_efficiency: Optional[float] = None
    target_production: Optional[float] = None
    shortfall_pct: Optional[float] = None
    risk_tier: Optional[str] = None
    root_causes: Optional[Dict[str, Any]] = None
    recommendations: Optional[List[str]] = None
    risk_flags: Optional[int] = None

class ReservePredictionRequest(BaseModel):
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    elevation: Optional[float] = 330.0
    rainfall: Optional[float] = 12.0
    soil_moisture: Optional[float] = 35.0
    ndvi: Optional[float] = 0.45
    lst_temp: Optional[float] = 31.0
    zone_id: Optional[str] = None

class ReservePredictionResponse(BaseModel):
    zone_id: Optional[str] = None
    reserve_probability: float
    estimated_reserve_mt: float
    confidence_score: float
    grade_estimate_pct: float
    anomaly_status: str
    timestamp: str
    # Grid lookup fields from ML script
    query_lat: Optional[float] = None
    query_lon: Optional[float] = None
    nearest_grid_lat: Optional[float] = None
    nearest_grid_lon: Optional[float] = None
    probability: Optional[float] = None
    grid_distance_degrees: Optional[float] = None
