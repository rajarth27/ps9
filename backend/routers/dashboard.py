"""
Operations Dashboard Aggregation Router
Synthesizes mine telemetry, KPIs, production history, and active bottlenecks.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from database import get_db
from models.mine import Mine
from models.production import Production
from models.weather import Weather
from routers.mines import format_mine_response
from services.shortfall_service import get_production_summary, get_production_trends

router = APIRouter(tags=["Dashboard"])

def build_dashboard_payload(db: Session, mine_id: str) -> Dict[str, Any]:
    mine = db.query(Mine).filter(Mine.id == mine_id).first()
    if not mine:
        mine = db.query(Mine).first()
    if not mine:
        raise HTTPException(status_code=404, detail="No mine records found")

    weather = db.query(Weather).filter(Weather.mine_id == mine.id).first()
    summary = get_production_summary(db, mine.id)
    trends = get_production_trends(db, "7d")

    # Run live ML inference with loaded model on current operational conditions
    from services import ml_service
    live_ml = ml_service.predict_shortfall(summary["conditions"])

    predicted = float(live_ml.get("predicted_production", mine.predicted_production))
    shortfall = float(live_ml.get("expected_shortfall", mine.expected_shortfall))
    shortfall_pct = float(live_ml.get("shortfall_percentage", mine.shortfall_pct))
    risk_level = live_ml.get("risk_level", mine.risk_level)
    confidence = int(live_ml.get("confidence", mine.confidence))

    kpis = {
        "estimatedReserveMT": mine.reserve_mt,
        "todayProductionTonnes": mine.current_production,
        "predictedProductionTonnes": predicted,
        "expectedShortfallTonnes": shortfall,
        "shortfallPercentage": shortfall_pct,
        "overallRisk": risk_level,
        "confidence": confidence
    }

    # Generate dynamic concerns based on live conditions and SHAP root causes
    live_concerns = live_ml.get("recommendations", [])
    if not live_concerns:
        live_concerns = [
            f"Precipitation ({weather.rainfall if weather else 42.0} mm) impacting haul ramp traction",
            "Equipment availability monitored below optimum target",
            "Blast clearance window active"
        ]

    shortfall_forecast = {
        "expectedShortfall": shortfall,
        "risk": risk_level,
        "confidence": confidence,
        "concerns": live_concerns[:3]
    }

    return {
        "mine": format_mine_response(mine),
        "kpis": kpis,
        "currentConditions": summary["conditions"],
        "factors": live_ml.get("contributing_factors") or summary["factors"],
        "history": trends["history"],
        "shortfallForecast": shortfall_forecast
    }

@router.get("/dashboard")
@router.get("/api/dashboard")
def get_dashboard_query(
    mine_id: Optional[str] = Query("BALAGHAT-01", description="Mine ID"),
    db: Session = Depends(get_db)
):
    """Retrieve synthesized dashboard payload via query parameter."""
    return build_dashboard_payload(db, mine_id)


@router.get("/dashboard/{mine_id}")
@router.get("/api/dashboard/{mine_id}")
def get_dashboard_path(mine_id: str, db: Session = Depends(get_db)):
    """Retrieve synthesized dashboard payload via path parameter."""
    return build_dashboard_payload(db, mine_id)
