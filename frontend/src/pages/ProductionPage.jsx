import React, { useState } from 'react';
import { ShortfallPredictorForm } from '../components/production/ShortfallPredictorForm';
import { PredictionResultCard } from '../components/production/PredictionResultCard';
import { ProductionChart } from '../components/dashboard/ProductionChart';
import { OperationalDelays } from '../components/operations/OperationalDelays';
import { calculateMLShortfallPrediction } from '../data/predictions';
import { CURRENT_CONDITIONS, OPERATIONAL_FACTOR_INDICATORS } from '../data/production';
import { Activity, Cpu, Sparkles, BarChart2 } from 'lucide-react';

export function ProductionPage() {
  // Initialize with default current mining conditions prediction
  const [activeResult, setActiveResult] = useState(() => {
    return calculateMLShortfallPrediction(CURRENT_CONDITIONS);
  });
  const [activeInputs, setActiveInputs] = useState(CURRENT_CONDITIONS);

  const handlePredictionComplete = (result, inputs) => {
    setActiveResult(result);
    setActiveInputs(inputs);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              Production Intelligence & Shortfall ML
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
              Operational Regressor
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate mining scenarios and forecast daily production deficits based on 11 operational telemetry features
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-mining-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Cpu className="w-3.5 h-3.5" />
          <span>Active Model: Gradient Boosted Production Regressor (MOIL v2)</span>
        </div>
      </div>

      {/* Interactive Shortfall Predictor Form (Section 5) */}
      <ShortfallPredictorForm onPredictionComplete={handlePredictionComplete} />

      {/* Dynamic Prediction Result Card (Section 6) */}
      <PredictionResultCard result={activeResult} inputs={activeInputs} />

      {/* Production Performance Historical Analytics (Section 9) */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-emerald-400" />
          <span>Historical Target vs Actual vs Model Accuracy</span>
        </h2>
        <ProductionChart />
      </div>
    </div>
  );
}
