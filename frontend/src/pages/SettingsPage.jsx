import React, { useState } from 'react';
import { useMine } from '../context/MineContext';
import { getBaseUrl, setBaseUrl, getSystemStatus } from '../services/api';
import { Settings, Server, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Database, Cpu } from 'lucide-react';

export function SettingsPage() {
  const { systemStatus, checkStatus } = useMine();
  const [backendUrl, setLocalBackendUrl] = useState(getBaseUrl());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setBaseUrl(backendUrl);
    handleTest();
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const status = await getSystemStatus();
      setTestResult(status);
      checkStatus();
    } catch (err) {
      setTestResult({
        online: false,
        message: err.message || 'Connection test failed.'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              System & API Configuration
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Architecture Hub
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure FastAPI backend connectivity, mock fallback modes, and telemetry polling
          </p>
        </div>
      </div>

      {/* Backend Status Overview Card */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>FastAPI Backend Connection</span>
          </h2>

          <div className="flex items-center gap-2">
            {systemStatus.online ? (
              <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE · http://127.0.0.1:8000</span>
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 rounded bg-amber-950/70 border border-amber-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>DEMO MODE (FastAPI Offline)</span>
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The ManganAI frontend is engineered to communicate with the MOIL FastAPI backend. If the backend is running at <code className="text-emerald-300 bg-mining-900 px-1 py-0.5 rounded">http://127.0.0.1:8000</code>, live predictions and telemetry will flow seamlessly. If offline, high-fidelity mock generators ensure full UI functionality and interactive predictions without breaking.
        </p>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Target Backend Service URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setLocalBackendUrl(e.target.value)}
                placeholder="http://127.0.0.1:8000"
                className="flex-1 bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-mining-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-glow-green"
              >
                Save & Ping
              </button>
              <button
                type="button"
                onClick={handleTest}
                disabled={testing}
                className="px-3 py-2 bg-mining-850 hover:bg-mining-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>Test Probe</span>
              </button>
            </div>
          </div>
        </form>

        {testResult && (
          <div className={`p-3 rounded-lg border text-xs ${
            testResult.online
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
          }`}>
            <div className="font-bold flex items-center gap-1.5">
              {testResult.online ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
              <span>{testResult.online ? 'Backend Handshake Succeeded' : 'Backend Standby (Fallback Active)'}</span>
            </div>
            <div className="text-[11px] mt-0.5 text-slate-300">{testResult.message}</div>
          </div>
        )}
      </div>

      {/* Centralized Service Directory */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" />
          <span>Centralized Service Registry (src/services/api.js)</span>
        </h3>
        <p className="text-xs text-slate-400">
          All endpoints adhere to modular decoupled contracts. When connecting the backend, no frontend redesign is necessary:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            { fn: 'getMines()', route: 'GET /api/mines' },
            { fn: 'getDashboard(mineId)', route: 'GET /api/dashboard' },
            { fn: 'getExplorationZones()', route: 'GET /api/exploration/zones' },
            { fn: 'predictReserve(data)', route: 'POST /api/ml/predict-reserve' },
            { fn: 'getProductionTrends()', route: 'GET /api/production/trends' },
            { fn: 'predictShortfall(data)', route: 'POST /api/ml/predict-shortfall' },
            { fn: 'getEquipment()', route: 'GET /api/equipment' },
            { fn: 'getHaulageData()', route: 'GET /api/haulage' },
            { fn: 'getWeather()', route: 'GET /api/weather' },
            { fn: 'getRisk()', route: 'GET /api/risk' },
            { fn: 'getRecommendations()', route: 'GET /api/recommendations' },
            { fn: 'getSystemStatus()', route: 'GET /health' }
          ].map((ep, idx) => (
            <div key={idx} className="p-2 rounded bg-mining-900 border border-slate-800/80 flex items-center justify-between">
              <span className="text-emerald-400">{ep.fn}</span>
              <span className="text-slate-500 text-[11px]">{ep.route}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
