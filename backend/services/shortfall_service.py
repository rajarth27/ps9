"""
Shortfall Prediction and Production Service
Orchestrates ML shortfall inference and production history queries.
"""

from typing import Dict, Any, List
from sqlalchemy.orm import Session
import datetime
from models.production import Production
from models.predictions import Prediction
from models.mine import Mine
from schemas.prediction import ShortfallPredictionRequest, ShortfallPredictionResponse
from services import ml_service

def predict_shortfall(db: Session, req: ShortfallPredictionRequest) -> ShortfallPredictionResponse:
    """Run shortfall prediction and log prediction to database."""
    req_dict = req.model_dump()
    result = ml_service.predict_shortfall(req_dict)

    # Persist prediction in database if mine exists
    try:
        pred_record = Prediction(
            mine_id=req.mine_id or "BALAGHAT-01",
            prediction_type="SHORTFALL",
            prediction_date=req.date or datetime.date.today().isoformat(),
            predicted_production=float(result["predicted_production"]),
            expected_shortfall=float(result["expected_shortfall"]),
            shortfall_percentage=result["shortfall_percentage"],
            risk_level=result["risk_level"],
            model_confidence=result["confidence"],
            contributing_factors_json="; ".join([f"{f['factor']}: {f['value']}" for f in result["contributing_factors"]]),
            created_at=datetime.datetime.now().isoformat()
        )
        db.add(pred_record)
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"[Shortfall Service] Error logging prediction: {e}")

    return ShortfallPredictionResponse(**result)


def get_production_trends(db: Session, timeframe: str = "7d") -> Dict[str, Any]:
    """Retrieve historical production records for trends analysis."""
    records = db.query(Production).order_by(Production.production_date.asc()).all()

    history_items = []
    for r in records:
        history_items.append({
            "date": r.production_date,
            "target": r.target_production,
            "actual": r.actual_production,
            "predicted": r.predicted_production,
            "shortfall": r.expected_shortfall,
            "rainfall": r.rainfall,
            "availability": r.equipment_availability
        })

    # Filter by timeframe
    if timeframe == "30d":
        pass # If we have 30d, return; else return what we have
    return {
        "timeframe": timeframe,
        "history": history_items
    }


def get_production_summary(db: Session, mine_id: str = "BALAGHAT-01") -> Dict[str, Any]:
    """Get current production status, environmental conditions, and operational factors."""
    mine = db.query(Mine).filter(Mine.id == mine_id).first()

    return {
        "conditions": {
            "rainfall": 42.0,
            "soilMoisture": 61.0,
            "equipmentDowntime": 6.5,
            "blastDelay": 2.5,
            "temperature": 31.0,
            "haulageTruckCount": 24,
            "equipmentAvailability": 84.0,
            "equipmentUtilization": 78.0,
            "maintenanceHours": 5.2,
            "drillingDelay": 1.8,
            "productionTarget": float(mine.daily_target) if mine else 10000.0
        },
        "factors": [
            {
                "id": "EQUIPMENT",
                "name": "Equipment Availability",
                "value": "84.0%",
                "status": "WARNING",
                "impact": "-380 T / day",
                "description": "Hydraulic seal failure on primary excavator EX-017"
            },
            {
                "id": "WEATHER",
                "name": "Rainfall & Sump Inflow",
                "value": "42.0 mm",
                "status": "WARNING",
                "impact": "-180 T / day",
                "description": "Haul ramp soft traction slowing cycle times by 3.2 mins"
            },
            {
                "id": "HAULAGE",
                "name": "Haulage Truck Fleet",
                "value": "24 / 30 Active",
                "status": "WARNING",
                "impact": "-140 T / day",
                "description": "6 tippers diverted for bench stabilization dumping"
            },
            {
                "id": "BLASTING",
                "name": "Blasting Operations",
                "value": "2.5 hr Delay",
                "status": "NORMAL",
                "impact": "On Schedule",
                "description": "Controlled deep-hole perimeter blast completed safely"
            }
        ]
    }
