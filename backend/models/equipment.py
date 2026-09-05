from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(String, primary_key=True, index=True) # e.g. "EX-017"
    mine_id = Column(String, ForeignKey("mines.id"), index=True)
    type = Column(String, nullable=False) # Excavators, Dumpers, Drills, Loaders, Haulage Trucks, Crushers
    model = Column(String)
    status = Column(String, default="ACTIVE") # ACTIVE, WARNING, MAINTENANCE, DOWN
    availability = Column(Float, default=90.0)
    utilization = Column(Float, default=80.0)
    downtime_hours = Column(Float, default=0.0)
    maintenance_hours = Column(Float, default=0.0)
    last_maintenance = Column(String)
    location = Column(String)
    production_impact_tonnes = Column(Float, default=0.0)
    ai_recommendation = Column(String)
