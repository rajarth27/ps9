import React from 'react';
import { Calendar, AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { SEVEN_DAY_RISK_FORECAST } from '../../data/risk';

export function SevenDayRiskForecast({ forecast = SEVEN_DAY_RISK_FORECAST }) {
  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              7-Day Forward Production Risk Outlook
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Predictive horizon combining scheduled equipment overhauls and meteorological forecasting
          </p>
        </div>

        <div className="text-[11px] font-mono text-slate-400 bg-mining-850 px-2.5 py-1 rounded border border-slate-800">
          Continuous 7-Day Rolling Model
        </div>
      </div>

      {/* 7 Day Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.map((day, idx) => {
          let cardBorder = 'border-slate-800 bg-mining-900';
          if (day.riskLevel === 'HIGH' || day.riskLevel === 'CRITICAL') {
            cardBorder = 'border-rose-500/40 bg-gradient-to-b from-mining-900 to-rose-950/20';
          } else if (day.riskLevel === 'MEDIUM') {
            cardBorder = 'border-amber-500/40 bg-gradient-to-b from-mining-900 to-amber-950/20';
          } else if (day.riskLevel === 'LOW') {
            cardBorder = 'border-emerald-500/30 bg-gradient-to-b from-mining-900 to-emerald-950/20';
          }

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border ${cardBorder} flex flex-col justify-between text-xs space-y-2`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-white text-xs truncate">{day.day}</span>
                  <StatusBadge status={day.riskLevel} size="sm" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono mb-2">{day.date}</div>

                <div className="space-y-1 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Forecast</span>
                    <span className="text-sm font-bold text-white">
                      {day.predictedProduction.toLocaleString()} T
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Shortfall</span>
                    <span className={`text-xs font-bold ${day.expectedShortfall > 600 ? 'text-rose-400' : 'text-amber-400'}`}>
                      -{day.expectedShortfall.toLocaleString()} T
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 leading-tight">
                {day.primaryConcern}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
