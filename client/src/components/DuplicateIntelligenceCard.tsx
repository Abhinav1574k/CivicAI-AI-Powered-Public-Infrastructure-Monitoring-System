import React from 'react';
import { Layers, GitMerge, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface DuplicateIntelligenceCardProps {
  reportsClustered?: number;
  incidentsSaved?: number;
}

export const DuplicateIntelligenceCard: React.FC<DuplicateIntelligenceCardProps> = ({
  reportsClustered = 142,
  incidentsSaved = 84,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
              <GitMerge className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                Duplicate Report Intelligence
              </h3>
              <p className="text-xs text-slate-400">
                Spatial & Multi-modal Computer Vision Clustering
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/60 font-semibold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> 84 Work Orders Saved
          </span>
        </div>

        {/* Visual Pipeline Diagram */}
        <div className="mt-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
            {/* Step 1 */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-lg font-extrabold text-white block">17 Citizen Reports</span>
              <span className="text-[11px] text-slate-400 font-medium">Citizen Submissions</span>
            </div>

            {/* Step 2 - Arrow / Transformer */}
            <div className="flex flex-col items-center justify-center text-cyan-400 py-1">
              <div className="flex items-center gap-1 text-xs font-mono font-semibold bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60">
                <Layers className="h-3.5 w-3.5 text-cyan-400" /> Spatial + Image AI
              </div>
              <ArrowRight className="h-4 w-4 mt-1 text-slate-500 hidden md:block" />
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-cyan-950/40 to-indigo-950/40 p-3 rounded-lg border border-cyan-800/60">
              <span className="text-lg font-extrabold text-cyan-400 block">1 Incident</span>
              <span className="text-[11px] text-cyan-300 font-semibold">CIV-1042 Unified Infrastructure Incident</span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/50 flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-300 font-medium leading-relaxed">
              <strong>17 citizen reports</strong> were automatically clustered into a single infrastructure issue, preventing duplicate work orders and saving municipal inspection labor.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
            <span className="text-xs text-slate-400 block">Total Clustered Reports</span>
            <span className="text-lg font-extrabold text-slate-200">{reportsClustered} Reports</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
            <span className="text-xs text-slate-400 block">Dispatched Order Efficiency</span>
            <span className="text-lg font-extrabold text-emerald-400">+48% Faster</span>
          </div>
        </div>
      </div>
    </div>
  );
};
