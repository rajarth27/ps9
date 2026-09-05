import React from 'react';
import { CloudRain, Droplets, Thermometer, Trees, Sun, Satellite } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export function SpaceWeatherCards({ weather }) {
  if (!weather) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <StatCard
        title="Rainfall"
        value={weather.rainfall}
        unit="mm"
        secondaryMetric="GPM IMERG Sat"
        status={weather.rainfall > 35 ? 'WARNING' : 'NORMAL'}
        icon={CloudRain}
        variant={weather.rainfall > 35 ? 'blue' : 'default'}
      />

      <StatCard
        title="Soil Moisture"
        value={weather.soilMoisture}
        unit="%"
        secondaryMetric="SMAP Surface Sat."
        status={weather.soilMoisture > 60 ? 'WARNING' : 'NORMAL'}
        icon={Droplets}
        variant={weather.soilMoisture > 60 ? 'blue' : 'default'}
      />

      <StatCard
        title="Temperature"
        value={weather.temperature}
        unit="°C"
        secondaryMetric="Surface AWS"
        status="NORMAL"
        icon={Thermometer}
        variant="amber"
      />

      <StatCard
        title="NDVI Vegetation"
        value={weather.ndvi}
        secondaryMetric="Sentinel-2 MSI"
        status="ACTIVE"
        icon={Trees}
        variant="green"
      />

      <StatCard
        title="Land Surface Temp"
        value={weather.lstTempC}
        unit="°C"
        secondaryMetric="Landsat-9 TIRS"
        status="NORMAL"
        icon={Sun}
        variant="amber"
      />
    </div>
  );
}
