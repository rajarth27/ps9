import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export function RiskGauge({ score = 62, level = 'MEDIUM', summary, className = '' }) {
  // Angle calculation for 180-degree semi-circle gauge
  const percentage = Math.min(100, Math.max(0, score));
  const rotation = (percentage / 100) * 180 - 90;

  const getScoreColor = () => {
    if (score < 40) return 'text-emerald-400';
    if (score < 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className={`glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-between text-center ${className}`}>
      <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Overall Production Risk Score
          </h3>
        </div>
        <StatusBadge status={level} size="md" />
      </div>

      {/* Semi-circular gauge */}
      <div className="relative w-56 h-28 my-2 flex items-end justify-center overflow-hidden">
        {/* Background arc */}
        <div className="absolute top-0 w-56 h-56 rounded-full border-[14px] border-slate-800/80 border-b-transparent border-l-transparent" style={{ transform: 'rotate(45deg)' }} />
        
        {/* Active colored arc indicator */}
        <div
          className="absolute top-0 w-56 h-56 rounded-full border-[14px] border-transparent border-t-amber-500 border-r-amber-500 transition-transform duration-1000 ease-out"
          style={{
            transform: `rotate(${45 + (percentage / 100) * 180 - 180}deg)`,
            opacity: 0.85
          }}
        />

        {/* Center score readout */}
        <div className="relative z-10 flex flex-col items-center mb-1">
          <div className={`text-4xl font-black font-mono tracking-tight ${getScoreColor()}`}>
            {score}<span className="text-base font-normal text-slate-500">/100</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
            {level} RISK
          </span>
        </div>
      </div>

      {/* Threshold bands */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-500 px-4 mt-2">
        <span className="text-emerald-400">0 (Nominal)</span>
        <span className="text-amber-400">50 (Moderate)</span>
        <span className="text-rose-400">100 (Critical)</span>
      </div>

      <p className="text-xs text-slate-300 mt-4 leading-relaxed max-w-sm">
        {summary || "Moderate operational shortfall driven primarily by unscheduled excavator hydraulic downtime and rain-softened haul ramp traction."}
      </p>
    </div>
  );
}
