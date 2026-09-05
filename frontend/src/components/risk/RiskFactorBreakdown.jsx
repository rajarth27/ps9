import React from 'react';
import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { RISK_CONTRIBUTORS } from '../../data/risk';

export function RiskFactorBreakdown({ contributors = RISK_CONTRIBUTORS }) {
  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Risk Contributors & Root-Cause Weights</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational bottlenecks ranked by their weighted contribution to expected production loss
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-mining-850 px-2.5 py-1 rounded-lg border border-slate-800">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Composite Multi-Factor Attribution</span>
        </div>
      </div>

      <div className="space-y-3">
        {contributors.map((item, idx) => {
          const barColor = item.severity === 'HIGH' 
            ? 'bg-rose-500' 
            : item.severity === 'MEDIUM' 
            ? 'bg-amber-500' 
            : 'bg-emerald-500';

          return (
            <div
              key={idx}
              className="p-3 rounded-xl bg-mining-900/80 border border-slate-800/80 text-xs space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="font-mono text-slate-400 text-[11px]">({item.value})</span>
                  <span className="text-[10px] text-slate-500 px-1.5 py-0.2 rounded bg-mining-800 border border-slate-700/50">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-200">
                    +{item.riskPoints} pts
                  </span>
                  <StatusBadge status={item.severity} size="sm" />
                </div>
              </div>

              {/* Visual impact bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{ width: `${Math.min(100, item.riskPoints * 4)}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
