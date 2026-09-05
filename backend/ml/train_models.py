"""
Self-contained ML Model Training and Export Script for ManganAI
Trains and serializes:
1. Production Shortfall RandomForestRegressor model
2. Multi-spectral Reserve Exploration RandomForestRegressor model
"""

import os
import pickle
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor

def train_shortfall_model():
    print("[1/2] Training Production Shortfall ML Model...")
    np.random.seed(42)
    n_samples = 2500

    feature_cols = [
        'equipment_availability',
        'equipment_downtime',
        'maintenance_hours',
        'drilling_delay',
        'blast_delay',
        'rainfall',
        'soil_moisture',
        'temperature',
        'truck_count',
        'haulage_delay',
        'previous_day_production',
        'previous_7day_average',
        'target_production'
    ]

    # Generate realistic mining distributions
    target_production = np.random.choice([5000.0, 7500.0, 10000.0], size=n_samples, p=[0.2, 0.3, 0.5])
    equip_avail = np.random.uniform(70.0, 98.0, size=n_samples)
    equip_downtime = np.random.exponential(scale=6.0, size=n_samples) # hours
    maint_hours = np.random.uniform(1.0, 12.0, size=n_samples)
    drill_delay = np.random.exponential(scale=1.5, size=n_samples)
    blast_delay = np.random.exponential(scale=1.2, size=n_samples)
    rainfall = np.random.exponential(scale=15.0, size=n_samples) # mm
    soil_moisture = np.clip(30.0 + rainfall * 0.7 + np.random.normal(0, 5, size=n_samples), 20.0, 95.0)
    temp = np.random.uniform(22.0, 42.0, size=n_samples)
    truck_count = np.random.randint(20, 31, size=n_samples)
    haulage_delay = np.random.exponential(scale=1.0, size=n_samples)
    prev_prod = target_production * np.random.uniform(0.85, 1.02, size=n_samples)
    prev_7d_avg = target_production * np.random.uniform(0.88, 1.0, size=n_samples)

    # Physical mining extraction dynamics formula
    # Target baseline production adjusted by availability, weather delays, and haulage
    efficiency = (
        (equip_avail / 95.0) * 0.40 +
        (truck_count / 28.0) * 0.25 +
        (prev_prod / target_production) * 0.15 +
        (prev_7d_avg / target_production) * 0.10 -
        (equip_downtime / 30.0) * 0.15 -
        (rainfall / 80.0) * 0.10 -
        (drill_delay / 10.0) * 0.05 -
        (blast_delay / 10.0) * 0.05
    )
    efficiency = np.clip(efficiency, 0.45, 1.05)
    actual_production = np.round(target_production * efficiency + np.random.normal(0, 75, size=n_samples))

    df = pd.DataFrame({
        'equipment_availability': equip_avail,
        'equipment_downtime': equip_downtime,
        'maintenance_hours': maint_hours,
        'drilling_delay': drill_delay,
        'blast_delay': blast_delay,
        'rainfall': rainfall,
        'soil_moisture': soil_moisture,
        'temperature': temp,
        'truck_count': truck_count,
        'haulage_delay': haulage_delay,
        'previous_day_production': prev_prod,
        'previous_7day_average': prev_7d_avg,
        'target_production': target_production,
    })

    X = df[feature_cols]
    y = actual_production

    model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42, n_jobs=-1)
    model.fit(X, y)

    os.makedirs("ml/shortfall", exist_ok=True)
    model_path = "ml/shortfall/production_model.pkl"
    cols_path = "ml/shortfall/prod_feature_columns.pkl"

    joblib.dump(model, model_path)
    with open(cols_path, "wb") as f:
        pickle.dump(feature_cols, f)

    print(f"Shortfall model saved: {model_path}")
    print(f"Feature columns saved: {cols_path}")


def train_reserve_model():
    print("[2/2] Training Exploration Reserve ML Model...")
    np.random.seed(42)
    n_samples = 1500

    feature_cols = [
        'latitude',
        'longitude',
        'elevation',
        'rainfall',
        'soil_moisture',
        'ndvi',
        'lst_temp'
    ]

    # MOIL Central India manganese belt (Madhya Pradesh & Maharashtra)
    lats = np.random.uniform(21.4, 22.1, size=n_samples)
    lons = np.random.uniform(79.5, 80.6, size=n_samples)
    elev = np.random.uniform(250.0, 480.0, size=n_samples)
    rain = np.random.uniform(10.0, 60.0, size=n_samples)
    moist = np.random.uniform(35.0, 85.0, size=n_samples)
    ndvi = np.random.uniform(0.2, 0.7, size=n_samples)
    lst = np.random.uniform(24.0, 38.0, size=n_samples)

    # Multi-spectral probability function
    prob = 65.0 + (elev - 300) * 0.05 - np.abs(ndvi - 0.42) * 40.0 + (32.0 - np.abs(lst - 30.0)) * 0.5
    prob = np.clip(prob + np.random.normal(0, 5, size=n_samples), 35.0, 96.0)

    X = pd.DataFrame({
        'latitude': lats,
        'longitude': lons,
        'elevation': elev,
        'rainfall': rain,
        'soil_moisture': moist,
        'ndvi': ndvi,
        'lst_temp': lst
    })
    y = prob

    reserve_model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42, n_jobs=-1)
    reserve_model.fit(X, y)

    os.makedirs("ml/reserve", exist_ok=True)
    reserve_path = "ml/reserve/reserve_model.pkl"
    reserve_cols_path = "ml/reserve/reserve_feature_columns.pkl"

    joblib.dump(reserve_model, reserve_path)
    with open(reserve_cols_path, "wb") as f:
        pickle.dump(feature_cols, f)

    print(f"Reserve model saved: {reserve_path}")
    print(f"Reserve columns saved: {reserve_cols_path}")


if __name__ == "__main__":
    train_shortfall_model()
    train_reserve_model()
    print("All ML Models Trained and Serialized Successfully!")
