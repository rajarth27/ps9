from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from database import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String, primary_key=True, index=True) # e.g. "REC-001"
    mine_id = Column(String, ForeignKey("mines.id"), index=True)
    category = Column(String, nullable=False) # Equipment Redeployment, Weather Preparation, etc.
    title = Column(String, nullable=False)
    issue = Column(String)
    cause = Column(String)
    action = Column(Text)
    expected_impact = Column(String)
    expected_recovery_tonnes = Column(Float, default=0.0)
    priority = Column(String, default="MEDIUM") # HIGH, MEDIUM, LOW
    status = Column(String, default="Pending Action")
    confidence = Column(Integer, default=90)
    created_time = Column(String)
