import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layers, ShieldCheck, ArrowRight, Cpu, Satellite, Database, Activity, Sparkles } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState('controller');

  const ROLES = [
    {
      id: 'controller',
      name: 'Dr. A. K. Sharma',
      role: 'Chief Mining Geologist & Operations Controller',
      clearance: 'Level 4 Command'
    },
    {
      id: 'manager',
      name: 'R. K. Verma',
      role: 'General Mine Manager — Balaghat Sector',
      clearance: 'Level 5 Administrative'
    },
    {
      id: 'engineer',
      name: 'P. Deshmukh',
      role: 'Fleet & Dispatch Lead Engineer',
      clearance: 'Level 3 Operations'
    }
  ];

  const handleSignIn = (e) => {
    e.preventDefault();
    const selected = ROLES.find(r => r.id === role) || ROLES[0];
    login({
      id: `MOIL-${role.toUpperCase()}-01`,
      name: selected.name,
      role: selected.role,
      organization: 'Manganese Ore India Limited (MOIL)',
      clearance: selected.clearance,
      avatar: selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-mining-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle radial backdrop glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10 space-y-6 bg-mining-900/90">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-glow-green">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white font-mono">
              MANGAN<span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-0.5">
              Manganese Ore India Limited (MOIL)
            </p>
          </div>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            AI/ML + Space Technology Decision Support Platform for Manganese Mining Operations
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
              Select Operator Profile (Demo)
            </label>
            <div className="space-y-2">
              {ROLES.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    role === r.id
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-glow-green text-white'
                      : 'bg-mining-850/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.id}
                    checked={role === r.id}
                    onChange={() => setRole(r.id)}
                    className="mt-1 accent-emerald-500"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-white">{r.name}</div>
                    <div className="text-[11px] text-slate-400">{r.role}</div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{r.clearance}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-mining-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-glow-green"
          >
            <span>Enter Operations Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Feature Badges */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-mono">
          <div className="p-2 rounded bg-mining-850 border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
            <span>Shortfall ML</span>
          </div>
          <div className="p-2 rounded bg-mining-850 border border-slate-800">
            <Satellite className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1" />
            <span>Space Telemetry</span>
          </div>
          <div className="p-2 rounded bg-mining-850 border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
            <span>AI Actions</span>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 mt-6 font-mono">
        ManganAI Hackathon Prototype · Built for MOIL Operational Mine Evaluation
      </div>
    </div>
  );
}
