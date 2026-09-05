"""
Reserve Estimation and Exploration Service
Combines Earth Observation satellite indicators with ML prediction.
"""

from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from models.exploration_zones import ExplorationZone
from schemas.prediction import ReservePredictionRequest, ReservePredictionResponse
from schemas.exploration import ExplorationZoneResponse
from services import ml_service

def predict_reserve(req: ReservePredictionRequest) -> ReservePredictionResponse:
    """Run reserve estimation model with geospatial inputs."""
    req_dict = req.model_dump()
    result = ml_service.predict_reserve(req_dict)
    return ReservePredictionResponse(**result)


def get_all_exploration_zones(db: Session) -> List[ExplorationZoneResponse]:
    """Retrieve all exploration zones from database."""
    zones = db.query(ExplorationZone).all()
    results = []
    for z in zones:
        results.append(ExplorationZoneResponse(
            id=z.id,
            name=z.zone_name,
            state="Madhya Pradesh" if "BALAGHAT" in z.mine_id or "UKWA" in z.mine_id or "TIRODI" in z.mine_id else "Maharashtra",
            coordinates=[z.latitude, z.longitude],
            reserveProbability=float(z.reserve_probability),
            estimatedReserveMT=float(z.estimated_reserve_mt),
            grade=f"{z.predicted_grade}% Mn",
            ndvi=float(z.ndvi),
            lstTemp=float(z.lst_temp_c),
            mineralIndex=round(float(z.reserve_probability) / 100.0 * 0.92, 2),
            surfaceElevationM=float(z.elevation_m),
            explorationPriority="HIGH" if z.reserve_probability > 75 else "MEDIUM",
            status="Active Evaluation"
        ))
    return results


def get_exploration_zone_by_id(db: Session, zone_id: str) -> Optional[ExplorationZoneResponse]:
    """Retrieve single exploration zone by ID."""
    z = db.query(ExplorationZone).filter(ExplorationZone.id == zone_id).first()
    if not z:
        return None
    return ExplorationZoneResponse(
        id=z.id,
        name=z.zone_name,
        state="Madhya Pradesh" if "BALAGHAT" in z.mine_id or "UKWA" in z.mine_id or "TIRODI" in z.mine_id else "Maharashtra",
        coordinates=[z.latitude, z.longitude],
        reserveProbability=float(z.reserve_probability),
        estimatedReserveMT=float(z.estimated_reserve_mt),
        grade=f"{z.predicted_grade}% Mn",
        ndvi=float(z.ndvi),
        lstTemp=float(z.lst_temp_c),
        mineralIndex=round(float(z.reserve_probability) / 100.0 * 0.92, 2),
        surfaceElevationM=float(z.elevation_m),
        explorationPriority="HIGH" if z.reserve_probability > 75 else "MEDIUM",
        status="Active Evaluation"
    )
