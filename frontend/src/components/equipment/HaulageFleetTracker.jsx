import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Truck, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { HAULAGE_SUMMARY, HAULAGE_AVAILABILITY_TREND, HAULAGE_ROUTE_METRICS } from '../../data/haulage';

export function HaulageFleetTracker({ className = '' }) {
  const summary = HAULAGE_SUMMARY;

  return (
    <div className={`glass-panel p-5 rounded-xl border border-emerald-500/30 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Haulage Fleet Intelligence
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
              Core ML Feature Input
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Haulage truck availability and cycle dispatch directly impact daily shortfall regression
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-mining-900 px-2.5 py-1 rounded border border-slate-800">
          <span>Fleet Availability:</span>
          <strong>{summary.fleetAvailabilityPct}%</strong>
        </div>
      </div>

      {/* 4 Dedicated Truck Count Indicators (Section 16) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
            Total Haulage Trucks
          </span>
          <div className="text-2xl font-black font-mono text-white">
            {summary.totalTrucks} <span className="text-xs font-normal text-slate-400">trucks</span>
          </div>
          <span className="text-[10px] text-slate-500">Fleet Allocation</span>
        </div>

        <div className="p-3 rounded-lg bg-mining-900 border border-emerald-500/30 bg-gradient-to-b from-mining-900 to-emerald-950/20">
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider block mb-1">
            Active Trucks
          </span>
          <div className="text-2xl font-black font-mono text-emerald-400">
            {summary.activeTrucks} <span className="text-xs font-normal text-slate-400">trucks</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-medium">Currently Hauling Ore</span>
        </div>

        <div className="p-3 rounded-lg bg-mining-900 border border-sky-500/30 bg-gradient-to-b from-mining-900 to-sky-950/20">
          <span className="text-[10px] text-sky-400 uppercase tracking-wider block mb-1">
            Available Trucks
          </span>
          <div className="text-2xl font-black font-mono text-sky-400">
            {summary.availableTrucks} <span className="text-xs font-normal text-slate-400">trucks</span>
          </div>
          <span className="text-[10px] text-sky-400/80 font-medium">Active + Standby</span>
        </div>

        <div className="p-3 rounded-lg bg-mining-900 border border-rose-500/30 bg-gradient-to-b from-mining-900 to-rose-950/20">
          <span className="text-[10px] text-rose-400 uppercase tracking-wider block mb-1">
            Unavailable / Down
          </span>
          <div className="text-2xl font-black font-mono text-rose-400">
            {summary.downTrucks} <span className="text-xs font-normal text-slate-400">trucks</span>
          </div>
          <span className="text-[10px] text-rose-400/80 font-medium">In Workshop</span>
        </div>
      </div>

      {/* Availability Trend Chart */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          <span>Haulage Fleet Availability Trend (Last 7 Shifts)</span>
          <span className="text-[10px] text-slate-500 font-normal lowercase">Target: 28 units / shift</span>
        </div>

        <div className="h-48 w-full bg-mining-900/60 p-2 rounded-xl border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HAULAGE_AVAILABILITY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" vertical={false} />
              <XAxis dataKey="shift" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} domain={[20, 32]} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0d121c', borderColor: '#334155', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
              <Bar dataKey="active" name="Active Trucks" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="down" name="Down Trucks" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Haulage Route Dispatch Conditions */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Sub-Level Haulage Circuits & Traffic Telemetry
        </span>
        <div className="space-y-2">
          {HAULAGE_ROUTE_METRICS.map((route, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-mining-900 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="font-semibold text-slate-200">{route.route}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Distance: <strong className="text-slate-300 font-mono">{route.distanceKm} km</strong> · Road Condition: <span className="text-amber-400">{route.roadCondition}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Cycle Time</span>
                  <span className="font-mono text-emerald-400 font-semibold">{route.avgCycleTimeMin} min</span>
                </div>
                <div className="border-l border-slate-800 pl-3">
                  <span className="text-[10px] text-slate-500 uppercase block">Assigned Trucks</span>
                  <span className="font-mono text-white font-bold">{route.assignedTrucks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
