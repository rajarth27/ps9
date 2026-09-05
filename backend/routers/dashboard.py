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

    target = float(mine.daily_target)
    predicted = float(mine.predicted_production)
    shortfall = float(mine.expected_shortfall)
    shortfall_pct = float(mine.shortfall_pct)

    kpis = {
        "estimatedReserveMT": mine.reserve_mt,
        "todayProductionTonnes": mine.current_production,
        "predictedProductionTonnes": predicted,
        "expectedShortfallTonnes": shortfall,
        "shortfallPercentage": shortfall_pct,
        "overallRisk": mine.risk_level,
        "confidence": mine.confidence
    }

    shortfall_forecast = {
        "expectedShortfall": shortfall,
        "risk": mine.risk_level,
        "confidence": mine.confidence,
        "concerns": [
            "Equipment downtime on primary excavator (EX-017)",
            f"Precipitation ({weather.rainfall if weather else 42.0} mm) slowing haulage",
            "Deep stope blasting clearance window"
        ]
    }

    return {
        "mine": format_mine_response(mine),
        "kpis": kpis,
        "currentConditions": summary["conditions"],
        "factors": summary["factors"],
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
