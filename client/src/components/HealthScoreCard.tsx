import React from 'react';
import { Activity, AlertTriangle, ShieldAlert } from 'lucide-react';

interface HealthScoreCardProps {
  health?: {
    roads: number;
    streetlights: number;
    drainage: number;
    waterManagement: number;
    mostAffectedZone: {
      name: string;
      healthScore: number;
      criticalCount: number;
    };
  };
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ health }) => {
  const data = health || {
    roads: 72,
    streetlights: 84,
    drainage: 61,
    waterManagement: 76,
    mostAffectedZone: {
      name: 'Zone 12 (Central Business District)',
      healthScore: 48,
      criticalCount: 23,
    },
  };

  const sectors = [
    { name: 'Road Infrastructure', score: data.roads, color: 'bg-cyan-500' },
    { name: 'Streetlighting Grid', score: data.streetlights, color: 'bg-emerald-500' },
    { name: 'Stormwater & Drainage', score: data.drainage, color: 'bg-amber-500' },
    { name: 'Water Management', score: data.waterManagement, color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                Infrastructure Sector Health
              </h3>
              <p className="text-xs text-slate-400">
                AI aggregated structural integrity scores
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60 font-semibold">
            City Index 73/100
          </span>
        </div>

        {/* Health Bars */}
        <div className="mt-5 space-y-4">
          {sectors.map((sector) => (
            <div key={sector.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">{sector.name}</span>
                <span className="text-slate-100 font-mono font-bold">{sector.score}/100</span>
              </div>
              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full ${sector.color} transition-all duration-500`}
                  style={{ width: `${sector.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Most Affected Zone Callout */}
        <div className="mt-6 p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-slate-900 border border-red-800/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-red-400 font-extrabold block">
                Most Affected Zone
              </span>
              <span className="text-sm font-bold text-slate-100 block">
                {data.mostAffectedZone.name}
              </span>
            </div>
          </div>

          <div className="text-right border-l border-red-900/60 pl-3">
            <span className="text-xs text-slate-400 block">Zone Health</span>
            <span className="text-base font-extrabold text-red-400 font-mono">
              {data.mostAffectedZone.healthScore}/100
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
