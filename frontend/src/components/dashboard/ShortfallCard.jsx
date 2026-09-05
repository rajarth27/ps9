import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, ArrowRight, Wrench, CloudRain, Flame } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export function ShortfallCard({
  expectedShortfall = 700,
  productionTarget = 10000,
  riskLevel = 'MEDIUM',
  confidence = 89,
  concerns = [
    { icon: Wrench, label: 'Equipment downtime (EX-017)', detail: '6.5 hrs lost in Stope B4' },
    { icon: CloudRain, label: 'Weather & Ramp Traction', detail: '42mm rainfall on haul decline' },
    { icon: Flame, label: 'Blast Delay', detail: '1.0 hr fume ventilation clearance' }
  ]
}) {
  const navigate = useNavigate();
  const shortfallPct = ((expectedShortfall / productionTarget) * 100).toFixed(1);

  return (
    <div className="glass-panel p-5 rounded-xl border border-amber-500/30 bg-gradient-to-b from-mining-850 via-mining-900 to-mining-850 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Daily ML Prediction
            </span>
            <h3 className="text-sm font-bold text-white tracking-wide">
              AI Shortfall Forecast
            </h3>
          </div>
          <StatusBadge status={riskLevel} size="md" />
        </div>

        {/* Big short fall numbers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Expected Shortfall</span>
            <div className="text-2xl font-black font-mono text-rose-400">
              {expectedShortfall.toLocaleString()} <span className="text-xs text-slate-400">T</span>
            </div>
            <span className="text-[11px] font-mono text-rose-400/80 font-semibold">
              -{shortfallPct}% of daily target
            </span>
          </div>

          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Model Confidence</span>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {confidence}<span className="text-xs font-normal text-slate-400">%</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>High Certainty</span>
            </div>
          </div>
        </div>

        {/* Primary Operational Concerns */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Primary Operational Concerns
          </span>
          <div className="space-y-1.5">
            {concerns.map((item, idx) => {
              const Icon = item.icon || AlertTriangle;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-mining-900/80 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="font-medium text-slate-200">{item.label}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{item.detail}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Button to run detailed analysis */}
      <button
        onClick={() => navigate('/production')}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-mining-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-green"
      >
        <span>Run Detailed Analysis</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
