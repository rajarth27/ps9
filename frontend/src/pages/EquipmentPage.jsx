import React, { useState } from 'react';
import { EquipmentStats } from '../components/equipment/EquipmentStats';
import { EquipmentTable } from '../components/equipment/EquipmentTable';
import { EquipmentDetailModal } from '../components/equipment/EquipmentDetailModal';
import { HaulageFleetTracker } from '../components/equipment/HaulageFleetTracker';
import { OperationalDelays } from '../components/operations/OperationalDelays';
import { EQUIPMENT_SUMMARY, EQUIPMENT_LIST } from '../data/equipment';
import { CURRENT_CONDITIONS } from '../data/production';
import { Truck, Wrench, ShieldAlert } from 'lucide-react';

export function EquipmentPage() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenDetail = (equipment) => {
    setSelectedEquipment(equipment);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              Equipment Intelligence & Fleet Optimization
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
              Fleet SCADA Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time availability, utilization, downtime diagnostics, and AI redeployment advisory
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-mining-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Wrench className="w-3.5 h-3.5 text-amber-400" />
          <span>Active Fleet: 64 Heavy Mining Units</span>
        </div>
      </div>

      {/* Top 6 Equipment Stats (Section 14) */}
      <EquipmentStats summary={EQUIPMENT_SUMMARY} />

      {/* Dedicated Haulage Truck Monitoring (Section 16) */}
      <HaulageFleetTracker />

      {/* Operational Delays & Staging (Section 17) */}
      <OperationalDelays
        drillingDelay={CURRENT_CONDITIONS.drillingDelay}
        blastDelay={CURRENT_CONDITIONS.blastDelay}
      />

      {/* Complete Equipment Inventory Table (Section 14 & 15) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Fleet Inventory & Shift Assignment
          </h2>
          <span className="text-xs text-slate-400">
            Click any row to inspect unit telemetry & AI redeployment recommendation
          </span>
        </div>
        <EquipmentTable
          equipmentList={EQUIPMENT_LIST}
          onSelectEquipment={handleOpenDetail}
        />
      </div>

      {/* Detail Modal */}
      <EquipmentDetailModal
        equipment={selectedEquipment}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
