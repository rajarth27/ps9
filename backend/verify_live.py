"""
Verification Script for Live ManganAI Backend
Sends real HTTP requests to http://127.0.0.1:8001 to verify every major functional area.
"""

import json
import urllib.request
import urllib.error

BASE_URL = "http://127.0.0.1:8001"

def test_get(endpoint):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers={"User-Agent": "ManganAI-Verifier"})
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            status = response.status
            data = json.loads(response.read().decode("utf-8"))
            return status, data
    except urllib.error.HTTPError as e:
        return e.code, None
    except Exception as e:
        return None, str(e)

def test_post(endpoint, payload):
    url = f"{BASE_URL}{endpoint}"
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json", "User-Agent": "ManganAI-Verifier"}
    )
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            status = response.status
            data = json.loads(response.read().decode("utf-8"))
            return status, data
    except urllib.error.HTTPError as e:
        return e.code, None
    except Exception as e:
        return None, str(e)

print("=" * 60)
print(" VERIFYING LIVE MANGANAI BACKEND (http://127.0.0.1:8001)")
print("=" * 60)

# 1. Health Probe
st, data = test_get("/health")
print(f"1. GET /health -> Status {st} | status={data.get('status') if data else None}")

# 2. System Status
st, data = test_get("/system/status")
print(f"2. GET /system/status -> Status {st} | backend={data.get('backend')}, db={data.get('database')}, ML shortfall={data.get('models', {}).get('shortfall_model')}")

# 3. Mines List
st, data = test_get("/api/mines")
print(f"3. GET /api/mines -> Status {st} | Loaded {len(data) if isinstance(data, list) else 0} MOIL mines")

# 4. Dashboard KPIs for Balaghat
st, data = test_get("/api/dashboard?mine_id=BALAGHAT-01")
print(f"4. GET /api/dashboard -> Status {st} | Mine: {data.get('mine', {}).get('name') if data else None}")

# 5. Live ML Shortfall Inference
shortfall_payload = {
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
    "production_target": 10000.0
}
st, data = test_post("/api/ml/predict-shortfall", shortfall_payload)
print(f"5. POST /api/ml/predict-shortfall (ML Inference) -> Status {st}")
if data:
    print(f"   -> Target: {data.get('target_production')} T | Predicted: {data.get('predicted_production')} T")
    print(f"   -> Expected Shortfall: {data.get('expected_shortfall')} T ({data.get('shortfall_pct')}%)")
    print(f"   -> Risk Level: {data.get('risk_level')} (Confidence: {data.get('confidence')}%)")
    print(f"   -> Contributing Factors count: {len(data.get('contributing_factors', []))}")

# 6. Live ML Reserve Prediction
reserve_payload = {
    "latitude": 21.8710,
    "longitude": 80.1830,
    "elevation": 330.0,
    "rainfall": 12.0,
    "soil_moisture": 35.0,
    "ndvi": 0.45,
    "lst_temp": 31.0
}
st, data = test_post("/api/ml/predict-reserve", reserve_payload)
print(f"6. POST /api/ml/predict-reserve (ML Inference) -> Status {st}")
if data:
    print(f"   -> Reserve Probability: {data.get('reserve_probability')}%")
    print(f"   -> Estimated Reserve: {data.get('estimated_reserve_mt')} MT")
    print(f"   -> Confidence: {data.get('confidence')}%")

# 7. Equipment Fleet Telemetry
st, data = test_get("/api/equipment?mine_id=BALAGHAT-01")
print(f"7. GET /api/equipment -> Status {st} | Fleet units: {len(data.get('equipment', [])) if data else 0}")

# 8. Weather & Environmental Telemetry
st, data = test_get("/api/weather?mine_id=BALAGHAT-01")
print(f"8. GET /api/weather -> Status {st} | Satellite telemetry: {data.get('current', {}).get('condition') if data else None}")

# 9. AI Recommendations
st, data = test_get("/api/recommendations?mine_id=BALAGHAT-01")
print(f"9. GET /api/recommendations -> Status {st} | Active recommendations: {len(data) if isinstance(data, list) else 0}")

print("=" * 60)
print(" LIVE VERIFICATION COMPLETE!")
print("=" * 60)
