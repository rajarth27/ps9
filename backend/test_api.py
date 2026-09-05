"""
Comprehensive Automated Test Suite for ManganAI Backend
Tests all endpoints, database queries, and ML models using pytest + FastAPI TestClient.
"""

import pytest
from fastapi.testclient import TestClient
from main import app
from services.ml_service import load_models

# Ensure models are loaded once for the entire module
load_models()

client = TestClient(app)


# ── 1. System & Health ──────────────────────────────────────────

def test_root():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_system_status():
    r = client.get("/system/status")
    assert r.status_code == 200
    body = r.json()
    assert body["backend"] == "online"
    assert body["database"] == "connected"


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_health_api_alias():
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_liveness():
    r = client.get("/live")
    assert r.status_code == 200
    assert r.json()["status"] == "live"


def test_readiness():
    r = client.get("/ready")
    assert r.status_code == 200
    assert r.json()["status"] in ("ready", "unready")


# ── 2. Mines ────────────────────────────────────────────────────

def test_get_mines():
    r = client.get("/mines")
    data = r.json()
    assert r.status_code == 200
    assert isinstance(data, list)
    assert len(data) == 5


def test_get_mines_api_alias():
    r = client.get("/api/mines")
    assert r.status_code == 200
    assert len(r.json()) == 5


def test_get_mine_by_id():
    r = client.get("/mines/BALAGHAT-01")
    assert r.status_code == 200
    assert "Balaghat" in r.json()["name"]


def test_mine_not_found():
    r = client.get("/mines/NONEXISTENT")
    assert r.status_code == 404


# ── 3. Dashboard ────────────────────────────────────────────────

def test_dashboard():
    r = client.get("/dashboard?mine_id=BALAGHAT-01")
    body = r.json()
    assert r.status_code == 200
    assert "kpis" in body
    assert "history" in body
    assert "currentConditions" in body


def test_dashboard_api_alias():
    r = client.get("/api/dashboard?mine_id=BALAGHAT-01")
    body = r.json()
    assert r.status_code == 200
    assert "factors" in body
    assert "shortfallForecast" in body


def test_dashboard_path_param():
    r = client.get("/dashboard/BALAGHAT-01")
    assert r.status_code == 200
    assert "mine" in r.json()


# ── 4. Exploration Zones ────────────────────────────────────────

def test_exploration_zones():
    r = client.get("/exploration/zones")
    data = r.json()
    assert r.status_code == 200
    assert isinstance(data, list)
    assert len(data) == 4


def test_exploration_zones_api_alias():
    r = client.get("/api/exploration/zones")
    assert r.status_code == 200
    assert len(r.json()) == 4


def test_exploration_zone_by_id():
    r = client.get("/exploration/zones/ZONE-M17")
    body = r.json()
    assert r.status_code == 200
    assert body["id"] == "ZONE-M17"


def test_exploration_zone_not_found():
    r = client.get("/exploration/zones/NONEXISTENT")
    assert r.status_code == 404


# ── 5. ML Reserve Prediction ───────────────────────────────────

RESERVE_PAYLOAD = {
    "latitude": 21.8710,
    "longitude": 80.1830,
    "elevation": 330.0,
    "rainfall": 12.0,
    "soil_moisture": 35.0,
    "ndvi": 0.45,
    "lst_temp": 31.0,
}


def test_predict_reserve():
    r = client.post("/predict_reserve", json=RESERVE_PAYLOAD)
    body = r.json()
    assert r.status_code == 200
    assert body["estimated_reserve_mt"] > 0
    assert body["reserve_probability"] > 0


def test_predict_reserve_api_alias():
    r = client.post("/api/ml/predict-reserve", json=RESERVE_PAYLOAD)
    assert r.status_code == 200
    assert r.json()["estimated_reserve_mt"] > 0


# ── 6. ML Shortfall Prediction ─────────────────────────────────

