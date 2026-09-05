from sqlalchemy import Column, Integer, String, Float
from database import Base

class Mine(Base):
    __tablename__ = "mines"

    id = Column(String, primary_key=True, index=True) # e.g. "BALAGHAT-01"
    name = Column(String, nullable=False)
    state = Column(String)
    district = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    type = Column(String)
    depth_meters = Column(Integer, default=0)
    status = Column(String, default="Active")
    reserve_mt = Column(Float, default=0.0)
    grade_percent = Column(Float, default=0.0)
    daily_target = Column(Float, default=0.0)
    current_production = Column(Float, default=0.0)
    predicted_production = Column(Float, default=0.0)
    expected_shortfall = Column(Float, default=0.0)
    shortfall_pct = Column(Float, default=0.0)
    risk_level = Column(String, default="LOW")
    confidence = Column(Integer, default=90)
    active_personnel = Column(Integer, default=0)
    description = Column(String)
