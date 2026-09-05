"""
Production Risk Assessment Router
Synthesizes composite operational risk scores and forward predictive horizons.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from database import get_db
from services.risk_service import get_risk_assessment

router = APIRouter(tags=["Risk"])

@router.get("/risk")
@router.get("/api/risk")
def get_risk(
    mine_id: Optional[str] = Query("BALAGHAT-01", description="Mine ID"),
    db: Session = Depends(get_db)
):
    """Retrieve holistic multi-factor risk assessment and 7-day shortfall outlook."""
    return get_risk_assessment(db, mine_id)
