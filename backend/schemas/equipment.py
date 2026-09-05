from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class EquipmentItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    mine_id: Optional[str] = None
    type: str
    model: Optional[str] = None
    status: str
    availability: float
    utilization: float
    downtime_hours: float
    maintenance_hours: float
    last_maintenance: Optional[str] = None
    location: Optional[str] = None
    production_impact_tonnes: Optional[float] = 0.0
    ai_recommendation: Optional[str] = None

class EquipmentSummaryResponse(BaseModel):
    totalUnits: int
    activeUnits: int
    underMaintenance: int
    warningUnits: int
    fleetAvailability: float
    downtimeLossTonnes: float

class EquipmentFleetResponse(BaseModel):
    summary: EquipmentSummaryResponse
    equipment: List[EquipmentItem]

class HaulageSummaryResponse(BaseModel):
    activeTrucks: int
    truckAvailability: float
    avgCycleTimeMinutes: float
    haulageDelayHours: float
    dailyTonnageMoved: float
    efficiencyScore: float

class HaulageTrendItem(BaseModel):
    time: str
    available: int
    target: int

class HaulageRouteItem(BaseModel):
    route: str
    distanceKm: float
    avgSpeedKmh: float
    condition: str
    delayRisk: str

class HaulageResponse(BaseModel):
    summary: HaulageSummaryResponse
    trends: List[HaulageTrendItem]
    routes: List[HaulageRouteItem]
