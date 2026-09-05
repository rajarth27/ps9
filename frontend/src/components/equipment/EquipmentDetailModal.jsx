import React from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import {
  Wrench,
  Gauge,
  Clock,
  Cpu,
  Calendar,
  Sparkles,
  MapPin,
  TrendingDown,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export function EquipmentDetailModal({ equipment, isOpen, onClose }) {
  if (!equipment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Equipment Telemetry: ${equipment.id} (${equipment.type})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Unit Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-mining-850 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold font-mono text-white">{equipment.id}</span>
              <StatusBadge status={equipment.status} size="md" />
            </div>
            <div className="text-xs text-slate-300 font-sans font-semibold">
              {equipment.model}
            </div>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{equipment.location}</span>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 uppercase block">Production Impact</span>
            <span className={`text-xl font-bold ${equipment.productionImpactTonnes < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {equipment.productionImpactTonnes > 0 ? `+${equipment.productionImpactTonnes} T` : `${equipment.productionImpactTonnes} T`}
            </span>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Availability</span>
            <div className="text-xl font-bold font-mono text-emerald-400">{equipment.availability}%</div>
            <span className="text-[10px] text-slate-500">Benchmark: 90%</span>
          </div>

          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Utilization</span>
            <div className="text-xl font-bold font-mono text-white">{equipment.utilization}%</div>
            <span className="text-[10px] text-slate-500">Duty cycle</span>
          </div>

          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Downtime</span>
            <div className={`text-xl font-bold font-mono ${equipment.downtimeHours > 3 ? 'text-rose-400' : 'text-slate-300'}`}>
              {equipment.downtimeHours} hrs
            </div>
            <span className="text-[10px] text-slate-500">Unscheduled loss</span>
          </div>

          <div className="p-3 rounded-lg bg-mining-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Maintenance</span>
            <div className="text-xl font-bold font-mono text-amber-300">{equipment.maintenanceHours} hrs</div>
            <span className="text-[10px] text-slate-500">Last: {equipment.lastMaintenance}</span>
          </div>
        </div>

        {/* AI Operational Recommendation */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>AI Fleet Decision Support Recommendation</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {equipment.aiRecommendation}
          </p>
        </div>
      </div>
    </Modal>
  );
}
