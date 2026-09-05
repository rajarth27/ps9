from sqlalchemy import Column, Integer, Float, String, ForeignKey, Text
from database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    mine_id = Column(String, ForeignKey("mines.id"), index=True)
    prediction_type = Column(String, default="SHORTFALL") # SHORTFALL or RESERVE
    prediction_date = Column(String, index=True)
    predicted_production = Column(Float, nullable=True)
    expected_shortfall = Column(Float, nullable=True)
    shortfall_percentage = Column(Float, nullable=True)
    reserve_probability = Column(Float, nullable=True)
    estimated_reserve = Column(Float, nullable=True)
    predicted_grade = Column(Float, nullable=True)
    risk_level = Column(String, default="LOW")
    model_confidence = Column(Integer, default=90)
    contributing_factors_json = Column(Text, nullable=True)
    created_at = Column(String)
