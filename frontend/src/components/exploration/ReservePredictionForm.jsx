import React, { useState } from 'react';
import { Compass, Sparkles, Loader2, Database, Layers, CheckCircle2 } from 'lucide-react';
import { predictReserve } from '../../services/api';

export function ReservePredictionForm({ onPredictionComplete, initialZone }) {
  const [formData, setFormData] = useState({
    latitude: initialZone ? initialZone.coordinates[0] : 21.8845,
    longitude: initialZone ? initialZone.coordinates[1] : 80.2185,
    elevation: initialZone ? initialZone.elevationM : 342,
    geological_strata: initialZone ? initialZone.strata : 'Gondite series / Quartzite footwall',
    rainfall: initialZone ? initialZone.rainfallMM : 38,
    soil_moisture: initialZone ? initialZone.soilMoisture : 58,
    ndvi: initialZone ? initialZone.ndvi : 0.42,
    land_surface_temperature: initialZone ? initialZone.lstTempC : 29.4
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await predictReserve(formData);
      setResult(res);
      if (onPredictionComplete) onPredictionComplete(res);
    } catch (err) {
      setError(err.message || 'Reserve prediction inference failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-800/80">
        <Compass className="w-4 h-4 text-emerald-400" />
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            AI Manganese Reserve Predictor
          </h3>
          <p className="text-xs text-slate-400">
            Multi-spectral satellite telemetry + Geological stratification model
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Coordinates & Elevation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Latitude (°N)
            </label>
            <input
              type="number"
              step="0.0001"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Longitude (°E)
            </label>
            <input
              type="number"
              step="0.0001"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Elevation (m MSL)
            </label>
            <input
              type="number"
              name="elevation"
              value={formData.elevation}
              onChange={handleChange}
              min="0"
              required
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Geological Strata */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
            Geological Indicator / Strata
          </label>
          <select
            name="geological_strata"
            value={formData.geological_strata}
            onChange={handleChange}
            className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="Gondite series / Quartzite footwall">Gondite series / Quartzite footwall (High Prospect)</option>
            <option value="Manganiferous phyllite & braunite reef">Manganiferous phyllite & braunite reef (Premium Grade)</option>
            <option value="Cryptomelane pyrolusite lens">Cryptomelane pyrolusite lens (Secondary Oxide)</option>
            <option value="Sericite phyllite intercalated with hollandite">Sericite phyllite intercalated with hollandite</option>
            <option value="Granitic gneiss with manganese quartzite">Granitic gneiss with manganese quartzite band</option>
          </select>
        </div>

        {/* Space & Meteorological Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Rainfall (mm)
            </label>
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              min="0"
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Soil Moisture (%)
            </label>
            <input
              type="number"
              name="soil_moisture"
              value={formData.soil_moisture}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              NDVI Index
            </label>
            <input
              type="number"
              step="0.01"
              name="ndvi"
              value={formData.ndvi}
              onChange={handleChange}
              min="0"
              max="1"
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              LST Temp (°C)
            </label>
            <input
              type="number"
              step="0.1"
              name="land_surface_temperature"
              value={formData.land_surface_temperature}
              onChange={handleChange}
              className="w-full bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="p-2 rounded bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-mining-950 disabled:text-slate-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-glow-green"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Analyzing Geological & Satellite Telemetry...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Predict Reserve</span>
            </>
          )}
        </button>
      </form>

      {/* Result Card */}
      {result && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-mining-850 to-emerald-950/30 border border-emerald-500/40 animate-in fade-in">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>AI Reserve Prediction Result</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">ML Confidence: {result.confidence}%</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2.5 rounded-lg bg-mining-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Reserve Probability</span>
              <div className="text-xl font-black font-mono text-emerald-300">
                {result.reserve_probability}%
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-mining-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Estimated Reserve</span>
              <div className="text-xl font-black font-mono text-sky-300">
                {result.estimated_reserve} <span className="text-xs font-normal text-slate-400">MT</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-mining-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Predicted Grade</span>
              <div className="text-xl font-black font-mono text-amber-300">
                {result.predicted_grade}% <span className="text-xs font-normal text-slate-400">Mn</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-mining-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Model Confidence</span>
              <div className="text-xl font-black font-mono text-emerald-400">
                {result.confidence}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
