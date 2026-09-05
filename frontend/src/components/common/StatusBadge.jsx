import React from 'react';

export function StatusBadge({ status, size = 'sm', className = '' }) {
  const normalized = String(status || '').toUpperCase();
  
  let styles = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotColor = 'bg-slate-400';

  if (normalized === 'ACTIVE' || normalized === 'ONLINE' || normalized === 'LOW' || normalized === 'NORMAL' || normalized === 'COMPLETED' || normalized === 'OPERATIONAL') {
    styles = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-glow-green';
    dotColor = 'bg-emerald-400 animate-pulse';
  } else if (normalized === 'MEDIUM' || normalized === 'WARNING' || normalized === 'MAINTENANCE' || normalized === 'DEMO' || normalized === 'DELAYED' || normalized === 'IN PROGRESS') {
    styles = 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-glow-amber';
    dotColor = 'bg-amber-400';
  } else if (normalized === 'HIGH' || normalized === 'CRITICAL' || normalized === 'DOWN' || normalized === 'AT RISK' || normalized === 'OFFLINE') {
    styles = 'bg-rose-950/60 text-rose-300 border-rose-500/40 shadow-glow-red';
    dotColor = 'bg-rose-400 animate-pulse';
  }

  const sizeClasses = size === 'lg' 
    ? 'text-xs px-3 py-1 font-semibold tracking-wider' 
    : size === 'md' 
    ? 'text-[11px] px-2.5 py-0.5 font-medium' 
    : 'text-[10px] px-2 py-0.5 font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${styles} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
}
