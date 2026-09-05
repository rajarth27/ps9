"""
Mine Inventory and Details Router
Provides active MOIL mine metadata, production benchmarks, and lease boundaries.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.mine import Mine
from schemas.mine import MineResponse

router = APIRouter(tags=["Mines"])

def format_mine_response(m: Mine) -> MineResponse:
    return MineResponse(
        id=m.id,
        name=m.name,
        state=m.state,
        district=m.district,
        coordinates=[m.latitude, m.longitude],
        type=m.type,
        depthMeters=m.depth_meters,
        status=m.status,
        reserveMT=m.reserve_mt,
        gradePercent=m.grade_percent,
        dailyTarget=m.daily_target,
        currentProduction=m.current_production,
        predictedProduction=m.predicted_production,
        expectedShortfall=m.expected_shortfall,
        shortfallPct=m.shortfall_pct,
        riskLevel=m.risk_level,
        confidence=m.confidence,
        activePersonnel=m.active_personnel,
        description=m.description
    )

@router.get("/mines", response_model=List[MineResponse])
@router.get("/api/mines", response_model=List[MineResponse])
def list_mines(db: Session = Depends(get_db)):
    """Retrieve all MOIL mining locations."""
    mines = db.query(Mine).all()
    return [format_mine_response(m) for m in mines]


@router.get("/mines/{mine_id}", response_model=MineResponse)
@router.get("/api/mines/{mine_id}", response_model=MineResponse)
def get_mine(mine_id: str, db: Session = Depends(get_db)):
    """Retrieve metadata and operational baseline for a specific mine."""
    mine = db.query(Mine).filter(Mine.id == mine_id).first()
    if not mine:
        raise HTTPException(status_code=404, detail=f"Mine '{mine_id}' not found")
    return format_mine_response(mine)
