import React from 'react';
import { Loader2, Activity } from 'lucide-react';

export function LoadingState({ message = 'Loading intelligence telemetry...', height = 'h-64' }) {
  return (
    <div className={`flex flex-col items-center justify-center ${height} text-slate-400 glass-panel rounded-xl border border-slate-800 p-8`}>
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-slate-800 border-t-emerald-500 animate-spin" />
        <Activity className="w-5 h-5 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-sm font-medium text-slate-300">{message}</p>
      <span className="text-xs text-slate-500 mt-1 font-mono">Ingesting Sensor & Satellite Feeds...</span>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 animate-pulse">
      <div className="h-4 bg-slate-800 rounded w-1/3 mb-3" />
      <div className="h-8 bg-slate-800 rounded w-1/2 mb-2" />
      <div className="h-3 bg-slate-800 rounded w-2/3" />
    </div>
  );
}
