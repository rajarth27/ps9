"""
AI Decision Support and Recommendations Router
Serves prioritized actionable engineering directives for mine managers.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
from database import get_db
from services.recommendation_service import get_recommendations

router = APIRouter(tags=["Recommendations"])

@router.get("/recommendations")
@router.get("/api/recommendations")
def list_recommendations(
    mine_id: Optional[str] = Query("BALAGHAT-01", description="Mine ID"),
    db: Session = Depends(get_db)
):
    """Retrieve prioritized AI decision support recommendations for eliminating shortfalls."""
    return get_recommendations(db, mine_id)
