"""
Manganese Exploration and Reserve Prediction Router
Processes Earth Observation geospatial layers and provides AI reserve estimation.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas.exploration import ExplorationZoneResponse
from schemas.prediction import ReservePredictionRequest, ReservePredictionResponse
from services.reserve_service import (
    predict_reserve,
    get_all_exploration_zones,
    get_exploration_zone_by_id
)

router = APIRouter(tags=["Exploration"])

@router.get("/exploration/zones", response_model=List[ExplorationZoneResponse])
@router.get("/api/exploration/zones", response_model=List[ExplorationZoneResponse])
def list_exploration_zones(db: Session = Depends(get_db)):
    """Retrieve all identified prospective manganese exploration blocks."""
    return get_all_exploration_zones(db)


@router.get("/exploration/zones/{zone_id}", response_model=ExplorationZoneResponse)
@router.get("/api/exploration/zones/{zone_id}", response_model=ExplorationZoneResponse)
def get_exploration_zone(zone_id: str, db: Session = Depends(get_db)):
    """Retrieve detailed telemetry and reserve estimation for a specific block."""
    zone = get_exploration_zone_by_id(db, zone_id)
    if not zone:
        raise HTTPException(status_code=404, detail=f"Exploration Zone '{zone_id}' not found")
    return zone


@router.post("/predict_reserve", response_model=ReservePredictionResponse)
@router.post("/api/ml/predict-reserve", response_model=ReservePredictionResponse)
def run_reserve_prediction(request_data: ReservePredictionRequest):
    """
    Execute Random Forest manganese reserve tonnage and probability prediction
    based on satellite multispectral and terrain inputs.
    """
    return predict_reserve(request_data)
