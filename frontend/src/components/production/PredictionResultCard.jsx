import React from 'react';
import {
  TrendingDown,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  ArrowRight,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Link } from 'react-router-dom';

export function PredictionResultCard({ result, inputs }) {
  if (!result) return null;

  const target = inputs?.production_target || 10000;
  const factors = result.contributing_factors || [];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-mining-900 via-mining-850 to-mining-900 shadow-2xl animate-in fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="flex items-center gap-2">
  <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
    AI Production Forecast
  </span>

  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono font-bold text-emerald-400">
    LIVE ML
  </span>
</div>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
            Shortfall Prediction Analysis
          </h2>
          <span className="text-xs text-slate-400">
            Generated at {new Date(result.timestamp || Date.now()).toLocaleTimeString()} IST
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block">Risk Evaluation</span>
            <StatusBadge status={result.risk_level} size="lg" />
          </div>
          <div className="text-right border-l border-slate-800 pl-3">
            <span className="text-[10px] text-slate-400 uppercase block">Model Confidence</span>
            <span className="text-xl font-bold font-mono text-emerald-400">{result.confidence}%</span>
          </div>
        </div>
      </div>

      {/* 4 Big KPI Callouts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-mining-900/90 border border-slate-800">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Predicted Production
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400">
            {result.predicted_production?.toLocaleString()} <span className="text-xs font-normal text-slate-400">T</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Forecast volume</span>
        </div>

        <div className="p-4 rounded-xl bg-mining-900/90 border border-slate-800">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Production Target
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white">
            {target?.toLocaleString()} <span className="text-xs font-normal text-slate-400">T</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Mandate baseline</span>
        </div>

        <div className="p-4 rounded-xl bg-mining-900/90 border border-rose-500/30 bg-gradient-to-b from-mining-900 to-rose-950/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Expected Shortfall
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400">
            {result.expected_shortfall?.toLocaleString()} <span className="text-xs font-normal text-slate-400">T</span>
          </div>
          <span className="text-[11px] font-mono text-rose-400 font-semibold mt-1 block">
            -{result.shortfall_percentage}% of target
          </span>
        </div>

        <div className="p-4 rounded-xl bg-mining-900/90 border border-slate-800">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Operational Risk
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
            {result.risk_level}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Mitigation recommended</span>
        </div>
      </div>

      {/* Contributing Conditions / Operational Factor Breakdown */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Contributing Conditions</span>
              <span className="text-[10px] font-mono font-normal lowercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                operational factor indicators
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identified input parameters correlating with the predicted production deficit
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-mining-850 px-2.5 py-1 rounded-lg border border-slate-800">
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>Relative Operational Impact Weights</span>
          </div>
        </div>

        {/* Visual factor breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {factors.map((item, idx) => {
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
                    <span className="font-semibold text-slate-200">{item.factor}</span>
                    <span className="font-mono text-slate-400 text-[11px]">({item.value})</span>
                  </div>
                  <StatusBadge status={item.severity} size="sm" />
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${Math.min(100, Math.max(8, item.impactScore * 2.2))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-slate-500">Domain: {item.category}</span>
                  <span className="font-mono font-medium text-slate-300">Impact Score: {item.impactScore}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decision Support Callout */}
      <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>AI Decision Support Available</span>
          </h4>
          <p className="text-xs text-slate-300">
            6 operational corrective actions formulated to recover up to <strong className="text-white">520 T/day</strong> of expected shortfall.
          </p>
        </div>

        <Link
          to="/recommendations"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-mining-950 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-glow-green"
        >
          <span>View Corrective Actions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
