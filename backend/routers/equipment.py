"""
Equipment Fleet and Haulage Telemetry Router
Monitors heavy earthmoving machinery, availability KPIs, and haul cycle performance.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
from database import get_db
from models.equipment import Equipment
from schemas.equipment import EquipmentFleetResponse, EquipmentItem, HaulageResponse

router = APIRouter(tags=["Equipment"])

@router.get("/equipment", response_model=EquipmentFleetResponse)
@router.get("/api/equipment", response_model=EquipmentFleetResponse)
def get_equipment_fleet(
    mine_id: Optional[str] = Query("BALAGHAT-01", description="Mine ID"),
    db: Session = Depends(get_db)
):
    """Retrieve heavy equipment telemetry and overall fleet availability metrics."""
    units = db.query(Equipment).filter(
        (Equipment.mine_id == mine_id) | (Equipment.mine_id == None)
    ).all()

    total = len(units)
    active = sum(1 for u in units if u.status == "ACTIVE")
    warning = sum(1 for u in units if u.status == "WARNING")
    maint = sum(1 for u in units if u.status in ["MAINTENANCE", "DOWN"])
    avg_avail = round(sum(u.availability for u in units) / total, 1) if total > 0 else 84.0
    loss_tonnes = sum(u.production_impact_tonnes for u in units)

    items = [
        EquipmentItem(
            id=u.id,
            mine_id=u.mine_id,
            type=u.type,
            model=u.model,
            status=u.status,
            availability=u.availability,
            utilization=u.utilization,
            downtime_hours=u.downtime_hours,
            maintenance_hours=u.maintenance_hours,
            last_maintenance=u.last_maintenance,
            location=u.location,
            production_impact_tonnes=u.production_impact_tonnes,
            ai_recommendation=u.ai_recommendation
        )
        for u in units
    ]

    summary = {
        "totalUnits": total,
        "activeUnits": active,
        "underMaintenance": maint,
        "warningUnits": warning,
        "fleetAvailability": avg_avail,
        "downtimeLossTonnes": loss_tonnes
    }

    return {"summary": summary, "equipment": items}


@router.get("/haulage")
@router.get("/api/haulage")
def get_haulage_fleet(
    mine_id: Optional[str] = Query("BALAGHAT-01", description="Mine ID")
):
    """Retrieve haulage dispatch operations, fleet cycle times, and ramp constraints."""
    summary = {
        "activeTrucks": 24,
        "truckAvailability": 80.0,
        "avgCycleTimeMinutes": 24.5,
        "haulageDelayHours": 1.5,
        "dailyTonnageMoved": 7450.0,
        "efficiencyScore": 82.0
    }

    trends = [
        {"time": "06:00", "available": 26, "target": 28},
        {"time": "08:00", "available": 25, "target": 28},
        {"time": "10:00", "available": 24, "target": 28},
        {"time": "12:00", "available": 23, "target": 28},
        {"time": "14:00", "available": 24, "target": 28},
        {"time": "16:00", "available": 25, "target": 28}
    ]

    routes = [
        {
            "route": "Decline Level -380m to Surface Primary Crusher",
            "distanceKm": 3.4,
            "avgSpeedKmh": 16.5,
            "condition": "Wet / Traction Softened (Switchback 4)",
            "delayRisk": "HIGH"
        },
        {
            "route": "Underground Stope B4 to Coarse Ore Surge Bin",
            "distanceKm": 2.1,
            "avgSpeedKmh": 18.0,
            "condition": "Damp / Moderate Traction",
            "delayRisk": "MEDIUM"
        },
        {
            "route": "North Open Cast Bench to Secondary ROM Stockpile",
            "distanceKm": 1.6,
            "avgSpeedKmh": 24.0,
            "condition": "Dry / Firm Compacted Subgrade",
            "delayRisk": "LOW"
        }
    ]

    return {
        "summary": summary,
        "trends": trends,
        "routes": routes
    }
