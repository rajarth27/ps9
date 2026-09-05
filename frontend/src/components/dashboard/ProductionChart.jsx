import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { PRODUCTION_HISTORY } from '../../data/production';
import { TrendingUp, BarChart3 } from 'lucide-react';

export function ProductionChart({ className = '' }) {
  const [timeframe, setTimeframe] = useState('7d');
  const data = PRODUCTION_HISTORY[timeframe] || PRODUCTION_HISTORY['7d'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const shortfall = (item.target || 0) - (item.actual || 0);
      return (
        <div className="bg-mining-900 border border-slate-700/80 p-3 rounded-lg shadow-xl text-xs space-y-1 font-mono">
          <div className="font-bold text-white mb-1.5 border-b border-slate-800 pb-1 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-slate-400 font-sans">Shift Evaluation</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-emerald-400">
            <span>Target:</span>
            <span className="font-semibold">{item.target?.toLocaleString()} T</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sky-400">
            <span>Actual:</span>
            <span className="font-semibold">{item.actual?.toLocaleString()} T</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-emerald-300">
            <span>ML Predicted:</span>
            <span className="font-semibold">{item.predicted?.toLocaleString()} T</span>
          </div>
          {shortfall > 0 && (
            <div className="flex items-center justify-between gap-4 text-rose-400 pt-1 border-t border-slate-800 font-bold">
              <span>Expected Shortfall:</span>
              <span>-{shortfall.toLocaleString()} T</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`glass-panel p-5 rounded-xl border border-slate-800 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Production Performance
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Target vs Actual Extracted vs AI Machine Learning Forecast
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1 bg-mining-900 p-1 rounded-lg border border-slate-800 self-start sm:self-center">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '90d', label: '90 Days' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                timeframe === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1f293d' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1f293d' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
              formatter={(value) => <span className="text-slate-300 font-medium">{value}</span>}
            />
            <Bar
              dataKey="actual"
              name="Actual Mined (T)"
              fill="#0284c7"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              opacity={0.85}
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Mandate Target (T)"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#10b981' }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              name="ML Model Forecast (T)"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#38bdf8' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>7-Day Model Mean Absolute Error (MAE): <strong className="text-white font-mono">1.8%</strong></span>
        </div>
        <div className="text-[11px] text-slate-500">
          Powered by Gradient Boosted Regressor + Real-time Telemetry
        </div>
      </div>
    </div>
  );
}
