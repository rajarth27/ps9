"""
ManganAI FastAPI Backend Service
AI-Powered Manganese Mining Intelligence Platform for MOIL (Manganese Ore India Limited)

This production-grade backend serves:
- Geospatial exploration and manganese reserve identification
- Multi-factor operational shortfall predictions using trained Scikit-learn models
- Heavy mining equipment telemetry & haulage cycle monitoring
- Satellite Earth observation weather feeds (Sentinel-2, GPM IMERG, Landsat-9)
- Predictive risk evaluation and prescriptive AI decision directives
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.ml_service import load_models
import routers

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager: loads ML models into memory once at server startup."""
    print("==================================================")
    print(" Starting ManganAI Intelligence Engine Backend...")
    print("==================================================")
    load_models()
    yield
    print("[ManganAI Backend] Server shutting down cleanly.")


app = FastAPI(
    title="ManganAI Intelligence Engine API",
    description="Enterprise AI/ML + Space Telemetry Decision Support Platform for MOIL",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend applications
frontend_env = os.getenv("FRONTEND_ORIGIN")
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:3000",
]
if frontend_env and frontend_env not in allowed_origins:
    allowed_origins.append(frontend_env)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ps9-adgol5dey-the-heisenberg-code.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register modular routers
app.include_router(routers.system.router)
app.include_router(routers.mines.router)
app.include_router(routers.dashboard.router)
app.include_router(routers.production.router)
app.include_router(routers.exploration.router)
app.include_router(routers.equipment.router)
app.include_router(routers.weather.router)
app.include_router(routers.risk.router)
app.include_router(routers.recommendations.router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8001"))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
