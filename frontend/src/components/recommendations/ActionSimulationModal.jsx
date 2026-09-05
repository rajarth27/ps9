import React from 'react';
import { Modal } from '../common/Modal';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export function ActionSimulationModal({ recommendation, isOpen, onClose, currentShortfall = 700, target = 10000 }) {
  if (!recommendation) return null;

  const recovery = recommendation.expectedRecoveryTonnes || 200;
  const netShortfall = Math.max(0, currentShortfall - recovery);
  const initialPct = ((currentShortfall / target) * 100).toFixed(1);
  const postPct = ((netShortfall / target) * 100).toFixed(1);
  const newRisk = postPct < 5 ? 'LOW' : 'MEDIUM';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Decision Impact Simulator: ${recommendation.title}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-mining-850 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Simulated Dispatch Countermeasure
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            Evaluating operational impact of executing: <strong>{recommendation.title}</strong>
          </p>
        </div>

        {/* Before vs After comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Baseline State */}
          <div className="p-4 rounded-xl bg-mining-900 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-800 pb-1">
              Baseline Projected State
            </span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Production Shortfall:</span>
              <span className="font-mono font-bold text-rose-400">{currentShortfall} T</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Shortfall %:</span>
              <span className="font-mono font-bold text-rose-400">{initialPct}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Operational Risk:</span>
              <StatusBadge status="MEDIUM" size="sm" />
            </div>
          </div>

          {/* Post Action State */}
          <div className="p-4 rounded-xl bg-mining-900 border border-emerald-500/40 bg-gradient-to-b from-mining-900 to-emerald-950/20 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block border-b border-emerald-500/30 pb-1">
              Post-Mitigation Forecast
            </span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Net Shortfall:</span>
              <span className="font-mono font-bold text-emerald-400">{netShortfall} T</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Shortfall %:</span>
              <span className="font-mono font-bold text-emerald-400">{postPct}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Revised Risk:</span>
              <StatusBadge status={newRisk} size="sm" />
            </div>
          </div>
        </div>

        {/* Summary metric callout */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
            Net Daily Production Preserved
          </span>
          <div className="text-3xl font-black font-mono text-emerald-400">
            +{recovery} <span className="text-sm font-normal text-slate-300">Tonnes / Day</span>
          </div>
          <p className="text-xs text-emerald-300 mt-1">
            Mitigates {((recovery / currentShortfall) * 100).toFixed(0)}% of the active operational deficit.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-mining-800 hover:bg-mining-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            Close Simulation
          </button>
          <button
            onClick={() => {
              onClose();
              alert(`Order dispatched to Mine Operations Supervisor for: ${recommendation.title}`);
            }}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-mining-950 text-xs font-bold uppercase tracking-wider transition-all shadow-glow-green"
          >
            Authorize Work Order
          </button>
        </div>
      </div>
    </Modal>
  );
}
