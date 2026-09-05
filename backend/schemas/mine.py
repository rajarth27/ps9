from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class MineResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    state: Optional[str] = None
    district: Optional[str] = None
    coordinates: List[float]
    type: Optional[str] = None
    depthMeters: Optional[int] = None
    status: Optional[str] = None
    reserveMT: Optional[float] = None
    gradePercent: Optional[float] = None
    dailyTarget: Optional[float] = None
    currentProduction: Optional[float] = None
    predictedProduction: Optional[float] = None
    expectedShortfall: Optional[float] = None
    shortfallPct: Optional[float] = None
    riskLevel: Optional[str] = None
    confidence: Optional[int] = None
    activePersonnel: Optional[int] = None
    description: Optional[str] = None

class MineDetailResponse(BaseModel):
    mine: MineResponse
