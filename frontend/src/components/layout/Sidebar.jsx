import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Activity,
  Truck,
  Satellite,
  ShieldAlert,
  Lightbulb,
  Settings,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useMine } from '../../context/MineContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
  { path: '/exploration', label: 'AI Exploration', icon: Compass, badge: 'Reserves' },
  { path: '/production', label: 'Shortfall Predictor', icon: Activity, badge: 'ML Core' },
  { path: '/equipment', label: 'Equipment & Haulage', icon: Truck, badge: 'Fleet' },
  { path: '/space-weather', label: 'Space & Weather', icon: Satellite, badge: 'Satellite' },
  { path: '/risk', label: 'Risk Intelligence', icon: ShieldAlert, badge: '7-Day' },
  { path: '/recommendations', label: 'AI Decision Support', icon: Lightbulb, badge: 'Actions' },
  { path: '/settings', label: 'System Settings', icon: Settings, badge: null },
];

export function Sidebar({ isOpen, onClose }) {
  const { selectedMine } = useMine();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-mining-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold font-mono text-white text-sm tracking-wider">
                MOIL · <span className="text-emerald-400">ManganAI</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                Mining Intelligence
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Mine Status Box */}
        <div className="p-3 mx-3 my-3 rounded-xl bg-mining-850 border border-slate-800/80">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Active Sector</span>
            <span className="text-emerald-400 font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
              OPERATING
            </span>
          </div>
          <div className="text-xs font-bold text-white truncate">
            {selectedMine?.name}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
            <span>Target: {selectedMine?.dailyTarget?.toLocaleString()} T</span>
            <span className="font-mono text-emerald-400 font-medium">{selectedMine?.reserveMT} MT Res</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 shadow-glow-green font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-mining-850/80'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white group-[.bg-emerald-950\/40]:text-emerald-400 transition-colors" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-mining-800 text-slate-400 border border-slate-700/60 group-[.bg-emerald-950\/40]:border-emerald-500/40 group-[.bg-emerald-950\/40]:text-emerald-300">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Platform Info */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>AI Platform Engine</span>
            <span className="font-mono text-emerald-400 text-[10px]">v2.4-ML</span>
          </div>
          <div className="text-[10px] text-slate-500 leading-tight">
            Designed for MOIL Operational Mine Control Centers
          </div>
        </div>
      </aside>
    </>
  );
}
