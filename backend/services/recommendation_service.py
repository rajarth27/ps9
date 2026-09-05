"""
AI Decision Support and Recommendations Service
Generates and serves prescriptive operational directives for mine managers.
"""

from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from models.recommendations import Recommendation
from schemas.recommendation import RecommendationItem

def get_recommendations(db: Session, mine_id: str = "BALAGHAT-01") -> List[Dict[str, Any]]:
    """Retrieve prioritized AI decision recommendations from database."""
    recs = db.query(Recommendation).filter(
        (Recommendation.mine_id == mine_id) | (Recommendation.mine_id == None)
    ).all()

    # Pre-defined mapping of detected conditions and recommended actions per recommendation
    meta_mapping = {
        "REC-001": {
            "conditions": [
                "Equipment downtime: HIGH (EX-017 down 6.5 hrs in Stope B4)",
                "Equipment availability: LOW (84% vs 90% target)",
                "Haulage trucks: 24/30 active on lower decline",
                "Rainfall: HIGH (42 mm)",
                "Blast delay: 2.5 hrs cumulative"
            ],
            "actions": [
                "Reposition Tata Hitachi EX1200 (EX-021) from secondary face to Stope B4 immediately.",
                "Assign 4 high-clearance Scania tippers to create continuous haul loop from Level -380m.",
                "Dispatch specialized hydraulic service squad to expediting cylinder replacement on EX-017."
            ]
        },
        "REC-002": {
            "conditions": [
                "Rainfall: 42 mm recorded; additional 35 mm forecast tomorrow",
                "Soil moisture: 61% (Bench pore pressure elevated)",
                "Truck cycle time: +3.2 min due to ramp slip"
            ],
            "actions": [
                "Deploy auxiliary high-head pump set #4 in South Sump to increase dewatering to 4,200 gpm.",
                "Spread 40 tonnes of dry crushed dolomite fines on Switchback Curve 4 to restore traction coefficient.",
                "Enforce 15 km/h speed limit on Ramp C downward descent to prevent brake overheating."
            ]
        },
        "REC-003": {
            "conditions": [
                "Blast clearance: 2.5 hr shift overlap risk",
                "Ventilation shaft exhaust: Operating at 88% capacity",
                "Underground personnel: 140 active in adjacent level"
            ],
            "actions": [
                "Shift primary round firing to shift changeover window (17:45 - 18:15).",
                "Verify blast hole stemming depth meets 1.8m minimum to mitigate flyrock and premature air blast.",
                "Run auxiliary exhaust scrubbers on High for 45 minutes prior to stope re-entry authorization."
            ]
        },
        "REC-004": {
            "conditions": [
                "Crusher vibration telemetry: 4.8 mm/s RMS (Amber alert threshold: 4.5 mm/s)",
                "Crusher mantle wear: 78% of rated liner lifespan reached",
                "Secondary stockpiles: 4,800 T buffer available"
            ],
            "actions": [
                "Schedule 4-hour maintenance shutdown between 02:00 and 06:00 during low truck arrival window.",
                "Utilize 4,800 T coarse ore stockpile buffer to keep rail loadout silos at 100% feed capacity.",
                "Swap worn concave segments with pre-staged spare manganese alloy set in bay 2."
            ]
        }
    }

    output = []
    for r in recs:
        info = meta_mapping.get(r.id, {
            "conditions": [r.issue or "Telemetry threshold exceeded", r.cause or "Operational variation detected"],
            "actions": [r.action or "Inspect equipment and operational log"]
        })

        output.append({
            "id": r.id,
            "mine_id": r.mine_id,
            "priority": r.priority,
            "category": r.category,
            "title": r.title,
            "expectedShortfallMitigation": f"{int(r.expected_recovery_tonnes)} T / day recovery",
            "expectedRecoveryTonnes": int(r.expected_recovery_tonnes),
            "confidence": r.confidence or 90,
            "detectedConditions": info["conditions"],
            "recommendedActions": info["actions"],
            "operationalImpact": r.expected_impact or "Restores extraction continuity and minimizes daily shortfall.",
            "status": r.status or "Pending Action",
            "createdTime": r.created_time or "10 mins ago"
        })

    return output
