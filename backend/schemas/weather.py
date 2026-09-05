from pydantic import BaseModel
from typing import List, Optional

class CurrentWeather(BaseModel):
    temperature: float
    rainfall: float
    soilMoisture: float
    humidity: float
    windSpeed: float
    barometricPressure: float
    cloudCover: float
    satelliteSource: str

class ForecastDay(BaseModel):
    day: str
    date: str
    condition: str
    rainfall: float
    soilMoisture: float
    temp: float
    risk: str

class EnvironmentalImpactItem(BaseModel):
    parameter: str
    observation: str
    impact: str
    status: str
    level: str
    operationalConsideration: str

class SatelliteLayerItem(BaseModel):
    id: str
    label: str
    color: str

class WeatherResponse(BaseModel):
    current: CurrentWeather
    forecast: List[ForecastDay]
    impacts: List[EnvironmentalImpactItem]
    layers: List[SatelliteLayerItem]
