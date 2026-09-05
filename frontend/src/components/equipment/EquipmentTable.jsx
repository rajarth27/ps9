import React, { useState, useMemo } from 'react';
import { Search, Filter, Wrench, Eye, ArrowUpDown, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { EQUIPMENT_TYPES } from '../../data/equipment';

export function EquipmentTable({ equipmentList, onSelectEquipment }) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = useMemo(() => {
    return equipmentList.filter(item => {
      const matchesSearch = 
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.model.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesType = selectedType === 'All Types' || item.type === selectedType;
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [equipmentList, search, selectedType, statusFilter]);

  return (
    <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
      {/* Controls */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-mining-850">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search equipment ID, model, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
          >
            {EQUIPMENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-mining-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="WARNING">Warning</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="DOWN">Down</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-mining-900 text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Equipment ID</th>
              <th className="px-4 py-3">Type & Model</th>
              <th className="px-4 py-3">Mine Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Utilization</th>
              <th className="px-4 py-3">Downtime</th>
              <th className="px-4 py-3">Maintenance</th>
              <th className="px-4 py-3">Impact</th>
              <th className="px-4 py-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filtered.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectEquipment(item)}
                className="hover:bg-mining-850/70 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{item.id}</span>
                </td>
                <td className="px-4 py-3 font-sans">
                  <div className="font-medium text-slate-200">{item.type}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{item.model}</div>
                </td>
                <td className="px-4 py-3 font-sans text-slate-300 text-[11px]">
                  {item.location}
                </td>
                <td className="px-4 py-3 font-sans">
                  <StatusBadge status={item.status} size="sm" />
                </td>
                <td className="px-4 py-3 font-semibold text-emerald-400">
                  {item.availability}%
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {item.utilization}%
                </td>
                <td className={`px-4 py-3 ${item.downtimeHours > 3 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                  {item.downtimeHours} hrs
                </td>
                <td className="px-4 py-3 text-slate-400">
                  {item.maintenanceHours} hrs
                </td>
                <td className={`px-4 py-3 ${item.productionImpactTonnes < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-semibold'}`}>
                  {item.productionImpactTonnes > 0 ? `+${item.productionImpactTonnes} T` : `${item.productionImpactTonnes} T`}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEquipment(item);
                    }}
                    className="p-1 rounded bg-mining-800 hover:bg-emerald-950 text-slate-400 hover:text-emerald-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 bg-mining-900">
        <span>Showing {filtered.length} equipment units</span>
        <span className="font-mono">Real-time CANbus & SCADA feed</span>
      </div>
    </div>
  );
}
