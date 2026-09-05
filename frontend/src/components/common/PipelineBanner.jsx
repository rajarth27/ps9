import React, { useState } from 'react';
import { 
  Satellite, 
  Layers, 
  Truck, 
  Clock, 
  TrendingDown, 
  Cpu, 
  Compass, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

export function PipelineBanner({ className = '' }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`glass-panel border border-emerald-500/20 rounded-xl p-3 sm:p-4 bg-gradient-to-r from-mining-900 via-mining-850 to-mining-900 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              ManganAI Core Intelligence Flow
              <span className="text-[10px] font-mono font-normal uppercase px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                End-to-End Decision Architecture
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Raw Multi-Modal Data Ingestion → Machine Learning Inference → Operational Shortfall Risk Mitigation
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="self-start lg:self-center text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-mining-800 border border-slate-700/60"
        >
          <Info className="w-3 h-3" />
          {expanded ? 'Hide Pipeline Architecture' : 'View Full Pipeline Stages'}
        </button>
      </div>

      {/* Horizontal condensed flow on desktop */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 overflow-x-auto pb-1">
        <div className="flex items-center gap-2 min-w-max text-[11px]">
          {/* Stage 1: Ingestion */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
            <div className="flex items-center -space-x-1 text-sky-400">
              <Satellite className="w-3.5 h-3.5" />
              <Layers className="w-3.5 h-3.5" />
              <Truck className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-white">Multi-Source Inputs</span>
            <span className="text-[10px] text-slate-500">(Weather, Equipment, Ops)</span>
          </div>

          <ChevronRight className="w-4 h-4 text-emerald-500/60 flex-shrink-0" />

          {/* Stage 2: AI / ML */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
            <span className="font-semibold text-emerald-200">ML Engine</span>
            <span className="text-[10px] text-emerald-400/70">(Shortfall & Reserve Models)</span>
          </div>

          <ChevronRight className="w-4 h-4 text-emerald-500/60 flex-shrink-0" />

          {/* Stage 3: Predictions */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium text-white">Predictions</span>
            <span className="text-[10px] text-slate-400">(Production + Reserves)</span>
          </div>

          <ChevronRight className="w-4 h-4 text-emerald-500/60 flex-shrink-0" />

          {/* Stage 4: Risk */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-amber-200">Risk & Bottlenecks</span>
          </div>

          <ChevronRight className="w-4 h-4 text-emerald-500/60 flex-shrink-0" />

          {/* Stage 5: Recommendations */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
            <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-emerald-200">AI Recommendations</span>
          </div>

          <ChevronRight className="w-4 h-4 text-emerald-500/60 flex-shrink-0" />

          {/* Stage 6: Better Decisions */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 font-semibold shadow-glow-green">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Optimal MOIL Decisions</span>
          </div>
        </div>
      </div>

      {/* Expandable detailed architecture view */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
            <div className="font-semibold text-sky-400 flex items-center gap-1.5 mb-1.5">
              <Satellite className="w-3.5 h-3.5" /> 1. Input Features Fed to ML
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Weather:</strong> Rainfall (42mm), Soil Moisture (61%), Temp (31°C)</li>
              <li><strong className="text-white">Equipment:</strong> Downtime (14h), Availability (84%), Utilization (78%)</li>
              <li><strong className="text-white">Operations:</strong> 27 Trucks, 2h Drill Delay, 1h Blast Delay</li>
              <li><strong className="text-white">Targets:</strong> 10,000 T Daily Mine Target</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
              <Cpu className="w-3.5 h-3.5" /> 2. Machine Learning Inference
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Shortfall Regressor:</strong> Forecasts 9,300 T (700 T deficit)</li>
              <li><strong className="text-white">Confidence Estimator:</strong> 89% empirical certainty</li>
              <li><strong className="text-white">Factor Attribution:</strong> Ranks downtime & rainfall as primary triggers</li>
              <li><strong className="text-white">GIS Reserve Predictor:</strong> Multi-spectral satellite zone probability</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-mining-900/90 border border-slate-800">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> 3. Decision Support & Actions
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Fleet Redeployment:</strong> Shift EX-021 to replace failed EX-017</li>
              <li><strong className="text-white">Weather Protocol:</strong> High-head pumps + crushed dolomite on ramp</li>
              <li><strong className="text-white">Haulage Dispatch:</strong> Re-allocate 3 trucks to highwall bench</li>
              <li><strong className="text-white">Expected Recovery:</strong> Up to 500+ Tonnes recoverable</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
