from sqlalchemy import Column, Integer, Float, String, ForeignKey
from database import Base

class Weather(Base):
    __tablename__ = "weather"

    id = Column(Integer, primary_key=True, index=True)
    mine_id = Column(String, ForeignKey("mines.id"), index=True)
    observation_date = Column(String, index=True)
    rainfall = Column(Float, default=0.0) # mm
    soil_moisture = Column(Float, default=50.0) # %
    temperature = Column(Float, default=30.0) # °C
    ndvi = Column(Float, default=0.45)
    lst_temp_c = Column(Float, default=32.0)
    humidity = Column(Float, default=70.0)
    wind_speed_kmh = Column(Float, default=12.0)
    weather_condition = Column(String, default="Normal")
    data_status = Column(String, default="Satellite / AWS Telemetry")
