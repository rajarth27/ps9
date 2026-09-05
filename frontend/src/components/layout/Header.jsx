import React from 'react';
import { useMine } from '../../context/MineContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, MapPin, RefreshCw, Cpu, ShieldCheck } from 'lucide-react';

export function Header({ onToggleSidebar }) {
  const { mines, selectedMineId, setSelectedMineId, systemStatus, checkStatus } = useMine();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-mining-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & System Branding */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-glow-green">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white font-mono">
                MANGAN<span className="text-emerald-400">AI</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                MOIL INTELLIGENCE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              AI-Powered Mining & Space Platform
            </p>
          </div>
        </div>
      </div>

      {/* Middle / Right: Mine Selector, System Status & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mine Selector */}
        <div className="flex items-center gap-1.5 bg-mining-850 border border-slate-700/80 rounded-lg px-2.5 py-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <label htmlFor="mine-select" className="sr-only">Select Mine</label>
          <select
            id="mine-select"
            value={selectedMineId}
            onChange={(e) => setSelectedMineId(e.target.value)}
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
          >
            {mines.map((mine) => (
              <option key={mine.id} value={mine.id} className="bg-mining-900 text-white">
                {mine.name} ({mine.district})
              </option>
            ))}
          </select>
        </div>

        {/* System Status: ● SYSTEM ONLINE vs ● DEMO MODE */}
        <div className="flex items-center gap-2">
          {systemStatus.online ? (
            <div 
              title="FastAPI Backend connected at http://127.0.0.1:8000"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 shadow-glow-green"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>SYSTEM ONLINE</span>
            </div>
          ) : (
            <div 
              title="FastAPI is offline; high-fidelity mock & ML prediction active"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/70 border border-amber-500/40 text-amber-300 shadow-glow-amber"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>DEMO MODE</span>
            </div>
          )}

          <button
            onClick={checkStatus}
            title="Check API status"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Profile Pill */}
        {user && (
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
              {user.avatar || 'MO'}
            </div>
            <div className="text-left leading-tight hidden lg:block">
              <div className="text-xs font-semibold text-white truncate max-w-[120px]">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Ops Controller</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
