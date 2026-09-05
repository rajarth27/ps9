import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorState({ 
  title = 'Data Telemetry Unavailable', 
  message = 'Failed to load telemetry from the data service.', 
  onRetry 
}) {
  return (
    <div className="glass-panel p-6 rounded-xl border border-rose-500/30 text-center flex flex-col items-center justify-center my-4">
      <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3 shadow-glow-red">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-400 max-w-md mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-mining-800 hover:bg-mining-700 text-slate-200 border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Connection
        </button>
      )}
    </div>
  );
}
