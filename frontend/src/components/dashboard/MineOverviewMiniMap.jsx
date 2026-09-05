import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Compass, MapPin } from 'lucide-react';
import { EXPLORATION_ZONES } from '../../data/exploration';

export function MineOverviewMiniMap({ mine, className = '' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Center coordinates (Balaghat or selected mine)
    const center = mine?.coordinates || [21.8722, 80.2033];

    // Clean up existing map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapRef.current, {
      center,
      zoom: 12,
      zoomControl: true,
      attributionControl: false
    });
    mapInstanceRef.current = map;

    // Dark OpenStreetMap CartoDB DarkMatter tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    // Custom Icon for Main Mine Pit
    const mineIcon = L.divIcon({
      className: 'custom-mine-pin',
      html: `
        <div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 15px #10b981; display: flex; align-items: center; justify-content: center;">
          <div style="width: 6px; height: 6px; background-color: #070a0f; border-radius: 50%;"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const mineMarker = L.marker(center, { icon: mineIcon }).addTo(map);
    mineMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; color: #fff;">
        <strong style="color: #10b981;">${mine?.name}</strong><br/>
        Type: ${mine?.type}<br/>
        Depth: ${mine?.depthMeters}m<br/>
        Daily Target: ${mine?.dailyTarget?.toLocaleString()} T
      </div>
    `);

    // Add surrounding Exploration Zones
    EXPLORATION_ZONES.filter(z => z.mineId === mine?.id).forEach((zone) => {
      const zoneIcon = L.divIcon({
        className: 'custom-zone-pin',
        html: `
          <div style="background-color: #0284c7; width: 16px; height: 16px; border-radius: 4px; border: 2px solid #7dd3fc; box-shadow: 0 0 10px #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: bold; color: white;">
            Z
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const zoneMarker = L.marker(zone.coordinates, { icon: zoneIcon }).addTo(map);
      zoneMarker.bindPopup(`
        <div style="font-family: inherit; font-size: 11px; color: #fff;">
          <strong style="color: #38bdf8;">${zone.name}</strong><br/>
          Reserve Prob: <strong>${zone.reserveProbability}%</strong><br/>
          Est. Reserve: ${zone.estimatedReserveMT} MT<br/>
          Grade: ${zone.predictedGrade}% Mn
        </div>
      `);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mine]);

  return (
    <div className={`glass-panel p-5 rounded-xl border border-slate-800 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Mine GIS & Exploration Perimeter
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {mine?.name} ({mine?.coordinates?.join(', ')})
          </p>
        </div>
        <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
          {mine?.depthMeters}m Depth
        </div>
      </div>

      <div className="h-56 w-full rounded-lg overflow-hidden border border-slate-800 relative">
        <div ref={mapRef} className="w-full h-full" />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Active Mine Pit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-sky-500" />
            <span>Target Exploration Zones</span>
          </div>
        </div>
        <span className="font-mono text-slate-500">OpenStreetMap + CartoDB</span>
      </div>
    </div>
  );
}
