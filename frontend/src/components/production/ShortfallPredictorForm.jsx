import React, { useState } from 'react';
import {
  Activity,
  Cpu,
  Loader2,
  AlertCircle,
  Calendar,
  CloudRain,
  Droplets,
  Thermometer,
  Gauge,
  Clock,
  Wrench,
  Truck,
  Flame,
  Target,
  RefreshCw
} from 'lucide-react';
import { useMine } from '../../context/MineContext';
import { predictShortfall } from '../../services/api';

export function ShortfallPredictorForm({ onPredictionComplete }) {
  const { mines, selectedMineId } = useMine();

  const [formData, setFormData] = useState({
    mine_id: selectedMineId || 'BALAGHAT-01',
    date: new Date().toISOString().split('T')[0],
    production_target: 10000,
    rainfall: 42,
    soil_moisture: 61,
    temperature: 31,
    equipment_availability: 84,
    equipment_downtime: 14,
    equipment_utilization: 78,
    maintenance_hours: 6,
    haulage_truck_count: 27,
    drilling_delay: 2.0,
    blast_delay: 1.0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) parsedValue = 0;
      // Prevent invalid negative numbers
      if (parsedValue < 0) parsedValue = 0;
    }
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleResetDefaults = () => {
    setFormData({
      mine_id: selectedMineId || 'BALAGHAT-01',
      date: new Date().toISOString().split('T')[0],
      production_target: 10000,
      rainfall: 42,
      soil_moisture: 61,
      temperature: 31,
      equipment_availability: 84,
      equipment_downtime: 14,
      equipment_utilization: 78,
      maintenance_hours: 6,
      haulage_truck_count: 27,
      drilling_delay: 2.0,
      blast_delay: 1.0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (formData.equipment_availability > 100 || formData.equipment_utilization > 100 || formData.soil_moisture > 100) {
      setError('Percentages (Availability, Utilization, Soil Moisture) cannot exceed 100%.');
      setLoading(false);
      return;
    }

    try {
      const response = await predictShortfall(formData);
      if (onPredictionComplete) {
        onPredictionComplete(response, formData);
      }
    } catch (err) {
      setError(err.message || 'Failed to analyze mining conditions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              AI Production Shortfall Predictor
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predict production shortfalls using operational, equipment and environmental conditions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mining-850 hover:bg-mining-800 text-xs font-medium text-slate-300 border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Load MOIL Baseline
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Production & Mine */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>1. Target & Mine Schedule</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Mine Sector
              </label>
              <select
                name="mine_id"
                value={formData.mine_id}
                onChange={handleChange}
                className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {mines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.district})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Evaluation Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Production Target (tonnes/day)
              </label>
              <input
                type="number"
                name="production_target"
                value={formData.production_target}
                onChange={handleChange}
                min="100"
                step="50"
                required
                className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Weather & Environment */}
        <div className="pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
            <CloudRain className="w-3.5 h-3.5" />
            <span>2. Weather & Environmental Conditions</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Rainfall (mm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">mm</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Soil Moisture (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="soil_moisture"
                  value={formData.soil_moisture}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="1"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Ambient Temperature (°C)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  step="1"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Equipment Telemetry */}
        <div className="pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            <span>3. Equipment Fleet Telemetry</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Equipment Availability (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="equipment_availability"
                  value={formData.equipment_availability}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="1"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Equipment Downtime (hours)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="equipment_downtime"
                  value={formData.equipment_downtime}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">hrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Equipment Utilization (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="equipment_utilization"
                  value={formData.equipment_utilization}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="1"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Maintenance Hours
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="maintenance_hours"
                  value={formData.maintenance_hours}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Mining Operations */}
        <div className="pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            <span>4. Mining Operations & Dispatch</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Haulage Truck Count (units)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="haulage_truck_count"
                  value={formData.haulage_truck_count}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">trucks</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Drilling Delay (hours)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="drilling_delay"
                  value={formData.drilling_delay}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">hrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Blast Delay (hours)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="blast_delay"
                  value={formData.blast_delay}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">hrs</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-mining-950 disabled:text-slate-500 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-glow-green"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
              <span>Analyzing Mining Conditions...</span>
            </>
          ) : (
            <>
              <Activity className="w-5 h-5" />
              <span>Predict Shortfall</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
