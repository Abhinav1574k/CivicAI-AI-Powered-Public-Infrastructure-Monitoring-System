import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Issue } from '../types';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ChevronRight, Users, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface MapComponentProps {
  issues: Issue[];
  selectedId?: string;
}

// Generate custom SVG markers based on severity
const createCustomIcon = (severity: string, priorityScore: number) => {
  let color = '#22c55e'; // LOW
  let ringColor = 'rgba(34, 197, 94, 0.4)';

  if (severity === 'CRITICAL') {
    color = '#ef4444';
    ringColor = 'rgba(239, 68, 68, 0.5)';
  } else if (severity === 'HIGH') {
    color = '#f97316';
    ringColor = 'rgba(249, 115, 22, 0.4)';
  } else if (severity === 'MEDIUM') {
    color = '#eab308';
    ringColor = 'rgba(234, 179, 8, 0.4)';
  }

  const svgHtml = `
    <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: ${ringColor}; animation: pulse-ring 2s infinite ease-in-out;"></div>
      <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: ${color}; border: 2.5px solid #0f172a; box-shadow: 0 4px 12px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; color: #ffffff;">
        ${priorityScore}
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

export const MapComponent: React.FC<MapComponentProps> = ({ issues }) => {
  const navigate = useNavigate();
  // Center around Bengaluru CBD by default
  const centerLat = 12.9716;
  const centerLng = 77.5946;

  return (
    <div className="relative h-[480px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {issues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.latitude, issue.longitude]}
            icon={createCustomIcon(issue.severity, issue.priorityScore)}
          >
            <Popup minWidth={260} maxWidth={320}>
              <div className="p-1 space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">{issue.type}</span>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60">
                      #{issue.id}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      issue.severity === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : issue.severity === 'HIGH'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : issue.severity === 'MEDIUM'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium line-clamp-2">
                  {issue.locationName}
                </p>

                <div className="grid grid-cols-3 gap-2 bg-slate-900/90 p-2 rounded-lg text-center border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Priority</span>
                    <span className="text-xs font-extrabold text-cyan-400">{issue.priorityScore}/100</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Reports</span>
                    <span className="text-xs font-bold text-slate-200">{issue.reports}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Status</span>
                    <span className="text-[10px] font-bold text-slate-300 capitalize">{issue.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/issues/${issue.id}`)}
                  className="w-full mt-2 py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md"
                >
                  View Details & Verification <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800/80 text-xs shadow-xl space-y-2">
        <span className="font-extrabold text-slate-300 block text-[11px] uppercase tracking-wider">
          Severity Heat Legend
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
            <span className="text-slate-300 text-[11px]">Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></span>
            <span className="text-slate-300 text-[11px]">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></span>
            <span className="text-slate-300 text-[11px]">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            <span className="text-slate-300 text-[11px]">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};
