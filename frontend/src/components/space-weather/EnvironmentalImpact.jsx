import React from 'react';
import { CloudRain, Droplets, Thermometer, ShieldAlert, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { ENVIRONMENTAL_IMPACTS } from '../../data/weather';

export function EnvironmentalImpact({ rainfall = 42, soilMoisture = 61, temperature = 31 }) {
  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Environmental Impact on Production
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Empirical correlation between environmental parameters and pit extraction continuity
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-mining-850 px-2.5 py-1 rounded-lg border border-slate-800">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>Operational Risk Evaluation</span>
        </div>
      </div>

      {/* 3 Core Meteorological Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="p-3.5 rounded-xl bg-mining-900 border border-sky-500/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-300">Rainfall</span>
            <StatusBadge status={rainfall > 35 ? 'WARNING' : 'NORMAL'} size="sm" />
          </div>
          <div className="text-2xl font-black font-mono text-white mb-1">
            {rainfall} <span className="text-xs text-slate-400">mm</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Recorded over the past 24-hour cycle across the mine lease area.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-mining-900 border border-sky-500/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-300">Soil Moisture</span>
            <StatusBadge status={soilMoisture > 60 ? 'WARNING' : 'NORMAL'} size="sm" />
          </div>
          <div className="text-2xl font-black font-mono text-white mb-1">
            {soilMoisture} <span className="text-xs text-slate-400">%</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Surface saturation index derived from microwave satellite sensing.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-mining-900 border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-300">Ambient Temperature</span>
            <StatusBadge status="NORMAL" size="sm" />
          </div>
          <div className="text-2xl font-black font-mono text-white mb-1">
            {temperature} <span className="text-xs text-slate-400">°C</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Within nominal operating limits for machinery cooling and ventilation.
          </p>
        </div>
      </div>

      {/* Operational Impact Analysis (Careful Language without false causal claims) */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <span>Operational Impact & Engineering Considerations</span>
          <span className="text-[10px] font-mono text-slate-400 font-normal">
            (Observed correlation patterns)
          </span>
        </h4>

        <div className="space-y-2.5">
          {ENVIRONMENTAL_IMPACTS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-mining-900/90 border border-slate-800 text-xs space-y-1 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{item.parameter}</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                  item.level === 'warning' 
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' 
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                <strong className="text-slate-200">Observation:</strong> {item.observation}
              </p>
              <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
                <strong className="text-amber-400">Operational Consideration:</strong> {item.operationalConsideration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
