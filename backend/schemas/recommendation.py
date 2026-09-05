from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class RecommendationItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    mine_id: Optional[str] = None
    title: str
    category: str
    priority: str
    confidence: int
    expectedShortfallMitigation: str
    expectedRecoveryTonnes: int
    detectedConditions: List[str]
    recommendedActions: List[str]
    operationalImpact: str
    createdTime: str
