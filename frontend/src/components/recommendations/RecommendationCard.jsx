import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export function RecommendationCard({ recommendation, onSimulate }) {
  const [acknowledged, setAcknowledged] = useState(false);

  const priorityBorder = {
    HIGH: 'border-rose-500/40 bg-gradient-to-br from-mining-900 to-rose-950/15',
    MEDIUM: 'border-amber-500/40 bg-gradient-to-br from-mining-900 to-amber-950/15',
    LOW: 'border-emerald-500/30 bg-gradient-to-br from-mining-900 to-emerald-950/15',
  }[recommendation.priority] || 'border-slate-800';

  return (
    <div className={`glass-panel p-5 rounded-2xl border ${priorityBorder} space-y-4 shadow-lg transition-all hover:border-slate-600`}>
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StatusBadge status={recommendation.priority} size="md" />
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {recommendation.category}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              ID: {recommendation.id}
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            {recommendation.title}
          </h3>
        </div>

        {/* Expected Recovery Callout */}
        <div className="text-left sm:text-right bg-mining-900/90 p-2.5 rounded-xl border border-slate-800 min-w-max">
          <span className="text-[10px] text-slate-400 uppercase block">Potential Recovery</span>
          <span className="text-sm font-bold font-mono text-emerald-400">
            {recommendation.expectedShortfallMitigation}
          </span>
          <div className="text-[10px] text-slate-500 font-mono">Confidence: {recommendation.confidence}%</div>
        </div>
      </div>

      {/* Detected Conditions Box (Section 22) */}
      <div className="p-3 rounded-xl bg-mining-900/90 border border-slate-800 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Detected Operating Conditions Triggering This Recommendation</span>
        </span>
        <ul className="space-y-1 text-[11px] text-slate-300">
          {recommendation.detectedConditions.map((cond, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span>{cond}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Actions */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Recommended Engineering Actions</span>
        </span>
        <div className="space-y-1.5">
          {recommendation.recommendedActions.map((action, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-mining-850/80 border border-slate-800 text-xs flex items-start gap-2 text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Impact statement */}
      <div className="text-xs text-slate-300 bg-mining-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
        <strong className="text-slate-100">Expected Operational Impact:</strong> {recommendation.operationalImpact}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] text-slate-500 font-mono">
          Formulated {recommendation.createdTime} by Optimization Engine
        </span>

        <div className="flex items-center gap-2">
          {onSimulate && (
            <button
              onClick={() => onSimulate(recommendation)}
              className="px-3 py-1.5 rounded-lg bg-mining-800 hover:bg-mining-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulate Recovery</span>
            </button>
          )}

          <button
            onClick={() => setAcknowledged(!acknowledged)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              acknowledged
                ? 'bg-emerald-950 border border-emerald-500/60 text-emerald-300'
                : 'bg-emerald-500 hover:bg-emerald-400 text-mining-950 shadow-glow-green'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{acknowledged ? 'Order Dispatched' : 'Acknowledge & Dispatch'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
