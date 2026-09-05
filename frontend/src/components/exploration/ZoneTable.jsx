import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Filter, Eye, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export function ZoneTable({ zones, onSelectZone, selectedZoneId }) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('reserveProbability');
  const [sortDirection, setSortDirection] = useState('desc');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredZones = useMemo(() => {
    return zones.filter(zone => {
      const matchesSearch = 
        zone.id.toLowerCase().includes(search.toLowerCase()) ||
        zone.name.toLowerCase().includes(search.toLowerCase()) ||
        zone.mineName.toLowerCase().includes(search.toLowerCase()) ||
        zone.strata.toLowerCase().includes(search.toLowerCase());
      
      const matchesRisk = riskFilter === 'ALL' || zone.risk === riskFilter;
      return matchesSearch && matchesRisk;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [zones, search, sortField, sortDirection, riskFilter]);

  return (
    <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
      {/* Header controls: Search & Filters */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-mining-850">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search zones, mines, or strata..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-mining-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Risk Filter:</span>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-mining-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
          >
            <option value="ALL">All Risks</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-mining-900 text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">
                  <span>Zone ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('mineName')}>
                <div className="flex items-center gap-1">
                  <span>Mine</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3">Coordinates</th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('reserveProbability')}>
                <div className="flex items-center gap-1">
                  <span>Probability</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('estimatedReserveMT')}>
                <div className="flex items-center gap-1">
                  <span>Est. Reserve</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('predictedGrade')}>
                <div className="flex items-center gap-1">
                  <span>Grade</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('confidence')}>
                <div className="flex items-center gap-1">
                  <span>Confidence</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3">Risk</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredZones.map((zone) => {
              const isSelected = selectedZoneId === zone.id;
              return (
                <tr
                  key={zone.id}
                  onClick={() => onSelectZone(zone)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-950/40 text-white'
                      : 'hover:bg-mining-850/70'
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{zone.id}</span>
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-slate-300">
                    {zone.mineName}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">
                    {zone.coordinates[0].toFixed(4)}, {zone.coordinates[1].toFixed(4)}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-400">
                    {zone.reserveProbability}%
                  </td>
                  <td className="px-4 py-3 text-sky-400 font-semibold">
                    {zone.estimatedReserveMT} MT
                  </td>
                  <td className="px-4 py-3 text-amber-300">
                    {zone.predictedGrade}% Mn
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {zone.confidence}%
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <StatusBadge status={zone.risk} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectZone(zone);
                      }}
                      className="p-1 rounded bg-mining-800 hover:bg-emerald-950 text-slate-400 hover:text-emerald-300 transition-colors"
                      title="Inspect Zone"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 bg-mining-900">
        <span>Showing {filteredZones.length} of {zones.length} exploration zones</span>
        <span className="font-mono">Click any row to inspect deep bore hole & strata telemetry</span>
      </div>
    </div>
  );
}
