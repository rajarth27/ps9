from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

class ExplorationZone(Base):
    __tablename__ = "exploration_zones"

    id = Column(String, primary_key=True, index=True) # e.g. "ZONE-M17"
    mine_id = Column(String, ForeignKey("mines.id"), index=True)
    zone_name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_m = Column(Float, default=300.0)
    strata = Column(String)
    reserve_probability = Column(Float, default=75.0)
    estimated_reserve_mt = Column(Float, default=2.0)
    predicted_grade = Column(Float, default=35.0)
    confidence = Column(Integer, default=90)
    risk_level = Column(String, default="LOW")
    soil_moisture = Column(Float, default=50.0)
    rainfall_mm = Column(Float, default=30.0)
    ndvi = Column(Float, default=0.4)
    lst_temp_c = Column(Float, default=30.0)
    drill_holes_completed = Column(Integer, default=10)
    recommended_action = Column(String)
    last_survey_date = Column(String)
