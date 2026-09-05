import React from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import {
  Compass,
  Layers,
  Activity,
  CheckCircle2,
  Calendar,
  CloudRain,
  Droplets,
  Thermometer,
  Trees,
  TrendingUp,
  MapPin
} from 'lucide-react';

export function ZoneDetailsModal({ zone, isOpen, onClose }) {
  if (!zone) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Exploration Intelligence: ${zone.id} — ${zone.name}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Top summary row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-mining-850 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-white font-mono">{zone.id}</span>
              <StatusBadge status={zone.risk} size="md" />
              <span className="text-xs text-slate-400">({zone.mineName})</span>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Geological Formation: <strong className="text-emerald-300">{zone.strata}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Reserve Probability</span>
              <span className="text-2xl font-black font-mono text-emerald-400">{zone.reserveProbability}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Est. Reserve</span>
              <span className="text-2xl font-black font-mono text-sky-400">{zone.estimatedReserveMT} <span className="text-xs font-normal">MT</span></span>
            </div>
          </div>
        </div>

        {/* 4 Key ML Reserve Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Predicted Grade</span>
            <div className="text-xl font-bold font-mono text-amber-300">{zone.predictedGrade}% Mn</div>
            <span className="text-[10px] text-slate-500">Commercial Grade</span>
          </div>

          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Model Confidence</span>
            <div className="text-xl font-bold font-mono text-emerald-400">{zone.confidence}%</div>
            <span className="text-[10px] text-slate-500">High Certainty</span>
          </div>

          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Drill Holes</span>
            <div className="text-xl font-bold font-mono text-white">{zone.drillHolesCompleted} / 25</div>
            <span className="text-[10px] text-slate-500">Boreholes logged</span>
          </div>

          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Elevation</span>
            <div className="text-xl font-bold font-mono text-white">{zone.elevationM} m</div>
            <span className="text-[10px] text-slate-500">Mean Sea Level</span>
          </div>
        </div>

        {/* Space & Earth Observation Telemetry */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Satellite & Environmental Feature Telemetry</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-mining-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span>Rainfall</span>
              </div>
              <span className="text-base font-bold font-mono text-white">{zone.rainfallMM} mm</span>
            </div>

            <div className="p-3 rounded-lg bg-mining-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>Soil Moisture</span>
              </div>
              <span className="text-base font-bold font-mono text-white">{zone.soilMoisture}%</span>
            </div>

            <div className="p-3 rounded-lg bg-mining-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Trees className="w-3.5 h-3.5 text-emerald-400" />
                <span>NDVI Index</span>
              </div>
              <span className="text-base font-bold font-mono text-white">{zone.ndvi}</span>
            </div>

            <div className="p-3 rounded-lg bg-mining-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                <span>LST Temp</span>
              </div>
              <span className="text-base font-bold font-mono text-white">{zone.lstTempC} °C</span>
            </div>
          </div>
        </div>

        {/* Recommended Action Box */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>AI Geologist Directive</span>
          </div>
          <p className="text-slate-200 text-sm mb-2">
            {zone.recommendedAction}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-emerald-500/20">
            <span>Last Survey Date: {zone.lastSurveyDate}</span>
            <span className="font-mono text-emerald-400">Coordinates: {zone.coordinates.join(', ')}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
