import React from 'react';
import { RiskGauge } from '../components/risk/RiskGauge';
import { RiskFactorBreakdown } from '../components/risk/RiskFactorBreakdown';
import { SevenDayRiskForecast } from '../components/risk/SevenDayRiskForecast';
import { RISK_OVERVIEW, RISK_CONTRIBUTORS, SEVEN_DAY_RISK_FORECAST } from '../data/risk';
import { ShieldAlert, AlertTriangle, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RiskPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              Production Risk Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40">
              Shortfall Diagnostics
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Holistic risk scoring synthesizing equipment telemetry, haulage constraints, and monsoon weather exposure
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-mining-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>Active Status: Evaluation Shift #1</span>
        </div>
      </div>

      {/* Top: Risk Gauge (Left) + Contributing Factor Attribution (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <RiskGauge
            score={RISK_OVERVIEW.score}
            level={RISK_OVERVIEW.level}
            summary={RISK_OVERVIEW.summary}
          />
        </div>

        <div className="lg:col-span-7">
          <RiskFactorBreakdown contributors={RISK_CONTRIBUTORS} />
        </div>
      </div>

      {/* 7-Day Risk Forecast (Section 21) */}
      <SevenDayRiskForecast forecast={SEVEN_DAY_RISK_FORECAST} />

      {/* Decision Support link */}
      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <h4 className="font-bold text-emerald-300 uppercase tracking-wider mb-0.5">
            Mitigate Identified Production Bottlenecks
          </h4>
          <p className="text-slate-300">
            The AI Decision Support engine has formulated prioritized countermeasures for equipment redeployment and weather prep.
          </p>
        </div>

        <Link
          to="/recommendations"
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-mining-950 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-glow-green inline-flex items-center gap-2"
        >
          <span>Open AI Decision Support</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
