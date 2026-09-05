import React from 'react';
import { StatusBadge } from './StatusBadge';

export function StatCard({
  title,
  value,
  unit = '',
  secondaryMetric,
  status,
  trend,
  icon: Icon,
  variant = 'default',
  onClick,
  className = ''
}) {
  const variantBorder = {
    default: 'border-slate-800 hover:border-slate-700',
    green: 'border-emerald-500/30 hover:border-emerald-500/50 bg-gradient-to-br from-mining-850 to-emerald-950/20',
    blue: 'border-sky-500/30 hover:border-sky-500/50 bg-gradient-to-br from-mining-850 to-sky-950/20',
    amber: 'border-amber-500/30 hover:border-amber-500/50 bg-gradient-to-br from-mining-850 to-amber-950/20',
    red: 'border-rose-500/30 hover:border-rose-500/50 bg-gradient-to-br from-mining-850 to-rose-950/20'
  }[variant] || 'border-slate-800';

  const iconBg = {
    default: 'bg-slate-800/80 text-slate-300',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    blue: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    red: 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
  }[variant] || 'bg-slate-800/80 text-slate-300';

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-4 rounded-xl border transition-all duration-200 ${variantBorder} ${
        onClick ? 'cursor-pointer hover:shadow-panel-hover' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className="text-2xl font-bold font-mono tracking-tight text-white">
          {value}
        </span>
        {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
      </div>

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60 mt-2">
        {secondaryMetric ? (
          <span className="text-xs text-slate-400 truncate">
            {secondaryMetric}
          </span>
        ) : (
          <span />
        )}
        {status && <StatusBadge status={status} size="sm" />}
        {trend && (
          <span className={`text-[11px] font-mono ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
