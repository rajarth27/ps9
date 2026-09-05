from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any

class ProductionRecord(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    date: str
    target: float
    actual: float
    predicted: float
    shortfall: float
    rainfall: Optional[float] = None
    availability: Optional[float] = None

class ProductionTrendsResponse(BaseModel):
    timeframe: str
    history: List[ProductionRecord]

class ProductionSummaryResponse(BaseModel):
    planned_production: float
    actual_production: float
    shortfall: float
    conditions: Dict[str, Any]
    factors: List[Dict[str, Any]]
