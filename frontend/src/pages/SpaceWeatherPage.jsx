import React from 'react';
import { useMine } from '../context/MineContext';
import { SpaceWeatherCards } from '../components/space-weather/SpaceWeatherCards';
import { SatelliteLayerMap } from '../components/space-weather/SatelliteLayerMap';
import { EnvironmentalImpact } from '../components/space-weather/EnvironmentalImpact';
import { CURRENT_WEATHER, WEATHER_FORECAST } from '../data/weather';
import { Satellite, CloudRain, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export function SpaceWeatherPage() {
  const { selectedMine } = useMine();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Satellite className="w-5 h-5 text-sky-400" />
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              Space & Environmental Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/70 text-sky-300 border border-sky-500/40">
              Earth Observation Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulated Sentinel-2, Landsat-9 and GPM IMERG microwave precipitation feeds for {selectedMine.name}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Demo Data Mode — High-Fidelity Simulation</span>
        </div>
      </div>

      {/* 5 Core Telemetry Cards (Section 18) */}
      <SpaceWeatherCards weather={CURRENT_WEATHER} />

      {/* Multi-Layer Satellite GIS Map (Section 18) */}
      <SatelliteLayerMap mine={selectedMine} />

      {/* Environmental Impact Analysis (Section 19) */}
      <EnvironmentalImpact
        rainfall={CURRENT_WEATHER.rainfall}
        soilMoisture={CURRENT_WEATHER.soilMoisture}
        temperature={CURRENT_WEATHER.temperature}
      />

      {/* 5-Day Environmental Outlook */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              5-Day Meteorological Projection & Mine Precipitation Risk
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Simulated ECMWF / IMD Grid</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {WEATHER_FORECAST.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-mining-900 border border-slate-800 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{item.day}</span>
                <StatusBadge status={item.risk} size="sm" />
              </div>
              <div className="text-[11px] text-slate-400 font-mono">{item.date} · {item.condition}</div>

              <div className="space-y-1 font-mono pt-1 border-t border-slate-800/80 text-[11px]">
                <div className="flex justify-between text-sky-400">
                  <span>Rain:</span>
                  <span className="font-bold">{item.rainfall} mm</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Soil Moisture:</span>
                  <span>{item.soilMoisture}%</span>
                </div>
                <div className="flex justify-between text-orange-400">
                  <span>Temp:</span>
                  <span>{item.temp}°C</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
