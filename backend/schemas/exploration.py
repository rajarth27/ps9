from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class ExplorationZoneResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    state: str
    coordinates: List[float]
    reserveProbability: float
    estimatedReserveMT: float
    grade: str
    ndvi: float
    lstTemp: float
    mineralIndex: float
    surfaceElevationM: float
    explorationPriority: str
    status: str