SHORTFALL_PAYLOAD = {
    "mine_id": "BALAGHAT-01",
    "date": "2026-09-05",
    "rainfall": 42.0,
    "soil_moisture": 61.0,
    "temperature": 31.0,
    "equipment_availability": 84.0,
    "equipment_downtime": 6.5,
    "equipment_utilization": 78.0,
    "maintenance_hours": 5.2,
    "haulage_truck_count": 24,
    "drilling_delay": 1.8,
    "blast_delay": 2.5,
    "production_target": 10000.0,
}


def test_predict_shortfall():
    r = client.post("/predict_shortfall", json=SHORTFALL_PAYLOAD)
    body = r.json()
    assert r.status_code == 200
    assert body["predicted_production"] > 0
    assert len(body["contributing_factors"]) > 0


def test_predict_shortfall_api_alias():
    r = client.post("/api/ml/predict-shortfall", json=SHORTFALL_PAYLOAD)
    body = r.json()
    assert r.status_code == 200
    assert body["expected_shortfall"] >= 0


# ── 7. Production & Trends ─────────────────────────────────────

def test_production_status():
    r = client.get("/production?mine_id=BALAGHAT-01")
    body = r.json()
    assert r.status_code == 200
    assert "conditions" in body
    assert "factors" in body


def test_production_trends():
    r = client.get("/production/trends?timeframe=7d")
    data = r.json()
    assert r.status_code == 200
    assert isinstance(data, list)
    assert len(data) > 0


def test_production_api_aliases():
    r = client.get("/api/production?mine_id=BALAGHAT-01")
    assert r.status_code == 200
    r = client.get("/api/production/trends?timeframe=7d")
    assert r.status_code == 200


# ── 8. Equipment & Haulage ─────────────────────────────────────

def test_equipment():
    r = client.get("/equipment?mine_id=BALAGHAT-01")
    body = r.json()
    assert r.status_code == 200
    assert "summary" in body
    assert len(body["equipment"]) >= 6


def test_equipment_api_alias():
    r = client.get("/api/equipment?mine_id=BALAGHAT-01")
    assert r.status_code == 200


def test_haulage():
    r = client.get("/haulage?mine_id=BALAGHAT-01")
    body = r.json()
    assert r.status_code == 200
    assert "routes" in body
    assert "summary" in body
    assert "trends" in body


def test_haulage_api_alias():
    r = client.get("/api/haulage?mine_id=BALAGHAT-01")
    assert r.status_code == 200


# ── 9. Weather & Satellite ─────────────────────────────────────

def test_weather():
    r = client.get("/weather?mine_id=BALAGHAT-01")
    body = r.json()
    assert r.status_code == 200
    assert "current" in body
    assert "forecast" in body
    assert "impacts" in body
    assert "layers" in body


def test_weather_api_alias():
    r = client.get("/api/weather?mine_id=BALAGHAT-01")
    assert r.status_code == 200


# ── 10. Risk Analysis ──────────────────────────────────────────

def test_risk():
    r = client.get("/risk?mine_id=BALAGHAT-01")
    body = r.json()
    assert r.status_code == 200
    assert "overview" in body
    assert "contributors" in body
    assert len(body["forecast"]) == 7


def test_risk_api_alias():
    r = client.get("/api/risk?mine_id=BALAGHAT-01")
    assert r.status_code == 200


# ── 11. Recommendations ────────────────────────────────────────

def test_recommendations():
    r = client.get("/recommendations?mine_id=BALAGHAT-01")
    data = r.json()
    assert r.status_code == 200
    assert isinstance(data, list)
    assert len(data) >= 2


def test_recommendations_api_alias():
    r = client.get("/api/recommendations?mine_id=BALAGHAT-01")
    assert r.status_code == 200


# ── 12. OpenAPI Docs ────────────────────────────────────────────

def test_openapi_schema():
    r = client.get("/openapi.json")
    assert r.status_code == 200
    schema = r.json()
    assert "paths" in schema
    assert "/health" in schema["paths"]
