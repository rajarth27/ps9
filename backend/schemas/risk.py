from pydantic import BaseModel
from typing import List, Optional

class RiskOverview(BaseModel):
    score: int
    level: str
    summary: str

class RiskContributor(BaseModel):
    name: str
    value: str
    category: str
    riskPoints: int
    severity: str
    description: str

class RiskForecastDay(BaseModel):
    day: str
    date: str
    riskLevel: str
    predictedProduction: int
    expectedShortfall: int
    primaryConcern: str

class RiskResponse(BaseModel):
    overview: RiskOverview
    contributors: List[RiskContributor]
    forecast: List[RiskForecastDay]
