import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOIL_MINES } from '../../data/mines';

export function ExplorationMap({ zones, selectedZone, onSelectZone, className = '' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Center on Balaghat Mining Belt [21.75, 80.0]
    const initialCenter = selectedZone ? selectedZone.coordinates : [21.75, 80.0];

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: initialCenter,
      zoom: 10,
      zoomControl: true,
      attributionControl: false
    });
    mapInstanceRef.current = map;

    // Dark carto tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    // Plot MOIL operating mines
    MOIL_MINES.forEach((mine) => {
      const mineIcon = L.divIcon({
        className: 'custom-mine-pin',
        html: `
          <div style="background: #0f172a; border: 2px solid #10b981; border-radius: 6px; padding: 3px 6px; box-shadow: 0 0 10px rgba(16,185,129,0.5); font-size: 10px; font-weight: bold; color: #34d399; white-space: nowrap; display: flex; align-items: center; gap: 4px;">
            <span style="width: 6px; height: 6px; background: #10b981; border-radius: 50%;"></span>
            ${mine.name.split(' ')[0]}
          </div>
        `,
        iconSize: [80, 24],
        iconAnchor: [40, 12]
      });

      const marker = L.marker(mine.coordinates, { icon: mineIcon }).addTo(map);
      marker.bindPopup(`
        <div style="color: #fff; font-size: 12px;">
          <strong style="color: #34d399;">${mine.name}</strong><br/>
          Type: ${mine.type}<br/>
          Reserve: <strong>${mine.reserveMT} MT</strong><br/>
          Avg Grade: <strong>${mine.gradePercent}% Mn</strong>
        </div>
      `);
    });

    // Plot Exploration Zones
    zones.forEach((zone) => {
      const isSelected = selectedZone?.id === zone.id;
      const probColor = zone.reserveProbability >= 85 ? '#10b981' : zone.reserveProbability >= 70 ? '#38bdf8' : '#f59e0b';
      
      const zoneIcon = L.divIcon({
        className: 'custom-zone-marker',
        html: `
          <div style="position: relative; cursor: pointer;">
            <div style="background: ${probColor}; width: ${isSelected ? '28px' : '22px'}; height: ${isSelected ? '28px' : '22px'}; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 15px ${probColor}; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; color: #070a0f;">
              ${zone.reserveProbability}%
            </div>
            ${isSelected ? '<div style="position: absolute; -inset: 4px; border: 2px dashed #10b981; border-radius: 50%; animation: spin 4s linear infinite;"></div>' : ''}
          </div>
        `,
        iconSize: [isSelected ? 28 : 22, isSelected ? 28 : 22],
        iconAnchor: [isSelected ? 14 : 11, isSelected ? 14 : 11]
      });

      const marker = L.marker(zone.coordinates, { icon: zoneIcon }).addTo(map);
      
      marker.on('click', () => {
        if (onSelectZone) onSelectZone(zone);
      });

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #fff; line-height: 1.4;">
          <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">Exploration Target</div>
          <strong style="color: ${probColor}; font-size: 13px;">${zone.id}: ${zone.name}</strong><br/>
          Mine Sector: <strong>${zone.mineName}</strong><br/>
          Reserve Probability: <strong style="color: #34d399;">${zone.reserveProbability}%</strong><br/>
          Estimated Reserve: <strong>${zone.estimatedReserveMT} MT</strong><br/>
          Predicted Grade: <strong>${zone.predictedGrade}% Mn</strong><br/>
          Confidence: <strong>${zone.confidence}%</strong>
        </div>
      `);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [zones, selectedZone, onSelectZone]);

  // If selectedZone changes, pan map to it
  useEffect(() => {
    if (mapInstanceRef.current && selectedZone) {
      mapInstanceRef.current.setView(selectedZone.coordinates, 12, { animate: true });
    }
  }, [selectedZone]);

  return (
    <div className={`relative h-[480px] w-full rounded-xl overflow-hidden border border-slate-800 ${className}`}>
      <div ref={mapRef} className="w-full h-full" />

      {/* Map floating overlay / legend */}
      <div className="absolute top-3 right-3 z-[1000] glass-panel p-3 rounded-lg border border-slate-700/80 text-xs space-y-2 bg-mining-900/90 shadow-xl max-w-xs pointer-events-auto">
        <div className="font-bold text-white text-[11px] uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center justify-between">
          <span>Exploration GIS Layers</span>
          <span className="text-[10px] text-emerald-400 font-mono">MOIL MP-MH BELT</span>
        </div>
        <div className="space-y-1 text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-glow-green" />
            <span>High Probability (&gt;85% Reserve)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 shadow-glow-blue" />
            <span>Moderate Probability (70 - 85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Prospecting Candidate (&lt;70%)</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-800 text-[10px] text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-emerald-950 border border-emerald-500" />
            <span>Operating Mine Production Shafts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
