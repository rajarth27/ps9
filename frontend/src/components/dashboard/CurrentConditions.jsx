import React from 'react';
import {
  CloudRain,
  Droplets,
  Thermometer,
  Cpu,
  Clock,
  Gauge,
  Wrench,
  Truck,
  Flame,
  Target,
  AlertCircle
} from 'lucide-react';
import { CURRENT_CONDITIONS } from '../../data/production';

export function CurrentConditions({ data = CURRENT_CONDITIONS }) {
  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Current Mining Conditions
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/70 text-sky-300 border border-sky-500/40">
              ML Feature Vector
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry inputs continuously streaming into the Shortfall & Risk ML models
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-mining-850 px-2.5 py-1 rounded-lg border border-slate-800">
          <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Shift #1 Telemetry</span>
        </div>
      </div>

      {/* Grid of ML inputs organized by category */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* Weather: Rainfall */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-sky-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Rainfall</span>
            <CloudRain className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.rainfall} <span className="text-xs font-normal text-slate-400">mm</span>
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5 font-medium">Elevated (+27mm)</div>
        </div>

        {/* Weather: Soil Moisture */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-sky-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Soil Moisture</span>
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.soilMoisture} <span className="text-xs font-normal text-slate-400">%</span>
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5 font-medium">Bench Saturation</div>
        </div>

        {/* Weather: Temperature */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Temperature</span>
            <Thermometer className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.temperature} <span className="text-xs font-normal text-slate-400">°C</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">Nominal Operating</div>
        </div>

        {/* Equipment: Availability */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-amber-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Equip. Availability</span>
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.equipmentAvailability} <span className="text-xs font-normal text-slate-400">%</span>
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5 font-medium">-6% vs Target</div>
        </div>

        {/* Equipment: Downtime */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-rose-500/30 bg-gradient-to-b from-mining-900 to-rose-950/10">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Equip. Downtime</span>
            <Clock className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-lg font-bold font-mono text-rose-300">
            {data.equipmentDowntime} <span className="text-xs font-normal text-slate-400">hrs</span>
          </div>
          <div className="text-[10px] text-rose-400 mt-0.5 font-medium">Critical (EX-017)</div>
        </div>

        {/* Equipment: Utilization */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Equip. Utilization</span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.equipmentUtilization} <span className="text-xs font-normal text-slate-400">%</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-medium">Active fleet capacity</div>
        </div>

        {/* Maintenance Hours */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Maintenance</span>
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.maintenanceHours} <span className="text-xs font-normal text-slate-400">hrs</span>
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5 font-medium">Crusher & Tipper shop</div>
        </div>

        {/* Haulage Trucks */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-emerald-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Haulage Trucks</span>
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.haulageTruckCount} <span className="text-xs font-normal text-slate-400">/ 30</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">27 Active / 2 Down</div>
        </div>

        {/* Drilling Delay */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Drilling Delay</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.drillingDelay} <span className="text-xs font-normal text-slate-400">hrs</span>
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5 font-medium">Drift C manifold</div>
        </div>

        {/* Blast Delay */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Blast Delay</span>
            <Flame className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {data.blastDelay} <span className="text-xs font-normal text-slate-400">hr</span>
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5 font-medium">Gas clearance check</div>
        </div>

        {/* Production Target */}
        <div className="p-3 rounded-lg bg-mining-900/90 border border-emerald-500/30 col-span-2 sm:col-span-3 lg:col-span-2">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium text-slate-300">Production Target</span>
            <Target className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold font-mono text-emerald-300">
            {data.productionTarget.toLocaleString()} <span className="text-xs font-normal text-slate-400">T / day</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-medium">Daily Mining Schedule Mandate</div>
        </div>
      </div>
    </div>
  );
}
