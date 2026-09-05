# ManganAI — Operational AI & Space Intelligence Platform for MOIL

**AI/ML & Space Technology for Manganese Reserve Identification & Production Shortfall Prediction**

ManganAI is an end-to-end operational intelligence platform engineered for **Manganese Ore India Limited (MOIL)**. It fuses satellite Earth observations (optical NDVI, thermal LST, precipitation radar), telemetry from underground & open-cast mine fleets, and machine learning models to identify high-potential manganese reserves and proactively mitigate daily production shortfalls.

---

## Key Features

1. **Production Shortfall Prediction**:
   - Machine learning inference powered by a trained **Random Forest** model.
   - Evaluates 13 operational and environmental features (rainfall, soil moisture, equipment availability, equipment downtime, equipment utilization, maintenance hours, haulage truck count, drilling delays, blast delays, production targets).
   - Produces predicted daily output, expected tonnage shortfall, shortfall risk classification (`LOW`, `MEDIUM`, `CRITICAL`), confidence metrics, and individual contributing factors with actionable attribution.

2. **Geospatial & Satellite Reserve Identification**:
   - Mineral reserve estimation powered by pre-trained Scikit-learn Random Forest regression.
   - Ingests multi-spectral indices: Normalized Difference Vegetation Index (NDVI), Land Surface Temperature (LST), elevation, surface moisture, and geographic coordinates.
   - Pinpoints exploration zones across key MOIL concessions (Balaghat, Dongri Buzurg, Chikla, Ukwa, Tirodi).

3. **Fleet Telemetry & Haulage Operations**:
   - Real-time tracking of heavy mining equipment (hydraulic shovels, underground LHDs, twin-boom drills, jaw crushers, tippers).
   - Cycle time analysis, availability tracking, and automated redeployment suggestions during equipment breakdown.

4. **Environmental & Space Telemetry**:
   - Integrated weather monitoring (precipitation, soil saturation, humidity, ambient temperature).
   - Early warning alerts for pit flooding, ramp traction loss, and high-bench instability.

5. **Actionable Operational Directives**:
   - Automated recommendations generated to recover lost tonnage (e.g. equipment redeployment, water pumping, blast window rescheduling, pre-emptive crusher maintenance).

---

## System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React 19 Frontend                    │
│      (TailwindCSS, Recharts, Leaflet, Lucide Icons)     │
└───────────────────────────┬────────────────────────────┘
                            │ REST API / JSON
                            ▼
┌────────────────────────────────────────────────────────┐
│                 FastAPI Backend Engine                 │
│         (Lifespan Model Loader, CORS, Pydantic)        │
└──────────┬─────────────────────────────┬───────────────┘
           │                             │
           ▼                             ▼
┌───────────────────────┐   ┌────────────────────────────┐
│   SQLite Database     │   │     Trained ML Models      │
│     (manganai.db)     │   │ (RandomForest Regressors)  │
│ - Mines & KPIs        │   │ - Shortfall Prediction     │
│ - Equipment Fleet     │   │ - Reserve Estimation       │
│ - Weather Telemetry   │   └────────────────────────────┘
│ - Recommendations     │
└───────────────────────┘
```

---

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, React-Router-DOM, Leaflet & React-Leaflet, Recharts, Lucide-React.
- **Backend**: FastAPI, Python 3.11+, SQLAlchemy, SQLite, Pydantic v2.
- **Machine Learning**: Scikit-learn, Pandas, NumPy, Joblib.
- **Testing**: Pytest, Starlette TestClient (35 automated tests, 100% pass rate).
- **Deployment**: Docker, Docker Compose, Nginx.

---

## Folder Structure

```
ps9/
├── backend/
│   ├── conftest.py          # Pytest configuration & warning suppression
│   ├── database.py          # SQLAlchemy database connection
│   ├── Dockerfile           # Backend container specification
│   ├── main.py              # Application entrypoint & CORS
│   ├── manganai.db          # SQLite operational database
│   ├── ml/                  # Trained machine learning model binaries (.pkl)
│   │   ├── reserve/         # Reserve estimation model & feature columns
│   │   └── shortfall/       # Production shortfall model & feature columns
│   ├── models/              # SQLAlchemy database ORM models
│   ├── requirements.txt     # Python production dependencies
│   ├── routers/             # Modular FastAPI API route handlers
│   ├── schemas/             # Pydantic v2 validation schemas
│   ├── seed.py              # MOIL assets seed data generator
│   ├── services/            # Model inference & business logic
│   └── test_api.py          # 35-test automated regression suite
├── frontend/
│   ├── Dockerfile           # Multi-stage frontend container specification
│   ├── nginx.conf           # Production Nginx reverse proxy configuration
│   ├── package.json         # Node dependencies and build scripts
│   ├── src/                 # React application components and views
│   └── vite.config.js       # Vite build configuration
├── docker-compose.yml       # One-click multi-container deployment
├── .gitignore               # Secrets and dependency exclusion
└── README.md                # Project documentation
```

---

## Environment Variables

### Backend (`backend/.env`):
```ini
DATABASE_URL=sqlite:///./manganai.db
FRONTEND_ORIGIN=http://localhost:5174
HOST=127.0.0.1
PORT=8001
SHORTFALL_MODEL_PATH=./ml/shortfall/production_model.pkl
SHORTFALL_COLS_PATH=./ml/shortfall/prod_feature_columns.pkl
RESERVE_MODEL_PATH=./ml/reserve/reserve_model.pkl
```

### Frontend (`frontend/.env`):
```ini
VITE_API_BASE_URL=http://127.0.0.1:8001
```

---

## Local Setup & Quick Start

### 1. Prerequisites
- Python 3.11 or higher
- Node.js 18+ and npm
- Git

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python seed.py
pytest test_api.py
uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```
The backend will run on **`http://127.0.0.1:8001`**. Interactive Swagger documentation is at **`http://127.0.0.1:8001/docs`**.

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on **`http://localhost:5174`** (or `http://localhost:5173`).

---

## Docker Deployment (One-Click Launch)

Run both the frontend and backend simultaneously using Docker Compose:
```bash
docker compose up --build
```
- Access the web interface at **`http://localhost:5174`**
- Access the backend API at **`http://localhost:8001/docs`**

---

## API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` / `/api/health` | System health probe |
| `GET` | `/system/status` | Backend, DB, and ML model status |
| `GET` | `/mines` / `/api/mines` | List all 5 MOIL mines |
| `GET` | `/mines/{mine_id}` | Detailed mine metrics & telemetry |
| `GET` | `/dashboard` / `/api/dashboard` | Aggregated telemetry & KPIs |
| `GET` | `/exploration/zones` | Exploration zones with reserve probability |
| `POST` | `/predict_reserve` | ML reserve estimation |
| `POST` | `/predict_shortfall` | ML production shortfall prediction |
| `GET` | `/production` | Production conditions & factors |
| `GET` | `/production/trends` | Historical production trend (7d/30d) |
| `GET` | `/equipment` | Fleet status and availability |
| `GET` | `/haulage` | Haulage routes & turnaround metrics |
| `GET` | `/weather` | Microclimate observations & satellite layers |
| `GET` | `/risk` | 7-day risk forecast & contributors |
| `GET` | `/recommendations` | Active AI recovery directives |

---

## Verification & Automated Testing

To run the full automated test suite:
```bash
cd backend
pytest test_api.py
```
**Results**: 35 automated tests covering all endpoints, database operations, error cases (404/422), and real ML predictions pass with 100% success rate.
