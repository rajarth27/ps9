import React, { useState, useEffect } from 'react';
import { getExplorationZones } from '../services/api';
import { ExplorationMap } from '../components/exploration/ExplorationMap';
import { ReservePredictionForm } from '../components/exploration/ReservePredictionForm';
import { ZoneTable } from '../components/exploration/ZoneTable';
import { ZoneDetailsModal } from '../components/exploration/ZoneDetailsModal';
import { LoadingState } from '../components/common/LoadingState';
import { Compass, Sparkles, MapPin, Database, Layers, Info } from 'lucide-react';
import { EXPLORATION_ZONES } from '../data/exploration';

export function ExplorationPage() {
  const [zones, setZones] = useState(EXPLORATION_ZONES);
  const [selectedZone, setSelectedZone] = useState(EXPLORATION_ZONES[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getExplorationZones();
        if (mounted && data) setZones(data);
      } catch (err) {
        console.error('Failed to load exploration zones:', err);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const handleSelectZone = (zone) => {
    setSelectedZone(zone);
    setModalOpen(true);
  };

  const handlePredictionComplete = (newPrediction) => {
    // Dynamically insert or highlight simulated target
    console.log('Prediction complete:', newPrediction);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              AI Exploration Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
              Manganese Reserve Identification
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Satellite multi-spectral signatures + Geological strata modeling for MOIL reserve expansion
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-mining-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>Exploration Belt: Madhya Pradesh – Maharashtra Horizon</span>
        </div>
      </div>

      {/* Featured Zone Showcase (Section 11 Example: ZONE M17) */}
      {selectedZone && (
        <div className="glass-panel p-4 rounded-xl border border-sky-500/30 bg-gradient-to-r from-mining-900 via-mining-850 to-mining-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/40">
                ACTIVE FOCUS
              </span>
              <span className="text-base font-bold text-white">{selectedZone.name}</span>
              <span className="text-xs text-slate-400">({selectedZone.mineName})</span>
            </div>
            <p className="text-xs text-slate-300">
              Formation: <strong className="text-emerald-300">{selectedZone.strata}</strong> · Lat: {selectedZone.coordinates[0]}, Long: {selectedZone.coordinates[1]}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
            <div className="p-2 rounded-lg bg-mining-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Reserve Probability</span>
              <span className="text-lg font-black font-mono text-emerald-400">{selectedZone.reserveProbability}%</span>
            </div>
            <div className="p-2 rounded-lg bg-mining-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Estimated Reserve</span>
              <span className="text-lg font-black font-mono text-sky-400">{selectedZone.estimatedReserveMT} MT</span>
            </div>
            <div className="p-2 rounded-lg bg-mining-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Predicted Grade</span>
              <span className="text-lg font-black font-mono text-amber-300">{selectedZone.predictedGrade}% Mn</span>
            </div>
            <div className="p-2 rounded-lg bg-mining-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Confidence</span>
              <span className="text-lg font-black font-mono text-emerald-400">{selectedZone.confidence}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Map + Reserve ML Prediction Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive GIS Map (7 cols) */}
        <div className="lg:col-span-7">
          <ExplorationMap
            zones={zones}
            selectedZone={selectedZone}
            onSelectZone={handleSelectZone}
          />
        </div>

        {/* Reserve ML Predictor Form (5 cols) */}
        <div className="lg:col-span-5">
          <ReservePredictionForm
            initialZone={selectedZone}
            onPredictionComplete={handlePredictionComplete}
          />
        </div>
      </div>

      {/* Exploration Zone Table (Section 13) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            All Delineated Exploration Targets
          </h2>
          <span className="text-xs text-slate-400">
            Click any row to view full geological strata & borehole logs
          </span>
        </div>
        <ZoneTable
          zones={zones}
          selectedZoneId={selectedZone?.id}
          onSelectZone={handleSelectZone}
        />
      </div>

      {/* Detailed Inspection Modal */}
      <ZoneDetailsModal
        zone={selectedZone}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
