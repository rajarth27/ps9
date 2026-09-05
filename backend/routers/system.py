"""
System Status and Health Check Router
Provides uptime, connectivity, and model diagnostics.
"""

import logging
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
import datetime
from database import get_db
from services import ml_service

router = APIRouter(tags=["System"])

@router.get("/")
def root_status():
    """Root endpoint returning basic service status."""
    return {"status": "ok", "service": "ManganAI Backend"}


@router.get("/system/status")
@router.get("/api/system/status")
def system_status(db: Session = Depends(get_db)):
    """System health check endpoint verifying database and ML model readiness."""
    db_status = "disconnected"
    try:
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    model_status = ml_service.are_models_loaded()

    return {
        "backend": "online",
        "database": db_status,
        "reserve_model": "loaded" if model_status["reserve_model"] else "unloaded",
        "shortfall_model": "loaded" if model_status["shortfall_model"] else "unloaded",
        "timestamp": datetime.datetime.now().isoformat()
    }


@router.get("/health")
@router.get("/api/health")
def health_check(db: Session = Depends(get_db)):
    """Comprehensive health check probe for container orchestration.
    Returns overall status, DB connectivity, and model load flags.
    """
    db_ok = True
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_ok = False

    model_status = ml_service.are_models_loaded()

    return {
        "status": "healthy" if db_ok else "degraded",
        "service": "ManganAI Decision Support API",
        "version": "1.0.0",
        "database": "connected" if db_ok else "error",
        "models": {
            "shortfall": "loaded" if model_status["shortfall_model"] else "offline",
            "reserve": "loaded" if model_status["reserve_model"] else "offline"
        },
        "timestamp": datetime.datetime.now().isoformat()
    }
@router.get("/live")
def liveness():
    """Liveness probe – returns 200 if the application process is running."""
    return {"status": "live"}

@router.get("/ready")
def readiness(db: Session = Depends(get_db)):
    """Readiness probe – checks DB connectivity and ML model load status.
    Returns "ready" only if both are operational.
    """
    db_ok = True
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_ok = False
    model_status = ml_service.are_models_loaded()
    overall_ready = db_ok and all(model_status.values())
    return {
        "status": "ready" if overall_ready else "unready",
        "database": "connected" if db_ok else "error",
        "models": model_status,
        "timestamp": datetime.datetime.now().isoformat()
    }
