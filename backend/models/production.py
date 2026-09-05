from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey
from database import Base

class Production(Base):
    __tablename__ = "production"

    id = Column(Integer, primary_key=True, index=True)
    mine_id = Column(String, ForeignKey("mines.id"), index=True)
    production_date = Column(String, index=True) # YYYY-MM-DD
    target_production = Column(Float, default=10000.0)
    actual_production = Column(Float, default=0.0)
    predicted_production = Column(Float, default=0.0)
    expected_shortfall = Column(Float, default=0.0)
    shortfall_percentage = Column(Float, default=0.0)
    rainfall = Column(Float, default=0.0)
    equipment_availability = Column(Float, default=90.0)
    manganese_grade = Column(Float, default=38.0)
