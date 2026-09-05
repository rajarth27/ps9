import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Satellite, Layers, Eye, Info, Sparkles } from 'lucide-react';
import { MOIL_MINES } from '../../data/mines';

const LAYER_PRESETS = [
  { id: 'rainfall', label: 'Rainfall Accumulation', unit: 'mm', color: '#38bdf8', opacity: 0.5 },
  { id: 'soil_moisture', label: 'Soil Moisture Saturation', unit: '%', color: '#0284c7', opacity: 0.5 },
  { id: 'ndvi', label: 'NDVI Vegetation Index', unit: 'index', color: '#10b981', opacity: 0.45 },
  { id: 'temperature', label: 'Land Surface Temp (LST)', unit: '°C', color: '#f59e0b', opacity: 0.45 },
  { id: 'reserve_prob', label: 'Reserve Probability Heatmap', unit: '%', color: '#8b5cf6', opacity: 0.55 },
];

export function SatelliteLayerMap({ mine, className = '' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const overlayGroupRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('rainfall');

  useEffect(() => {
    if (!mapRef.current) return;

    const center = mine?.coordinates || [21.8722, 80.2033];

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center,
      zoom: 11,
      zoomControl: true,
      attributionControl: false
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    // Layer group for dynamic overlays
    const overlayGroup = L.layerGroup().addTo(map);
    overlayGroupRef.current = overlayGroup;

    // Marker for current mine pit
    const mineIcon = L.divIcon({
      className: 'custom-mine-pin',
      html: `
        <div style="background: #10b981; border: 2px solid white; border-radius: 50%; width: 22px; height: 22px; box-shadow: 0 0 15px #10b981; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 10px;">
          M
        </div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    L.marker(center, { icon: mineIcon }).addTo(map).bindPopup(`
      <strong style="color: #10b981;">${mine?.name}</strong><br/>
      Ground Observational Center
    `);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mine]);

  // Update satellite overlay when activeLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current || !overlayGroupRef.current) return;

    overlayGroupRef.current.clearLayers();
    const center = mine?.coordinates || [21.8722, 80.2033];
    const currentPreset = LAYER_PRESETS.find(l => l.id === activeLayer) || LAYER_PRESETS[0];

    // Create simulated concentric multi-spectral sensor circles
    const radiuses = [1500, 3000, 5500, 8000];
    radiuses.forEach((r, idx) => {
      const circle = L.circle(center, {
        color: currentPreset.color,
        fillColor: currentPreset.color,
        fillOpacity: currentPreset.opacity - idx * 0.08,
        weight: 1,
        dashArray: idx % 2 === 0 ? '4 4' : null
      });

      circle.bindTooltip(`
        <strong>${currentPreset.label}</strong><br/>
        Sensor Scan Buffer: ${(r / 1000).toFixed(1)} km<br/>
        Telemetry Status: Simulated Demo Data
      `);

      overlayGroupRef.current.addLayer(circle);
    });
  }, [activeLayer, mine]);

  return (
    <div className={`glass-panel p-5 rounded-xl border border-slate-800 ${className}`}>
      {/* Header with Layer Selectors */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Earth Observation & Satellite Layer Viewer
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40">
              DEMO / SIMULATED SATELLITE DATA
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-spectral spatial coverage for {mine?.name} (Simulated Sentinel-2, Landsat-9 & GPM feeds)
          </p>
        </div>

        {/* Layer Buttons */}
        <div className="flex flex-wrap items-center gap-1 bg-mining-900 p-1 rounded-lg border border-slate-800">
          {LAYER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActiveLayer(preset.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeLayer === preset.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-glow-blue'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: preset.color }}
              />
              <span>{preset.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map display */}
      <div className="relative h-96 w-full rounded-xl overflow-hidden border border-slate-800">
        <div ref={mapRef} className="w-full h-full" />

        {/* Floating Legend */}
        <div className="absolute bottom-3 left-3 z-[1000] glass-panel p-3 rounded-lg border border-slate-700/80 text-xs bg-mining-900/90 shadow-xl max-w-xs pointer-events-auto">
          <div className="font-bold text-white text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>{LAYER_PRESETS.find(l => l.id === activeLayer)?.label}</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-2 font-mono">
            Spatial Resolution: 10m · Radiometric Band 8A
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono">
            <span>Low Intensity</span>
            <div
              className="h-2 flex-1 mx-2 rounded"
              style={{
                background: `linear-gradient(to right, transparent, ${
                  LAYER_PRESETS.find(l => l.id === activeLayer)?.color
                })`
              }}
            />
            <span>Peak Saturation</span>
          </div>
        </div>

        {/* Scientific honesty disclaimer banner */}
        <div className="absolute top-3 right-3 z-[1000] bg-mining-900/95 border border-amber-500/40 px-3 py-1.5 rounded-lg text-[11px] text-amber-300 shadow-xl max-w-xs flex items-center gap-2 pointer-events-auto">
          <Info className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>Note: Satellite grids are simulated demo projections for hackathon presentation.</span>
        </div>
      </div>
    </div>
  );
}
