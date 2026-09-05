"""
Production and ML Shortfall Prediction Router
Handles daily extraction metrics, historical trends, and predictive shortfall inference.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from database import get_db
from schemas.prediction import ShortfallPredictionRequest, ShortfallPredictionResponse
from services.shortfall_service import predict_shortfall, get_production_trends, get_production_summary

router = APIRouter(tags=["Production"])

@router.get("/production")
@router.get("/api/production")
def get_production_status(
    mine_id: Optional[str] = Query("BALAGHAT-01", description="Mine ID"),
    db: Session = Depends(get_db)
):
    """Get active production conditions and operational factor indicators."""
    return get_production_summary(db, mine_id)


@router.get("/production/trends")
@router.get("/api/production/trends")
def get_trends(
    timeframe: Optional[str] = Query("7d", description="Timeframe: 7d, 30d, 90d"),
    db: Session = Depends(get_db)
):
    """Get multi-day production history comparing target, actual, and predicted tonnage."""
    trends = get_production_trends(db, timeframe)
    return trends["history"]


@router.post("/predict_shortfall", response_model=ShortfallPredictionResponse)
@router.post("/api/ml/predict-shortfall", response_model=ShortfallPredictionResponse)
def run_shortfall_prediction(
    request_data: ShortfallPredictionRequest,
    db: Session = Depends(get_db)
):
    """
    Execute Random Forest production shortfall prediction.
    Accepts 11 mine operational and environmental telemetry parameters.
    """
    return predict_shortfall(db, request_data)
