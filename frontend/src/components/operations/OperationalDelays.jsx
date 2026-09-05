import React from 'react';
import { Clock, Flame, CheckCircle2, AlertTriangle, ArrowRight, Activity, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export function OperationalDelays({ drillingDelay = 2.0, blastDelay = 1.0, className = '' }) {
  const pipelineSteps = [
    {
      stage: "Drilling",
      status: "COMPLETED",
      statusLabel: "✓ Completed",
      badgeVariant: "active",
      delayHours: drillingDelay,
      note: "Block 7 drill pattern completed with 2.0h manifold stabilization delay."
    },
    {
      stage: "Blasting",
      status: "DELAYED",
      statusLabel: "⚠ Delayed",
      badgeVariant: "warning",
      delayHours: blastDelay,
      note: "Electronic detonator timing check + post-blast gas clearance pending (1.0h delay)."
    },
    {
      stage: "Haulage",
      status: "OPERATIONAL",
      statusLabel: "✓ Operational",
      badgeVariant: "active",
      delayHours: 0.3,
      note: "27 trucks actively hauling from Level -380m and North Highwall."
    },
    {
      stage: "Production",
      status: "AT RISK",
      statusLabel: "⚠ At Risk",
      badgeVariant: "critical",
      delayHours: null,
      note: "Overall production forecast at 9,300 T (700 T projected shortfall)."
    }
  ];

  return (
    <div className={`glass-panel p-5 rounded-xl border border-slate-800 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Operational Delays & Staging Flow
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40">
              Drilling & Blasting Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time bottleneck propagation across the extraction chain
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1 text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Drill Delay: <strong>{drillingDelay} hrs</strong></span>
          </div>
          <div className="flex items-center gap-1 text-rose-400">
            <Flame className="w-3.5 h-3.5" />
            <span>Blast Delay: <strong>{blastDelay} hr</strong></span>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Status Cards (Section 17 specification) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {pipelineSteps.map((step, idx) => {
          let cardBg = 'bg-mining-900 border-slate-800';
          let textColor = 'text-white';
          if (step.status === 'COMPLETED' || step.status === 'OPERATIONAL') {
            cardBg = 'bg-mining-900/90 border-emerald-500/30 bg-gradient-to-b from-mining-900 to-emerald-950/20';
            textColor = 'text-emerald-300';
          } else if (step.status === 'DELAYED') {
            cardBg = 'bg-mining-900/90 border-amber-500/30 bg-gradient-to-b from-mining-900 to-amber-950/20';
            textColor = 'text-amber-300';
          } else if (step.status === 'AT RISK') {
            cardBg = 'bg-mining-900/90 border-rose-500/30 bg-gradient-to-b from-mining-900 to-rose-950/20';
            textColor = 'text-rose-300';
          }

          return (
            <div key={idx} className={`p-3.5 rounded-xl border ${cardBg} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {step.stage}
                  </span>
                  <StatusBadge status={step.status} size="sm" />
                </div>
                <div className={`text-base font-bold font-mono ${textColor} mb-1.5`}>
                  {step.statusLabel}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {step.note}
                </p>
              </div>

              {step.delayHours !== null && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Logged Delay:</span>
                  <span className={step.delayHours > 1 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                    +{step.delayHours} hrs
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Operational Relationship Banner */}
      <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
        <Activity className="w-4 h-4 text-sky-400 flex-shrink-0" />
        <div>
          <strong className="text-white">Operational Relationship Note:</strong> High blast delay impedes face advancement and cascades into loader idle periods, exacerbating the production shortfall caused by equipment downtime.
        </div>
      </div>
    </div>
  );
}
