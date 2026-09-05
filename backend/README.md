# ManganAI Backend Service

**Production-grade AI & Operations Intelligence API for MOIL (Manganese Ore India Limited)**

The ManganAI backend serves real-time predictive analytics, telemetry aggregation, space-technology environmental data, and AI-powered operational recommendations to mitigate production shortfalls and assist exploration in manganese mining operations.

---

## Key Capabilities

1. **Production Shortfall Prediction**:
   - Machine Learning inference using pre-trained Random Forest model (`backend/ml/shortfall/production_model.pkl`).
   - Dynamically predicts production deficit based on 13 features: rainfall, soil moisture, equipment availability, equipment downtime, utilization, maintenance hours, truck count, drilling delays, blast delays, and production targets.
   - Outputs shortfall risk classification (`LOW`, `MEDIUM`, `HIGH`), confidence score, and contributing factors breakdown.

2. **Reserve Identification & Exploration**:
   - Mineral reserve estimation model (`backend/ml/reserve/reserve_model.pkl`).
   - Leverages geospatial & space-tech indices: NDVI vegetation anomaly, Land Surface Temperature (LST), elevation, rainfall, soil moisture, and coordinates.
   - Serves exploration zones across major MOIL assets (Balaghat, Dongri Buzurg, Chikla, Ukwa).

3. **Fleet & Equipment Monitoring**:
   - Real-time equipment status, health telemetry, utilization metrics, and haulage route cycle tracking.

4. **Environmental & Telemetry Aggregation**:
   - Multi-layer weather telemetry (precipitation, soil saturation, humidity, ambient temperature) integrated into risk forecasting.

5. **Actionable Operations Recommendations**:
   - Intelligent mitigation protocols for immediate shortfall recovery (equipment reallocation, pit drainage, blast rescheduling, pre-emptive maintenance).

---

## Tech Stack

- **Framework**: FastAPI (Python 3.11+)
- **ORM / Database**: SQLAlchemy + SQLite (`manganai.db`)
- **Validation**: Pydantic v2
- **Data & ML**: Scikit-learn, Pandas, NumPy, Joblib
- **Testing**: Pytest + Starlette TestClient (35 automated tests)

---

## Directory Structure

```
backend/
├── conftest.py          # Pytest configuration & warning suppressions
├── database.py          # SQLAlchemy engine & session factory
├── Dockerfile           # Production container build definition
├── main.py              # Application entrypoint, lifespan loader, CORS
├── manganai.db          # SQLite operational database
├── ml/                  # Pre-trained Random Forest model binaries
│   ├── reserve/         # Reserve estimation model & feature columns
│   └── shortfall/       # Production shortfall model & feature columns
├── models/              # SQLAlchemy database ORM models
│   ├── equipment.py
│   ├── exploration_zones.py
│   ├── mine.py
│   ├── predictions.py
│   ├── production.py
│   ├── recommendations.py
│   └── weather.py
├── requirements.txt     # Locked production dependencies
├── routers/             # Modular API route controllers
│   ├── dashboard.py
│   ├── equipment.py
│   ├── exploration.py
│   ├── mines.py
│   ├── production.py
│   ├── recommendations.py
│   ├── risk.py
│   ├── system.py
│   └── weather.py
├── schemas/             # Pydantic v2 request/response validation schemas
├── seed.py              # MOIL assets seed data generator
├── services/
│   └── ml_service.py    # Model loader, feature aligner & inference service
└── test_api.py          # 35-test automated regression suite
```

---

## Getting Started

### 1. Virtual Environment & Dependencies
```powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Seed Database
```powershell
python seed.py
```

### 3. Run Automated Tests
```powershell
pytest test_api.py
```

### 4. Start Development Server
```powershell
uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

Interactive Swagger API docs available at: `http://127.0.0.1:8001/docs`

---

## API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` / `/api/health` | System health probe |
| `GET` | `/system/status` | Backend, DB, and ML model status |
| `GET` | `/mines` / `/api/mines` | List all 5 MOIL mines |
| `GET` | `/mines/{id}` | Specific mine profile & parameters |
| `GET` | `/dashboard` / `/api/dashboard` | Aggregated telemetry & KPIs |
| `GET` | `/exploration/zones` | Exploration zones with reserve probability |
| `POST` | `/predict_reserve` | ML Reserve estimation |
| `POST` | `/predict_shortfall` | ML Production shortfall prediction |
| `GET` | `/production` | Production conditions & factors |
| `GET` | `/production/trends` | Historical production trend (7d/30d) |
| `GET` | `/equipment` | Fleet status and availability |
| `GET` | `/haulage` | Haulage routes, turnaround times |
| `GET` | `/weather` | Microclimate observations & satellite layers |
| `GET` | `/risk` | 7-day risk forecast & contributors |
| `GET` | `/recommendations` | Active AI recovery recommendations |
